"""HTTP inference service for the trained PCOS screening model."""
from __future__ import annotations

import json
import os
from pathlib import Path

import joblib
import pandas as pd
from flask import Flask, jsonify, request

# Suppress TensorFlow logging warnings
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
import tensorflow as tf

ROOT = Path(__file__).resolve().parent
MODEL_PATH = ROOT / "artifacts" / "pcos_model.keras"
IMPUTER_PATH = ROOT / "artifacts" / "imputer.joblib"
SCALER_PATH = ROOT / "artifacts" / "scaler.joblib"
METRICS_PATH = ROOT / "artifacts" / "metrics.json"

FEATURES = [
    "Age", "Weight", "Height", "BMI", "Cycle_Length", "LH", "FSH", "AMH",
    "Cycle_Regularity", "Weight_Gain", "Hair_Loss", "Acne",
]
TYPICAL_CYCLE_MIN_DAYS = 24
TYPICAL_CYCLE_MAX_DAYS = 38
IRREGULAR_CYCLE_CODE = 4

app = Flask(__name__)


def load_artifacts():
    if not MODEL_PATH.exists():
        raise RuntimeError("Model is not trained. Run: python ml/train.py")
    model = tf.keras.models.load_model(MODEL_PATH)
    imputer = joblib.load(IMPUTER_PATH)
    scaler = joblib.load(SCALER_PATH)
    metrics = json.loads(METRICS_PATH.read_text("utf-8"))
    return model, imputer, scaler, metrics


def cycle_length_adjustment(values: dict[str, float], model_probability: float) -> tuple[float, dict]:
    """Prevent clinically abnormal cycle lengths from lowering screening risk.

    The current trained model learned a negative coefficient for Cycle_Length,
    so very long cycles can incorrectly reduce the predicted risk. Keep the
    model probability when it is already higher, but apply a minimum screening
    probability for cycle lengths outside the typical 24-38 day adult range.
    This is still screening support only, not a diagnostic rule.
    """
    cycle_length = values["Cycle_Length"]
    cycle_regularity = values["Cycle_Regularity"]
    minimum_probability = 0.0
    reasons = []

    if cycle_length < TYPICAL_CYCLE_MIN_DAYS:
        days_outside_range = TYPICAL_CYCLE_MIN_DAYS - cycle_length
        minimum_probability = max(
            minimum_probability,
            min(0.72, 0.50 + (days_outside_range * 0.03)),
        )
        reasons.append("cycle length is shorter than the typical range")

    if cycle_length > TYPICAL_CYCLE_MAX_DAYS:
        days_outside_range = cycle_length - TYPICAL_CYCLE_MAX_DAYS
        minimum_probability = max(
            minimum_probability,
            min(0.78, 0.52 + (days_outside_range * 0.015)),
        )
        reasons.append("cycle length is longer than the typical range")

    if cycle_regularity >= IRREGULAR_CYCLE_CODE:
        minimum_probability = max(minimum_probability, 0.52)
        reasons.append("cycle regularity is marked irregular")

    adjusted_probability = max(model_probability, minimum_probability)
    return adjusted_probability, {
        "applied": adjusted_probability != model_probability,
        "rawModelProbability": round(model_probability, 6),
        "minimumProbability": round(minimum_probability, 6),
        "typicalCycleRangeDays": {
            "min": TYPICAL_CYCLE_MIN_DAYS,
            "max": TYPICAL_CYCLE_MAX_DAYS,
        },
        "reasons": reasons,
    }


@app.get("/health")
def health():
    return jsonify({"success": True, "modelReady": MODEL_PATH.exists()})


@app.get("/metrics")
def metrics():
    _, _, _, report = load_artifacts()
    return jsonify(report)


@app.post("/predict")
def predict():
    payload = request.get_json(silent=True) or {}
    missing = [feature for feature in FEATURES if payload.get(feature) is None]
    if missing:
        return jsonify({"success": False, "message": "Missing model features", "missing": missing}), 400
    try:
        values = {feature: float(payload[feature]) for feature in FEATURES}
    except (TypeError, ValueError):
        return jsonify({"success": False, "message": "All model features must be numeric"}), 400

    model, imputer, scaler, report = load_artifacts()
    row = pd.DataFrame([values], columns=FEATURES)
    row_imputed = imputer.transform(row)
    row_scaled = scaler.transform(row_imputed)
    
    # Run TensorFlow model prediction
    model_probability = float(model.predict(row_scaled, verbose=0)[0, 0])
    
    probability, adjustment = cycle_length_adjustment(values, model_probability)
    positive = probability >= 0.5
    return jsonify(
        {
            "success": True,
            "prediction": "PCOS Risk Detected" if positive else "Low PCOS Risk",
            "predictionClass": int(positive),
            "probability": round(probability, 6),
            "threshold": 0.5,
            "algorithm": report["algorithm"],
            "modelMetrics": report["evaluation"],
            "featuresUsed": values,
            "riskAdjustment": adjustment,
            "medicalNotice": report["medical_notice"],
        }
    )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.getenv("PORT", "5001")))

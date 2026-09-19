"""Train and evaluate the PCOS classifier using TensorFlow on the public 541-patient dataset."""
from __future__ import annotations

import json
import os
from pathlib import Path

import joblib
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Suppress TensorFlow logging warnings
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization

ROOT = Path(__file__).resolve().parent
DATASET = ROOT / "data" / "PCOS_data_without_infertility.xlsx"
MODEL_PATH = ROOT / "artifacts" / "pcos_model.keras"
IMPUTER_PATH = ROOT / "artifacts" / "imputer.joblib"
SCALER_PATH = ROOT / "artifacts" / "scaler.joblib"
METRICS_PATH = ROOT / "artifacts" / "metrics.json"

FEATURES = {
    "Age": " Age (yrs)",
    "Weight": "Weight (Kg)",
    "Height": "Height(Cm) ",
    "BMI": "BMI",
    "Cycle_Length": "Cycle length(days)",
    "LH": "LH(mIU/mL)",
    "FSH": "FSH(mIU/mL)",
    "AMH": "AMH(ng/mL)",
    "Cycle_Regularity": "Cycle(R/I)",
    "Weight_Gain": "Weight gain(Y/N)",
    "Hair_Loss": "Hair loss(Y/N)",
    "Acne": "Pimples(Y/N)",
}
TARGET = "PCOS (Y/N)"


def load_dataset() -> tuple[pd.DataFrame, pd.Series]:
    frame = pd.read_excel(DATASET, sheet_name="Full_new")
    frame.columns = [str(column).strip() for column in frame.columns]
    normalized = {key: value.strip() for key, value in FEATURES.items()}
    X = frame[[normalized[name] for name in FEATURES]].copy()
    X.columns = list(FEATURES)
    X = X.apply(pd.to_numeric, errors="coerce")
    y = pd.to_numeric(frame[TARGET], errors="raise").astype(int)
    return X, y


def train() -> dict:
    X, y = load_dataset()
    
    # Train test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=42
    )

    # Impute missing values
    imputer = SimpleImputer(strategy="median")
    X_train_imputed = imputer.fit_transform(X_train)
    X_test_imputed = imputer.transform(X_test)

    # Scale features (essential for neural networks)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train_imputed)
    X_test_scaled = scaler.transform(X_test_imputed)

    # Set random seed for reproducibility
    tf.random.set_seed(42)

    # Build Keras Feedforward Neural Network
    model = Sequential([
        Dense(16, activation="relu", input_shape=(len(FEATURES),)),
        BatchNormalization(),
        Dropout(0.2),
        Dense(8, activation="relu"),
        Dense(1, activation="sigmoid")
    ])

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.005),
        loss="binary_crossentropy",
        metrics=["accuracy"]
    )

    # Train model
    model.fit(
        X_train_scaled,
        y_train,
        epochs=60,
        batch_size=16,
        validation_split=0.1,
        verbose=0
    )

    # Evaluate on test set
    predicted_probs = model.predict(X_test_scaled, verbose=0)
    predicted = (predicted_probs >= 0.5).astype(int).flatten()

    metrics = {
        "algorithm": "tensorflow_neural_network",
        "dataset": {
            "name": "Polycystic Ovary Syndrome (PCOS)",
            "source": "https://www.kaggle.com/datasets/prasoonkottarathil/polycystic-ovary-syndrome-pcos",
            "rows": int(len(X)),
            "positive_cases": int(y.sum()),
            "negative_cases": int((y == 0).sum()),
        },
        "evaluation": {
            "method": "Stratified 80/20 holdout; trained on 12 key clinical features",
            "selection_note": "TensorFlow Dense Feedforward Neural Network classifier.",
            "test_rows": int(len(y_test)),
            "accuracy": float(accuracy_score(y_test, predicted)),
            "f1_score": float(f1_score(y_test, predicted)),
            "precision": float(precision_score(y_test, predicted, zero_division=0)),
            "recall": float(recall_score(y_test, predicted, zero_division=0)),
            "confusion_matrix": confusion_matrix(y_test, predicted).tolist(),
        },
        "features": list(FEATURES),
        "medical_notice": "Screening support only; this is not a medical diagnosis.",
    }

    # Save artifacts
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    model.save(MODEL_PATH)
    joblib.dump(imputer, IMPUTER_PATH)
    joblib.dump(scaler, SCALER_PATH)
    
    METRICS_PATH.write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    return metrics


if __name__ == "__main__":
    print(json.dumps(train(), indent=2))

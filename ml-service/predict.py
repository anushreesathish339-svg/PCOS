import joblib
import pandas as pd

# Load trained model
model = joblib.load("models/pcos_model.pkl")


def predict_pcos(data):

    df = pd.DataFrame([data])

    prediction = model.predict(df)[0]

    probability = model.predict_proba(df)[0][1]

    # Prediction
    if prediction == 1:

        result = "PCOS Detected"

        diet = [
            "Low Glycemic Index Diet",
            "Increase Fiber Intake",
            "Avoid Sugary Foods",
            "Eat More Vegetables"
        ]

        exercise = [
            "30 Minutes Walking",
            "Cycling",
            "Strength Training"
        ]

        yoga = [
            "Butterfly Pose",
            "Bridge Pose",
            "Cobra Pose"
        ]

        medical = [
            "Consult a Gynecologist",
            "Monitor Hormone Levels",
            "Regular Health Checkups"
        ]

    else:

        result = "No PCOS"

        diet = [
            "Maintain Balanced Diet",
            "Drink Plenty of Water",
            "Eat Fresh Fruits"
        ]

        exercise = [
            "Daily Walking",
            "Jogging",
            "Stretching"
        ]

        yoga = [
            "Surya Namaskar",
            "Tree Pose",
            "Child Pose"
        ]

        medical = [
            "Annual Health Checkup"
        ]

    return {

        "prediction": result,

        "probability": round(float(probability) * 100, 2),

        "diet": diet,

        "exercise": exercise,

        "yoga": yoga,

        "medical": medical

    }
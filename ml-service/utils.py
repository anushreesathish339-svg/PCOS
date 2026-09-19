import pandas as pd


# -----------------------------------------
# Calculate BMI
# -----------------------------------------
def calculate_bmi(weight, height):
    """
    Calculate BMI using weight (kg)
    and height (cm).
    """

    if height <= 0:
        return 0

    height = height / 100

    bmi = weight / (height * height)

    return round(bmi, 2)


# -----------------------------------------
# Validate Input Data
# -----------------------------------------
def validate_input(data):
    """
    Validate required input fields.
    Returns a list of missing fields.
    """

    required_fields = [

        "Age",
        "Weight",
        "Height",
        "BMI",
        "Cycle_Length",
        "LH",
        "FSH",
        "Testosterone",
        "Insulin",
        "AMH",
        "Body_Temperature",
        "Sexually_Active",
        "Contraceptive_Pills",
        "Breast_Tenderness",
        "Nipple_Soreness"

    ]

    missing_fields = []

    for field in required_fields:

        if field not in data:
            missing_fields.append(field)

        elif data[field] == "":
            missing_fields.append(field)

        elif data[field] is None:
            missing_fields.append(field)

    return missing_fields


# -----------------------------------------
# Convert JSON to DataFrame
# -----------------------------------------
def preprocess_input(data):
    """
    Convert JSON input into
    Pandas DataFrame.
    """

    df = pd.DataFrame([{

        "Age": float(data["Age"]),
        "Weight": float(data["Weight"]),
        "Height": float(data["Height"]),
        "BMI": float(data["BMI"]),
        "Cycle_Length": float(data["Cycle_Length"]),
        "LH": float(data["LH"]),
        "FSH": float(data["FSH"]),
        "Testosterone": float(data["Testosterone"]),
        "Insulin": float(data["Insulin"]),
        "AMH": float(data["AMH"]),
        "Body_Temperature": float(data["Body_Temperature"]),
        "Sexually_Active": int(data["Sexually_Active"]),
        "Contraceptive_Pills": int(data["Contraceptive_Pills"]),
        "Breast_Tenderness": int(data["Breast_Tenderness"]),
        "Nipple_Soreness": int(data["Nipple_Soreness"])

    }])

    return df


# -----------------------------------------
# Convert Prediction to Label
# -----------------------------------------
def prediction_label(value):
    """
    Convert numeric prediction
    into readable text.
    """

    if value == 1:
        return "PCOS Detected"

    return "No PCOS"
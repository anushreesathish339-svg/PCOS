import os
import sys

# Add parent folder to Python path
sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)

from predict import predict_pcos


sample_data = {

    "Age": 23,
    "Weight": 62,
    "Height": 160,
    "BMI": 24.2,
    "Cycle_Length": 36,

    "LH": 13,
    "FSH": 5,
    "Testosterone": 60,
    "Insulin": 20,
    "AMH": 7.5,

    "Body_Temperature": 98.6,

    "Sexually_Active": 1,

    "Contraceptive_Pills": 0,

    "Breast_Tenderness": 1,

    "Nipple_Soreness": 1

}

result = predict_pcos(sample_data)

print(result)
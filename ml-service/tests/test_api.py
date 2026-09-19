import requests


url = "http://127.0.0.1:5001/predict"

data = {

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

response = requests.post(

    url,

    json=data

)

print(response.json())
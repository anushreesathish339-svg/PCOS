from predict import predict_pcos

sample = {

    "Age": 22,
    "Weight": 60,
    "Height": 160,
    "BMI": 23.4,
    "Cycle_Length": 35,

    "LH": 12,
    "FSH": 5,
    "Testosterone": 65,
    "Insulin": 18,
    "AMH": 8.2,

    "Body_Temperature": 98.5,

    "Sexually_Active": 1,

    "Contraceptive_Pills": 0,

    "Breast_Tenderness": 1,

    "Nipple_Soreness": 1

}

result = predict_pcos(sample)

print("\n==========================")
print("PCOS Prediction Result")
print("==========================")

print(f"Prediction : {result['prediction']}")
print(f"Probability: {result['probability']} %")

print("\nDiet Recommendations")
for item in result["diet"]:
    print("•", item)

print("\nExercise Recommendations")
for item in result["exercise"]:
    print("•", item)

print("\nYoga Recommendations")
for item in result["yoga"]:
    print("•", item)

print("\nMedical Recommendations")
for item in result["medical"]:
    print("•", item)
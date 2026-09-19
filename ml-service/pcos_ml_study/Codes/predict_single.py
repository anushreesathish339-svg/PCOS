import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.impute import SimpleImputer
import numpy as np
import warnings

# Suppress sklearn feature names warning
warnings.filterwarnings("ignore", category=UserWarning)

# 1. Load and train the model on the cleaned study dataset
print("Loading dataset...")
df = pd.read_csv('../Dataset/clean_data.csv')

# Drop any unneeded columns
if 'Unnamed: 44' in df.columns:
    df = df.drop(columns=['Unnamed: 44'])

X = df.drop(columns=['PCOS (Y/N)'])
y = df['PCOS (Y/N)']

imputer = SimpleImputer(strategy='median')
X_imputed = imputer.fit_transform(X)

# Train a decision tree model
model = DecisionTreeClassifier(max_depth=5, random_state=42)
model.fit(X_imputed, y)
print("Decision Tree Model trained successfully!\n")

# Map patient data keys to clean_data.csv column names
column_mapping = {
    'Age': [c for c in X.columns if 'Age' in c][0],
    'Weight': [c for c in X.columns if 'Weight' in c][0],
    'Height': [c for c in X.columns if 'Height' in c][0],
    'BMI': [c for c in X.columns if 'BMI' in c][0],
    'Cycle_Length': [c for c in X.columns if 'Cycle length' in c][0],
    'LH': [c for c in X.columns if 'LH' in c][0],
    'FSH': [c for c in X.columns if 'FSH' in c][0],
    'AMH': [c for c in X.columns if 'AMH' in c][0],
    'Cycle_Regularity': [c for c in X.columns if 'Cycle' in c][0],
    'Weight_Gain': [c for c in X.columns if 'Weight gain' in c][0],
    'Hair_Loss': [c for c in X.columns if 'Hair loss' in c][0],
    'Acne': [c for c in X.columns if 'Pimples' in c or 'Acne' in c][0],
    'Follicle_L': [c for c in X.columns if 'Follicle No. (L)' in c][0],
    'Follicle_R': [c for c in X.columns if 'Follicle No. (R)' in c][0],
}

# 2. Define two dummy patient profiles for testing
# Patient A: Normal clinical parameters (Regular cycles, low AMH, normal weight, low follicle counts)
patient_a_data = {
    'Age': 24, 'Weight': 54, 'Height': 162, 'BMI': 20.5, 'Cycle_Length': 28, 
    'LH': 3.2, 'FSH': 3.5, 'AMH': 2.1, 'Cycle_Regularity': 2, 
    'Weight_Gain': 0, 'Hair_Loss': 0, 'Acne': 0,
    'Follicle_L': 4, 'Follicle_R': 5
}

# Patient B: High-risk clinical parameters (Irregular cycles, high AMH, acne, weight gain, high follicle counts)
patient_b_data = {
    'Age': 28, 'Weight': 82, 'Height': 160, 'BMI': 32.0, 'Cycle_Length': 45, 
    'LH': 9.5, 'FSH': 4.1, 'AMH': 7.2, 'Cycle_Regularity': 4, 
    'Weight_Gain': 1, 'Hair_Loss': 1, 'Acne': 1,
    'Follicle_L': 15, 'Follicle_R': 16
}

# Fill in any remaining features from the dataset with column medians
columns = list(X.columns)
medians = np.nanmedian(X_imputed, axis=0)
medians_dict = dict(zip(columns, medians))

def prepare_patient_row(custom_data):
    row_dict = medians_dict.copy()
    for k, v in custom_data.items():
        if k in column_mapping:
            real_column_name = column_mapping[k]
            row_dict[real_column_name] = v
    return pd.DataFrame([row_dict], columns=columns)

# Prepare inputs
row_a = prepare_patient_row(patient_a_data)
row_b = prepare_patient_row(patient_b_data)

# 3. Run predictions
pred_a = model.predict(row_a)[0]
prob_a = model.predict_proba(row_a)[0][1]

pred_b = model.predict(row_b)[0]
prob_b = model.predict_proba(row_b)[0][1]

# 4. Print detailed analysis results
print("=" * 60)
print("TESTING PATIENT A (Normal parameters: Regular cycle, low AMH, 4-5 follicles)")
print(f"Prediction Output Class: {pred_a}")
print(f"Risk Probability: {prob_a * 100:.1f}%")
if pred_a == 0:
    print("Result: No PCOS (Healthy / Low Risk)")
else:
    print("Result: PCOS Risk Detected")
print("=" * 60)

print("\n" + "=" * 60)
print("TESTING PATIENT B (High-risk parameters: Irregular cycle, high AMH, 15-16 follicles)")
print(f"Prediction Output Class: {pred_b}")
print(f"Risk Probability: {prob_b * 100:.1f}%")
if pred_b == 0:
    print("Result: No PCOS (Healthy / Low Risk)")
else:
    print("Result: PCOS Risk Detected")
print("=" * 60)

import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load Dataset
dataset = pd.read_csv("dataset/pcos_dataset.csv")

print("Dataset Loaded Successfully")
print(dataset.head())

# Features
X = dataset.drop("PCOS", axis=1)

# Target
y = dataset["PCOS"]

# Train Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Model
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

# Train
model.fit(X_train, y_train)

# Prediction
predictions = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, predictions)

print("Accuracy :", accuracy)

# Save Model
joblib.dump(model, "models/pcos_model.pkl")

print("Model Saved Successfully")
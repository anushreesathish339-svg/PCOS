import pandas as pd
import numpy as np

# Load dataset
df = pd.read_csv('../Dataset/allData.csv')
print("Initial Dataset Shape:", df.shape)

# Clean column names
df.columns = [c.strip() for c in df.columns]

# Drop redundant or non-numerical columns if any
if 'Sl. No' in df.columns:
    df.drop(columns=['Sl. No'], inplace=True)
if 'Patient File No.' in df.columns:
    df.drop(columns=['Patient File No.'], inplace=True)

# Save intermediate clean data
df.to_csv('../Dataset/clean_data.csv', index=False)
print("Data saved to clean_data.csv successfully!")

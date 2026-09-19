import pandas as pd

# Load cleaned dataset
df = pd.read_csv('../Dataset/clean_data.csv')

# Split based on PCOS target
pcos_yes = df[df['PCOS (Y/N)'] == 1]
pcos_no = df[df['PCOS (Y/N)'] == 0]

# Save split files
pcos_yes.to_csv('../Dataset/OnlyPCOS.csv', index=False)
pcos_no.to_csv('../Dataset/NoPCOS.csv', index=False)

print(f"OnlyPCOS shape: {pcos_yes.shape}")
print(f"NoPCOS shape: {pcos_no.shape}")
print("Split datasets created successfully!")

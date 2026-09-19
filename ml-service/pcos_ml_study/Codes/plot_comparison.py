import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score
import warnings

# Suppress warnings
warnings.filterwarnings("ignore")

# 1. Load the cleaned dataset
print("Loading clean dataset...")
df = pd.read_csv('../Dataset/clean_data.csv')

# Drop helper columns if present
if 'Unnamed: 44' in df.columns:
    df = df.drop(columns=['Unnamed: 44'])

X = df.drop(columns=['PCOS (Y/N)'])
y = df['PCOS (Y/N)']

# Impute missing values
imputer = SimpleImputer(strategy='median')
X_imputed = imputer.fit_transform(X)

# Split into Train and Test sets (80/20 split)
X_train, X_test, y_train, y_test = train_test_split(
    X_imputed, y, test_size=0.2, random_state=42
)

# 2. Define and train models
models = {
    'Decision Tree': DecisionTreeClassifier(max_depth=5, random_state=42),
    'K-Nearest Neighbors': KNeighborsClassifier(n_neighbors=5),
    'Logistic Regression': LogisticRegression(max_iter=1000, random_state=42),
    'Naive Bayes': GaussianNB()
}

accuracies = {}

print("Training models and calculating accuracies...")
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred) * 100
    accuracies[name] = acc
    print(f" - {name} Accuracy: {acc:.2f}%")

# 3. Plot the comparison chart using Seaborn & Matplotlib
sns.set_theme(style="whitegrid")
plt.figure(figsize=(10, 6))

# Convert to DataFrame for Seaborn compatibility
df_plot = pd.DataFrame({
    'Algorithm': list(accuracies.keys()),
    'Accuracy (%)': list(accuracies.values())
})

# Draw the Seaborn barplot
ax = sns.barplot(
    x='Algorithm', 
    y='Accuracy (%)', 
    data=df_plot, 
    hue='Algorithm', 
    palette='flare', 
    edgecolor='black', 
    linewidth=0.8,
    legend=False
)

# Customize title and labels
plt.title('PCOS Detection Accuracy Comparison (Seaborn)', fontsize=16, fontweight='bold', pad=20, color='#433050')
plt.xlabel('Machine Learning Algorithm', fontsize=12, fontweight='bold', labelpad=12, color='#433050')
plt.ylabel('Validation Accuracy (%)', fontsize=12, fontweight='bold', labelpad=12, color='#433050')
plt.ylim(0, 100)

# Annotate accuracy values on top of each bar
for p in ax.patches:
    height = p.get_height()
    if height > 0:
        ax.annotate(
            f'{height:.2f}%',
            (p.get_x() + p.get_width() / 2.0, height + 1.5),
            ha='center',
            va='bottom',
            fontsize=11,
            fontweight='bold',
            color='#433050'
        )

# Adjust layout to prevent clipping
plt.tight_layout()

# Save the plot image
image_path = 'accuracy_comparison.png'
plt.savefig(image_path, dpi=300)
print(f"\nGraph saved successfully as '{image_path}'!")

# Display the plot window (handles headless systems gracefully)
print("Opening display window... Close the plot window to finish script.")
try:
    plt.show()
except Exception:
    print("Non-interactive terminal detected. Interactive window skipped.")

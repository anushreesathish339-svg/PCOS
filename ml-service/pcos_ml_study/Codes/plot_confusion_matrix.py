import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

# 1. Define the actual confusion matrix from the Decision Tree evaluation
# [[True Negatives, False Positives],
#  [False Negatives, True Positives]]
cm = np.array([[66, 11], 
               [8, 24]])

# Set up the plot theme
sns.set_theme(style="white")
plt.figure(figsize=(7, 6))

# Plot confusion matrix using Seaborn heatmap
sns.heatmap(
    cm, 
    annot=True, 
    fmt='d', 
    cmap='Blues', 
    linewidths=2, 
    linecolor='white',
    cbar=True,
    xticklabels=['Predicted Healthy', 'Predicted PCOS'],
    yticklabels=['Actual Healthy', 'Actual PCOS'],
    annot_kws={"fontsize": 14, "fontweight": "bold", "color": "black"}
)

# Customize title and label spacing
plt.title('Decision Tree Confusion Matrix Heatmap', fontsize=14, fontweight='bold', pad=20, color='#433050')
plt.ylabel('Actual Clinical Diagnosis', fontsize=11, fontweight='semibold', labelpad=10, color='#433050')
plt.xlabel('Model Predicted Classification', fontsize=11, fontweight='semibold', labelpad=10, color='#433050')

# Rotate tick labels for clean reading
plt.xticks(rotation=15)
plt.yticks(rotation=0)

plt.tight_layout()

# Save the plot in the study codes folder
codes_image_path = 'confusion_matrix.png'
plt.savefig(codes_image_path, dpi=300)
print(f"Confusion Matrix saved to study codes: '{codes_image_path}'")

# Save directly to React public folder for Web App display
react_public_dir = r"c:\Users\anush\client\public"
if os.path.exists(react_public_dir):
    react_image_path = os.path.join(react_public_dir, 'confusion_matrix.png')
    plt.savefig(react_image_path, dpi=300)
    print(f"Confusion Matrix saved to React public folder: '{react_image_path}'")

# Open interactive display window
print("Opening display window... Close the plot window to finish script.")
try:
    plt.show()
except Exception:
    print("Non-interactive terminal detected. Interactive window skipped.")

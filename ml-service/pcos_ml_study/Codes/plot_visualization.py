import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import warnings

# Suppress warnings
warnings.filterwarnings("ignore")

# 1. Load the cleaned dataset
print("Loading clean dataset...")
df = pd.read_csv('../Dataset/clean_data.csv')

# Define features shown in the visualization screenshot
features = [
    ('PRL(ng/mL)', 'PRL(ng/mL)'),
    ('FSH/LH', 'FSH/LH'),
    ('II    beta-HCG(mIU/mL)', 'II beta-HCG(mIU/mL)'),
    ('I   beta-HCG(mIU/mL)', 'I beta-HCG(mIU/mL)'),
    ('BP _Diastolic (mmHg)', 'BP_Diastolic (mmHg)'),
    ('BP _Systolic (mmHg)', 'BP_Systolic (mmHg)')
]

# Set Seaborn theme
sns.set_theme(style="whitegrid")

# Create a 3x2 grid of subplots
fig, axes = plt.subplots(3, 2, figsize=(14, 15))
axes = axes.flatten()

print("Generating Kernel Density Estimate (KDE) plots...")
for i, (col, display_name) in enumerate(features):
    ax = axes[i]
    if col in df.columns:
        # Plot KDE curves split by PCOS (Y/N)
        sns.kdeplot(
            data=df, 
            x=col, 
            hue='PCOS (Y/N)', 
            palette={0: '#4a90e2', 1: '#f5a623'},
            fill=False, 
            common_norm=False, 
            linewidth=2.5, 
            ax=ax
        )
        
        # Style subplot
        ax.set_title(f'{display_name} Distribution by PCOS Status', fontsize=12, fontweight='bold', pad=10)
        ax.set_xlabel(display_name, fontsize=10, fontweight='semibold')
        ax.set_ylabel('Density', fontsize=10, fontweight='semibold')
        
        # Fix legend labels (0 -> No PCOS, 1 -> PCOS)
        legend = ax.get_legend()
        if legend:
            legend.set_title('PCOS (Y/N)')
            for text in legend.get_texts():
                if text.get_text() == '0':
                    text.set_text('0 (No PCOS)')
                elif text.get_text() == '1':
                    text.set_text('1 (PCOS)')
    else:
        ax.text(0.5, 0.5, f"Feature '{col}' not found", ha='center', va='center', color='red')

# Adjust layout to fit titles and labels cleanly
plt.tight_layout(pad=3.0)

# Save visualization graph
output_image_path = 'index.png'
plt.savefig(output_image_path, dpi=300)
print(f"\nVisualization graph saved successfully as '{output_image_path}'!")

# Open display window
print("Opening display window... Close the plot window to finish script.")
try:
    plt.show()
except Exception:
    print("Non-interactive terminal detected. Interactive window skipped.")

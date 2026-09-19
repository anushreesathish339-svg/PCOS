import os
import pandas as pd
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend for server environments
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Load clean dataset path
DATASET_PATH = r"c:\Users\anush\ml-service\pcos_ml_study\Dataset\clean_data.csv"
OUTPUT_PATH = r"c:\Users\anush\client\public\user_analysis.png"

def generate_user_analysis_plot(user_inputs):
    """
    Generates a 2x2 grid of KDE plots for:
    1. AMH (ng/mL)
    2. LH/FSH Ratio
    3. BMI
    4. Cycle length (days)
    And plots a red vertical line indicating where the user's value lies.
    """
    if not os.path.exists(DATASET_PATH):
        print(f"Error: Dataset not found at {DATASET_PATH}")
        return False
        
    try:
        # Load dataset
        df = pd.read_csv(DATASET_PATH)
        
        # Calculate LH/FSH ratio in dataset
        lh_col = [c for c in df.columns if 'LH' in c][0]
        fsh_col = [c for c in df.columns if 'FSH' in c][0]
        df['LH/FSH Ratio'] = df[lh_col] / np.where(df[fsh_col] > 0, df[fsh_col], 1.0)
        
        # Map dataset columns
        amh_col = [c for c in df.columns if 'AMH' in c][0]
        bmi_col = [c for c in df.columns if 'BMI' in c][0]
        cycle_col = [c for c in df.columns if 'Cycle length' in c][0]
        
        # Parse user inputs
        user_amh = float(user_inputs.get('AMH', 0))
        user_lh = float(user_inputs.get('LH', 0))
        user_fsh = float(user_inputs.get('FSH', 1.0))
        user_lh_fsh = user_lh / (user_fsh if user_fsh > 0 else 1.0)
        user_bmi = float(user_inputs.get('BMI', 0))
        user_cycle = float(user_inputs.get('Cycle_Length', 0))
        
        # Configure plotting canvas
        sns.set_theme(style="whitegrid")
        fig, axes = plt.subplots(2, 2, figsize=(10, 8))
        axes = axes.flatten()
        
        # Subplot 1: AMH
        sns.kdeplot(data=df, x=amh_col, hue='PCOS (Y/N)', palette={0: '#4a90e2', 1: '#f5a623'}, 
                    fill=True, alpha=0.15, common_norm=False, linewidth=2, ax=axes[0])
        axes[0].axvline(user_amh, color='#d32f2f', linestyle='--', linewidth=2.5, label=f'Your AMH: {user_amh:.1f}')
        axes[0].set_title('AMH (ng/mL) Distribution', fontsize=11, fontweight='bold')
        axes[0].set_xlabel('AMH (ng/mL)')
        axes[0].set_xlim(0, 15)
        axes[0].legend(fontsize=8)
        
        # Subplot 2: LH/FSH Ratio
        sns.kdeplot(data=df, x='LH/FSH Ratio', hue='PCOS (Y/N)', palette={0: '#4a90e2', 1: '#f5a623'}, 
                    fill=True, alpha=0.15, common_norm=False, linewidth=2, ax=axes[1])
        axes[1].axvline(user_lh_fsh, color='#d32f2f', linestyle='--', linewidth=2.5, label=f'Your Ratio: {user_lh_fsh:.1f}')
        axes[1].set_title('LH / FSH Ratio Distribution', fontsize=11, fontweight='bold')
        axes[1].set_xlabel('LH / FSH Ratio')
        axes[1].set_xlim(0, 5)
        axes[1].legend(fontsize=8)
        
        # Subplot 3: BMI
        sns.kdeplot(data=df, x=bmi_col, hue='PCOS (Y/N)', palette={0: '#4a90e2', 1: '#f5a623'}, 
                    fill=True, alpha=0.15, common_norm=False, linewidth=2, ax=axes[2])
        axes[2].axvline(user_bmi, color='#d32f2f', linestyle='--', linewidth=2.5, label=f'Your BMI: {user_bmi:.1f}')
        axes[2].set_title('BMI Distribution', fontsize=11, fontweight='bold')
        axes[2].set_xlabel('BMI (Body Mass Index)')
        axes[2].set_xlim(10, 45)
        axes[2].legend(fontsize=8)
        
        # Subplot 4: Cycle Length
        sns.kdeplot(data=df, x=cycle_col, hue='PCOS (Y/N)', palette={0: '#4a90e2', 1: '#f5a623'}, 
                    fill=True, alpha=0.15, common_norm=False, linewidth=2, ax=axes[3])
        axes[3].axvline(user_cycle, color='#d32f2f', linestyle='--', linewidth=2.5, label=f'Your Cycle: {user_cycle:.0f} days')
        axes[3].set_title('Cycle Length Distribution', fontsize=11, fontweight='bold')
        axes[3].set_xlabel('Cycle Length (days)')
        axes[3].set_xlim(15, 60)
        axes[3].legend(fontsize=8)
        
        # Style legend keys
        for ax in axes:
            legend = ax.get_legend()
            if legend:
                # Filter out the custom vertical line label
                handles, labels = ax.get_legend_handles_labels()
                new_labels = []
                for label in labels:
                    if label == '0':
                        new_labels.append('Healthy (0)')
                    elif label == '1':
                        new_labels.append('PCOS (1)')
                    else:
                        new_labels.append(label)
                # Re-apply modified legend
                ax.legend(handles, new_labels, fontsize=8)
                
        plt.tight_layout()
        
        # Save output image
        os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
        plt.savefig(OUTPUT_PATH, dpi=300)
        plt.close()
        print(f"Generated user analysis plot successfully at {OUTPUT_PATH}")
        return True
    except Exception as e:
        print(f"Error generating user analysis plot: {e}")
        return False

# PCOS Machine Learning Classification Project

This study folder provides a complete pipeline to analyze, clean, and run multiple Machine Learning models to predict Polycystic Ovary Syndrome (PCOS).

## Directory Structure
* **Dataset/**: Contains raw (`allData.csv`, `results.xlsx`), cleaned (`clean_data.csv`), and target-split subsets (`OnlyPCOS.csv`, `NoPCOS.csv`).
* **Codes/**: Preprocessing, splitting, and benchmarking scripts (Decision Tree, KNN, Logistic Regression, Naive Bayes).
* **Final Model - Best Accuracy/**: Contains `final_decisiontree.py` which represents the highest performing individual classifier.

## How to Run
1. Open terminal in the `Codes` directory.
2. Execute data cleaning scripts to construct split views:
   ```bash
   python datacleaning1.py
   python datacleaning2.py
   ```
3. Run model benchmarks:
   ```bash
   python decisiontree.py
   python knnprediction.py
   python logisticregression.py
   python naivebayesprediction.py
   ```

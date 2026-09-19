# PCOS prediction service

This service trains on the public 541-patient PCOS dataset. It compares
logistic regression and random forest using stratified five-fold F1 score,
then reports accuracy, F1, precision, recall, and a confusion matrix on a
separate stratified 20% test set.

```powershell
pip install -r ml/requirements.txt
python ml/train.py
python ml/app.py
```

Run tests after training:

```powershell
python -m unittest discover -s ml -p "test_*.py"
```

The input comes from the user's profile, latest cycle, latest lab report, and
latest symptom record. The endpoint is a screening aid, not a diagnosis. Testosterone and insulin
remain stored as contextual lab values but are not model inputs because the
training dataset does not contain those columns.

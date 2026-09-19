import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "pcos_model.pkl"
)

DATASET_PATH = os.path.join(
    BASE_DIR,
    "dataset",
    "pcos_dataset.csv"
)

HOST = "127.0.0.1"

PORT = 5001

DEBUG = True
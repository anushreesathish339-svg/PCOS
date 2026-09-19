from flask import Flask, request, jsonify
from flask_cors import CORS

from predict import predict_pcos
from utils import validate_input
from config import HOST, PORT, DEBUG
from visualize import generate_user_analysis_plot

app = Flask(__name__)

CORS(app)


# -----------------------------------------
# Home Route
# -----------------------------------------
@app.route("/")
def home():

    return jsonify({

        "success": True,

        "message": "Intelligent PCOS Management ML Service Running"

    })


# -----------------------------------------
# Health Check Route
# -----------------------------------------
@app.route("/health")
def health():

    return jsonify({

        "status": "Running",

        "service": "PCOS ML API"

    })


# -----------------------------------------
# Prediction Route
# -----------------------------------------
@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        missing = validate_input(data)

        if len(missing) > 0:

            return jsonify({

                "success": False,

                "message": "Missing Required Fields",

                "missing_fields": missing

            }), 400

        result = predict_pcos(data)
        
        # Dynamically generate comparison density curves showing user's values
        generate_user_analysis_plot(data)

        return jsonify({

            "success": True,

            "prediction": result["prediction"],

            "probability": result["probability"],

            "diet": result["diet"],

            "exercise": result["exercise"],

            "yoga": result["yoga"],

            "medical": result["medical"]

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500


# -----------------------------------------
# Run Flask
# -----------------------------------------
if __name__ == "__main__":

    app.run(

        host=HOST,

        port=PORT,

        debug=DEBUG

    )
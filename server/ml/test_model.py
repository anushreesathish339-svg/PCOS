import unittest

from app import FEATURES, app


class PredictionApiTest(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_health(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.get_json()["modelReady"])

    def test_predict_returns_probability_and_metrics(self):
        payload = {
            "Age": 28,
            "Weight": 68,
            "Height": 160,
            "BMI": 26.56,
            "Cycle_Length": 35,
            "LH": 9.5,
            "FSH": 5.1,
            "AMH": 6.2,
            "Cycle_Regularity": 4,
            "Weight_Gain": 1,
            "Hair_Loss": 1,
            "Acne": 1,
        }
        response = self.client.post("/predict", json=payload)
        body = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(body["probability"], 0)
        self.assertLessEqual(body["probability"], 1)
        self.assertIn("accuracy", body["modelMetrics"])
        self.assertIn("f1_score", body["modelMetrics"])

    def test_missing_fields_are_reported(self):
        response = self.client.post("/predict", json={"Age": 30})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(set(response.get_json()["missing"]), set(FEATURES) - {"Age"})


if __name__ == "__main__":
    unittest.main()

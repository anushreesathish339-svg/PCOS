"""
Personalized Recommendation System
for Intelligent PCOS Management Platform
"""


def get_recommendations(prediction):

    if prediction == 1:

        return {

            "diet": [

                "Follow a Low Glycemic Index (Low GI) Diet",

                "Eat Whole Grains and High Fiber Foods",

                "Increase Green Leafy Vegetables",

                "Reduce Sugar and Processed Foods",

                "Drink 2-3 Liters of Water Daily"

            ],

            "exercise": [

                "Walk for 30 Minutes Daily",

                "Perform Strength Training 3 Times per Week",

                "Maintain Healthy Body Weight"

            ],

            "yoga": [

                "Butterfly Pose (Baddha Konasana)",

                "Cobra Pose (Bhujangasana)",

                "Bridge Pose (Setu Bandhasana)",

                "Child's Pose (Balasana)",

                "Surya Namaskar"

            ],

            "medical": [

                "Consult a Gynecologist",

                "Monitor Hormone Levels",

                "Regular Blood Sugar Checkup",

                "Track Menstrual Cycle",

                "Take Medicines Only if Prescribed"

            ]

        }

    else:

        return {

            "diet": [

                "Maintain a Balanced Diet",

                "Eat Fruits Daily",

                "Include Protein-rich Foods",

                "Drink Plenty of Water"

            ],

            "exercise": [

                "Exercise 30 Minutes Daily",

                "Walking or Cycling",

                "Maintain Healthy BMI"

            ],

            "yoga": [

                "Meditation",

                "Surya Namaskar",

                "Tree Pose"

            ],

            "medical": [

                "Annual Health Check-up",

                "Maintain Healthy Lifestyle"

            ]

        }
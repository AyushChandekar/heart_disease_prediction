from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

# Use relative path instead of hardcoded absolute path
MODEL_PATH = os.path.join(os.path.dirname(__file__), "xgboost_heart_model.pkl")
with open(MODEL_PATH, 'rb') as model_file:
    model = pickle.load(model_file)

app = Flask(__name__)
CORS(app)

def get_health_advice(risk_level, risk_percentage):
    """
    Provides health advice based on heart disease risk level
    """
    if risk_level == "high":
        exercise_advice = [
            "Start with low-intensity activities like walking 10-15 minutes daily",
            "Gradually increase to 150 minutes of moderate aerobic activity weekly",
            "Consider cardiac rehabilitation programs under medical supervision",
            "Include light strength training twice weekly after consulting your doctor"
        ]
        diet_advice = [
            "Follow a DASH or Mediterranean diet rich in fruits, vegetables, and whole grains",
            "Limit sodium to less than 1,500mg daily",
            "Avoid processed foods, saturated fats, and trans fats",
            "Consider consulting with a registered dietitian",
            "Limit alcohol consumption significantly"
        ]
        lifestyle_advice = [
            "Quit smoking and avoid secondhand smoke",
            "Monitor blood pressure, cholesterol, and blood sugar regularly",
            "Take prescribed medications consistently",
            "Manage stress through meditation, yoga, or counseling",
            "Get 7-8 hours of quality sleep nightly",
            "Consult your doctor before beginning any new exercise program"
        ]
    elif risk_level == "moderate":
        exercise_advice = [
            "Aim for 150 minutes of moderate-intensity aerobic activity weekly",
            "Include muscle-strengthening activities 2-3 days per week",
            "Try activities like brisk walking, swimming, or cycling",
            "Incorporate active hobbies like gardening or dancing"
        ]
        diet_advice = [
            "Increase intake of fruits, vegetables, whole grains, and lean proteins",
            "Limit sodium to less than 2,300mg daily",
            "Choose low-fat dairy products",
            "Include heart-healthy fats like olive oil, nuts, and avocados",
            "Moderate alcohol consumption (1 drink/day for women, 2 for men)"
        ]
        lifestyle_advice = [
            "Maintain a healthy weight",
            "If you smoke, develop a cessation plan",
            "Check blood pressure and cholesterol regularly",
            "Practice stress-reduction techniques",
            "Get 7-8 hours of quality sleep nightly"
        ]
    else:  # low risk
        exercise_advice = [
            "Maintain 150-300 minutes of moderate aerobic activity weekly",
            "Include strength training 2-3 days per week",
            "Stay active throughout the day, take walking breaks",
            "Try varied activities to keep exercise enjoyable"
        ]
        diet_advice = [
            "Continue a balanced diet with plenty of fruits, vegetables, and whole grains",
            "Choose lean proteins and low-fat dairy",
            "Limit added sugars and refined carbohydrates",
            "Stay hydrated with water as your primary beverage",
            "Practice portion control"
        ]
        lifestyle_advice = [
            "Maintain regular health check-ups",
            "Continue to avoid tobacco products",
            "Limit alcohol consumption",
            "Practice regular stress management",
            "Maintain healthy sleep habits"
        ]

    return {
        "exercise_recommendations": exercise_advice,
        "diet_recommendations": diet_advice,
        "lifestyle_recommendations": lifestyle_advice,
        "general_note": "These recommendations are based on guidelines from the American Heart Association and other health authorities. Always consult with healthcare professionals before making significant changes to your diet, exercise routine, or medication."
    }

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = [
            float(data['age']),
            float(data['sex']),
            float(data['chestPainType']),
            float(data['restingBP']),
            float(data['cholesterol']),
            float(data['fastingBS']),
            float(data['restingECG']),
            float(data['maxHR']),
            float(data['exerciseAngina']),
            float(data['stDepression']),
            float(data['stSlope']),
            float(data['majorVessels']),
            float(data['thalassemia'])
        ]
        prediction = model.predict([features])[0]
        probability = model.predict_proba([features])[0][1]
        risk_percentage = round(probability * 100, 2)
        
        # Determine risk level
        if risk_percentage > 70:
            risk_level = "high"
        elif risk_percentage > 40:
            risk_level = "moderate"
        else:
            risk_level = "low"
            
        # Get health advice based on risk level
        health_advice = get_health_advice(risk_level, risk_percentage)

        return jsonify({
            'prediction': int(prediction),
            'probability': risk_percentage,
            'risk_level': risk_level,
            'health_advice': health_advice
        })
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)

import React from 'react'
import Link from 'next/link'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Learn how to use HridayVani and understand the health parameters</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            &larr; Back to Home
          </Link>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Use HridayVani</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800">For Patients:</h3>
              <p className="text-gray-600 mt-2">
                1. Fill in your health parameters in the form on the home page.<br />
                2. Ensure all fields are completed with your most recent health data.<br />
                3. Click the "Predict" button to receive an assessment of your heart health risk.<br />
                4. Review the results with a healthcare professional for proper interpretation.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">For Healthcare Providers:</h3>
              <p className="text-gray-600 mt-2">
                1. Guide your patients through the input form, ensuring accurate data entry.<br />
                2. Use the prediction results as a supplementary tool alongside clinical judgment.<br />
                3. Explain the meaning of different parameters to help patients understand their health status.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Important Notes:</h3>
              <p className="text-gray-600 mt-2">
                - HridayVani is a screening tool and not a replacement for professional medical advice.<br />
                - Always consult with a healthcare provider regarding your heart health concerns.<br />
                - Regular check-ups and monitoring of heart health parameters are essential.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Health Parameters</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Age</h3>
              <p className="text-gray-600 mt-1">
                Your current age in years. Age is a significant risk factor for heart disease, with risk increasing as you get older.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Sex</h3>
              <p className="text-gray-600 mt-1">
                <strong>1: Male, 0: Female</strong><br />
                Biological sex is a factor in heart disease risk assessment. Men generally have a higher risk of heart disease than women, though women's risk increases after menopause.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Chest Pain Type (0-3)</h3>
              <p className="text-gray-600 mt-1">
                <strong>0:</strong> Typical Angina - Chest pain related to decreased blood flow to the heart<br />
                <strong>1:</strong> Atypical Angina - Chest pain not related to the heart<br />
                <strong>2:</strong> Non-Anginal Pain - Chest pain not related to angina<br />
                <strong>3:</strong> Asymptomatic - No chest pain
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Resting Blood Pressure</h3>
              <p className="text-gray-600 mt-1">
                Your blood pressure (in mm Hg) when you are at rest. Normal range is typically below 120/80 mm Hg. High blood pressure is a major risk factor for heart disease.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Cholesterol Level</h3>
              <p className="text-gray-600 mt-1">
                The amount of cholesterol in your blood (in mg/dl). High cholesterol contributes to plaque buildup in arteries, increasing heart disease risk. Desirable total cholesterol is less than 200 mg/dL.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Fasting Blood Sugar</h3>
              <p className="text-gray-600 mt-1">
                <strong>1:</strong> Blood sugar level greater than 120 mg/dl<br />
                <strong>0:</strong> Blood sugar level less than or equal to 120 mg/dl<br />
                High blood sugar levels can indicate diabetes, which significantly increases heart disease risk.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Resting ECG Results (0-2)</h3>
              <p className="text-gray-600 mt-1">
                <strong>0:</strong> Normal - No abnormalities in heart electrical activity<br />
                <strong>1:</strong> ST-T Wave Abnormality - Indicates non-specific changes in the ST-T wave<br />
                <strong>2:</strong> Left Ventricular Hypertrophy - Shows probable or definite left ventricular enlargement
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Maximum Heart Rate Achieved</h3>
              <p className="text-gray-600 mt-1">
                The highest heart rate reached during exercise. A lower than expected maximum heart rate may indicate reduced heart function or cardiovascular fitness.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Exercise Induced Angina</h3>
              <p className="text-gray-600 mt-1">
                <strong>1:</strong> Yes - Chest pain occurred during exercise<br />
                <strong>0:</strong> No - No chest pain during exercise<br />
                Exercise-induced chest pain can indicate coronary artery disease.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">ST Depression Induced by Exercise</h3>
              <p className="text-gray-600 mt-1">
                The decrease in ST segment on ECG during exercise compared to at rest. Higher values can indicate heart stress during physical activity.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Slope of the Peak Exercise ST Segment (0-2)</h3>
              <p className="text-gray-600 mt-1">
                <strong>0:</strong> Upsloping - Gradual incline of ST segment during exercise<br />
                <strong>1:</strong> Flat - ST segment remains level during exercise<br />
                <strong>2:</strong> Downsloping - ST segment curves downward during exercise<br />
                The downsloping pattern is associated with higher risk of coronary artery disease.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Number of Major Vessels (0-3)</h3>
              <p className="text-gray-600 mt-1">
                The number of major blood vessels (0-3) colored by fluoroscopy that show narrowing. More affected vessels indicate more extensive coronary heart disease.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800">Thalassemia</h3>
              <p className="text-gray-600 mt-1">
                <strong>3:</strong> Normal blood flow<br />
                <strong>6:</strong> Fixed Defect - Permanent abnormality in blood flow<br />
                <strong>7:</strong> Reversible Defect - Temporary abnormality in blood flow<br />
                Thalassemia refers to blood disorders affecting hemoglobin production. Abnormal blood flow patterns can indicate heart muscle damage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
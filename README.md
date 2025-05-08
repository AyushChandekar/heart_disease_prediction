# HridayVani - Heart Disease Prediction Application

HridayVani is a web application that uses machine learning to predict heart disease risk based on health metrics. It provides personalized recommendations for exercise, diet, and lifestyle changes based on the risk assessment.

## Features

- Heart disease risk prediction using a trained XGBoost model
- Interactive UI with form validation
- Detailed risk assessment with percentage probability
- Personalized health recommendations based on risk level
- Responsive design that works on mobile and desktop

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Flask (Python)
- **Machine Learning**: XGBoost

## Directory Structure

```
├── app/                        # Next.js app directory
│   ├── page.tsx                # Main page component
│   ├── layout.tsx              # Root layout component
│   └── globals.css             # Global styles
├── components/                 # React components
│   ├── heart-disease-form.tsx  # Heart disease form component
│   ├── theme-provider.tsx      # Theme provider component
│   └── ui/                     # UI components library
├── api-backend/                # Flask backend API
│   ├── app.py                  # Flask application
│   └── xgboost_heart_model.pkl # Trained ML model
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.6 or higher)
- npm or pnpm (package manager)

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Backend Setup

1. Navigate to the api-backend directory:
   ```bash
   cd api-backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # Activate on Windows
   venv\Scripts\activate
   # Activate on macOS/Linux
   source venv/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install flask flask-cors scikit-learn xgboost numpy pandas
   ```

4. Run the Flask application:
   ```bash
   python app.py
   ```

The API server will run on [http://localhost:5000](http://localhost:5000).

## Usage

1. Make sure both the frontend (Next.js) and backend (Flask) servers are running.
2. Fill in the form with your health metrics.
3. Submit the form to get your heart disease risk assessment.
4. Review the personalized recommendations for exercise, diet, and lifestyle changes.

## Important Note

This application is for educational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for proper evaluation and advice regarding heart health.

## Developers

- Ayush Chandekar
- Raunak Singh
- Shubham Pawade
- Khusboo Meshram 
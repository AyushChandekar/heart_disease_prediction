import { Suspense } from "react"
import Image from "next/image"
import HeartDiseaseForm from "@/components/heart-disease-form"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/placeholder.png?height=50&width=50"
                alt="Heart Health Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
              HridayVani
            </h1>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <a href="#Home" className="text-sm font-medium text-slate-600 hover:text-teal-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm font-medium text-slate-600 hover:text-teal-500 transition-colors">
                  About
                </a>
              </li>
              <li>
                <Link href="/faq" className="text-sm font-medium text-slate-600 hover:text-teal-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Heart Disease Prediction</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our advanced AI model analyzes your health metrics to provide a personalized heart disease risk prediction.
            Enter your information below to get started.
          </p>
        </div>
{/* 
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon="Activity"
            title="Advanced Analysis"
            description="Our algorithm analyzes multiple health factors to provide accurate predictions"
          />
          <FeatureCard
            icon="Shield"
            title="Secure & Private"
            description="Your health data is never stored and all processing happens in your browser"
          />
          <FeatureCard
            icon="LineChart"
            title="Research-Backed"
            description="Based on established medical research and cardiovascular risk factors"
          />
        </div> */}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="p-6 md:p-8 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-b border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800">Enter Your Health Metrics</h3>
            <p className="text-slate-600 text-sm mt-1">Fill in all fields below for an accurate prediction</p>
          </div>
          <Suspense
            fallback={
              <div className="flex justify-center items-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
              </div>
            }
          >
            <HeartDiseaseForm />
          </Suspense>
        </div>
      </section>

      <section id="about" className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">About This Tool</h2>
            <p className="text-slate-600 mb-4">
              This heart disease prediction tool uses a machine learning model trained on cardiovascular health data. It
              analyzes various risk factors to estimate the likelihood of heart disease.
            </p>
            <p className="text-slate-600 mb-4">
              Based on your risk assessment, the tool provides personalized recommendations for exercise, diet, and lifestyle changes. 
              These recommendations are derived from trusted medical sources including the American Heart Association, the World Health 
              Organization, and peer-reviewed medical research.
            </p>
            <p className="text-slate-600 mb-4">
              While this tool can provide valuable insights, it should not replace professional medical advice. Always
              consult with a healthcare provider for proper diagnosis and treatment.
            </p>
            
            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mt-6">
              <p className="text-sm text-teal-700">
                <strong>Important:</strong> This is a screening tool only and not a diagnostic device. The results
                should be discussed with a qualified healthcare professional.
              </p>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-medium text-teal-600 mb-2">Exercise Advice</h3>
                <p className="text-sm text-slate-600">Personalized exercise recommendations based on your heart health risk level, including activity types and frequency guidelines.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-medium text-teal-600 mb-2">Diet Recommendations</h3>
                <p className="text-sm text-slate-600">Dietary suggestions tailored to your heart health needs, focusing on heart-healthy foods and nutritional guidance.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-medium text-teal-600 mb-2">Lifestyle Changes</h3>
                <p className="text-sm text-slate-600">Practical lifestyle modifications that can improve heart health, including stress management and sleep recommendations.</p>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <Link href="/faq" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                Visit our FAQ for detailed explanations of health parameters
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Project Team</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li className="text-slate-600">Ayush Chandekar</li>
                <li className="text-slate-600">Raunak Singh</li>
                <li className="text-slate-600">Shubham Pawade</li>
                <li className="text-slate-600">Khusboo Meshram</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-800 text-slate-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2025 HridayVani. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm hover:text-teal-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm hover:text-teal-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm hover:text-teal-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

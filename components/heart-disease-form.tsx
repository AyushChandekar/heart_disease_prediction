"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Heart, AlertCircle, Info, Activity, Utensils, Coffee } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Type for health advice
interface HealthAdvice {
  exercise_recommendations: string[];
  diet_recommendations: string[];
  lifestyle_recommendations: string[];
  general_note: string;
}

// Type for prediction result
interface PredictionResult {
  prediction: number;
  probability: number;
  risk_level: string;
  health_advice: HealthAdvice;
}

const formSchema = z.object({
  age: z.coerce.number().min(18, "Age must be at least 18").max(120, "Age must be less than 120"),
  sex: z.string(),
  chestPainType: z.string(),
  restingBP: z.coerce.number().min(60, "BP must be at least 60 mm Hg").max(200, "BP must be less than 200 mm Hg"),
  cholesterol: z.coerce
    .number()
    .min(100, "Cholesterol must be at least 100 mg/dL")
    .max(600, "Cholesterol must be less than 600 mg/dL"),
  fastingBS: z.string(),
  restingECG: z.string(),
  maxHR: z.coerce.number().min(60, "Max HR must be at least 60 bpm").max(220, "Max HR must be less than 220 bpm"),
  exerciseAngina: z.string(),
  stDepression: z.coerce
    .number()
    .min(0, "ST depression must be at least 0")
    .max(6.0, "ST depression must be less than 6.0"),
  stSlope: z.string(),
  majorVessels: z.string(),
  thalassemia: z.string(),
})

export default function HeartDiseaseForm() {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 45,
      sex: "1",
      chestPainType: "0",
      restingBP: 120,
      cholesterol: 200,
      fastingBS: "0",
      restingECG: "0",
      maxHR: 150,
      exerciseAngina: "0",
      stDepression: 0,
      stSlope: "0",
      majorVessels: "0",
      thalassemia: "3",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)
  
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          sex: Number(values.sex),
          chestPainType: Number(values.chestPainType),
          fastingBS: Number(values.fastingBS),
          restingECG: Number(values.restingECG),
          exerciseAngina: Number(values.exerciseAngina),
          stSlope: Number(values.stSlope),
          majorVessels: Number(values.majorVessels),
          thalassemia: Number(values.thalassemia),
        }),
      })
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json()
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setPredictionResult(result)
    } catch (error) {
      console.error("Prediction error:", error)
      setError(error instanceof Error ? error.message : 'An error occurred connecting to the prediction server. Make sure the backend is running.');
    }
  
    setIsLoading(false)
  }
  

  return (
    <div className="p-6 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age Field */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Age
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">Your current age in years</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sex Field */}
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sex</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Male</SelectItem>
                      <SelectItem value="0">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Chest Pain Type Field */}
            <FormField
              control={form.control}
              name="chestPainType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Chest Pain Type
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">
                            0: Typical Angina, 1: Atypical Angina, 2: Non-anginal Pain, 3: Asymptomatic
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select chest pain type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Typical Angina (0)</SelectItem>
                      <SelectItem value="1">Atypical Angina (1)</SelectItem>
                      <SelectItem value="2">Non-anginal Pain (2)</SelectItem>
                      <SelectItem value="3">Asymptomatic (3)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resting Blood Pressure Field */}
            <FormField
              control={form.control}
              name="restingBP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Resting Blood Pressure (mm Hg)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">
                            Your resting blood pressure in mm Hg. Below 90 is considered hypotension, above 140 is
                            considered hypertension.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cholesterol Level Field */}
            <FormField
              control={form.control}
              name="cholesterol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Cholesterol Level (mg/dL)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">
                            Your serum cholesterol in mg/dL. Below 200 is desirable; above 240 is considered high.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fasting Blood Sugar Field */}
            <FormField
              control={form.control}
              name="fastingBS"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Fasting Blood Sugar
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">Fasting blood sugar &gt; 120 mg/dl</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fasting blood sugar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Greater than 120 mg/dl</SelectItem>
                      <SelectItem value="0">Less than or equal to 120 mg/dl</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resting ECG Results Field */}
            <FormField
              control={form.control}
              name="restingECG"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Resting ECG Results
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">0: Normal, 1: ST-T wave abnormality, 2: Left ventricular hypertrophy</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resting ECG results" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Normal (0)</SelectItem>
                      <SelectItem value="1">ST-T Wave Abnormality (1)</SelectItem>
                      <SelectItem value="2">Left Ventricular Hypertrophy (2)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Maximum Heart Rate Field */}
            <FormField
              control={form.control}
              name="maxHR"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Maximum Heart Rate (bpm)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">
                            Maximum heart rate achieved during exercise. Max HR ≈ 220 − age; athletes at rest can be
                            below 60 bpm.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Exercise Induced Angina Field */}
            <FormField
              control={form.control}
              name="exerciseAngina"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Exercise Induced Angina
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">Chest pain induced by exercise</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exercise induced angina" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ST Depression Field */}
            <FormField
              control={form.control}
              name="stDepression"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    ST Depression (oldpeak)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">
                            ST depression induced by exercise relative to rest. Clinical values rarely exceed 5-6.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ST Slope Field */}
            <FormField
              control={form.control}
              name="stSlope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    ST Slope
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">0: Upsloping, 1: Flat, 2: Downsloping</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ST slope" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Upsloping (0)</SelectItem>
                      <SelectItem value="1">Flat (1)</SelectItem>
                      <SelectItem value="2">Downsloping (2)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Major Vessels Field */}
            <FormField
              control={form.control}
              name="majorVessels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Number of Major Vessels
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">Number of major vessels (0-3) colored by fluoroscopy</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of major vessels" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thalassemia Field */}
            <FormField
              control={form.control}
              name="thalassemia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Thalassemia
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">3: Normal, 6: Fixed Defect, 7: Reversible Defect</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select thalassemia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="3">Normal (3)</SelectItem>
                      <SelectItem value="6">Fixed Defect (6)</SelectItem>
                      <SelectItem value="7">Reversible Defect (7)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full md:w-auto px-8 py-6 text-lg bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="mr-2">Processing</span>
                  <span className="animate-pulse">...</span>
                </>
              ) : (
                "Predict Heart Disease Risk"
              )}
            </Button>
          </div>
        </form>
      </Form>

      {error && (
        <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            {error}
          </p>
        </div>
      )}

      {predictionResult && (
        <div className="mt-8 animate-fadeIn">
          <Card
            className={cn(
              "p-6 border-2",
              predictionResult.probability > 70
                ? "bg-red-50 border-red-200"
                : predictionResult.probability > 40
                  ? "bg-amber-50 border-amber-200"
                  : "bg-green-50 border-green-200",
            )}
          >
            <div className="flex flex-col items-center text-center">
              <Heart
                className={cn(
                  "h-12 w-12 mb-4",
                  predictionResult.probability > 70 
                    ? "text-red-500" 
                    : predictionResult.probability > 40 
                      ? "text-amber-500" 
                      : "text-green-500",
                )}
              />

              <h3 className="text-xl font-bold mb-2">
                {predictionResult.probability > 70 
                  ? "High Risk" 
                  : predictionResult.probability > 40 
                    ? "Moderate Risk" 
                    : "Low Risk"}
              </h3>

              <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
                <div
                  className={cn(
                    "h-2.5 rounded-full",
                    predictionResult.probability > 70 
                      ? "bg-red-500" 
                      : predictionResult.probability > 40 
                        ? "bg-amber-500" 
                        : "bg-green-500",
                  )}
                  style={{ width: `${predictionResult.probability}%` }}
                ></div>
              </div>

              <p className="text-slate-700">
                Based on the provided information, your estimated risk of heart disease is
                <span className="font-semibold"> {predictionResult.probability.toFixed(1)}%</span>.
              </p>

              <div className="mt-8 w-full">
                <h4 className="text-lg font-semibold mb-4">Personalized Recommendations</h4>
                
                <Tabs defaultValue="exercise" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="exercise" className="flex items-center gap-1">
                      <Activity className="h-4 w-4" /> Exercise
                    </TabsTrigger>
                    <TabsTrigger value="diet" className="flex items-center gap-1">
                      <Utensils className="h-4 w-4" /> Diet
                    </TabsTrigger>
                    <TabsTrigger value="lifestyle" className="flex items-center gap-1">
                      <Coffee className="h-4 w-4" /> Lifestyle
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="exercise" className="mt-4">
                    <Card className="p-4 bg-white">
                      <Accordion type="single" collapsible className="w-full">
                        {predictionResult.health_advice.exercise_recommendations.map((recommendation, index) => (
                          <AccordionItem key={`exercise-${index}`} value={`exercise-${index}`}>
                            <AccordionTrigger className="text-left">
                              {recommendation.split('.')[0]}.
                            </AccordionTrigger>
                            <AccordionContent>
                              {recommendation}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="diet" className="mt-4">
                    <Card className="p-4 bg-white">
                      <Accordion type="single" collapsible className="w-full">
                        {predictionResult.health_advice.diet_recommendations.map((recommendation, index) => (
                          <AccordionItem key={`diet-${index}`} value={`diet-${index}`}>
                            <AccordionTrigger className="text-left">
                              {recommendation.split('.')[0]}.
                            </AccordionTrigger>
                            <AccordionContent>
                              {recommendation}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="lifestyle" className="mt-4">
                    <Card className="p-4 bg-white">
                      <Accordion type="single" collapsible className="w-full">
                        {predictionResult.health_advice.lifestyle_recommendations.map((recommendation, index) => (
                          <AccordionItem key={`lifestyle-${index}`} value={`lifestyle-${index}`}>
                            <AccordionTrigger className="text-left">
                              {recommendation.split('.')[0]}.
                            </AccordionTrigger>
                            <AccordionContent>
                              {recommendation}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600">
                  {predictionResult.health_advice.general_note}
                </div>
              </div>

              <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200 w-full">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 text-left">
                    This is not a medical diagnosis. Please consult with a healthcare professional for proper evaluation
                    and advice. Regular check-ups and a healthy lifestyle are important for heart health.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

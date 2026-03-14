'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Camera,
  Upload,
  Scan,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Apple,
  Baby,
  Sparkles,
  X,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface FoodAnalysis {
  imageUrl: string
  foodItems: Array<{
    name: string
    confidence: number
    calories: number
    protein: number
    carbs: number
    fats: number
  }>
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFats: number
  vitamins: Record<string, number>
  minerals: Record<string, number>
  isSafeForPregnancy: boolean
  pregnancyConcerns: string[]
  recommendations: string[]
}

export default function NutritionScanner({ onBack }: { onBack: () => void }) {
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
        analyzeImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = (imageUrl: string) => {
    setAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis: FoodAnalysis = {
        imageUrl,
        foodItems: [
          {
            name: 'Fresh Spinach Salad',
            confidence: 95,
            calories: 45,
            protein: 3,
            carbs: 6,
            fats: 0.5
          },
          {
            name: 'Grilled Chicken Breast',
            confidence: 92,
            calories: 165,
            protein: 31,
            carbs: 0,
            fats: 3.6
          },
          {
            name: 'Cherry Tomatoes',
            confidence: 88,
            calories: 27,
            protein: 1.3,
            carbs: 5.8,
            fats: 0.3
          },
          {
            name: 'Olive Oil Dressing',
            confidence: 85,
            calories: 120,
            protein: 0,
            carbs: 0,
            fats: 14
          }
        ],
        totalCalories: 357,
        totalProtein: 35.3,
        totalCarbs: 11.8,
        totalFats: 18.4,
        vitamins: {
          'Vitamin A': 9377,
          'Vitamin C': 28,
          'Vitamin K': 145,
          'Folate': 194
        },
        minerals: {
          'Iron': 2.7,
          'Calcium': 61,
          'Potassium': 492,
          'Magnesium': 79
        },
        isSafeForPregnancy: true,
        pregnancyConcerns: [],
        recommendations: [
          'Excellent source of protein for fetal development',
          'Rich in folate which helps prevent neural tube defects',
          'Good iron content supports increased blood volume',
          'Consider adding whole grains for additional fiber'
        ]
      }

      setAnalysis(mockAnalysis)
      setAnalyzing(false)
    }, 2500)
  }

  const handleReset = () => {
    setSelectedImage(null)
    setAnalysis(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-gradient-helix">Intelligent Nutrition Scanner</h2>
            <p className="text-muted-foreground">AI-powered food analysis for healthy eating</p>
          </div>
        </motion.div>
        {selectedImage && (
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            New Scan
          </Button>
        )}
      </div>

      {!selectedImage ? (
        /* Upload Section */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="neumorphic-card">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Upload Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-2xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-200 group"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Camera className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Food Image</h3>
                  <p className="text-muted-foreground mb-4">
                    Take a photo or upload an image of your meal
                  </p>
                  <Button className="gap-2">
                    <Upload className="h-4 w-4" />
                    Choose Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                    <Apple className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="font-semibold text-sm">Ingredient Detection</p>
                    <p className="text-xs text-muted-foreground mt-1">AI identifies all food items</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                    <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="font-semibold text-sm">Nutritional Analysis</p>
                    <p className="text-xs text-muted-foreground mt-1">Complete macro breakdown</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                    <Baby className="h-8 w-8 mx-auto mb-2 text-pink-500" />
                    <p className="font-semibold text-sm">Pregnancy Safety</p>
                    <p className="text-xs text-muted-foreground mt-1">Maternal health alerts</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* Analysis Results */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image and Analysis Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <Card className="neumorphic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="h-5 w-5 text-green-500" />
                  Scanned Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Scanned food"
                    className="w-full aspect-square object-cover"
                  />
                  {analyzing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
                        <p className="font-semibold">Analyzing...</p>
                        <p className="text-sm opacity-80">AI is identifying food items</p>
                      </div>
                    </div>
                  )}
                </div>

                {!analyzing && analysis && (
                  <div className="space-y-2">
                    {analysis.isSafeForPregnancy ? (
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <div>
                            <p className="font-semibold text-green-700 dark:text-green-300">Pregnancy Safe</p>
                            <p className="text-xs text-green-600 dark:text-green-400">This meal is safe for consumption</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          <div>
                            <p className="font-semibold text-red-700 dark:text-red-300">Caution Required</p>
                            <p className="text-xs text-red-600 dark:text-red-400">Some items may not be suitable</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Analysis */}
          <AnimatePresence mode="wait">
            {analyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:col-span-2"
              >
                <Card className="neumorphic-card h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 flex items-center justify-center mx-auto">
                      <Sparkles className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">AI is analyzing your meal</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Identifying ingredients, calculating nutrition, and checking pregnancy safety...
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : analysis ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="lg:col-span-2 space-y-4"
              >
                {/* Food Items */}
                <Card className="neumorphic-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Identified Food Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {analysis.foodItems.map((item, index) => (
                        <div
                          key={index}
                          className="p-3 border border-border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <Badge variant="secondary">{item.confidence}%</Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-xs text-center">
                            <div>
                              <p className="font-semibold text-blue-600">{item.calories}</p>
                              <p className="text-muted-foreground">cal</p>
                            </div>
                            <div>
                              <p className="font-semibold text-green-600">{item.protein}g</p>
                              <p className="text-muted-foreground">protein</p>
                            </div>
                            <div>
                              <p className="font-semibold text-yellow-600">{item.carbs}g</p>
                              <p className="text-muted-foreground">carbs</p>
                            </div>
                            <div>
                              <p className="font-semibold text-red-600">{item.fats}g</p>
                              <p className="text-muted-foreground">fats</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Nutrition Summary */}
                <Card className="neumorphic-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Nutritional Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {analysis.totalCalories}
                        </p>
                        <p className="text-xs text-muted-foreground">Calories</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {analysis.totalProtein}g
                        </p>
                        <p className="text-xs text-muted-foreground">Protein</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                          {analysis.totalCarbs}g
                        </p>
                        <p className="text-xs text-muted-foreground">Carbs</p>
                      </div>
                      <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {analysis.totalFats}g
                        </p>
                        <p className="text-xs text-muted-foreground">Fats</p>
                      </div>
                    </div>

                    <Tabs defaultValue="vitamins" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="vitamins">Vitamins</TabsTrigger>
                        <TabsTrigger value="minerals">Minerals</TabsTrigger>
                      </TabsList>
                      <TabsContent value="vitamins" className="mt-4">
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(analysis.vitamins).map(([vitamin, value]) => (
                            <div key={vitamin} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <p className="font-semibold text-sm">{vitamin}</p>
                              <p className="text-lg font-bold text-purple-600">{value} µg</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="minerals" className="mt-4">
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(analysis.minerals).map(([mineral, value]) => (
                            <div key={mineral} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <p className="font-semibold text-sm">{mineral}</p>
                              <p className="text-lg font-bold text-orange-600">{value} mg</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="neumorphic-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <p className="text-sm">{rec}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

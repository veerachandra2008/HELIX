'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calculator,
  DollarSign,
  Calendar,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import jsPDF from 'jspdf'

interface ExpensePrediction {
  riskCategory: 'low' | 'medium' | 'high'
  projectedAnnualCost: number
  projectedMonthlyCost: number
  factors: {
    medicalHistory: number
    pregnancyRisk: number
    nutritionQuality: number
    diseaseExposure: number
    healthcareAccess: number
  }
  recommendations: string[]
}

export default function ExpensePredictor({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    medicalHistory: 3,
    pregnancyRisk: 2,
    nutritionQuality: 4,
    diseaseExposure: 2,
    healthcareAccess: 4
  })
  const [prediction, setPrediction] = useState<ExpensePrediction | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const calculatePrediction = () => {
    setIsAnalyzing(true)

    setTimeout(() => {
      const baseAnnualCost = 25000
      const riskFactor =
        (formData.medicalHistory * 0.3) +
        (formData.pregnancyRisk * 0.25) +
        (5 - formData.nutritionQuality) * 0.2 +
        (formData.diseaseExposure * 0.15) +
        (5 - formData.healthcareAccess) * 0.1

      const projectedAnnualCost = baseAnnualCost * (1 + riskFactor * 0.5)
      const projectedMonthlyCost = projectedAnnualCost / 12

      let riskCategory: 'low' | 'medium' | 'high' = 'low'
      if (riskFactor > 3.5) riskCategory = 'high'
      else if (riskFactor > 2) riskCategory = 'medium'

      const recommendations = []
      if (formData.medicalHistory > 3) {
        recommendations.push('Consider health insurance with comprehensive coverage')
        recommendations.push('Build an emergency medical fund (3-6 months of expenses)')
      }
      if (formData.pregnancyRisk > 3) {
        recommendations.push('Plan for additional maternal care expenses')
        recommendations.push('Look into government maternal health schemes')
      }
      if (formData.nutritionQuality < 3) {
        recommendations.push('Invest in preventive nutrition to reduce future costs')
      }
      if (formData.healthcareAccess < 3) {
        recommendations.push('Factor in travel costs for healthcare visits')
        recommendations.push('Explore telemedicine options to reduce costs')
      }
      if (recommendations.length === 0) {
        recommendations.push('Maintain your healthy lifestyle for continued low healthcare costs')
        recommendations.push('Regular checkups help prevent expensive treatments')
      }

      setPrediction({
        riskCategory,
        projectedAnnualCost: Math.round(projectedAnnualCost),
        projectedMonthlyCost: Math.round(projectedMonthlyCost),
        factors: formData,
        recommendations
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const downloadReport = () => {
    if (!prediction) return

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // Header
    doc.setFillColor(0, 51, 102)
    doc.rect(0, 0, pageWidth, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.text('HELIX Healthcare', 20, 25)
    doc.setFontSize(14)
    doc.text('Expense Prediction Report', 20, 35)

    // Reset color
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)

    let y = 60

    // Risk Category
    doc.setFontSize(16)
    doc.text('Risk Assessment', 20, y)
    y += 10

    const riskColors = {
      low: [34, 197, 94],
      medium: [234, 179, 8],
      high: [239, 68, 68]
    }
    const [r, g, b] = riskColors[prediction.riskCategory]
    doc.setFillColor(r, g, b)
    doc.roundedRect(20, y, pageWidth - 40, 30, 3, 3, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(14)
    doc.text(`Risk Level: ${prediction.riskCategory.toUpperCase()}`, 30, y + 18)

    doc.setTextColor(0, 0, 0)
    y += 45

    // Cost Projection
    doc.setFontSize(16)
    doc.text('Cost Projections', 20, y)
    y += 10

    doc.setFontSize(12)
    doc.text(`Annual Projection: ₹${prediction.projectedAnnualCost.toLocaleString()}`, 30, y + 10)
    doc.text(`Monthly Projection: ₹${prediction.projectedMonthlyCost.toLocaleString()}`, 30, y + 20)

    y += 40

    // Factors
    doc.setFontSize(16)
    doc.text('Contributing Factors', 20, y)
    y += 10

    const factorLabels = {
      medicalHistory: 'Medical History',
      pregnancyRisk: 'Pregnancy Risk',
      nutritionQuality: 'Nutrition Quality',
      diseaseExposure: 'Disease Exposure',
      healthcareAccess: 'Healthcare Access'
    }

    Object.entries(prediction.factors).forEach(([key, value]) => {
      doc.text(`${factorLabels[key as keyof typeof factorLabels]}: ${value}/5`, 30, y + 10)
      y += 10
    })

    y += 15

    // Recommendations
    doc.setFontSize(16)
    doc.text('Recommendations', 20, y)
    y += 10

    prediction.recommendations.forEach((rec, i) => {
      const lines = doc.splitTextToSize(`${i + 1}. ${rec}`, pageWidth - 60)
      doc.text(lines, 30, y + 10)
      y += lines.length * 7 + 5
    })

    // Footer
    y = doc.internal.pageSize.getHeight() - 20
    doc.setFontSize(10)
    doc.setTextColor(128, 128, 128)
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} | HELIX Healthcare Ecosystem`,
      20,
      y
    )

    doc.save('helix-expense-prediction.pdf')
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800'
      case 'medium':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800'
      default:
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'medium':
        return <TrendingUp className="h-5 w-5 text-orange-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />
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
            <h2 className="text-3xl font-bold text-gradient-helix">AI Expense Predictor</h2>
            <p className="text-muted-foreground">Forecast your healthcare costs</p>
          </div>
        </motion.div>
        {prediction && (
          <Button onClick={downloadReport} className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="neumorphic-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                Health Factors Assessment
              </CardTitle>
              <CardDescription>Rate each factor on a scale of 1-5</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      Medical History
                    </Label>
                    <span className="text-sm font-medium">{formData.medicalHistory}/5</span>
                  </div>
                  <Slider
                    value={[formData.medicalHistory]}
                    onValueChange={([v]) => setFormData({ ...formData, medicalHistory: v })}
                    max={5}
                    min={1}
                    step={1}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    1 = Excellent, 5 = Multiple chronic conditions
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-pink-500" />
                      Pregnancy Risk
                    </Label>
                    <span className="text-sm font-medium">{formData.pregnancyRisk}/5</span>
                  </div>
                  <Slider
                    value={[formData.pregnancyRisk]}
                    onValueChange={([v]) => setFormData({ ...formData, pregnancyRisk: v })}
                    max={5}
                    min={1}
                    step={1}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    1 = Low risk, 5 = High risk pregnancy
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Nutrition Quality
                    </Label>
                    <span className="text-sm font-medium">{formData.nutritionQuality}/5</span>
                  </div>
                  <Slider
                    value={[formData.nutritionQuality]}
                    onValueChange={([v]) => setFormData({ ...formData, nutritionQuality: v })}
                    max={5}
                    min={1}
                    step={1}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    1 = Poor, 5 = Excellent balanced diet
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Disease Exposure
                    </Label>
                    <span className="text-sm font-medium">{formData.diseaseExposure}/5</span>
                  </div>
                  <Slider
                    value={[formData.diseaseExposure]}
                    onValueChange={([v]) => setFormData({ ...formData, diseaseExposure: v })}
                    max={5}
                    min={1}
                    step={1}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    1 = Low exposure, 5 = High disease risk area
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      Healthcare Access
                    </Label>
                    <span className="text-sm font-medium">{formData.healthcareAccess}/5</span>
                  </div>
                  <Slider
                    value={[formData.healthcareAccess]}
                    onValueChange={([v]) => setFormData({ ...formData, healthcareAccess: v })}
                    max={5}
                    min={1}
                    step={1}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    1 = Poor access, 5 = Excellent nearby facilities
                  </p>
                </div>
              </div>

              <Button
                onClick={calculatePrediction}
                disabled={isAnalyzing}
                className="w-full gap-2 text-base py-6"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-5 w-5" />
                    Calculate Prediction
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {!prediction ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <Card className="neumorphic-card h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Calculator className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Ready to Predict</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Fill in your health factors to get an expense prediction
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                {/* Risk Card */}
                <Card className={`neumorphic-card border-2 ${getRiskColor(prediction.riskCategory)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getRiskIcon(prediction.riskCategory)}
                        <div>
                          <p className="text-sm font-medium opacity-80">Risk Category</p>
                          <p className="text-2xl font-bold uppercase">
                            {prediction.riskCategory}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-80">Financial Risk</p>
                        <p className="text-lg font-semibold">
                          {prediction.riskCategory === 'high' ? 'Elevated' :
                           prediction.riskCategory === 'medium' ? 'Moderate' : 'Low'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cost Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="neumorphic-card">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <p className="text-sm text-muted-foreground">Annual Projection</p>
                      </div>
                      <p className="text-3xl font-bold text-gradient-helix">
                        ₹{prediction.projectedAnnualCost.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Estimated yearly cost</p>
                    </CardContent>
                  </Card>

                  <Card className="neumorphic-card">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="h-5 w-5 text-teal-500" />
                        <p className="text-sm text-muted-foreground">Monthly Projection</p>
                      </div>
                      <p className="text-3xl font-bold text-gradient-accent">
                        ₹{prediction.projectedMonthlyCost.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Average monthly cost</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <Card className="neumorphic-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {prediction.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                              {i + 1}
                            </span>
                          </div>
                          <p className="text-sm">{rec}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Factor Breakdown */}
                <Card className="neumorphic-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Factor Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(prediction.factors).map(([key, value]) => {
                      const factorLabels: Record<string, string> = {
                        medicalHistory: 'Medical History',
                        pregnancyRisk: 'Pregnancy Risk',
                        nutritionQuality: 'Nutrition Quality',
                        diseaseExposure: 'Disease Exposure',
                        healthcareAccess: 'Healthcare Access'
                      }
                      return (
                        <div key={key} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>{factorLabels[key]}</span>
                            <span className="font-medium">{value}/5</span>
                          </div>
                          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(value / 5) * 100}%` }}
                              className={`h-full ${
                                value <= 2 ? 'bg-green-500' :
                                value <= 3 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

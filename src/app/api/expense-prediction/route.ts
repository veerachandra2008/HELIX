import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, factors } = body

    if (!userId || !factors) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate risk factor (0-5 scale)
    const riskFactor =
      (factors.medicalHistory * 0.3) +
      (factors.pregnancyRisk * 0.25) +
      (5 - factors.nutritionQuality) * 0.2 +
      (factors.diseaseExposure * 0.15) +
      (5 - factors.healthcareAccess) * 0.1

    // Base annual cost (in INR)
    const baseAnnualCost = 25000

    // Calculate projected costs
    const projectedAnnualCost = Math.round(baseAnnualCost * (1 + riskFactor * 0.5))
    const projectedMonthlyCost = Math.round(projectedAnnualCost / 12)

    // Determine risk category
    let riskCategory: 'low' | 'medium' | 'high' = 'low'
    if (riskFactor > 3.5) {
      riskCategory = 'high'
    } else if (riskFactor > 2) {
      riskCategory = 'medium'
    }

    // Generate recommendations
    const recommendations = []
    if (factors.medicalHistory > 3) {
      recommendations.push('Consider comprehensive health insurance coverage')
      recommendations.push('Build an emergency medical fund (3-6 months of expenses)')
    }
    if (factors.pregnancyRisk > 3) {
      recommendations.push('Plan for additional maternal care expenses')
      recommendations.push('Explore government maternal health schemes and subsidies')
    }
    if (factors.nutritionQuality < 3) {
      recommendations.push('Invest in preventive nutrition to reduce future healthcare costs')
      recommendations.push('Consider dietitian consultation for personalized nutrition plans')
    }
    if (factors.healthcareAccess < 3) {
      recommendations.push('Factor in travel costs for healthcare visits')
      recommendations.push('Explore telemedicine options to reduce consultation and travel costs')
    }
    if (factors.diseaseExposure > 3) {
      recommendations.push('Budget for preventive care and vaccinations')
      recommendations.push('Consider health checkup packages for early detection')
    }
    if (recommendations.length === 0) {
      recommendations.push('Maintain your healthy lifestyle for continued low healthcare costs')
      recommendations.push('Regular preventive checkups help avoid expensive treatments')
    }

    // Save prediction to database
    const prediction = await db.expensePrediction.create({
      data: {
        userId,
        predictionType: factors.pregnancyRisk > 0 ? 'pregnancy' : 'general',
        riskCategory,
        projectedAnnualCost,
        projectedMonthlyCost,
        factors: JSON.stringify(factors),
        recommendations: JSON.stringify(recommendations)
      }
    })

    return NextResponse.json({
      prediction: {
        id: prediction.id,
        riskCategory,
        projectedAnnualCost,
        projectedMonthlyCost,
        factors,
        recommendations,
        predictionDate: new Date().toISOString()
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating expense prediction:', error)
    return NextResponse.json(
      { error: 'Failed to create expense prediction' },
      { status: 500 }
    )
  }
}

// GET - Fetch expense predictions for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const predictions = await db.expensePrediction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    // Parse JSON fields
    const parsedPredictions = predictions.map(p => ({
      ...p,
      factors: JSON.parse(p.factors as string),
      recommendations: JSON.parse(p.recommendations as string)
    }))

    return NextResponse.json({ predictions: parsedPredictions })
  } catch (error) {
    console.error('Error fetching expense predictions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch expense predictions' },
      { status: 500 }
    )
  }
}

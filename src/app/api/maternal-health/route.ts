import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import vlm from 'z-ai-web-dev-sdk'
// GET - Fetch maternal health data for a user
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

    const maternalHealth = await db.maternalHealth.findUnique({
      where: { userId }
    })

    // Calculate current week if data exists
    if (maternalHealth) {
      const lmp = new Date(maternalHealth.lastMenstrualDate)
      const now = new Date()
      const weeksSinceLMP = Math.floor((now.getTime() - lmp.getTime()) / (7 * 24 * 60 * 60 * 1000))
      maternalHealth.currentWeek = Math.min(weeksSinceLMP, 42)
    }

    return NextResponse.json({ maternalHealth })
  } catch (error) {
    console.error('Error fetching maternal health data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch maternal health data' },
      { status: 500 }
    )
  }
}

// POST - Create or update maternal health data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      lastMenstrualDate,
      numberOfPregnancies,
      previousComplications,
      weight,
      height,
      bloodPressure,
      hemoglobin,
      bloodSugar,
      notes
    } = body

    if (!userId || !lastMenstrualDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate due date (LMP + 280 days)
    const lmp = new Date(lastMenstrualDate)
    const dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000)

    // Calculate current week
    const now = new Date()
    const currentWeek = Math.floor((now.getTime() - lmp.getTime()) / (7 * 24 * 60 * 60 * 1000))

    // Determine risk level (simplified logic)
    let riskLevel: 'low' | 'medium' | 'high' = 'low'
    if (previousComplications || (hemoglobin && hemoglobin < 11) || (bloodSugar && bloodSugar > 140)) {
      riskLevel = 'high'
    } else if ((bloodPressure && (parseInt(bloodPressure.split('/')[0]) > 140 || parseInt(bloodPressure.split('/')[1]) > 90))) {
      riskLevel = 'medium'
    }

    // Check if record exists
    const existing = await db.maternalHealth.findUnique({
      where: { userId }
    })

    let maternalHealth
    if (existing) {
      maternalHealth = await db.maternalHealth.update({
        where: { userId },
        data: {
          lastMenstrualDate: new Date(lastMenstrualDate),
          dueDate,
          currentWeek,
          riskLevel,
          numberOfPregnancies,
          previousComplications,
          weight,
          height,
          bloodPressure,
          hemoglobin,
          bloodSugar,
          notes
        }
      })
    } else {
      maternalHealth = await db.maternalHealth.create({
        data: {
          userId,
          lastMenstrualDate: new Date(lastMenstrualDate),
          dueDate,
          currentWeek,
          riskLevel,
          numberOfPregnancies,
          previousComplications,
          weight,
          height,
          bloodPressure,
          hemoglobin,
          bloodSugar,
          notes
        }
      })
    }

    return NextResponse.json({ maternalHealth }, { status: 201 })
  } catch (error) {
    console.error('Error saving maternal health data:', error)
    return NextResponse.json(
      { error: 'Failed to save maternal health data' },
      { status: 500 }
    )
  }
}

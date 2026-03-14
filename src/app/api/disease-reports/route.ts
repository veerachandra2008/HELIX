import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Fetch disease reports
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const diseaseType = searchParams.get('diseaseType')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    const where: any = {}
    if (userId) where.userId = userId
    if (diseaseType) where.diseaseType = diseaseType

    const reports = await db.diseaseReport.findMany({
      where,
      orderBy: { reportDate: 'desc' },
      take: limit
    })

    return NextResponse.json({ reports })
  } catch (error) {
    console.error('Error fetching disease reports:', error)
    return NextResponse.json(
      { error: 'Failed to fetch disease reports' },
      { status: 500 }
    )
  }
}

// POST - Create a new disease report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      diseaseType,
      symptoms,
      severity,
      location,
      latitude,
      longitude,
      source
    } = body

    if (!userId || !diseaseType || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const report = await db.diseaseReport.create({
      data: {
        userId,
        diseaseType,
        symptoms: JSON.stringify(symptoms || []),
        severity,
        reportDate: new Date(),
        location,
        latitude,
        longitude,
        source: source || 'self_report'
      }
    })

    return NextResponse.json({ report }, { status: 201 })
  } catch (error) {
    console.error('Error creating disease report:', error)
    return NextResponse.json(
      { error: 'Failed to create disease report' },
      { status: 500 }
    )
  }
}

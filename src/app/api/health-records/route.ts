import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Fetch all health records for a user
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

    const records = await db.healthRecord.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    })

    return NextResponse.json({ records })
  } catch (error) {
    console.error('Error fetching health records:', error)
    return NextResponse.json(
      { error: 'Failed to fetch health records' },
      { status: 500 }
    )
  }
}

// POST - Create a new health record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      recordType,
      title,
      description,
      provider,
      facilityName,
      date,
      symptoms,
      diagnosis,
      treatment,
      isEmergency
    } = body

    if (!userId || !recordType || !title || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const record = await db.healthRecord.create({
      data: {
        userId,
        recordType,
        title,
        description,
        provider,
        facilityName,
        date: new Date(date),
        symptoms: JSON.stringify(symptoms || []),
        diagnosis,
        treatment,
        isEmergency: isEmergency || false
      }
    })

    return NextResponse.json({ record }, { status: 201 })
  } catch (error) {
    console.error('Error creating health record:', error)
    return NextResponse.json(
      { error: 'Failed to create health record' },
      { status: 500 }
    )
  }
}

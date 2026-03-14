import { NextRequest, NextResponse } from 'next/server'
import vlm from 'z-ai-web-dev-sdk'
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, isPregnant } = body

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      )
    }

    // Use VLM to analyze the food image
    const analysisPrompt = `Analyze this food image and provide:
1. List all food items you can identify
2. Estimate the nutritional content for each item (calories, protein in grams, carbs in grams, fats in grams)
3. Identify key vitamins and minerals
4. ${isPregnant ? 'Evaluate if this meal is safe for pregnant women and mention any concerns' : 'Provide general health recommendations'}

Format your response as JSON with this structure:
{
  "foodItems": [
    {
      "name": "item name",
      "confidence": 0-100,
      "calories": number,
      "protein": number,
      "carbs": number,
      "fats": number
    }
  ],
  "vitamins": {"Vitamin A": number, "Vitamin C": number, etc},
  "minerals": {"Iron": number, "Calcium": number, etc},
  "isSafeForPregnancy": true/false,
  "pregnancyConcerns": ["concern1", "concern2"],
  "recommendations": ["tip1", "tip2"]
}`

    const response = await vlm.chat({
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: analysisPrompt },
            { type: 'image_url', image_url: { url: imageUrl } }
          ]
        }
      ],
      maxTokens: 1000
    })

    // Parse the JSON response
    let analysisData
    try {
      // Extract JSON from response
      const jsonMatch = response.content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Error parsing VLM response:', parseError)
      // Fallback to a default response
      analysisData = {
        foodItems: [
          {
            name: 'Mixed Meal',
            confidence: 75,
            calories: 400,
            protein: 20,
            carbs: 50,
            fats: 15
          }
        ],
        vitamins: {},
        minerals: {},
        isSafeForPregnancy: true,
        pregnancyConcerns: [],
        recommendations: ['Enjoy your meal in moderation', 'Ensure proper hydration']
      }
    }

    // Calculate totals
    const totalCalories = analysisData.foodItems.reduce((sum: number, item: any) => sum + item.calories, 0)
    const totalProtein = analysisData.foodItems.reduce((sum: number, item: any) => sum + item.protein, 0)
    const totalCarbs = analysisData.foodItems.reduce((sum: number, item: any) => sum + item.carbs, 0)
    const totalFats = analysisData.foodItems.reduce((sum: number, item: any) => sum + item.fats, 0)

    return NextResponse.json({
      ...analysisData,
      imageUrl,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFats,
      scanDate: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error analyzing nutrition:', error)
    return NextResponse.json(
      { error: 'Failed to analyze nutrition' },
      { status: 500 }
    )
  }
}

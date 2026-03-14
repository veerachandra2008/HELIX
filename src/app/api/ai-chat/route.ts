import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(request: NextRequest) {

  try {

    const body = await request.json();
    const { message, context, symptoms } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // System prompt for HELIX AI doctor
    const systemPrompt = `You are a helpful AI Clinical Assistant for HELIX Healthcare Ecosystem.

Your role is to:
1. Provide general health information
2. Help users understand symptoms
3. Suggest when to seek professional medical care
4. Provide preventive healthcare advice
5. Support maternal health questions

IMPORTANT RULES:
- Never provide exact medical diagnosis
- Never prescribe medicines
- Always recommend consulting a doctor for serious issues
- If symptoms indicate emergency, advise immediate medical help

Context: ${context || "General health consultation"}

Symptoms: ${
      symptoms ? JSON.stringify(symptoms) : "None provided"
    }`;

    // 🔥 Groq AI call
    const aiResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const reply = aiResponse.choices[0]?.message?.content || "";

    // Detect severity level
    let severity: "info" | "warning" | "critical" = "info";

    const text = reply.toLowerCase();

    if (
      text.includes("emergency") ||
      text.includes("call ambulance") ||
      text.includes("immediately") ||
      text.includes("severe chest pain")
    ) {
      severity = "critical";
    } 
    else if (
      text.includes("doctor") ||
      text.includes("consult") ||
      text.includes("medical professional")
    ) {
      severity = "warning";
    }

    return NextResponse.json({
      response: reply,
      severity,
      timestamp: new Date().toISOString()
    });

  } catch (error) {

    console.error("AI Chat Error:", error);

    return NextResponse.json(
      {
        error: "Failed to process chat request"
      },
      { status: 500 }
    );
  }
}
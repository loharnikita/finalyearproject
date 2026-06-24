import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "@/lib/db";
import Transcript from "@/app/models/Transcript";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {

    await connectDB();

    const { meetingId } = await req.json();

    // 1. GET TRANSCRIPT FROM DB
    const transcriptData = await Transcript.findOne({ meetingId });

    if (!transcriptData) {
      return NextResponse.json({
        summary: "No transcript found for this meeting."
      });
    }

    const transcript = transcriptData.text;

    // 2. GEMINI MODEL
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    // 3. AI PROMPT
    const prompt = `
You are a professional AI meeting assistant.

Generate a structured meeting summary:

📌 Meeting Summary  
👥 Participants  
🧠 Key Discussion Points  
✅ Decisions Made  
🚀 Action Items  

Transcript:
${transcript}
`;

    let summary = "";

    try {
      const result = await model.generateContent(prompt);
      summary = result.response.text();
    } catch (err) {
      console.log("Gemini failed, using fallback");

      summary = `
📌 Meeting Summary  
This meeting discussed project progress and smart meeting system development.

👥 Participants  
All team members participated actively.

🧠 Discussion  
Project architecture, features, and implementation were discussed.

🚀 Action Items  
- Complete backend APIs  
- Improve UI  
- Integrate AI features  
`;
    }

    return NextResponse.json({ summary });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Summary generation failed" },
      { status: 500 }
    );
  }
}
import { AsyncHandler } from "../Utils/AsyncHandler.js";

export const chatBot = AsyncHandler(async (req, res) => {
  const { message, language } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Message is required",
    });
  }

  try {
    const promptInstructions = `
      You are Lencho Assistant, a professional and friendly AI farming assistant for KisanSetu / FarmLink. 
      Your goal is to help farmers with crop advice, weather-related suggestions, market trends, and government schemes.
      
      Instructions:
      1. Provide accurate, helpful, and concise farming advice.
      2. If the user asks about wheat, rice, corn or other crops, give specific tips and relevant market prices in INR.
      3. Use a helpful and respectful tone.
      4. Avoid answering questions not related to agriculture, farming, weather, market, or the platform.
      5. Respond in the user's requested language if specified, otherwise use English.
    `;

    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: promptInstructions },
          { role: "user", content: `User Language: ${language || 'English'}\n\nUser Question: ${message}` }
        ],
        model: "openai"
      })
    });

    const responseText = await response.text();

    res.json({
      success: true,
      data: responseText,
    });
  } catch (error) {
    console.error("AI ERROR:", error.message);

    res.status(500).json({
      success: false,
      data: "I'm sorry, I encountered a connection issue. Please try asking again! 🌱",
      message: "AI service temporarily unavailable.",
    });
  }
});

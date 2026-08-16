import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://text.pollinations.ai/openai",
  apiKey: "dummy", 
});

async function test() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello, how are you?" }],
    });
    console.log("Success:", completion.choices[0].message.content);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();

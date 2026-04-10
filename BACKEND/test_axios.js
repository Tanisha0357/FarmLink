import axios from "axios";

async function test() {
  try {
    const res = await axios.post("https://text.pollinations.ai/", {
      messages: [
        { role: "system", content: "You are Lencho, a helpful assistant." },
        { role: "user", content: "What is the capital of France?" }
      ],
      model: "openai"
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

test();

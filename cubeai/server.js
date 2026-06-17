import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Chat endpoint
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2:3b",
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
        stream: false,
      }),
    });

    const data = await response.json();

    res.json({
      reply: data.message.content,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Start server
app.listen(3000, () => {
  console.log("🚀 CubeAI server running on http://localhost:3000");
});

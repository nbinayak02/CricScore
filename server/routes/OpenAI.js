const express = require("express");
const OpenAI = require("openai"); // ✅ fixed import
const router = express.Router();
require("dotenv").config();


// ✅ Instantiate GPT-4 with API key
const openai = new OpenAI({
  apiKey: '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'
});

router.post("/ask", async (req, res) => {
  const { query } = req.body;

  console.log("The query is:"+query);

  try {
    const prompt = `
      You are a GitHub expert. Given the following query, analyze or answer intelligently:

      Query: ${query}

      Provide a helpful, technical, and accurate response.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate response." });
  }
});

module.exports = router; // ✅ export the router
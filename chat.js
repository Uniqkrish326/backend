export default async function handler(req, res) {
  const { messages, model } = req.body;

  const apiKey = process.env.OPENROUTER_API_KEY;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat', // ✅ DeepSeek model
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    if (!openRouterRes.ok) {
      const errorDetails = await openRouterRes.json();
      return res.status(openRouterRes.status).json({ error: errorDetails });
    }

    const data = await openRouterRes.json();
    const reply = data.choices?.[0]?.message?.content || 'No response from model.';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

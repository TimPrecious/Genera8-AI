import { getGroqKey } from "../../lib/groq";

const MODEL = "openai/gpt-oss-20b"; // free Groq chat model

export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Ask Groq (it works just like the OpenAI chat API)
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getGroqKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: MODEL, messages }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Groq request failed.");

    return Response.json({ reply: data.choices[0].message.content });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

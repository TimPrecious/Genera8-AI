import { getGroqKey } from "../../lib/groq";

const MODEL = "whisper-large-v3-turbo"; // free Groq speech-to-text model

export async function POST(request) {
  try {
    const form = await request.formData();
    const audio = form.get("audio"); // the file sent from the browser

    // Pack the audio and send it to Groq
    const body = new FormData();
    body.append("file", audio, "audio.webm");
    body.append("model", MODEL);

    const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${getGroqKey()}` },
      body,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Groq request failed.");

    return Response.json({ text: data.text });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

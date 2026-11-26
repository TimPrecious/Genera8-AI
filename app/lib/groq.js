// Reads the Groq key from .env.local (server only, never sent to the browser).
export function getGroqKey() {
  // Remove spaces and quotes that are easy to paste by accident
  const key = (process.env.GROQ_API_KEY || "").trim().replace(/^["']|["']$/g, "");

  if (!key) {
    throw new Error("GROQ_API_KEY is missing. Create a file named .env.local next to package.json, add GROQ_API_KEY=gsk_..., then restart the app.");
  }
  if (!key.startsWith("gsk_")) {
    throw new Error("GROQ_API_KEY looks wrong. A Groq key starts with gsk_ (no quotes, no spaces).");
  }
  return key;
}

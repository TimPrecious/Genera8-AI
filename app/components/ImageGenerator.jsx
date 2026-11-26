"use client";
import { useState } from "react";

// Type a prompt, get an image back
export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.image) setImage(data.image);
      else setError(data.error || "Could not make the image.");
    } catch {
      setError("Could not reach the server.");
    }
    setLoading(false);
  }

  return (
    <section className="tool">
      <div className="inputbar">
        <textarea
          value={prompt}
          rows={1}
          placeholder="Describe the image you want"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="primary" onClick={generate} disabled={loading}>
          {loading ? "Creating..." : "Create image"}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {image && <img className="result-image" src={image} alt={prompt} />}
    </section>
  );
}

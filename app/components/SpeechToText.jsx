"use client";
import { useState, useRef } from "react";

// Record your voice (or upload an audio file) and get text back
export default function SpeechToText() {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  // Send an audio file to our server route
  async function transcribe(file) {
    setLoading(true);
    setError("");
    const form = new FormData();
    form.append("audio", file);
    try {
      const res = await fetch("/api/transcribe", { method: "POST", body: form });
      const data = await res.json();
      if (data.text !== undefined) setText(data.text);
      else setError(data.error || "Could not transcribe.");
    } catch {
      setError("Could not reach the server.");
    }
    setLoading(false);
  }

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop()); // turn the microphone off
      transcribe(new Blob(chunksRef.current, { type: recorder.mimeType }));
    };
    recorder.start();
    recorderRef.current = recorder;
    setRecording(true);
  }

  function stopRecording() {
    recorderRef.current.stop();
    setRecording(false);
  }

  return (
    <section className="tool">
      <div className="actions">
        <button className="primary" onClick={recording ? stopRecording : startRecording} disabled={loading}>
          {recording ? "Stop recording" : "Start recording"}
        </button>
        <label className="ghost upload">
          Upload audio
          <input type="file" accept="audio/*" hidden onChange={(e) => e.target.files[0] && transcribe(e.target.files[0])} />
        </label>
      </div>
      {loading && <p className="empty">Transcribing...</p>}
      {error && <p className="error">{error}</p>}
      {text && (
        <div className="transcript">
          <p>{text}</p>
          <button className="ghost" onClick={() => navigator.clipboard.writeText(text)}>Copy text</button>
        </div>
      )}
    </section>
  );
}

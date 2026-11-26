"use client";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";

// The chat screen: messages on top, input at the bottom
export default function ChatBox({ messages, onChange }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Scroll down whenever a new message appears
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    if (!input.trim() || loading) return;

    // 1. Show the user's message right away
    const withUser = [...messages, { role: "user", content: input }];
    onChange(withUser);
    setInput("");
    setLoading(true);

    // 2. Ask our own server route (it holds the secret key)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: withUser }),
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, something went wrong: " + data.error;
      // 3. Show the AI's reply
      onChange([...withUser, { role: "assistant", content: reply }]);
    } catch {
      onChange([...withUser, { role: "assistant", content: "Could not reach the server." }]);
    }
    setLoading(false);
  }

  return (
    <section className="chat">
      <div className="messages">
        {messages.length === 0 && <p className="empty">Ask anything to start a conversation.</p>}
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        {loading && <p className="empty">Thinking...</p>}
        <div ref={bottomRef} />
      </div>

      <div className="inputbar">
        <textarea
          value={input}
          rows={1}
          placeholder="Message Genera8"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            // Enter sends, Shift+Enter makes a new line
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
          }}
        />
        <button className="primary" onClick={send} disabled={loading}>Send</button>
      </div>
    </section>
  );
}

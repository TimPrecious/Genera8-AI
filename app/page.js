"use client";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import ImageGenerator from "./components/ImageGenerator";
import SpeechToText from "./components/SpeechToText";

export default function Home() {
  const [tool, setTool] = useState("chat");       // which tool is open
  const [chats, setChats] = useState([]);         // all saved chats (history)
  const [activeId, setActiveId] = useState(null); // the chat that is open
  const [loaded, setLoaded] = useState(false);

  // Load history from the browser once
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chats") || "[]");
    if (saved.length === 0) {
      const first = { id: Date.now(), title: "New chat", messages: [] };
      setChats([first]);
      setActiveId(first.id);
    } else {
      setChats(saved);
      setActiveId(saved[0].id);
    }
    setLoaded(true);
  }, []);

  // Save history every time it changes
  useEffect(() => {
    if (loaded) localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats, loaded]);

  const activeChat = chats.find((c) => c.id === activeId);

  // Start a fresh chat
  function newChat() {
    const chat = { id: Date.now(), title: "New chat", messages: [] };
    setChats((prev) => [chat, ...prev]);
    setActiveId(chat.id);
    setTool("chat");
  }

  // Replace the messages of the open chat (the title is the first question)
  function updateMessages(messages) {
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages, title: messages[0]?.content.slice(0, 30) || "New chat" }
          : c
      )
    );
  }

  // Remove a chat from history
  function deleteChat(id) {
    const left = chats.filter((c) => c.id !== id);
    setChats(left);
    if (id === activeId) setActiveId(left[0]?.id ?? null);
  }

  return (
    <div className="app">
      <Sidebar
        chats={chats}
        activeId={activeId}
        onSelect={(id) => { setActiveId(id); setTool("chat"); }}
        onNew={newChat}
        onDelete={deleteChat}
      />
      <main className="main">
        <Header tool={tool} onToolChange={setTool} />
        {tool === "chat" && activeChat && (
          <ChatBox key={activeChat.id} messages={activeChat.messages} onChange={updateMessages} />
        )}
        {tool === "image" && <ImageGenerator />}
        {tool === "speech" && <SpeechToText />}
      </main>
    </div>
  );
}

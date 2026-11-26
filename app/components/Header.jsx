"use client";
import { useTheme } from "../context/ThemeContext";

// The top bar: three tool tabs + the light/dark button
export default function Header({ tool, onToolChange }) {
  const { theme, toggleTheme } = useTheme();
  const tools = [
    { id: "chat", label: "Chat" },
    { id: "image", label: "Images" },
    { id: "speech", label: "Speech to text" },
  ];

  return (
    <header className="header">
      <nav className="tabs">
        {tools.map((t) => (
          <button
            key={t.id}
            className={tool === t.id ? "tab active" : "tab"}
            onClick={() => onToolChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <button className="ghost" onClick={toggleTheme}>
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
    </header>
  );
}

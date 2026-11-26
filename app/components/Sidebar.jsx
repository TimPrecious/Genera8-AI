"use client";

// The left panel: "New chat" button + list of saved chats
export default function Sidebar({ chats, activeId, onSelect, onNew, onDelete }) {
  return (
    <aside className="sidebar">
      <h1 className="logo">Genera8</h1>
      <button className="primary" onClick={onNew}>New chat</button>

      <div className="history">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={chat.id === activeId ? "history-item active" : "history-item"}
            onClick={() => onSelect(chat.id)}
          >
            <span className="history-title">{chat.title}</span>
            <button
              className="delete"
              aria-label="Delete chat"
              onClick={(e) => { e.stopPropagation(); onDelete(chat.id); }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}

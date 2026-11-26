// One message. "user" messages sit on the right, "assistant" on the left.
export default function MessageBubble({ role, content }) {
  return (
    <div className={role === "user" ? "row user" : "row"}>
      <div className={role === "user" ? "bubble user" : "bubble"}>{content}</div>
    </div>
  );
}

import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "./MyContext";
import "./chat.css";

function TypingMessage({ content, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const index = useRef(0);

  useEffect(() => {
    index.current = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      if (index.current < content.length) {
        setDisplayed(content.slice(0, index.current + 1));
        index.current++;
      } else {
        clearInterval(interval);
        if (onDone) onDone();
      }
    }, 8);
    return () => clearInterval(interval);
  }, [content]);

  return <span>{displayed}</span>;
}

function formatMessage(text) {
  // code blocks first
  text = text.replace(
    /```(\w+)?\n?([\s\S]*?)```/g,
    (_, lang, code) =>
      `<pre><code class="code-block">${code.trim()}</code></pre>`
  );
  // inline code
  text = text.replace(
    /`([^`]+)`/g,
    '<code class="inline-code">$1</code>'
  );
  // bold
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // italic
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // headings
  text = text.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  text = text.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  text = text.replace(/^# (.*$)/gm, "<h1>$1</h1>");
  // ✅ bullet list — must come before numbered list
  text = text.replace(/^[-*] (.*$)/gm, "<li>$1</li>");
  // ✅ numbered list — remove the number, ol handles it
  text = text.replace(/^\d+\. (.*$)/gm, "<li>$1</li>");
  // wrap all consecutive li tags in ol
  text = text.replace(/(<li>[\s\S]*?<\/li>)(\s*<li>[\s\S]*?<\/li>)*/g, "<ol>$&</ol>");
  // line breaks
  text = text.replace(/\n/g, "<br/>");
  return text;
}

function Message({ msg }) {
  const [typingDone, setTypingDone] = useState(!msg.typing);
  const isUser = msg.role === "user";

  return (
    <div className={`message-row ${isUser ? "user-row" : "bot-row"}`}>
      <div className="message-inner">

        {/* bot avatar on left */}
        {!isUser && (
          <div className="avatar bot-avatar">
            <i className="fa-solid fa-robot"></i>
          </div>
        )}

        {/* message bubble */}
        <div className={`bubble ${isUser ? "user-bubble" : "bot-bubble"}`}>
          {isUser ? (
            <span>{msg.content}</span>
          ) : msg.typing && !typingDone ? (
            <TypingMessage
              content={msg.content}
              onDone={() => setTypingDone(true)}
            />
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html: formatMessage(msg.content),
              }}
            />
          )}
        </div>

        {/* user avatar on right */}
        {isUser && (
          <div className="avatar user-avatar">
            <i className="fa-solid fa-user"></i>
          </div>
        )}

      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="message-row bot-row">
      <div className="message-inner">
        <div className="avatar bot-avatar">
          <i className="fa-solid fa-robot"></i>
        </div>
        <div className="bubble loading-bubble">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
}

function Chat() {
  const { activeThread, isLoading } = useContext(MyContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages, isLoading]);

  if (!activeThread || activeThread.messages.length === 0) {
    return (
      <div className="chat-area">
        <div className="empty-state">What can I help with?</div>
      </div>
    );
  }

  return (
    <div className="chat-area">
      {activeThread.messages.map((msg) => (
        <Message key={msg._id} msg={msg} />
      ))}
      {isLoading && <LoadingDots />}
      <div ref={bottomRef} />
    </div>
  );
}

export default Chat;
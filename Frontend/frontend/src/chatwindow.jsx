import { useContext, useState } from "react";
import { MyContext } from "./MyContext";
import "./chatwindow.css";
import Chat from "./chat";
import Dropdown from "./Dropdown";

function ChatWindow({ theme, toggleTheme }) {
  const { sendMessage, isLoading } = useContext(MyContext);
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mode, setMode] = useState("Default");

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage(text, mode);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatwindow">
      <div className="navbar">

        {/* LEFT — just "Chatbot" + arrow, no mode name */}
        <div
          className="navbar-left"
          onClick={() => setShowDropdown((v) => !v)}
        >
          <span>GEMNOVA</span>
          <i
            className="fa-solid fa-angle-down"
            style={{
              fontSize: 13,
              transition: "transform 0.2s",
              transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)"
            }}
          ></i>

          {/* dropdown renders here — inside navbar-left for positioning */}
          {showDropdown && (
            <Dropdown
              onClose={() => setShowDropdown(false)}
              onSelect={setMode}
              currentMode={mode}
            />
          )}
        </div>

        {/* RIGHT — theme toggle + user icon */}
        <div className="navbar-right">
          <button className="theme-btn" onClick={toggleTheme}>
            <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
          </button>
          <div className="usericondiv">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>

      </div>

      {/* show current mode as small badge below navbar */}
      <div className="mode-badge">
        <i className="fa-solid fa-bolt"></i> {mode} mode
      </div>

      <Chat />

      <div className="chatInput">
        <div className="userInput">
          <textarea
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isLoading}
          />
          <div
            id="submit"
            onClick={handleSend}
            className={isLoading || !input.trim() ? "disabled" : ""}
          >
            {isLoading ? (
              <i className="fa-solid fa-stop"></i>
            ) : (
              <i className="fa-solid fa-paper-plane"></i>
            )}
          </div>
        </div>
        <p className="info">
          Chatbot can make mistakes. Check important info. See cookie preferences.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
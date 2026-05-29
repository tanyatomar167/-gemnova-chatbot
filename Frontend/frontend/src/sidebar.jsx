import { useContext, useState } from "react";
import { MyContext } from "./MyContext";
import "./sidebar.css";

function Sidebar({ user, onLogout }) {
  const {
    threads,
    activeThreadId,
    setActiveThreadId,
    createNewThread,
    deleteThread,
  } = useContext(MyContext);

  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="sidebar">
      <div className="sidebar-top">
        <div className="top-bar">
          <img
            src="src/assets/blacklogo.png"
            alt="logo"
            className="logo"
          />
          <button
            className="icon-btn"
            onClick={createNewThread}
            title="New Chat"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>

        {threads.length > 0 && (
          <p className="history-label">Recent</p>
        )}

        <ul className="history">
          {threads.map((thread) => (
            <li
              key={thread.threadId}
              className={activeThreadId === thread.threadId ? "active" : ""}
              onClick={() => setActiveThreadId(thread.threadId)}
              onMouseEnter={() => setHoveredId(thread.threadId)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span className="thread-title">{thread.title}</span>
              {hoveredId === thread.threadId && (
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteThread(thread.threadId);
                  }}
                  title="Delete"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="sign">
        {user && <p>👤 {user.name}</p>}
        <button className="logout-btn" onClick={onLogout}>
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
        <p className="credit">by tanya tomar ♥</p>
      </div>
    </section>
  );
}

export default Sidebar;
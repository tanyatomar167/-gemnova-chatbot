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
    renameThread,
  } = useContext(MyContext);

  const [hoveredId, setHoveredId]   = useState(null);
  const [editingId, setEditingId]   = useState(null);
  const [editTitle, setEditTitle]   = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleRenameStart = (e, thread) => {
    e.stopPropagation();
    setEditingId(thread.threadId);
    setEditTitle(thread.title);
  };

  const handleRenameSubmit = async (threadId) => {
    if (editTitle.trim()) {
      await renameThread(threadId, editTitle.trim());
    }
    setEditingId(null);
  };

  const filteredThreads = threads.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="sidebar">
      <div className="sidebar-top">
        <div className="top-bar">
          <svg
            width="28" height="28" viewBox="0 0 41 41"
            fill="none" xmlns="http://www.w3.org/2000/svg"
            className="logo-svg"
          >
            <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.205-3.371 10.079 10.079 0 0 0-10.212 4.971 9.964 9.964 0 0 0-6.614 4.572 10.079 10.079 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.205 3.371 10.079 10.079 0 0 0 10.212-4.971 9.965 9.965 0 0 0 6.614-4.572 10.079 10.079 0 0 0-1.24-11.818zm-17.297 24.02a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.5zM4.661 29.807a7.474 7.474 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103L14.811 32.9a7.504 7.504 0 0 1-10.15-3.093zm-1.24-16.26A7.474 7.474 0 0 1 7.348 9.86l-.002.268v9.202a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.1 23.187a7.504 7.504 0 0 1-3.679-9.64zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l7.143 4.125a7.504 7.504 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.742-1.607zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l7.143-4.125a7.504 7.504 0 0 1 11.041 7.243zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.504 7.504 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.497v4.996l-4.331 2.5-4.331-2.5V18.927z" fill="currentColor"/>
          </svg>
          <div className="top-icons">
            <button className="icon-btn" onClick={() => setShowSearch(v => !v)} title="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button className="icon-btn" onClick={createNewThread} title="New Chat">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </div>

        {/* Search box */}
        {showSearch && (
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Search threads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="clear-search">
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        )}

        {filteredThreads.length > 0 && (
          <p className="history-label">
            {searchQuery ? `Results (${filteredThreads.length})` : "Recent"}
          </p>
        )}

        <ul className="history">
          {filteredThreads.map((thread) => (
            <li
              key={thread.threadId}
              className={activeThreadId === thread.threadId ? "active" : ""}
              onClick={() => editingId !== thread.threadId && setActiveThreadId(thread.threadId)}
              onMouseEnter={() => setHoveredId(thread.threadId)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {editingId === thread.threadId ? (
                // rename input
                <input
                  className="rename-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => handleRenameSubmit(thread.threadId)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRenameSubmit(thread.threadId);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  <span className="thread-title">{thread.title}</span>
                  {hoveredId === thread.threadId && (
                    <div className="thread-actions">
                      <button
                        className="action-btn"
                        onClick={(e) => handleRenameStart(e, thread)}
                        title="Rename"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteThread(thread.threadId);
                        }}
                        title="Delete"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}

          {filteredThreads.length === 0 && searchQuery && (
            <li className="no-results">No threads found</li>
          )}
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
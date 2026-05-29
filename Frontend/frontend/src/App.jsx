import "./App.css";
import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import ChatWindow from "./chatwindow";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // check if user already logged in
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // show login page if not logged in
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`main ${theme}`}>
      <Sidebar
        user={user}
        onLogout={handleLogout}
        theme={theme}
      />
      <ChatWindow
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}

export default App;
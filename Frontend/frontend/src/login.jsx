import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE = import.meta.env.VITE_API_URL || "";

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    const url = isRegister
      ? `${BASE}/api/auth/register`
      : `${BASE}/api/auth/login`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user);

    } catch (err) {
      setError("Something went wrong. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <div className="login-logo">🤖</div>
        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
        <p className="login-sub">
          {isRegister
            ? "Sign up to start chatting"
            : "Sign in to continue"}
        </p>

        {isRegister && (
          <input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onKeyDown={handleKeyDown}
          />
        )}

        <input
          placeholder="Email address"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        {error && <p className="login-error">⚠️ {error}</p>}

        <button
          className="login-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : isRegister ? "Sign Up" : "Sign In"}
        </button>

        <p className="login-switch">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}
          <span onClick={() => { setIsRegister((v) => !v); setError(""); }}>
            {isRegister ? " Sign In" : " Sign Up"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;
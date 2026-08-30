import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || data.message || "Login failed");
      return;
    }
    await login(data.token); // sets user in context
    navigate("/", { replace: true });
  }

  return (
    <main style={{ padding: 16, maxWidth: 320 }}>
      <h1>Log in</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
        />
        <button type="submit">Log in</button>
      </form>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <hr style={{ margin: "16px 0" }} />

      <a href="http://localhost:3000/api/auth/google">Continue with Google</a>
    </main>
  );
};

export default LoginPage;

import { useState } from "react";
import { login } from "../api";
import { useAuth } from "../context/AuthContext";

export default function LoginPage({ onSwitch }: { onSwitch: () => void }) {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      setAuth(data.token, data.family);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-hero">
          <div className="auth-pets">
            <span className="auth-pet a1">🐱</span>
            <span className="auth-pet a2">🐶</span>
            <span className="auth-pet a3">🐹</span>
          </div>
          <h1>Family Pet</h1>
          <p className="auth-tagline">Семейная игра с заданиями и питомцами</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-wrap">
            <span className="input-icon">📧</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrap">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" disabled={loading} className="auth-submit">
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <div className="auth-divider"><span>или</span></div>

        <button className="auth-alt-btn" onClick={onSwitch}>
          Создать семейный аккаунт
        </button>
      </div>
    </div>
  );
}

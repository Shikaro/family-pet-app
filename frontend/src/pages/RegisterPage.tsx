import { useState } from "react";
import { register } from "../api";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage({ onSwitch }: { onSwitch: () => void }) {
  const { setAuth } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 4) {
      setError("Пароль минимум 4 символа");
      return;
    }
    setLoading(true);
    try {
      const data = await register(name, email, password);
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
            <span className="auth-pet a1">🦕</span>
            <span className="auth-pet a2">🐰</span>
            <span className="auth-pet a3">🦜</span>
          </div>
          <h1>Family Pet</h1>
          <p className="auth-tagline">Создайте аккаунт для всей семьи</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-wrap">
            <span className="input-icon">👤</span>
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>
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
              placeholder="Пароль (мин. 4 символа)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={4}
              required
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" disabled={loading} className="auth-submit">
            {loading ? "Создание..." : "Создать аккаунт"}
          </button>
        </form>

        <div className="auth-divider"><span>или</span></div>

        <button className="auth-alt-btn" onClick={onSwitch}>
          Уже есть аккаунт? Войти
        </button>
      </div>
    </div>
  );
}

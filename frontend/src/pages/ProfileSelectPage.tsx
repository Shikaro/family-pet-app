import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import { addChild, initTasks } from "../api";
import { Child } from "../types";

export default function ProfileSelectPage() {
  const { family, logout, refreshFamily } = useAuth();
  const { setDashboardMode, setChildMode } = useProfile();
  const [showAddChild, setShowAddChild] = useState(false);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("5");
  const [childGender, setChildGender] = useState<"boy" | "girl">("boy");
  const [error, setError] = useState("");

  if (!family) return null;

  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await addChild(childName, parseInt(childAge), childGender);
      // Инициализируем задания при первом ребёнке
      if (family.children.length === 0) {
        await initTasks();
      }
      await refreshFamily();
      setShowAddChild(false);
      setChildName("");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="auth-logo">🐾</div>
        <h1>Привет, {family.parentName}!</h1>
        <p>Кто будет играть?</p>
      </div>

      <div className="profile-grid">
        {/* Кнопка родителя */}
        <button className="profile-card parent-card" onClick={() => setDashboardMode()}>
          <div className="profile-avatar" style={{ background: "#6366f1" }}>
            👨‍👩‍👧
          </div>
          <span>Родитель</span>
        </button>

        {/* Карточки детей */}
        {family.children.map((child: Child) => (
          <button
            key={child.id}
            className="profile-card child-card"
            onClick={() => setChildMode(child)}
          >
            <div className="profile-avatar" style={{ background: child.avatarColor }}>
              {child.gender === "boy" ? "👦" : "👧"}
            </div>
            <span>{child.name}</span>
            <small>{child.age} лет</small>
          </button>
        ))}

        {/* Кнопка добавления ребёнка */}
        <button className="profile-card add-card" onClick={() => setShowAddChild(true)}>
          <div className="profile-avatar add-avatar">+</div>
          <span>Добавить ребёнка</span>
        </button>
      </div>

      {/* Форма добавления ребёнка */}
      {showAddChild && (
        <div className="modal-overlay" onClick={() => setShowAddChild(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Добавить ребёнка</h2>
            <form onSubmit={handleAddChild}>
              <input
                type="text"
                placeholder="Имя ребёнка"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                required
                autoFocus
              />
              <div className="form-row">
                <label>
                  Возраст
                  <select value={childAge} onChange={(e) => setChildAge(e.target.value)}>
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((a) => (
                      <option key={a} value={a}>{a} лет</option>
                    ))}
                  </select>
                </label>
                <label>
                  Пол
                  <div className="gender-toggle">
                    <button
                      type="button"
                      className={childGender === "boy" ? "active" : ""}
                      onClick={() => setChildGender("boy")}
                    >
                      👦 Мальчик
                    </button>
                    <button
                      type="button"
                      className={childGender === "girl" ? "active" : ""}
                      onClick={() => setChildGender("girl")}
                    >
                      👧 Девочка
                    </button>
                  </div>
                </label>
              </div>
              {error && <p className="auth-error">{error}</p>}
              <button type="submit">Добавить</button>
            </form>
          </div>
        </div>
      )}

      <button className="logout-btn" onClick={logout}>Выйти</button>
    </div>
  );
}

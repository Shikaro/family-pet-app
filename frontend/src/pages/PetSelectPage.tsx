import { useState } from "react";
import { choosePet } from "../api";
import { PetType } from "../types";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";

const PETS: { type: PetType; emoji: string; name: string }[] = [
  { type: "cat", emoji: "🐱", name: "Котёнок" },
  { type: "dog", emoji: "🐶", name: "Щенок" },
  { type: "hamster", emoji: "🐹", name: "Хомячок" },
  { type: "parrot", emoji: "🦜", name: "Попугай" },
  { type: "rabbit", emoji: "🐰", name: "Кролик" },
  { type: "turtle", emoji: "🐢", name: "Черепашка" },
];

export default function PetSelectPage({ onDone }: { onDone: () => void }) {
  const { refreshFamily } = useAuth();
  const { activeChild } = useProfile();
  const [selected, setSelected] = useState<PetType | null>(null);
  const [petName, setPetName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!activeChild) return null;

  const handleChoose = async () => {
    if (!selected || !petName.trim()) return;
    setLoading(true);
    setError("");
    try {
      await choosePet(activeChild.id, selected, petName.trim());
      await refreshFamily();
      onDone();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pet-select-page">
      <h1>Выбери питомца!</h1>
      <p className="pet-select-subtitle">
        {activeChild.name}, кого ты хочешь завести?
      </p>

      <div className="pet-select-grid">
        {PETS.map((pet) => (
          <button
            key={pet.type}
            className={`pet-option ${selected === pet.type ? "selected" : ""}`}
            onClick={() => setSelected(pet.type)}
          >
            <span className="pet-option-emoji">{pet.emoji}</span>
            <span className="pet-option-name">{pet.name}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="pet-name-form">
          <input
            type="text"
            placeholder="Придумай имя питомцу"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            maxLength={20}
            autoFocus
          />
          {error && <p className="auth-error">{error}</p>}
          <button onClick={handleChoose} disabled={loading || !petName.trim()}>
            {loading ? "..." : `Назвать ${PETS.find((p) => p.type === selected)?.emoji}`}
          </button>
        </div>
      )}
    </div>
  );
}

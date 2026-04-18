import { useState } from "react";
import { Pet } from "../types";
import { playCorrect, playWrong, playCoins } from "../utils/sounds";
import { getQuestions } from "../data/lesson-questions";

type LessonType = "colors" | "letters" | "counting" | "shapes" | "animals" | "words";

interface Question {
  text: string;
  options: { label: string; emoji: string }[];
  correct: number;
  illustration: string;
}

const PET_EMOJIS: Record<string, string> = {
  cat: "🐱", dog: "🐶", hamster: "🐹", parrot: "🦜", rabbit: "🐰", turtle: "🐢", dino: "🦕",
};

const PET_PHRASES_CORRECT = [
  "Ура! Правильно!", "Молодчина!", "Так держать!", "Ты супер!",
  "Круто!", "Верно!", "Точно!", "Отлично!", "Вау!", "Класс!",
  "Ты гений!", "Браво!", "Здорово!", "Умница!",
];
const PET_PHRASES_WRONG = [
  "Попробуй ещё!", "Почти!", "Ничего, бывает!", "Давай ещё раз!",
  "Не сдавайся!", "В следующий раз!", "Ты справишься!",
];

function randomPhrase(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const LESSON_TYPES: { type: LessonType; emoji: string; label: string; minAge: number }[] = [
  { type: "colors", emoji: "🎨", label: "Цвета", minAge: 2 },
  { type: "shapes", emoji: "🔷", label: "Фигуры", minAge: 2 },
  { type: "counting", emoji: "🔢", label: "Счёт", minAge: 2 },
  { type: "animals", emoji: "🐾", label: "Животные", minAge: 2 },
  { type: "letters", emoji: "🔤", label: "Буквы", minAge: 4 },
  { type: "words", emoji: "📖", label: "Чтение", minAge: 5 },
];

interface Props {
  pet: Pet;
  childAge: number;
  onEarnCoins: (amount: number) => void;
  onClose: () => void;
}

export default function LessonGame({ pet, childAge, onEarnCoins, onClose }: Props) {
  const [selectedType, setSelectedType] = useState<LessonType | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [petPhrase, setPetPhrase] = useState<string | null>(null);

  const petEmoji = PET_EMOJIS[pet.type] || "🐾";
  const ageGroup = childAge <= 4 ? "2-4" : childAge <= 7 ? "5-7" : "8-10";
  const isToddler = ageGroup === "2-4";
  const availableLessons = LESSON_TYPES.filter((l) => childAge >= l.minAge);

  const startLesson = (type: LessonType) => {
    setSelectedType(type);
    // Берём 5 рандомных из банка 50+
    const qs = getQuestions(type, ageGroup, 5);
    setQuestions(qs);
    setCurrent(0);
    setScore(0);
    setAnswered(null);
    setFinished(false);
    setPetPhrase(null);
  };

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);

    const isCorrect = idx === questions[current].correct;
    if (isCorrect) {
      setScore((s) => s + 1);
      setPetPhrase(randomPhrase(PET_PHRASES_CORRECT));
      playCorrect();
      if (navigator.vibrate) navigator.vibrate(50);
    } else {
      setPetPhrase(randomPhrase(PET_PHRASES_WRONG));
      playWrong();
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    }

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
        const earned = score + (isCorrect ? 1 : 0);
        if (earned > 0) {
          playCoins();
          onEarnCoins(earned);
        }
      } else {
        setCurrent((c) => c + 1);
        setAnswered(null);
        setPetPhrase(null);
      }
    }, 1200);
  };

  // Экран выбора урока
  if (!selectedType) {
    return (
      <div className="lesson-page">
        <div className="lesson-header">
          <button className="back-btn" onClick={onClose}>←</button>
          <h2>Учимся с {pet.name}!</h2>
        </div>

        <div className="lesson-pet-says">
          <span className="lesson-pet-emoji">{petEmoji}</span>
          <div className="lesson-bubble">
            Привет! Давай поиграем и поучимся? Выбирай!
          </div>
        </div>

        <div className="lesson-type-grid">
          {availableLessons.map((l) => (
            <button
              key={l.type}
              className="lesson-type-btn"
              onClick={() => startLesson(l.type)}
            >
              <span className="lesson-type-emoji">{l.emoji}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Экран результатов
  if (finished) {
    const perfect = score === questions.length;
    return (
      <div className="lesson-page">
        <div className="lesson-result">
          <span className="lesson-result-pet">{petEmoji}</span>
          <h2>{perfect ? "Отлично!!!" : score > 2 ? "Молодец!" : "Хорошая попытка!"}</h2>
          <p className="lesson-result-score">
            {score} из {questions.length} правильно
          </p>
          {score > 0 && (
            <p className="lesson-result-coins">+{score} 🪙</p>
          )}
          <div className="lesson-result-actions">
            <button onClick={() => startLesson(selectedType)}>Ещё раз</button>
            <button onClick={() => setSelectedType(null)} className="secondary">Другой урок</button>
            <button onClick={onClose} className="secondary">Назад</button>
          </div>
        </div>
      </div>
    );
  }

  // Экран вопроса
  const q = questions[current];
  return (
    <div className="lesson-page">
      <div className="lesson-progress">
        <div className="lesson-progress-bar">
          <div
            className="lesson-progress-fill"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span>{current + 1}/{questions.length}</span>
      </div>

      <div className="lesson-question">
        <div className="lesson-pet-mini">{petEmoji}</div>
        {petPhrase && <div className="lesson-pet-speech">{petPhrase}</div>}
        <h2>{q.text}</h2>
        <div className="lesson-illustration">{q.illustration}</div>
      </div>

      <div className={`lesson-options ${isToddler ? "toddler-grid" : ""}`}>
        {q.options.map((opt, idx) => {
          let cls = "lesson-option";
          if (answered !== null) {
            if (idx === q.correct) cls += " correct";
            else if (idx === answered) cls += " wrong";
          }
          return (
            <button
              key={idx}
              className={cls}
              onClick={() => handleAnswer(idx)}
              disabled={answered !== null}
            >
              {isToddler ? (
                <span className="option-emoji-big">{opt.emoji}</span>
              ) : (
                <>
                  <span className="option-emoji">{opt.emoji}</span>
                  <span className="option-label">{opt.label}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

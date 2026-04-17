import { useState, useEffect } from "react";
import { Pet } from "../types";

type LessonType = "colors" | "letters" | "counting" | "shapes" | "animals" | "words";

interface Question {
  text: string;
  options: string[];
  correct: number;
  illustration: string;
}

const PET_EMOJIS: Record<string, string> = {
  cat: "🐱", dog: "🐶", hamster: "🐹", parrot: "🦜", rabbit: "🐰", turtle: "🐢",
};

// Генерация вопросов по типу и возрасту
function generateQuestions(type: LessonType, ageGroup: string): Question[] {
  if (type === "colors") {
    const colors = [
      { name: "Красный", emoji: "🔴", options: ["Красный", "Синий", "Зелёный", "Жёлтый"] },
      { name: "Синий", emoji: "🔵", options: ["Жёлтый", "Синий", "Красный", "Зелёный"] },
      { name: "Зелёный", emoji: "🟢", options: ["Красный", "Жёлтый", "Зелёный", "Синий"] },
      { name: "Жёлтый", emoji: "🟡", options: ["Зелёный", "Синий", "Красный", "Жёлтый"] },
      { name: "Оранжевый", emoji: "🟠", options: ["Фиолетовый", "Оранжевый", "Синий", "Зелёный"] },
    ];
    return colors.map((c) => ({
      text: "Какой это цвет?",
      illustration: c.emoji,
      options: c.options,
      correct: c.options.indexOf(c.name),
    }));
  }

  if (type === "letters") {
    const letters = [
      { letter: "А", options: ["О", "А", "У", "Э"] },
      { letter: "Б", options: ["Б", "В", "Г", "Д"] },
      { letter: "М", options: ["Н", "Л", "М", "К"] },
      { letter: "Р", options: ["Р", "П", "Т", "Ф"] },
      { letter: "К", options: ["Х", "Ж", "Ш", "К"] },
    ];
    return letters.map((l) => ({
      text: "Найди букву",
      illustration: l.letter,
      options: l.options,
      correct: l.options.indexOf(l.letter),
    }));
  }

  if (type === "counting") {
    const questions = [
      { count: 3, emoji: "🍎", options: ["2", "3", "4", "5"] },
      { count: 5, emoji: "⭐", options: ["3", "4", "5", "6"] },
      { count: 2, emoji: "🐟", options: ["1", "2", "3", "4"] },
      { count: 4, emoji: "🌸", options: ["3", "5", "4", "2"] },
      { count: 1, emoji: "🦋", options: ["2", "3", "1", "4"] },
    ];
    return questions.map((q) => ({
      text: "Сколько здесь?",
      illustration: Array(q.count).fill(q.emoji).join(" "),
      options: q.options,
      correct: q.options.indexOf(String(q.count)),
    }));
  }

  if (type === "shapes") {
    const shapes = [
      { name: "Круг", emoji: "⚫", options: ["Квадрат", "Круг", "Треугольник", "Звезда"] },
      { name: "Квадрат", emoji: "⬛", options: ["Квадрат", "Круг", "Ромб", "Овал"] },
      { name: "Треугольник", emoji: "🔺", options: ["Круг", "Звезда", "Треугольник", "Квадрат"] },
      { name: "Звезда", emoji: "⭐", options: ["Звезда", "Круг", "Сердце", "Ромб"] },
      { name: "Сердце", emoji: "❤️", options: ["Звезда", "Круг", "Ромб", "Сердце"] },
    ];
    return shapes.map((s) => ({
      text: "Что это за фигура?",
      illustration: s.emoji,
      options: s.options,
      correct: s.options.indexOf(s.name),
    }));
  }

  if (type === "animals") {
    const animals = [
      { name: "Мяу!", emoji: "🐱", options: ["Собака", "Кошка", "Птица", "Рыба"] },
      { name: "Гав!", emoji: "🐶", options: ["Кошка", "Собака", "Корова", "Лошадь"] },
      { name: "Му-у!", emoji: "🐮", options: ["Свинья", "Овца", "Корова", "Коза"] },
      { name: "Ква-ква!", emoji: "🐸", options: ["Рыба", "Змея", "Лягушка", "Черепаха"] },
      { name: "Ко-ко-ко!", emoji: "🐔", options: ["Утка", "Курица", "Гусь", "Попугай"] },
    ];
    return animals.map((a) => ({
      text: `Кто говорит "${a.name}"?`,
      illustration: a.emoji,
      options: a.options,
      correct: a.options.indexOf(a.options.find((_, i) => i === (
        a.name === "Мяу!" ? 1 : a.name === "Гав!" ? 1 : a.name === "Му-у!" ? 2 : a.name === "Ква-ква!" ? 2 : 1
      ))!),
    }));
  }

  // words (5-7, 8-10)
  const words = [
    { word: "МА-МА", options: ["Мама", "Папа", "Баба", "Деда"] },
    { word: "КО-Т", options: ["Дом", "Кот", "Сон", "Лес"] },
    { word: "ДО-М", options: ["Дом", "Сом", "Лом", "Ком"] },
    { word: "СО-Н", options: ["Дым", "Сон", "Лён", "Тон"] },
    { word: "ЛЕ-С", options: ["Бес", "Пёс", "Лес", "Рис"] },
  ];
  return words.map((w) => ({
    text: "Прочитай слово:",
    illustration: w.word,
    options: w.options,
    correct: w.options.indexOf(w.options.find((o) => o === (
      w.word === "МА-МА" ? "Мама" : w.word === "КО-Т" ? "Кот" : w.word === "ДО-М" ? "Дом" : w.word === "СО-Н" ? "Сон" : "Лес"
    ))!),
  }));
}

const LESSON_TYPES: { type: LessonType; emoji: string; label: string; minAge: number }[] = [
  { type: "colors", emoji: "🎨", label: "Цвета", minAge: 2 },
  { type: "shapes", emoji: "🔷", label: "Фигуры", minAge: 2 },
  { type: "counting", emoji: "🔢", label: "Счёт", minAge: 2 },
  { type: "animals", emoji: "🐾", label: "Звуки", minAge: 2 },
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

  const petEmoji = PET_EMOJIS[pet.type] || "🐾";
  const ageGroup = childAge <= 4 ? "2-4" : childAge <= 7 ? "5-7" : "8-10";
  const availableLessons = LESSON_TYPES.filter((l) => childAge >= l.minAge);

  const startLesson = (type: LessonType) => {
    setSelectedType(type);
    const qs = generateQuestions(type, ageGroup);
    // Перемешиваем и берём 5
    setQuestions(qs.sort(() => Math.random() - 0.5).slice(0, 5));
    setCurrent(0);
    setScore(0);
    setAnswered(null);
    setFinished(false);
  };

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);

    const isCorrect = idx === questions[current].correct;
    if (isCorrect) {
      setScore((s) => s + 1);
      if (navigator.vibrate) navigator.vibrate(50);
    } else {
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    }

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
        const earned = score + (isCorrect ? 1 : 0);
        if (earned > 0) onEarnCoins(earned);
      } else {
        setCurrent((c) => c + 1);
        setAnswered(null);
      }
    }, 1000);
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
            Привет! Давай поиграем и поучимся? Выбирай, что хочешь!
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
            <p className="lesson-result-coins">+{score} 🪙 заработано!</p>
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
        <h2>{q.text}</h2>
        <div className="lesson-illustration">{q.illustration}</div>
      </div>

      <div className="lesson-options">
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
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

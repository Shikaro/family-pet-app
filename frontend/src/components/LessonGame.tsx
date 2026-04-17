import { useState } from "react";
import { Pet } from "../types";
import { playCorrect, playWrong, playCoins } from "../utils/sounds";

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
  "Круто!", "Верно!", "Точно!", "Отлично!",
];
const PET_PHRASES_WRONG = [
  "Попробуй ещё!", "Почти!", "Ничего, бывает!", "Давай ещё раз!",
];

function randomPhrase(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Генерация вопросов — для малышей (2-4) ответы ТОЛЬКО эмодзи
function generateQuestions(type: LessonType, ageGroup: string): Question[] {
  const isToddler = ageGroup === "2-4";

  if (type === "colors") {
    const colors = [
      { name: "Красный", emoji: "🔴", others: [
        { label: "Синий", emoji: "🔵" }, { label: "Зелёный", emoji: "🟢" }, { label: "Жёлтый", emoji: "🟡" }
      ]},
      { name: "Синий", emoji: "🔵", others: [
        { label: "Красный", emoji: "🔴" }, { label: "Зелёный", emoji: "🟢" }, { label: "Жёлтый", emoji: "🟡" }
      ]},
      { name: "Зелёный", emoji: "🟢", others: [
        { label: "Красный", emoji: "🔴" }, { label: "Синий", emoji: "🔵" }, { label: "Оранжевый", emoji: "🟠" }
      ]},
      { name: "Жёлтый", emoji: "🟡", others: [
        { label: "Красный", emoji: "🔴" }, { label: "Синий", emoji: "🔵" }, { label: "Зелёный", emoji: "🟢" }
      ]},
      { name: "Оранжевый", emoji: "🟠", others: [
        { label: "Фиолетовый", emoji: "🟣" }, { label: "Синий", emoji: "🔵" }, { label: "Зелёный", emoji: "🟢" }
      ]},
      { name: "Фиолетовый", emoji: "🟣", others: [
        { label: "Красный", emoji: "🔴" }, { label: "Оранжевый", emoji: "🟠" }, { label: "Зелёный", emoji: "🟢" }
      ]},
    ];
    return colors.map((c) => {
      const correctOpt = { label: c.name, emoji: c.emoji };
      const shuffled = [...c.others];
      const correctIdx = Math.floor(Math.random() * 4);
      shuffled.splice(correctIdx, 0, correctOpt);
      return {
        text: isToddler ? "Найди такой же!" : "Какой это цвет?",
        illustration: c.emoji,
        options: shuffled,
        correct: correctIdx,
      };
    });
  }

  if (type === "shapes") {
    const shapes = [
      { name: "Круг", emoji: "⚫", visual: "🔵", others: [
        { label: "Квадрат", emoji: "⬛" }, { label: "Треугольник", emoji: "🔺" }, { label: "Звезда", emoji: "⭐" }
      ]},
      { name: "Квадрат", emoji: "⬛", visual: "🟦", others: [
        { label: "Круг", emoji: "⚫" }, { label: "Треугольник", emoji: "🔺" }, { label: "Сердце", emoji: "❤️" }
      ]},
      { name: "Треугольник", emoji: "🔺", visual: "🔺", others: [
        { label: "Круг", emoji: "⚫" }, { label: "Квадрат", emoji: "⬛" }, { label: "Звезда", emoji: "⭐" }
      ]},
      { name: "Звезда", emoji: "⭐", visual: "⭐", others: [
        { label: "Круг", emoji: "⚫" }, { label: "Сердце", emoji: "❤️" }, { label: "Ромб", emoji: "🔷" }
      ]},
      { name: "Сердце", emoji: "❤️", visual: "❤️", others: [
        { label: "Звезда", emoji: "⭐" }, { label: "Круг", emoji: "⚫" }, { label: "Ромб", emoji: "🔷" }
      ]},
      { name: "Ромб", emoji: "🔷", visual: "🔷", others: [
        { label: "Круг", emoji: "⚫" }, { label: "Квадрат", emoji: "⬛" }, { label: "Треугольник", emoji: "🔺" }
      ]},
    ];
    return shapes.map((s) => {
      const correctOpt = { label: s.name, emoji: s.emoji };
      const shuffled = [...s.others];
      const correctIdx = Math.floor(Math.random() * 4);
      shuffled.splice(correctIdx, 0, correctOpt);
      return {
        text: isToddler ? "Найди такую же фигуру!" : "Что это за фигура?",
        illustration: s.visual,
        options: shuffled,
        correct: correctIdx,
      };
    });
  }

  if (type === "counting") {
    const items = [
      { count: 1, emoji: "🦋" },
      { count: 2, emoji: "🐟" },
      { count: 3, emoji: "🍎" },
      { count: 4, emoji: "🌸" },
      { count: 5, emoji: "⭐" },
    ];
    return items.map((q) => {
      const correct = String(q.count);
      const allNums = ["1", "2", "3", "4", "5"].filter((n) => n !== correct);
      const others = allNums.sort(() => Math.random() - 0.5).slice(0, 3);
      const correctIdx = Math.floor(Math.random() * 4);
      others.splice(correctIdx, 0, correct);
      return {
        text: "Сколько здесь?",
        illustration: Array(q.count).fill(q.emoji).join(" "),
        options: others.map((n) => ({
          label: n,
          emoji: isToddler ? Array(Number(n)).fill("●").join("") : n,
        })),
        correct: correctIdx,
      };
    });
  }

  if (type === "animals") {
    const animals = [
      { sound: "Мяу!", answer: "Кошка", emoji: "🐱", others: [
        { label: "Собака", emoji: "🐶" }, { label: "Птица", emoji: "🐦" }, { label: "Рыба", emoji: "🐟" }
      ]},
      { sound: "Гав!", answer: "Собака", emoji: "🐶", others: [
        { label: "Кошка", emoji: "🐱" }, { label: "Корова", emoji: "🐮" }, { label: "Лошадь", emoji: "🐴" }
      ]},
      { sound: "Му-у!", answer: "Корова", emoji: "🐮", others: [
        { label: "Свинья", emoji: "🐷" }, { label: "Овца", emoji: "🐑" }, { label: "Коза", emoji: "🐐" }
      ]},
      { sound: "Ква-ква!", answer: "Лягушка", emoji: "🐸", others: [
        { label: "Рыба", emoji: "🐟" }, { label: "Змея", emoji: "🐍" }, { label: "Черепаха", emoji: "🐢" }
      ]},
      { sound: "Ко-ко-ко!", answer: "Курица", emoji: "🐔", others: [
        { label: "Утка", emoji: "🦆" }, { label: "Гусь", emoji: "🪿" }, { label: "Попугай", emoji: "🦜" }
      ]},
      { sound: "Хрю-хрю!", answer: "Свинья", emoji: "🐷", others: [
        { label: "Корова", emoji: "🐮" }, { label: "Собака", emoji: "🐶" }, { label: "Коза", emoji: "🐐" }
      ]},
    ];
    return animals.map((a) => {
      const correctOpt = { label: a.answer, emoji: a.emoji };
      const shuffled = [...a.others];
      const correctIdx = Math.floor(Math.random() * 4);
      shuffled.splice(correctIdx, 0, correctOpt);
      return {
        text: `Кто говорит "${a.sound}"?`,
        illustration: "❓",
        options: shuffled,
        correct: correctIdx,
      };
    });
  }

  if (type === "letters") {
    const letters = [
      { letter: "А", options: ["О", "А", "У", "Э"] },
      { letter: "Б", options: ["Б", "В", "Г", "Д"] },
      { letter: "М", options: ["Н", "Л", "М", "К"] },
      { letter: "Р", options: ["Р", "П", "Т", "Ф"] },
      { letter: "К", options: ["Х", "Ж", "Ш", "К"] },
      { letter: "О", options: ["С", "О", "Э", "Ю"] },
      { letter: "Д", options: ["Д", "Б", "Л", "Г"] },
    ];
    return letters.map((l) => ({
      text: "Найди букву",
      illustration: l.letter,
      options: l.options.map((o) => ({ label: o, emoji: o })),
      correct: l.options.indexOf(l.letter),
    }));
  }

  // words (5-7, 8-10)
  const words = [
    { word: "МА-МА", answer: "Мама", options: ["Мама", "Папа", "Баба", "Деда"] },
    { word: "КО-Т", answer: "Кот", options: ["Дом", "Кот", "Сон", "Лес"] },
    { word: "ДО-М", answer: "Дом", options: ["Дом", "Сом", "Лом", "Ком"] },
    { word: "СО-Н", answer: "Сон", options: ["Дым", "Сон", "Лён", "Тон"] },
    { word: "ЛЕ-С", answer: "Лес", options: ["Бес", "Пёс", "Лес", "Рис"] },
    { word: "РЫ-БА", answer: "Рыба", options: ["Рыба", "Жаба", "Шуба", "Губа"] },
  ];
  return words.map((w) => ({
    text: "Прочитай слово:",
    illustration: w.word,
    options: w.options.map((o) => ({ label: o, emoji: o })),
    correct: w.options.indexOf(w.answer),
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
  const [petPhrase, setPetPhrase] = useState<string | null>(null);

  const petEmoji = PET_EMOJIS[pet.type] || "🐾";
  const ageGroup = childAge <= 4 ? "2-4" : childAge <= 7 ? "5-7" : "8-10";
  const isToddler = ageGroup === "2-4";
  const availableLessons = LESSON_TYPES.filter((l) => childAge >= l.minAge);

  const startLesson = (type: LessonType) => {
    setSelectedType(type);
    const qs = generateQuestions(type, ageGroup);
    setQuestions(qs.sort(() => Math.random() - 0.5).slice(0, 5));
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

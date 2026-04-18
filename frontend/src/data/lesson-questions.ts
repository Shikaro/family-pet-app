// Банк вопросов для уроков — 50+ на категорию на возраст
// Формат: { text, illustration, correct (индекс), options: [{label, emoji}] }

interface QuestionData {
  text: string;
  illustration: string;
  options: { label: string; emoji: string }[];
  correct: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Утилита: генерирует вопрос "найди цвет" с рандомными отвлекателями
function colorQ(name: string, emoji: string, allColors: {l: string; e: string}[], isToddler: boolean): QuestionData {
  const others = shuffle(allColors.filter(c => c.e !== emoji)).slice(0, 3);
  const opts = others.map(c => ({ label: c.l, emoji: c.e }));
  const idx = Math.floor(Math.random() * 4);
  opts.splice(idx, 0, { label: name, emoji });
  return {
    text: isToddler ? "Найди такой же!" : "Какой это цвет?",
    illustration: emoji,
    options: opts,
    correct: idx,
  };
}

// === ЦВЕТА ===
const ALL_COLORS = [
  { l: "Красный", e: "🔴" }, { l: "Синий", e: "🔵" }, { l: "Зелёный", e: "🟢" },
  { l: "Жёлтый", e: "🟡" }, { l: "Оранжевый", e: "🟠" }, { l: "Фиолетовый", e: "🟣" },
  { l: "Коричневый", e: "🟤" }, { l: "Чёрный", e: "⚫" }, { l: "Белый", e: "⚪" },
];

// Объекты определённых цветов для вопроса "Какого цвета?"
const COLOR_OBJECTS_TODDLER = [
  { obj: "🍎", color: "Красный", colorEmoji: "🔴" },
  { obj: "🍊", color: "Оранжевый", colorEmoji: "🟠" },
  { obj: "🍋", color: "Жёлтый", colorEmoji: "🟡" },
  { obj: "🍏", color: "Зелёный", colorEmoji: "🟢" },
  { obj: "🫐", color: "Синий", colorEmoji: "🔵" },
  { obj: "🍇", color: "Фиолетовый", colorEmoji: "🟣" },
  { obj: "🍫", color: "Коричневый", colorEmoji: "🟤" },
  { obj: "🌑", color: "Чёрный", colorEmoji: "⚫" },
  { obj: "☁️", color: "Белый", colorEmoji: "⚪" },
  { obj: "🍓", color: "Красный", colorEmoji: "🔴" },
  { obj: "🥕", color: "Оранжевый", colorEmoji: "🟠" },
  { obj: "🌻", color: "Жёлтый", colorEmoji: "🟡" },
  { obj: "🥒", color: "Зелёный", colorEmoji: "🟢" },
  { obj: "🧊", color: "Синий", colorEmoji: "🔵" },
  { obj: "🍆", color: "Фиолетовый", colorEmoji: "🟣" },
  { obj: "🐻", color: "Коричневый", colorEmoji: "🟤" },
  { obj: "🐧", color: "Чёрный", colorEmoji: "⚫" },
  { obj: "🐑", color: "Белый", colorEmoji: "⚪" },
  { obj: "🌹", color: "Красный", colorEmoji: "🔴" },
  { obj: "🎃", color: "Оранжевый", colorEmoji: "🟠" },
  { obj: "⭐", color: "Жёлтый", colorEmoji: "🟡" },
  { obj: "🐸", color: "Зелёный", colorEmoji: "🟢" },
  { obj: "🐳", color: "Синий", colorEmoji: "🔵" },
  { obj: "🦄", color: "Фиолетовый", colorEmoji: "🟣" },
  { obj: "🍩", color: "Коричневый", colorEmoji: "🟤" },
  { obj: "🕷️", color: "Чёрный", colorEmoji: "⚫" },
  { obj: "❄️", color: "Белый", colorEmoji: "⚪" },
  { obj: "🚗", color: "Красный", colorEmoji: "🔴" },
  { obj: "🔥", color: "Оранжевый", colorEmoji: "🟠" },
  { obj: "🌕", color: "Жёлтый", colorEmoji: "🟡" },
  { obj: "🌿", color: "Зелёный", colorEmoji: "🟢" },
  { obj: "💎", color: "Синий", colorEmoji: "🔵" },
  { obj: "🔮", color: "Фиолетовый", colorEmoji: "🟣" },
  { obj: "🥜", color: "Коричневый", colorEmoji: "🟤" },
  { obj: "🎱", color: "Чёрный", colorEmoji: "⚫" },
  { obj: "🥛", color: "Белый", colorEmoji: "⚪" },
  { obj: "🍒", color: "Красный", colorEmoji: "🔴" },
  { obj: "🏀", color: "Оранжевый", colorEmoji: "🟠" },
  { obj: "🧀", color: "Жёлтый", colorEmoji: "🟡" },
  { obj: "🥝", color: "Зелёный", colorEmoji: "🟢" },
  { obj: "🧿", color: "Синий", colorEmoji: "🔵" },
  { obj: "🪻", color: "Фиолетовый", colorEmoji: "🟣" },
  { obj: "🌰", color: "Коричневый", colorEmoji: "🟤" },
  { obj: "🖤", color: "Чёрный", colorEmoji: "⚫" },
  { obj: "🤍", color: "Белый", colorEmoji: "⚪" },
  { obj: "❤️", color: "Красный", colorEmoji: "🔴" },
  { obj: "🧡", color: "Оранжевый", colorEmoji: "🟠" },
  { obj: "💛", color: "Жёлтый", colorEmoji: "🟡" },
  { obj: "💚", color: "Зелёный", colorEmoji: "🟢" },
  { obj: "💙", color: "Синий", colorEmoji: "🔵" },
];

export function getColorQuestions(ageGroup: string): QuestionData[] {
  const isToddler = ageGroup === "2-4";

  // Тип 1: Найди цвет — простой матчинг
  const basicColors = ALL_COLORS.map(c => colorQ(c.l, c.e, ALL_COLORS, isToddler));

  // Тип 2: Какого цвета объект?
  const objectColors = shuffle(COLOR_OBJECTS_TODDLER).map(obj => {
    const others = shuffle(ALL_COLORS.filter(c => c.e !== obj.colorEmoji)).slice(0, 3);
    const opts = others.map(c => ({ label: c.l, emoji: c.e }));
    const idx = Math.floor(Math.random() * 4);
    opts.splice(idx, 0, { label: obj.color, emoji: obj.colorEmoji });
    return {
      text: isToddler ? "Какого цвета?" : `Какого цвета ${obj.obj}?`,
      illustration: obj.obj,
      options: opts,
      correct: idx,
    };
  });

  return shuffle([...basicColors, ...objectColors]);
}

// === ФИГУРЫ ===
const SHAPES = [
  { name: "Круг", emoji: "⚫", visual: "🔵" },
  { name: "Квадрат", emoji: "⬛", visual: "🟦" },
  { name: "Треугольник", emoji: "🔺", visual: "🔺" },
  { name: "Звезда", emoji: "⭐", visual: "⭐" },
  { name: "Сердце", emoji: "❤️", visual: "❤️" },
  { name: "Ромб", emoji: "🔷", visual: "🔷" },
];

const SHAPE_OBJECTS = [
  { obj: "🍕", shape: "Треугольник", shapeEmoji: "🔺" },
  { obj: "⚽", shape: "Круг", shapeEmoji: "⚫" },
  { obj: "🎲", shape: "Квадрат", shapeEmoji: "⬛" },
  { obj: "💎", shape: "Ромб", shapeEmoji: "🔷" },
  { obj: "🌙", shape: "Круг", shapeEmoji: "⚫" },
  { obj: "🏠", shape: "Треугольник", shapeEmoji: "🔺" },
  { obj: "📺", shape: "Квадрат", shapeEmoji: "⬛" },
  { obj: "🌟", shape: "Звезда", shapeEmoji: "⭐" },
  { obj: "💜", shape: "Сердце", shapeEmoji: "❤️" },
  { obj: "🎯", shape: "Круг", shapeEmoji: "⚫" },
  { obj: "🪟", shape: "Квадрат", shapeEmoji: "⬛" },
  { obj: "🔔", shape: "Треугольник", shapeEmoji: "🔺" },
  { obj: "🌍", shape: "Круг", shapeEmoji: "⚫" },
  { obj: "📦", shape: "Квадрат", shapeEmoji: "⬛" },
  { obj: "🎄", shape: "Треугольник", shapeEmoji: "🔺" },
  { obj: "🧊", shape: "Квадрат", shapeEmoji: "⬛" },
  { obj: "🏀", shape: "Круг", shapeEmoji: "⚫" },
  { obj: "🎪", shape: "Треугольник", shapeEmoji: "🔺" },
  { obj: "🖼️", shape: "Квадрат", shapeEmoji: "⬛" },
  { obj: "⏰", shape: "Круг", shapeEmoji: "⚫" },
  { obj: "✨", shape: "Звезда", shapeEmoji: "⭐" },
  { obj: "💕", shape: "Сердце", shapeEmoji: "❤️" },
  { obj: "🪁", shape: "Ромб", shapeEmoji: "🔷" },
  { obj: "🚩", shape: "Треугольник", shapeEmoji: "🔺" },
  { obj: "🍳", shape: "Круг", shapeEmoji: "⚫" },
];

export function getShapeQuestions(ageGroup: string): QuestionData[] {
  const isToddler = ageGroup === "2-4";

  const basic = SHAPES.map(s => {
    const others = shuffle(SHAPES.filter(x => x.emoji !== s.emoji)).slice(0, 3);
    const opts = others.map(x => ({ label: x.name, emoji: x.emoji }));
    const idx = Math.floor(Math.random() * 4);
    opts.splice(idx, 0, { label: s.name, emoji: s.emoji });
    return {
      text: isToddler ? "Найди такую же фигуру!" : "Что это за фигура?",
      illustration: s.visual,
      options: opts,
      correct: idx,
    };
  });

  const objects = shuffle(SHAPE_OBJECTS).map(obj => {
    const others = shuffle(SHAPES.filter(x => x.emoji !== obj.shapeEmoji)).slice(0, 3);
    const opts = others.map(x => ({ label: x.name, emoji: x.emoji }));
    const idx = Math.floor(Math.random() * 4);
    opts.splice(idx, 0, { label: obj.shape, emoji: obj.shapeEmoji });
    return {
      text: isToddler ? "На что похоже?" : `На какую фигуру похоже ${obj.obj}?`,
      illustration: obj.obj,
      options: opts,
      correct: idx,
    };
  });

  // Дополнительные: сколько сторон (для 5+)
  const sides: QuestionData[] = ageGroup !== "2-4" ? [
    { text: "Сколько сторон у треугольника?", illustration: "🔺", options: [
      {label:"2",emoji:"2"},{label:"3",emoji:"3"},{label:"4",emoji:"4"},{label:"5",emoji:"5"}
    ], correct: 1 },
    { text: "Сколько сторон у квадрата?", illustration: "⬛", options: [
      {label:"3",emoji:"3"},{label:"4",emoji:"4"},{label:"5",emoji:"5"},{label:"6",emoji:"6"}
    ], correct: 1 },
    { text: "Сколько углов у треугольника?", illustration: "🔺", options: [
      {label:"2",emoji:"2"},{label:"3",emoji:"3"},{label:"4",emoji:"4"},{label:"5",emoji:"5"}
    ], correct: 1 },
    { text: "Сколько углов у квадрата?", illustration: "⬛", options: [
      {label:"3",emoji:"3"},{label:"4",emoji:"4"},{label:"5",emoji:"5"},{label:"6",emoji:"6"}
    ], correct: 1 },
    { text: "У какой фигуры нет углов?", illustration: "❓", options: [
      {label:"Квадрат",emoji:"⬛"},{label:"Круг",emoji:"⚫"},{label:"Треугольник",emoji:"🔺"},{label:"Ромб",emoji:"🔷"}
    ], correct: 1 },
  ] : [];

  return shuffle([...basic, ...objects, ...sides]);
}

// === СЧЁТ ===
const COUNT_EMOJIS = ["🦋","🐟","🍎","🌸","⭐","🐞","🌈","🍀","🐝","🎈","🐣","🍭","🌺","🐠","🍕","🎵","🐌","🌻","🍪","🐛","🦊","🐸","🍒","🌽","🐙","🦀","🐬","🦋","🌷","🍄"];

function makeCountQ(count: number, emoji: string, isToddler: boolean, maxNum: number): QuestionData {
  const correct = String(count);
  const allNums: string[] = [];
  for (let i = 1; i <= maxNum; i++) allNums.push(String(i));
  const others = shuffle(allNums.filter(n => n !== correct)).slice(0, 3);
  const idx = Math.floor(Math.random() * 4);
  others.splice(idx, 0, correct);
  return {
    text: "Сколько здесь?",
    illustration: Array(count).fill(emoji).join(" "),
    options: others.map(n => ({
      label: n,
      emoji: isToddler ? Array(Number(n)).fill("●").join("") : n,
    })),
    correct: idx,
  };
}

export function getCountingQuestions(ageGroup: string): QuestionData[] {
  const isToddler = ageGroup === "2-4";
  const maxCount = ageGroup === "2-4" ? 5 : ageGroup === "5-7" ? 10 : 20;
  const maxNum = ageGroup === "2-4" ? 5 : ageGroup === "5-7" ? 10 : 20;
  const questions: QuestionData[] = [];

  // Простой счёт — много вариантов
  for (let i = 0; i < 30; i++) {
    const count = Math.floor(Math.random() * maxCount) + 1;
    const emoji = COUNT_EMOJIS[Math.floor(Math.random() * COUNT_EMOJIS.length)];
    questions.push(makeCountQ(count, emoji, isToddler, maxNum));
  }

  // Для 5+ — сложение
  if (ageGroup !== "2-4") {
    for (let i = 0; i < 15; i++) {
      const a = Math.floor(Math.random() * (maxCount / 2)) + 1;
      const b = Math.floor(Math.random() * (maxCount / 2)) + 1;
      const sum = a + b;
      const correct = String(sum);
      const others = shuffle(
        Array.from({length: maxNum}, (_, i) => String(i + 1)).filter(n => n !== correct)
      ).slice(0, 3);
      const idx = Math.floor(Math.random() * 4);
      others.splice(idx, 0, correct);
      questions.push({
        text: `${a} + ${b} = ?`,
        illustration: `${Array(a).fill("🔵").join("")} + ${Array(b).fill("🔴").join("")}`,
        options: others.map(n => ({ label: n, emoji: n })),
        correct: idx,
      });
    }
  }

  // Для 8+ — вычитание и умножение
  if (ageGroup === "8-10") {
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 15) + 5;
      const b = Math.floor(Math.random() * Math.min(a, 10)) + 1;
      const diff = a - b;
      const correct = String(diff);
      const others = shuffle(
        Array.from({length: 20}, (_, i) => String(i)).filter(n => n !== correct)
      ).slice(0, 3);
      const idx = Math.floor(Math.random() * 4);
      others.splice(idx, 0, correct);
      questions.push({
        text: `${a} − ${b} = ?`,
        illustration: "🧮",
        options: others.map(n => ({ label: n, emoji: n })),
        correct: idx,
      });
    }
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 5) + 2;
      const b = Math.floor(Math.random() * 5) + 2;
      const prod = a * b;
      const correct = String(prod);
      const others = shuffle(
        Array.from({length: 30}, (_, i) => String(i + 2)).filter(n => n !== correct)
      ).slice(0, 3);
      const idx = Math.floor(Math.random() * 4);
      others.splice(idx, 0, correct);
      questions.push({
        text: `${a} × ${b} = ?`,
        illustration: "✖️",
        options: others.map(n => ({ label: n, emoji: n })),
        correct: idx,
      });
    }
  }

  return shuffle(questions);
}

// === ЖИВОТНЫЕ ===
const ANIMAL_SOUNDS = [
  { sound: "Мяу!", answer: "Кошка", emoji: "🐱" },
  { sound: "Гав!", answer: "Собака", emoji: "🐶" },
  { sound: "Му-у!", answer: "Корова", emoji: "🐮" },
  { sound: "Ква-ква!", answer: "Лягушка", emoji: "🐸" },
  { sound: "Ко-ко-ко!", answer: "Курица", emoji: "🐔" },
  { sound: "Хрю-хрю!", answer: "Свинья", emoji: "🐷" },
  { sound: "Бе-е!", answer: "Овца", emoji: "🐑" },
  { sound: "Ме-е!", answer: "Коза", emoji: "🐐" },
  { sound: "И-го-го!", answer: "Лошадь", emoji: "🐴" },
  { sound: "Кря-кря!", answer: "Утка", emoji: "🦆" },
  { sound: "Га-га-га!", answer: "Гусь", emoji: "🪿" },
  { sound: "Чик-чирик!", answer: "Воробей", emoji: "🐦" },
  { sound: "Ку-ку!", answer: "Кукушка", emoji: "🐦‍⬛" },
  { sound: "Кар-кар!", answer: "Ворона", emoji: "🐦‍⬛" },
  { sound: "Ш-ш-ш!", answer: "Змея", emoji: "🐍" },
  { sound: "Ж-ж-ж!", answer: "Пчела", emoji: "🐝" },
  { sound: "Р-р-р!", answer: "Тигр", emoji: "🐯" },
  { sound: "У-у-у!", answer: "Волк", emoji: "🐺" },
];

const ALL_ANIMAL_EMOJIS = [
  { label: "Кошка", emoji: "🐱" }, { label: "Собака", emoji: "🐶" },
  { label: "Корова", emoji: "🐮" }, { label: "Лягушка", emoji: "🐸" },
  { label: "Курица", emoji: "🐔" }, { label: "Свинья", emoji: "🐷" },
  { label: "Овца", emoji: "🐑" }, { label: "Коза", emoji: "🐐" },
  { label: "Лошадь", emoji: "🐴" }, { label: "Утка", emoji: "🦆" },
  { label: "Змея", emoji: "🐍" }, { label: "Пчела", emoji: "🐝" },
  { label: "Тигр", emoji: "🐯" }, { label: "Волк", emoji: "🐺" },
  { label: "Рыба", emoji: "🐟" }, { label: "Черепаха", emoji: "🐢" },
  { label: "Птица", emoji: "🐦" }, { label: "Попугай", emoji: "🦜" },
  { label: "Медведь", emoji: "🐻" }, { label: "Кролик", emoji: "🐰" },
];

// Где живёт
const ANIMAL_HOMES = [
  { q: "Кто живёт в воде?", answer: "Рыба", emoji: "🐟" },
  { q: "Кто живёт в норе?", answer: "Кролик", emoji: "🐰" },
  { q: "Кто живёт в улье?", answer: "Пчела", emoji: "🐝" },
  { q: "Кто живёт в конюшне?", answer: "Лошадь", emoji: "🐴" },
  { q: "Кто живёт в берлоге?", answer: "Медведь", emoji: "🐻" },
  { q: "Кто живёт на ферме?", answer: "Корова", emoji: "🐮" },
  { q: "Кто плавает в пруду?", answer: "Утка", emoji: "🦆" },
  { q: "Кто ловит мышей?", answer: "Кошка", emoji: "🐱" },
  { q: "Кто охраняет дом?", answer: "Собака", emoji: "🐶" },
  { q: "Кто даёт молоко?", answer: "Корова", emoji: "🐮" },
  { q: "Кто даёт шерсть?", answer: "Овца", emoji: "🐑" },
  { q: "Кто несёт яйца?", answer: "Курица", emoji: "🐔" },
  { q: "У кого есть панцирь?", answer: "Черепаха", emoji: "🐢" },
  { q: "Кто ползает без ног?", answer: "Змея", emoji: "🐍" },
  { q: "У кого есть хобот?", answer: "Слон", emoji: "🐘" },
  { q: "Кто самый высокий?", answer: "Жираф", emoji: "🦒" },
  { q: "Кто прыгает по деревьям?", answer: "Обезьяна", emoji: "🐒" },
  { q: "Кто носит иголки?", answer: "Ёжик", emoji: "🦔" },
  { q: "У кого полоски?", answer: "Зебра", emoji: "🦓" },
  { q: "Кто спит зимой?", answer: "Медведь", emoji: "🐻" },
];

export function getAnimalQuestions(ageGroup: string): QuestionData[] {
  const questions: QuestionData[] = [];

  // Звуки животных
  for (const a of ANIMAL_SOUNDS) {
    const others = shuffle(ALL_ANIMAL_EMOJIS.filter(x => x.emoji !== a.emoji)).slice(0, 3);
    const opts = [...others];
    const idx = Math.floor(Math.random() * 4);
    opts.splice(idx, 0, { label: a.answer, emoji: a.emoji });
    questions.push({
      text: `Кто говорит "${a.sound}"?`,
      illustration: "❓",
      options: opts,
      correct: idx,
    });
  }

  // Где живёт / что делает
  const homeAnimals = [...ALL_ANIMAL_EMOJIS, {label:"Слон",emoji:"🐘"},{label:"Жираф",emoji:"🦒"},{label:"Обезьяна",emoji:"🐒"},{label:"Ёжик",emoji:"🦔"},{label:"Зебра",emoji:"🦓"}];

  for (const h of ANIMAL_HOMES) {
    const others = shuffle(homeAnimals.filter(x => x.emoji !== h.emoji)).slice(0, 3);
    const opts = [...others];
    const idx = Math.floor(Math.random() * 4);
    opts.splice(idx, 0, { label: h.answer, emoji: h.emoji });
    questions.push({
      text: h.q,
      illustration: "🏠",
      options: opts,
      correct: idx,
    });
  }

  // Детёныши (для 5+)
  if (ageGroup !== "2-4") {
    const babies = [
      { q: "Как зовут детёныша кошки?", answer: "Котёнок", emoji: "🐱", options: ["Щенок","Котёнок","Цыплёнок","Телёнок"] },
      { q: "Как зовут детёныша собаки?", answer: "Щенок", emoji: "🐶", options: ["Котёнок","Щенок","Жеребёнок","Поросёнок"] },
      { q: "Как зовут детёныша коровы?", answer: "Телёнок", emoji: "🐮", options: ["Телёнок","Ягнёнок","Козлёнок","Жеребёнок"] },
      { q: "Как зовут детёныша лошади?", answer: "Жеребёнок", emoji: "🐴", options: ["Телёнок","Щенок","Жеребёнок","Поросёнок"] },
      { q: "Как зовут детёныша свиньи?", answer: "Поросёнок", emoji: "🐷", options: ["Котёнок","Поросёнок","Телёнок","Цыплёнок"] },
      { q: "Как зовут детёныша курицы?", answer: "Цыплёнок", emoji: "🐔", options: ["Цыплёнок","Утёнок","Котёнок","Ягнёнок"] },
      { q: "Как зовут детёныша утки?", answer: "Утёнок", emoji: "🦆", options: ["Цыплёнок","Гусёнок","Утёнок","Совёнок"] },
      { q: "Как зовут детёныша овцы?", answer: "Ягнёнок", emoji: "🐑", options: ["Козлёнок","Ягнёнок","Телёнок","Поросёнок"] },
      { q: "Как зовут детёныша козы?", answer: "Козлёнок", emoji: "🐐", options: ["Ягнёнок","Телёнок","Козлёнок","Щенок"] },
      { q: "Как зовут детёныша медведя?", answer: "Медвежонок", emoji: "🐻", options: ["Волчонок","Медвежонок","Лисёнок","Тигрёнок"] },
    ];
    for (const b of babies) {
      const idx = b.options.indexOf(b.answer);
      questions.push({
        text: b.q,
        illustration: b.emoji,
        options: b.options.map(o => ({ label: o, emoji: o })),
        correct: idx,
      });
    }
  }

  return shuffle(questions);
}

// === БУКВЫ (4+) ===
const RUSSIAN_LETTERS = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ".split("");

const LETTER_OBJECTS: Record<string, {word: string; emoji: string}[]> = {
  "А": [{word:"Арбуз",emoji:"🍉"},{word:"Апельсин",emoji:"🍊"},{word:"Автобус",emoji:"🚌"}],
  "Б": [{word:"Банан",emoji:"🍌"},{word:"Бабочка",emoji:"🦋"},{word:"Белка",emoji:"🐿️"}],
  "В": [{word:"Виноград",emoji:"🍇"},{word:"Волк",emoji:"🐺"},{word:"Вишня",emoji:"🍒"}],
  "Г": [{word:"Гриб",emoji:"🍄"},{word:"Гусь",emoji:"🪿"},{word:"Груша",emoji:"🍐"}],
  "Д": [{word:"Дом",emoji:"🏠"},{word:"Дерево",emoji:"🌳"},{word:"Дельфин",emoji:"🐬"}],
  "Е": [{word:"Ёж",emoji:"🦔"},{word:"Ель",emoji:"🌲"},{word:"Единорог",emoji:"🦄"}],
  "Ж": [{word:"Жираф",emoji:"🦒"},{word:"Жук",emoji:"🐛"},{word:"Жёлудь",emoji:"🌰"}],
  "З": [{word:"Заяц",emoji:"🐰"},{word:"Звезда",emoji:"⭐"},{word:"Зебра",emoji:"🦓"}],
  "И": [{word:"Индюк",emoji:"🦃"},{word:"Игла",emoji:"🪡"},{word:"Ирис",emoji:"🌺"}],
  "К": [{word:"Кот",emoji:"🐱"},{word:"Кролик",emoji:"🐰"},{word:"Конфета",emoji:"🍬"}],
  "Л": [{word:"Лев",emoji:"🦁"},{word:"Лягушка",emoji:"🐸"},{word:"Лимон",emoji:"🍋"}],
  "М": [{word:"Мышь",emoji:"🐭"},{word:"Мяч",emoji:"⚽"},{word:"Медведь",emoji:"🐻"}],
  "Н": [{word:"Нос",emoji:"👃"},{word:"Ночь",emoji:"🌙"},{word:"Носок",emoji:"🧦"}],
  "О": [{word:"Облако",emoji:"☁️"},{word:"Обезьяна",emoji:"🐒"},{word:"Огурец",emoji:"🥒"}],
  "П": [{word:"Птица",emoji:"🐦"},{word:"Пчела",emoji:"🐝"},{word:"Пирог",emoji:"🥧"}],
  "Р": [{word:"Рыба",emoji:"🐟"},{word:"Ракета",emoji:"🚀"},{word:"Роза",emoji:"🌹"}],
  "С": [{word:"Солнце",emoji:"☀️"},{word:"Слон",emoji:"🐘"},{word:"Снежинка",emoji:"❄️"}],
  "Т": [{word:"Тигр",emoji:"🐯"},{word:"Торт",emoji:"🎂"},{word:"Трактор",emoji:"🚜"}],
  "У": [{word:"Утка",emoji:"🦆"},{word:"Улитка",emoji:"🐌"},{word:"Ухо",emoji:"👂"}],
  "Ф": [{word:"Флаг",emoji:"🏳️"},{word:"Фрукт",emoji:"🍎"},{word:"Фонарь",emoji:"🔦"}],
  "Х": [{word:"Хлеб",emoji:"🍞"},{word:"Хомяк",emoji:"🐹"},{word:"Холод",emoji:"🥶"}],
  "Ц": [{word:"Цветок",emoji:"🌸"},{word:"Цыплёнок",emoji:"🐥"},{word:"Цирк",emoji:"🎪"}],
  "Ч": [{word:"Часы",emoji:"⏰"},{word:"Черепаха",emoji:"🐢"},{word:"Чай",emoji:"🍵"}],
  "Ш": [{word:"Шар",emoji:"🎈"},{word:"Шапка",emoji:"🧢"},{word:"Шоколад",emoji:"🍫"}],
};

export function getLetterQuestions(ageGroup: string): QuestionData[] {
  const questions: QuestionData[] = [];

  // Тип 1: Найди букву
  for (const letter of RUSSIAN_LETTERS) {
    const others = shuffle(RUSSIAN_LETTERS.filter(l => l !== letter)).slice(0, 3);
    const opts = others.map(l => ({ label: l, emoji: l }));
    const idx = Math.floor(Math.random() * 4);
    opts.splice(idx, 0, { label: letter, emoji: letter });
    questions.push({
      text: "Найди букву",
      illustration: letter,
      options: opts,
      correct: idx,
    });
  }

  // Тип 2: С какой буквы начинается?
  for (const [letter, words] of Object.entries(LETTER_OBJECTS)) {
    for (const w of words) {
      const others = shuffle(RUSSIAN_LETTERS.filter(l => l !== letter)).slice(0, 3);
      const opts = others.map(l => ({ label: l, emoji: l }));
      const idx = Math.floor(Math.random() * 4);
      opts.splice(idx, 0, { label: letter, emoji: letter });
      questions.push({
        text: ageGroup === "8-10" ? `На какую букву начинается "${w.word}"?` : "На какую букву?",
        illustration: w.emoji,
        options: opts,
        correct: idx,
      });
    }
  }

  return shuffle(questions);
}

// === ЧТЕНИЕ (5+) ===
const WORDS_EASY = [
  { word: "МА-МА", answer: "Мама", emoji: "👩", distractors: ["Папа","Баба","Деда"] },
  { word: "ПА-ПА", answer: "Папа", emoji: "👨", distractors: ["Мама","Баба","Дядя"] },
  { word: "КО-Т", answer: "Кот", emoji: "🐱", distractors: ["Дом","Сон","Лес"] },
  { word: "ДО-М", answer: "Дом", emoji: "🏠", distractors: ["Сом","Лом","Ком"] },
  { word: "СО-Н", answer: "Сон", emoji: "😴", distractors: ["Дым","Лён","Тон"] },
  { word: "ЛЕ-С", answer: "Лес", emoji: "🌲", distractors: ["Бес","Пёс","Рис"] },
  { word: "РЫ-БА", answer: "Рыба", emoji: "🐟", distractors: ["Жаба","Шуба","Губа"] },
  { word: "МЯ-Ч", answer: "Мяч", emoji: "⚽", distractors: ["Луч","Мёд","Меч"] },
  { word: "СО-К", answer: "Сок", emoji: "🧃", distractors: ["Бок","Рок","Ток"] },
  { word: "ЛУ-К", answer: "Лук", emoji: "🧅", distractors: ["Жук","Бук","Сук"] },
  { word: "СЫ-Р", answer: "Сыр", emoji: "🧀", distractors: ["Мир","Пир","Тир"] },
  { word: "НО-С", answer: "Нос", emoji: "👃", distractors: ["Пёс","Рос","Лес"] },
  { word: "ГЛА-З", answer: "Глаз", emoji: "👁️", distractors: ["Раз","Газ","Лаз"] },
  { word: "РО-Т", answer: "Рот", emoji: "👄", distractors: ["Кот","Бот","Мот"] },
  { word: "ЗУ-Б", answer: "Зуб", emoji: "🦷", distractors: ["Дуб","Куб","Суп"] },
  { word: "ШАР", answer: "Шар", emoji: "🎈", distractors: ["Жар","Пар","Дар"] },
  { word: "МЁ-Д", answer: "Мёд", emoji: "🍯", distractors: ["Лёд","Вёл","Мяч"] },
  { word: "ЛЁ-Д", answer: "Лёд", emoji: "🧊", distractors: ["Мёд","Кот","Рот"] },
  { word: "ЖУ-К", answer: "Жук", emoji: "🐛", distractors: ["Лук","Бук","Сук"] },
  { word: "ДУ-Б", answer: "Дуб", emoji: "🌳", distractors: ["Зуб","Куб","Суп"] },
];

const WORDS_MEDIUM = [
  { word: "СОЛ-НЦЕ", answer: "Солнце", emoji: "☀️", distractors: ["Сердце","Кольцо","Зеркало"] },
  { word: "ЛУ-НА", answer: "Луна", emoji: "🌙", distractors: ["Дуна","Рука","Мука"] },
  { word: "ЗВЕ-ЗДА", answer: "Звезда", emoji: "⭐", distractors: ["Среда","Езда","Узда"] },
  { word: "ЦВЕ-ТОК", answer: "Цветок", emoji: "🌸", distractors: ["Моток","Поток","Листок"] },
  { word: "ПТИ-ЦА", answer: "Птица", emoji: "🐦", distractors: ["Лисица","Водица","Столица"] },
  { word: "КНИ-ГА", answer: "Книга", emoji: "📖", distractors: ["Фига","Рига","Нога"] },
  { word: "ДЕ-РЕ-ВО", answer: "Дерево", emoji: "🌳", distractors: ["Озеро","Перо","Ведро"] },
  { word: "ЯБ-ЛО-КО", answer: "Яблоко", emoji: "🍎", distractors: ["Молоко","Облако","Золото"] },
  { word: "МО-ЛО-КО", answer: "Молоко", emoji: "🥛", distractors: ["Яблоко","Облако","Золото"] },
  { word: "СО-БА-КА", answer: "Собака", emoji: "🐶", distractors: ["Облако","Русалка","Рубашка"] },
  { word: "КО-РО-ВА", answer: "Корова", emoji: "🐮", distractors: ["Дорога","Ворона","Корона"] },
  { word: "ЛО-ША-ДЬ", answer: "Лошадь", emoji: "🐴", distractors: ["Площадь","Лопасть","Молодёжь"] },
  { word: "МА-ШИ-НА", answer: "Машина", emoji: "🚗", distractors: ["Малина","Калина","Картина"] },
  { word: "КАР-ТИ-НА", answer: "Картина", emoji: "🖼️", distractors: ["Машина","Малина","Корзина"] },
  { word: "РА-ДУ-ГА", answer: "Радуга", emoji: "🌈", distractors: ["Подруга","Кольчуга","Услуга"] },
];

const WORDS_HARD = [
  { word: "БА-БОЧ-КА", answer: "Бабочка", emoji: "🦋", distractors: ["Девочка","Палочка","Бочка"] },
  { word: "ЧЕ-РЕ-ПА-ХА", answer: "Черепаха", emoji: "🐢", distractors: ["Рубашка","Карандашка","Ромашка"] },
  { word: "ШО-КО-ЛАД", answer: "Шоколад", emoji: "🍫", distractors: ["Мармелад","Виноград","Лимонад"] },
  { word: "МО-РО-ЖЕ-НОЕ", answer: "Мороженое", emoji: "🍦", distractors: ["Вороное","Солёное","Варёное"] },
  { word: "КА-РАН-ДАШ", answer: "Карандаш", emoji: "✏️", distractors: ["Камыш","Малыш","Шалаш"] },
  { word: "ВЕЛО-СИ-ПЕД", answer: "Велосипед", emoji: "🚲", distractors: ["Самолёт","Мотоцикл","Вертолёт"] },
  { word: "САМО-ЛЁТ", answer: "Самолёт", emoji: "✈️", distractors: ["Вертолёт","Пароход","Паровоз"] },
  { word: "ДИ-НО-ЗАВР", answer: "Динозавр", emoji: "🦕", distractors: ["Кентавр","Минотавр","Динамит"] },
  { word: "КО-СМО-НАВТ", answer: "Космонавт", emoji: "👨‍🚀", distractors: ["Музыкант","Практикант","Лейтенант"] },
  { word: "КЛУБ-НИ-КА", answer: "Клубника", emoji: "🍓", distractors: ["Черника","Голубика","Ежевика"] },
];

export function getWordQuestions(ageGroup: string): QuestionData[] {
  const words = ageGroup === "5-7"
    ? [...WORDS_EASY, ...WORDS_MEDIUM]
    : [...WORDS_EASY, ...WORDS_MEDIUM, ...WORDS_HARD];

  return shuffle(words.map(w => {
    const allOpts = [w.answer, ...w.distractors];
    const shuffledOpts = shuffle(allOpts);
    const idx = shuffledOpts.indexOf(w.answer);
    return {
      text: "Прочитай слово:",
      illustration: w.word,
      options: shuffledOpts.map(o => ({ label: o, emoji: o })),
      correct: idx,
    };
  }));
}

// === ГЛАВНАЯ ФУНКЦИЯ ===
export function getQuestions(type: string, ageGroup: string, count: number = 5): QuestionData[] {
  let all: QuestionData[];
  switch (type) {
    case "colors": all = getColorQuestions(ageGroup); break;
    case "shapes": all = getShapeQuestions(ageGroup); break;
    case "counting": all = getCountingQuestions(ageGroup); break;
    case "animals": all = getAnimalQuestions(ageGroup); break;
    case "letters": all = getLetterQuestions(ageGroup); break;
    case "words": all = getWordQuestions(ageGroup); break;
    default: all = [];
  }
  // Берём случайные count вопросов
  return shuffle(all).slice(0, count);
}

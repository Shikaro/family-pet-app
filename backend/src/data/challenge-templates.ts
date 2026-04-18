// Шаблоны недельных челленджей — генерируются каждый понедельник
export const CHALLENGE_TEMPLATES = [
  { title: "Утренний марафон", description: "Выполни все утренние задания 5 дней", emoji: "🌅", type: "time_of_day" as const, target: 5, bonusCoins: 50 },
  { title: "Вечерний ритуал", description: "Выполни все вечерние задания 5 дней", emoji: "🌙", type: "time_of_day" as const, target: 5, bonusCoins: 50 },
  { title: "Чистюля недели", description: "Выполни 10 заданий по гигиене", emoji: "🧼", type: "category" as const, target: 10, bonusCoins: 40 },
  { title: "Помощник по дому", description: "Выполни 8 домашних дел", emoji: "🏠", type: "category" as const, target: 8, bonusCoins: 35 },
  { title: "Суперсерия", description: "Не пропускай задания 7 дней подряд", emoji: "🔥", type: "streak" as const, target: 7, bonusCoins: 70 },
  { title: "Трудяжка", description: "Выполни 20 заданий за неделю", emoji: "💪", type: "complete_count" as const, target: 20, bonusCoins: 60 },
  { title: "Учёный", description: "Выполни 5 обучающих заданий", emoji: "📚", type: "category" as const, target: 5, bonusCoins: 30 },
  { title: "Заботливый хозяин", description: "Позаботься о питомце 7 раз", emoji: "🐾", type: "category" as const, target: 7, bonusCoins: 35 },
];

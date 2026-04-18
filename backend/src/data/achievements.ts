import { Achievement } from "../types";

export const ACHIEVEMENTS: Achievement[] = [
  // Задания
  { id: "a1", key: "first_task", title: "Первый шаг", description: "Выполни первое задание", emoji: "🎯", category: "tasks" },
  { id: "a2", key: "tasks_10", title: "Трудяжка", description: "Выполни 10 заданий", emoji: "💪", category: "tasks" },
  { id: "a3", key: "tasks_50", title: "Работяга", description: "Выполни 50 заданий", emoji: "🔨", category: "tasks" },
  { id: "a4", key: "tasks_100", title: "Неутомимый", description: "Выполни 100 заданий", emoji: "⚡", category: "tasks" },
  { id: "a5", key: "tasks_200", title: "Марафонец", description: "Выполни 200 заданий", emoji: "🏃", category: "tasks" },
  { id: "a6", key: "all_morning", title: "Ранняя пташка", description: "Выполни все утренние задания за день", emoji: "🌅", category: "tasks" },
  { id: "a7", key: "all_day", title: "Идеальный день", description: "Выполни все задания за день", emoji: "🌟", category: "tasks" },

  // Серия
  { id: "a8", key: "streak_3", title: "Три дня подряд", description: "3 дня подряд без пропуска", emoji: "🔥", category: "streak" },
  { id: "a9", key: "streak_7", title: "Неделя героя", description: "7 дней подряд", emoji: "📅", category: "streak" },
  { id: "a10", key: "streak_14", title: "Двухнедельник", description: "14 дней подряд", emoji: "💎", category: "streak" },
  { id: "a11", key: "streak_30", title: "Месяц силы", description: "30 дней подряд!", emoji: "🏆", category: "streak" },

  // Монеты
  { id: "a12", key: "coins_50", title: "Копилка", description: "Накопи 50 монет", emoji: "🪙", category: "coins" },
  { id: "a13", key: "coins_100", title: "Богач", description: "Накопи 100 монет", emoji: "💰", category: "coins" },
  { id: "a14", key: "coins_500", title: "Миллионер", description: "Накопи 500 монет", emoji: "🤑", category: "coins" },
  { id: "a15", key: "first_purchase", title: "Шопоголик", description: "Купи первую награду", emoji: "🛍️", category: "coins" },

  // Уроки
  { id: "a16", key: "first_lesson", title: "Ученик", description: "Пройди первый урок", emoji: "📚", category: "lessons" },
  { id: "a17", key: "perfect_lesson", title: "Отличник", description: "Пройди урок без ошибок", emoji: "💯", category: "lessons" },
  { id: "a18", key: "lessons_10", title: "Любознательный", description: "Пройди 10 уроков", emoji: "🧠", category: "lessons" },
  { id: "a19", key: "all_categories", title: "Всезнайка", description: "Попробуй все категории уроков", emoji: "🎓", category: "lessons" },

  // Питомцы
  { id: "a20", key: "first_pet", title: "Друг животных", description: "Заведи питомца", emoji: "🐾", category: "pets" },
  { id: "a21", key: "pet_level_5", title: "Заботливый хозяин", description: "Питомец достиг 5 уровня", emoji: "🏠", category: "pets" },
  { id: "a22", key: "pet_happy_100", title: "Счастливый друг", description: "Питомец максимально счастлив", emoji: "😊", category: "pets" },
  { id: "a23", key: "first_accessory", title: "Модник", description: "Купи аксессуар для питомца", emoji: "🎀", category: "pets" },

  // Социальные
  { id: "a24", key: "challenge_complete", title: "Челленджер", description: "Выполни недельный челлендж", emoji: "🎪", category: "social" },
  { id: "a25", key: "leaderboard_first", title: "Чемпион", description: "Займи первое место в рейтинге", emoji: "🥇", category: "social" },
];

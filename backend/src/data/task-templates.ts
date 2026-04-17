import { TaskCategory, TimeOfDay, AgeGroup } from "../types";

export interface TaskTemplate {
  title: string;
  description: string;
  emoji: string;
  category: TaskCategory;
  timeOfDay: TimeOfDay;
  ageGroup: AgeGroup;
  reward: number;
}

export const taskTemplates: TaskTemplate[] = [
  // === УТРО ===
  // Гигиена
  { title: "Почистить зубы", description: "Почисти зубки утром — 2 минуты!", emoji: "🪥", category: "hygiene", timeOfDay: "morning", ageGroup: "2-4", reward: 2 },
  { title: "Почистить зубы", description: "Почисти зубы утром и вечером", emoji: "🪥", category: "hygiene", timeOfDay: "morning", ageGroup: "5-7", reward: 2 },
  { title: "Умыться", description: "Умойся и приведи себя в порядок", emoji: "🧼", category: "hygiene", timeOfDay: "morning", ageGroup: "2-4", reward: 2 },
  { title: "Умыться и причесаться", description: "Умойся, причешись и оденься", emoji: "🧼", category: "hygiene", timeOfDay: "morning", ageGroup: "5-7", reward: 2 },
  { title: "Одеться самому", description: "Оденься сам без помощи", emoji: "👕", category: "hygiene", timeOfDay: "morning", ageGroup: "2-4", reward: 3 },
  { title: "Одеться самому", description: "Выбери одежду и оденься", emoji: "👕", category: "hygiene", timeOfDay: "morning", ageGroup: "5-7", reward: 2 },

  // Порядок — утро
  { title: "Заправить кровать", description: "Заправь свою кроватку", emoji: "🛏️", category: "chores", timeOfDay: "morning", ageGroup: "5-7", reward: 3 },
  { title: "Заправить кровать", description: "Аккуратно заправь кровать", emoji: "🛏️", category: "chores", timeOfDay: "morning", ageGroup: "8-10", reward: 2 },

  // Еда
  { title: "Позавтракать", description: "Покушай завтрак за столом", emoji: "🥣", category: "hygiene", timeOfDay: "morning", ageGroup: "2-4", reward: 2 },
  { title: "Позавтракать", description: "Позавтракай и убери за собой тарелку", emoji: "🥣", category: "hygiene", timeOfDay: "morning", ageGroup: "5-7", reward: 3 },

  // === ДЕНЬ ===
  // Порядок
  { title: "Убрать игрушки", description: "Сложи все игрушки на место", emoji: "🧸", category: "chores", timeOfDay: "afternoon", ageGroup: "2-4", reward: 3 },
  { title: "Убрать игрушки", description: "Разложи игрушки по местам", emoji: "🧸", category: "chores", timeOfDay: "afternoon", ageGroup: "5-7", reward: 3 },
  { title: "Убрать в комнате", description: "Наведи порядок в своей комнате", emoji: "🏠", category: "chores", timeOfDay: "afternoon", ageGroup: "8-10", reward: 5 },
  { title: "Протереть пыль", description: "Протри пыль на полках", emoji: "🧹", category: "chores", timeOfDay: "afternoon", ageGroup: "8-10", reward: 4 },

  // Помощь родителям
  { title: "Помочь маме", description: "Спроси у мамы, чем помочь", emoji: "💝", category: "helping", timeOfDay: "afternoon", ageGroup: "2-4", reward: 3 },
  { title: "Помочь маме на кухне", description: "Помоги маме приготовить обед", emoji: "👩‍🍳", category: "helping", timeOfDay: "afternoon", ageGroup: "5-7", reward: 4 },
  { title: "Помочь папе", description: "Помоги папе с делом по дому", emoji: "🔧", category: "helping", timeOfDay: "afternoon", ageGroup: "5-7", reward: 4 },
  { title: "Помыть посуду", description: "Помой посуду после обеда", emoji: "🍽️", category: "helping", timeOfDay: "afternoon", ageGroup: "8-10", reward: 5 },
  { title: "Пропылесосить", description: "Пропылесось одну комнату", emoji: "🧹", category: "helping", timeOfDay: "afternoon", ageGroup: "8-10", reward: 5 },

  // Забота о животных
  { title: "Покормить питомца", description: "Покорми домашнее животное", emoji: "🐾", category: "pet_care", timeOfDay: "afternoon", ageGroup: "5-7", reward: 3 },
  { title: "Покормить питомца", description: "Покорми и напои животное", emoji: "🐾", category: "pet_care", timeOfDay: "afternoon", ageGroup: "8-10", reward: 3 },
  { title: "Погулять с собакой", description: "Выгуляй собаку вместе с родителем", emoji: "🐕", category: "pet_care", timeOfDay: "afternoon", ageGroup: "8-10", reward: 5 },

  // Учёба
  { title: "Раскрасить картинку", description: "Раскрась одну картинку аккуратно", emoji: "🎨", category: "learning", timeOfDay: "afternoon", ageGroup: "2-4", reward: 3 },
  { title: "Нарисовать рисунок", description: "Нарисуй что-нибудь красивое", emoji: "🎨", category: "learning", timeOfDay: "afternoon", ageGroup: "5-7", reward: 3 },
  { title: "Прочитать страницу", description: "Прочитай одну страницу вслух", emoji: "📖", category: "learning", timeOfDay: "afternoon", ageGroup: "5-7", reward: 4 },
  { title: "Прочитать главу", description: "Прочитай одну главу книги", emoji: "📖", category: "learning", timeOfDay: "afternoon", ageGroup: "8-10", reward: 5 },
  { title: "Сделать уроки", description: "Выполни домашнее задание", emoji: "📝", category: "learning", timeOfDay: "afternoon", ageGroup: "8-10", reward: 6 },
  { title: "Собрать пазл", description: "Собери пазл или конструктор", emoji: "🧩", category: "learning", timeOfDay: "afternoon", ageGroup: "2-4", reward: 3 },
  { title: "Выучить стишок", description: "Выучи маленький стишок", emoji: "📜", category: "learning", timeOfDay: "afternoon", ageGroup: "5-7", reward: 4 },

  // === ВЕЧЕР ===
  // Гигиена
  { title: "Почистить зубы перед сном", description: "Почисти зубки перед сном", emoji: "🪥", category: "hygiene", timeOfDay: "evening", ageGroup: "2-4", reward: 2 },
  { title: "Почистить зубы перед сном", description: "Почисти зубы и умойся", emoji: "🪥", category: "hygiene", timeOfDay: "evening", ageGroup: "5-7", reward: 2 },
  { title: "Принять душ", description: "Помойся перед сном", emoji: "🚿", category: "hygiene", timeOfDay: "evening", ageGroup: "8-10", reward: 2 },

  // Порядок — вечер
  { title: "Убрать игрушки перед сном", description: "Сложи игрушки перед сном", emoji: "🌙", category: "chores", timeOfDay: "evening", ageGroup: "2-4", reward: 2 },
  { title: "Сложить одежду", description: "Аккуратно сложи одежду на стул", emoji: "👔", category: "chores", timeOfDay: "evening", ageGroup: "5-7", reward: 3 },
  { title: "Подготовить рюкзак", description: "Собери рюкзак на завтра", emoji: "🎒", category: "chores", timeOfDay: "evening", ageGroup: "8-10", reward: 3 },

  // Помощь — вечер
  { title: "Помочь накрыть на стол", description: "Помоги расставить тарелки", emoji: "🍽️", category: "helping", timeOfDay: "evening", ageGroup: "5-7", reward: 3 },
  { title: "Убрать со стола", description: "Убери посуду после ужина", emoji: "🍽️", category: "helping", timeOfDay: "evening", ageGroup: "8-10", reward: 3 },

  // === В ЛЮБОЕ ВРЕМЯ ===
  { title: "Сделать доброе дело", description: "Сделай что-то хорошее для кого-то", emoji: "💖", category: "helping", timeOfDay: "anytime", ageGroup: "2-4", reward: 4 },
  { title: "Сделать доброе дело", description: "Помоги кому-нибудь или сделай сюрприз", emoji: "💖", category: "helping", timeOfDay: "anytime", ageGroup: "5-7", reward: 4 },
  { title: "Полить цветы", description: "Полей домашние растения", emoji: "🌱", category: "chores", timeOfDay: "anytime", ageGroup: "5-7", reward: 3 },
  { title: "Полить цветы", description: "Полей цветы и проверь землю", emoji: "🌱", category: "chores", timeOfDay: "anytime", ageGroup: "8-10", reward: 2 },
];

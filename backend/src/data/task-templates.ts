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

  // === УТРО (дополнительные) ===
  { title: "Сказать доброе утро", description: "Скажи 'Доброе утро!' маме и папе", emoji: "☀️", category: "helping", timeOfDay: "morning", ageGroup: "2-4", reward: 1 },
  { title: "Попить воды", description: "Выпей стакан воды утром", emoji: "💧", category: "hygiene", timeOfDay: "morning", ageGroup: "2-4", reward: 1 },
  { title: "Помыть руки", description: "Помой руки с мылом", emoji: "🫧", category: "hygiene", timeOfDay: "morning", ageGroup: "2-4", reward: 1 },
  { title: "Зарядка", description: "Сделай зарядку — 5 упражнений", emoji: "🤸", category: "hygiene", timeOfDay: "morning", ageGroup: "5-7", reward: 3 },
  { title: "Зарядка", description: "Сделай утреннюю зарядку 10 минут", emoji: "🤸", category: "hygiene", timeOfDay: "morning", ageGroup: "8-10", reward: 3 },
  { title: "Сложить пижаму", description: "Сложи пижаму аккуратно", emoji: "👚", category: "chores", timeOfDay: "morning", ageGroup: "2-4", reward: 2 },
  { title: "Помочь готовить завтрак", description: "Помоги маме или папе с завтраком", emoji: "🍳", category: "helping", timeOfDay: "morning", ageGroup: "5-7", reward: 3 },

  // === ДЕНЬ (дополнительные) ===
  { title: "Поиграть на улице", description: "Погуляй на улице 30 минут", emoji: "🏃", category: "hygiene", timeOfDay: "afternoon", ageGroup: "2-4", reward: 3 },
  { title: "Поиграть на улице", description: "Проведи время на свежем воздухе", emoji: "🏃", category: "hygiene", timeOfDay: "afternoon", ageGroup: "5-7", reward: 3 },
  { title: "Помыть руки после прогулки", description: "Помой руки когда пришёл домой", emoji: "🫧", category: "hygiene", timeOfDay: "afternoon", ageGroup: "2-4", reward: 1 },
  { title: "Пообедать", description: "Покушай обед и убери тарелку", emoji: "🍲", category: "hygiene", timeOfDay: "afternoon", ageGroup: "2-4", reward: 2 },
  { title: "Пообедать", description: "Пообедай и помоги убрать со стола", emoji: "🍲", category: "hygiene", timeOfDay: "afternoon", ageGroup: "5-7", reward: 3 },
  { title: "Лепить из пластилина", description: "Слепи что-нибудь из пластилина", emoji: "🎭", category: "learning", timeOfDay: "afternoon", ageGroup: "2-4", reward: 3 },
  { title: "Построить из кубиков", description: "Построй башню или домик из кубиков", emoji: "🧱", category: "learning", timeOfDay: "afternoon", ageGroup: "2-4", reward: 2 },
  { title: "Послушать сказку", description: "Послушай сказку или аудиокнигу", emoji: "🎧", category: "learning", timeOfDay: "afternoon", ageGroup: "2-4", reward: 2 },
  { title: "Помочь с уборкой", description: "Помоги протереть стол или полку", emoji: "🧽", category: "helping", timeOfDay: "afternoon", ageGroup: "5-7", reward: 3 },
  { title: "Разобрать вещи", description: "Разбери свой шкаф или полку", emoji: "🗄️", category: "chores", timeOfDay: "afternoon", ageGroup: "8-10", reward: 4 },
  { title: "Написать письмо", description: "Напиши письмо бабушке или другу", emoji: "✉️", category: "learning", timeOfDay: "afternoon", ageGroup: "8-10", reward: 4 },

  // === ВЕЧЕР (дополнительные) ===
  { title: "Поужинать", description: "Покушай ужин за столом", emoji: "🍽️", category: "hygiene", timeOfDay: "evening", ageGroup: "2-4", reward: 2 },
  { title: "Поужинать", description: "Поужинай и убери тарелку", emoji: "🍽️", category: "hygiene", timeOfDay: "evening", ageGroup: "5-7", reward: 2 },
  { title: "Поцеловать маму", description: "Поцелуй маму перед сном", emoji: "😘", category: "helping", timeOfDay: "evening", ageGroup: "2-4", reward: 1 },
  { title: "Обнять папу", description: "Обними папу перед сном", emoji: "🤗", category: "helping", timeOfDay: "evening", ageGroup: "2-4", reward: 1 },
  { title: "Послушать сказку на ночь", description: "Послушай сказку перед сном", emoji: "📖", category: "learning", timeOfDay: "evening", ageGroup: "2-4", reward: 2 },
  { title: "Помыть руки перед ужином", description: "Помой руки перед едой", emoji: "🫧", category: "hygiene", timeOfDay: "evening", ageGroup: "2-4", reward: 1 },
  { title: "Умыться перед сном", description: "Умойся и протри лицо", emoji: "🧼", category: "hygiene", timeOfDay: "evening", ageGroup: "2-4", reward: 2 },
  { title: "Надеть пижаму", description: "Переоденься в пижамку", emoji: "🩳", category: "hygiene", timeOfDay: "evening", ageGroup: "2-4", reward: 2 },
  { title: "Надеть пижаму", description: "Переоденься в пижаму сам", emoji: "🩳", category: "hygiene", timeOfDay: "evening", ageGroup: "5-7", reward: 2 },
  { title: "Помочь помыть посуду", description: "Помоги помыть посуду после ужина", emoji: "🍽️", category: "helping", timeOfDay: "evening", ageGroup: "5-7", reward: 3 },
  { title: "Почитать перед сном", description: "Почитай книжку 15 минут", emoji: "📚", category: "learning", timeOfDay: "evening", ageGroup: "5-7", reward: 3 },
  { title: "Почитать перед сном", description: "Почитай книгу 20 минут перед сном", emoji: "📚", category: "learning", timeOfDay: "evening", ageGroup: "8-10", reward: 3 },
  { title: "Записать дневник", description: "Запиши в дневник что интересного было сегодня", emoji: "📓", category: "learning", timeOfDay: "evening", ageGroup: "8-10", reward: 4 },

  // === В ЛЮБОЕ ВРЕМЯ ===
  { title: "Сделать доброе дело", description: "Сделай что-то хорошее для кого-то", emoji: "💖", category: "helping", timeOfDay: "anytime", ageGroup: "2-4", reward: 4 },
  { title: "Сделать доброе дело", description: "Помоги кому-нибудь или сделай сюрприз", emoji: "💖", category: "helping", timeOfDay: "anytime", ageGroup: "5-7", reward: 4 },
  { title: "Полить цветы", description: "Полей домашние растения", emoji: "🌱", category: "chores", timeOfDay: "anytime", ageGroup: "5-7", reward: 3 },
  { title: "Полить цветы", description: "Полей цветы и проверь землю", emoji: "🌱", category: "chores", timeOfDay: "anytime", ageGroup: "8-10", reward: 2 },
  { title: "Попить воды", description: "Выпей стакан воды", emoji: "💧", category: "hygiene", timeOfDay: "anytime", ageGroup: "2-4", reward: 1 },
  { title: "Помыть руки", description: "Помой руки с мылом", emoji: "🫧", category: "hygiene", timeOfDay: "anytime", ageGroup: "5-7", reward: 1 },
  { title: "Обнять брата или сестру", description: "Обними своего брата или сестру", emoji: "🤗", category: "helping", timeOfDay: "anytime", ageGroup: "2-4", reward: 2 },
  { title: "Сказать спасибо", description: "Скажи кому-нибудь спасибо за помощь", emoji: "🙏", category: "helping", timeOfDay: "anytime", ageGroup: "2-4", reward: 1 },
];

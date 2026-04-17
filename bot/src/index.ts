import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_TOKEN;
const apiBase = process.env.API_BASE_URL || "http://localhost:4000/api";

if (!token) {
  throw new Error("TELEGRAM_TOKEN is required for bot startup.");
}

const bot = new TelegramBot(token, { polling: true });

async function fetchJson(path: string) {
  const response = await fetch(`${apiBase}${path}`);
  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }
  return response.json();
}

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const dashboard = await fetchJson("/dashboard");
    bot.sendMessage(chatId, `Привет! Я помогу вести задания и награды для ${dashboard.parent.childName}.\n\nТекущий баланс: ${dashboard.parent.coins} монет.\nИспользуй /tasks, /challenge, /rewards и /status.`);
  } catch (error) {
    bot.sendMessage(chatId, "Не удалось получить данные. Убедись, что бэкенд запущен.");
  }
});

bot.onText(/\/tasks/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const tasks = await fetchJson("/tasks?owner=child");
    const lines = tasks.map((task: any) => `• ${task.emoji} ${task.title} — ${task.description} (+${task.reward} монет)\n/id_${task.id}`);
    bot.sendMessage(chatId, `Задания для ребенка:\n\n${lines.join("\n")}`);
  } catch (error) {
    bot.sendMessage(chatId, "Не удалось загрузить задания.");
  }
});

bot.onText(/\/complete (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const taskId = match?.[1];
  if (!taskId) {
    return bot.sendMessage(chatId, "Используй: /complete task-1");
  }

  try {
    const response = await fetch(`${apiBase}/tasks/${taskId}/complete`, { method: "POST" });
    const result = await response.json();
    if (!response.ok) {
      return bot.sendMessage(chatId, `Ошибка: ${result.message}`);
    }
    bot.sendMessage(chatId, `Задание выполнено! ${result.coins} монет на балансе.`);
  } catch (error) {
    bot.sendMessage(chatId, "Не удалось отметить задание как выполненное.");
  }
});

bot.onText(/\/rewards/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const rewards = await fetchJson("/rewards");
    const lines = rewards.map((reward: any) => `• ${reward.title} — ${reward.description} (${reward.cost} монет) ${reward.redeemed ? "[забронировано]" : ""}`);
    bot.sendMessage(chatId, `Магазин наград:\n\n${lines.join("\n")}`);
  } catch (error) {
    bot.sendMessage(chatId, "Не удалось загрузить награды.");
  }
});

bot.onText(/\/challenge/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const challenge = await fetchJson("/challenge");
    const status = challenge.completed ? "(выполнен)" : "(ожидает)";
    bot.sendMessage(chatId, `Челлендж дня:\n${challenge.title} ${status}\n${challenge.description}\n+${challenge.reward} монет\n\nИспользуй /complete_challenge для выполнения.`);
  } catch (error) {
    bot.sendMessage(chatId, "Не удалось загрузить челлендж.");
  }
});

bot.onText(/\/complete_challenge/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await fetch(`${apiBase}/challenge/complete`, { method: "POST" });
    const result = await response.json();
    if (!response.ok) {
      return bot.sendMessage(chatId, `Ошибка: ${result.message}`);
    }
    bot.sendMessage(chatId, `Челлендж выполнен! Баланс: ${result.coins} монет.`);
  } catch (error) {
    bot.sendMessage(chatId, "Не удалось завершить челлендж.");
  }
});

bot.onText(/\/status/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const dashboard = await fetchJson("/dashboard");
    bot.sendMessage(chatId, `Баланс: ${dashboard.parent.coins} монет\nПитомец: ${dashboard.pet.name}, ${dashboard.pet.happiness}% счастья, ${dashboard.pet.energy}% энергии`);
  } catch (error) {
    bot.sendMessage(chatId, "Не удалось получить статус.");
  }
});

bot.on("polling_error", console.error);

console.log("Telegram bot started.");

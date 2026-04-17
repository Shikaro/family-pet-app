# Family Pet Telegram Bot

Этот бот подключается к бэкенду Family Pet App и позволяет управлять заданиями и наградами через Telegram.

## Команды

- `/start` — приветствие и баланс
- `/tasks` — список доступных заданий для ребенка
- `/complete <task-id>` — отметить задание выполненным
- `/rewards` — посмотреть магазин наград
- `/challenge` — показать ежедневный челлендж
- `/complete_challenge` — завершить челлендж
- `/status` — текущий статус питомца и монет

## Запуск

1. Установите зависимости:
   ```bash
   cd /home/client/projects/Apps
   npm install
   npm install --workspace bot
   ```
2. Экспортируйте токен Telegram бота:
   ```bash
   export TELEGRAM_TOKEN="<your-token>"
   export API_BASE_URL="http://localhost:4000/api"
   ```
3. Запустите бота:
   ```bash
   npm run dev:bot
   ```

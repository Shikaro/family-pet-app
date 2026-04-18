# 7 Features Implementation

## Status: DEPLOYING

### Features
1. [x] Child levels/ranks — Новичок → Помощник → Мастер → Герой (7 рангов)
2. [x] Achievements/badges — 25 достижений в 6 категориях
3. [x] Pet accessories — 19 аксессуаров в 5 слотах (шляпы, очки, фоны, ошейники, крылья)
4. [x] Photo confirmation — photoUrl/photoStatus в TaskCompletion
5. [x] Weekly challenges — 3 случайных из 8 шаблонов каждую неделю
6. [x] Family leaderboard — сортировка по totalCompleted
7. [x] Schedule by day of week — daysOfWeek в Task + фильтрация в dashboard/tasks

### Commits
- types + data (ranks, achievements, accessories, challenges)
- API routes (achievements, accessories, challenges, leaderboard)
- Frontend types + API client
- 4 new components (AchievementsPanel, AccessoryShop, ChallengesPanel, Leaderboard)
- ChildDashboard integration (rank badge, quick actions, all panels)
- CSS styles for all new components
- Pet accessories support + dashboard daysOfWeek filter

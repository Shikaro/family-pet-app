import { Task } from "../types";

interface Props {
  tasks: Task[];
  onComplete: (taskId: string) => void;
  mode: "parent" | "child";
}

export default function TaskList({ tasks, onComplete, mode }: Props) {
  const visibleTasks = tasks.filter((task) => task.owner === mode || task.owner === "family");

  return (
    <section className="card">
      <div className="card-header">
        <h2>{mode === "parent" ? "Задания для ребенка" : "Задания для тебя"}</h2>
        <span>{mode === "parent" ? "Родитель отмечает выполнение." : "Выбирай задание и помогай питомцу расти."}</span>
      </div>
      <div className="task-list">
        {visibleTasks.length > 0 ? (
          visibleTasks.map((task) => (
            <article key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              <div>
                <h3>{task.emoji} {task.title}</h3>
                <p>{task.description}</p>
                <p className="meta">Возраст: {task.ageRange}</p>
              </div>
              <div className="task-meta">
                <span className="reward">+{task.reward} монет</span>
                <button onClick={() => onComplete(task.id)} disabled={task.completed}>
                  {task.completed ? "Готово" : mode === "parent" ? "Отметить" : "Я сделал"}
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">Нет доступных заданий для текущего режима.</div>
        )}
      </div>
    </section>
  );
}

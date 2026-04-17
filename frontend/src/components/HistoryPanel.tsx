import { HistoryItem } from "../types";

interface Props {
  history: HistoryItem[];
}

export default function HistoryPanel({ history }: Props) {
  return (
    <section className="card">
      <div className="card-header">
        <h2>Последние события</h2>
        <span>Смотри, что уже сделано и что нового.</span>
      </div>
      <div className="history-list">
        {history.map((item) => (
          <article key={item.id} className="history-item">
            <div>
              <p>{item.message}</p>
              <p className="history-time">{new Date(item.time).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
            <span className={`history-chip ${item.type}`}>{item.type}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function TaskList({tasks}:{tasks:any[]}) {
  return <section>
    <h2>Tasks</h2>
    <ul>{tasks.map(t => <li key={t.id}><b>{t.priority}</b> – {t.title}</li>)}</ul>
  </section>
}

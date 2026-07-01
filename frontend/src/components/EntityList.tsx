export default function EntityList({entities}:{entities:any[]}) {
  return <section>
    <h2>Entities</h2>
    <ul>{entities.map(e => <li key={e.id}><b>{e.id}</b> – {e.name} ({e.type})</li>)}</ul>
  </section>
}

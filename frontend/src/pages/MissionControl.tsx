export default function MissionControl({entities,tasks,steward}:{entities:any[],tasks:any[],steward:any}) {
  return <section>
    <h2>Mission Control</h2>
    <p>Objects: {entities.length}</p>
    <p>Tasks: {tasks.length}</p>
    {steward && <pre style={{background:"#111",color:"#0f0",padding:12,whiteSpace:"pre-wrap"}}>{JSON.stringify(steward,null,2)}</pre>}
  </section>
}

export default function MissionControl({
  entities,
  tasks,
  steward,
}: {
  entities: any[];
  tasks: any[];
  steward: any;
}) {
  return (
    <section style={{ marginTop: 24 }}>
      <h2>AI Steward</h2>

      {!steward && <p>Steward zatiaľ nemá dáta.</p>}

      {steward && (
        <>
          <p>
            <b>Objekty:</b> {entities.length} &nbsp; | &nbsp;
            <b>Úlohy:</b> {tasks.length}
          </p>

          <pre
            style={{
              background: "#111",
              color: "#00ff66",
              padding: 16,
              borderRadius: 12,
              overflowX: "auto",
              maxHeight: 420,
              fontSize: 12,
            }}
          >
            {JSON.stringify(steward, null, 2)}
          </pre>
        </>
      )}
    </section>
  );
}
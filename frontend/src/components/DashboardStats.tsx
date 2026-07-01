type Props = {
  entities: any[];
  tasks: any[];
};

function countByType(entities: any[], type: string) {
  return entities.filter((entity) => entity.type === type).length;
}

function countByPriority(tasks: any[], priority: string) {
  return tasks.filter((task) => task.priority === priority).length;
}

export default function DashboardStats({ entities, tasks }: Props) {
  return (
    <section
      style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 12,
      }}
    >
      <Stat title="Objekty" value={entities.length} />
      <Stat title="Stromy" value={countByType(entities, "Tree")} />
      <Stat title="Úle" value={countByType(entities, "Hive")} />
      <Stat title="Voda" value={countByType(entities, "Well")} />
      <Stat title="Potrubia" value={countByType(entities, "Pipe")} />
      <Stat title="Úlohy" value={tasks.length} />
      <Stat title="High" value={countByPriority(tasks, "high")} />
      <Stat title="Normal" value={countByPriority(tasks, "normal")} />
    </section>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 16,
        background: "#fafafa",
      }}
    >
      <div style={{ fontSize: 13, color: "#666" }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
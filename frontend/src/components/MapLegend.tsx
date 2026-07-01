type EntityTypes = Record<
  string,
  {
    label: string;
    color: string;
    icon: string;
  }
>;

export default function MapLegend({ entityTypes }: { entityTypes: EntityTypes }) {
  const items = Object.entries(entityTypes);

  return (
    <section
      style={{
        marginTop: 12,
        padding: 14,
        border: "1px solid #ddd",
        borderRadius: 12,
        background: "#fafafa",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Legenda mapy</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        {items.map(([type, item]) => (
          <div key={type} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: item.color,
                border: "2px solid white",
                boxShadow: "0 0 0 1px #bbb",
                display: "inline-block",
              }}
            />
            <span>
              {item.label} <small>({type})</small>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

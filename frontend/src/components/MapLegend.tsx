const items = [
  { label: "Studňa / voda", color: "#2563eb" },
  { label: "Úľ", color: "#f59e0b" },
  { label: "Strom", color: "#16a34a" },
  { label: "Potrubie", color: "#0ea5e9" },
  { label: "Iné", color: "#6b7280" },
];

export default function MapLegend() {
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
        {items.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

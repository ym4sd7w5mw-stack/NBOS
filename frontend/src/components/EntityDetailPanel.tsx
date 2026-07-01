type Props = {
  entity: any | null;
};

export default function EntityDetailPanel({ entity }: Props) {
  if (!entity) {
    return (
      <section style={{ marginTop: 24, padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
        <h2>Detail objektu</h2>
        <p>Klikni na objekt v mape.</p>
      </section>
    );
  }

  return (
    <section style={{ marginTop: 24, padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
      <h2>Detail objektu</h2>
      <h3>{entity.id}</h3>
      <p><b>Názov:</b> {entity.name}</p>
      <p><b>Typ:</b> {entity.type}</p>
      <p><b>Confidence:</b> {entity.properties?.confidence ?? "—"}</p>
      <p><b>Fotky:</b> {entity.photos?.length ?? 0}</p>
      <p><b>Vzťahy:</b> {entity.relations?.length ?? 0}</p>
      <p><b>Timeline:</b> {entity.timeline?.length ?? 0}</p>
    </section>
  );
}
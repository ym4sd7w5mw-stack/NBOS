type PendingPoint = {
  lng: number;
  lat: number;
};

type Props = {
  pendingPoint: PendingPoint | null;
  onClear: () => void;
  onCreate: (payload: any) => Promise<void>;
};

const entityTypes = [
  "Tree",
  "Hive",
  "Well",
  "Pipe",
  "Building",
  "Zone",
  "Sensor",
  "Camera",
  "Other",
];

export default function SurveyCreatePanel({ pendingPoint, onClear, onCreate }: Props) {
  async function handleSubmit(event: any) {
    event.preventDefault();
    if (!pendingPoint) return;

    const form = new FormData(event.currentTarget);
    const type = String(form.get("type") || "Other");
    const name = String(form.get("name") || `${type} nový objekt`);

    await onCreate({
      type,
      name,
      geometry: {
        type: "Point",
        coordinates: [pendingPoint.lng, pendingPoint.lat],
      },
      properties: {
        source: "manual_map_click",
      },
    });

    event.currentTarget.reset();
    onClear();
  }

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
      <h3 style={{ marginTop: 0 }}>Survey editor</h3>

      {!pendingPoint && (
        <p style={{ marginBottom: 0 }}>
          Klikni do mapy na prázdne miesto a vytvor nový bodový objekt.
        </p>
      )}

      {pendingPoint && (
        <form onSubmit={handleSubmit}>
          <p>
            <b>GPS:</b> {pendingPoint.lng.toFixed(6)}, {pendingPoint.lat.toFixed(6)}
          </p>

          <label>
            Typ objektu{" "}
            <select name="type" defaultValue="Tree">
              {entityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <br />
          <br />

          <label>
            Názov{" "}
            <input
              name="name"
              placeholder="napr. Jabloň Topaz"
              style={{ minWidth: 240 }}
            />
          </label>

          <br />
          <br />

          <button type="submit">Uložiť objekt</button>{" "}
          <button type="button" onClick={onClear}>
            Zrušiť
          </button>
        </form>
      )}
    </section>
  );
}

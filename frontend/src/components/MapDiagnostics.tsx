type Props = {
  entities: any[];
};

function isValidCoordinate(coord: any) {
  return (
    Array.isArray(coord) &&
    coord.length === 2 &&
    typeof coord[0] === "number" &&
    typeof coord[1] === "number"
  );
}

function coordinateKey(coord: [number, number]) {
  return `${coord[0].toFixed(6)},${coord[1].toFixed(6)}`;
}

function geometryStats(entities: any[]) {
  let points = 0;
  let lines = 0;
  let polygons = 0;
  const missing: string[] = [];
  const invalid: string[] = [];
  const pointGroups: Record<string, string[]> = {};

  for (const entity of entities) {
    const geometry = entity.geometry;

    if (!geometry) {
      missing.push(entity.id);
      continue;
    }

    if (geometry.type === "Point") {
      if (isValidCoordinate(geometry.coordinates)) {
        points += 1;
        const key = coordinateKey(geometry.coordinates);
        pointGroups[key] = [...(pointGroups[key] || []), entity.id];
      } else {
        invalid.push(entity.id);
      }
      continue;
    }

    if (geometry.type === "LineString") {
      if (Array.isArray(geometry.coordinates) && geometry.coordinates.every(isValidCoordinate)) {
        lines += 1;
      } else {
        invalid.push(entity.id);
      }
      continue;
    }

    if (geometry.type === "Polygon") {
      polygons += 1;
      continue;
    }

    invalid.push(entity.id);
  }

  const overlaps = Object.entries(pointGroups)
    .filter(([, ids]) => ids.length > 1)
    .map(([coord, ids]) => ({ coord, ids }));

  return { points, lines, polygons, missing, invalid, overlaps };
}

export default function MapDiagnostics({ entities }: Props) {
  const stats = geometryStats(entities);

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
      <h3 style={{ marginTop: 0 }}>Map diagnostics</h3>
      <p style={{ margin: 0 }}>
        <b>Objekty:</b> {entities.length} | <b>Body:</b> {stats.points} |{" "}
        <b>Línie:</b> {stats.lines} | <b>Polygóny:</b> {stats.polygons}
      </p>

      {stats.overlaps.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <b>Prekryté body:</b>
          <ul>
            {stats.overlaps.map((item) => (
              <li key={item.coord}>
                {item.coord}: {item.ids.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {stats.missing.length > 0 && (
        <p>
          <b>Bez geometrie:</b> {stats.missing.join(", ")}
        </p>
      )}

      {stats.invalid.length > 0 && (
        <p>
          <b>Neplatná geometria:</b> {stats.invalid.join(", ")}
        </p>
      )}
    </section>
  );
}

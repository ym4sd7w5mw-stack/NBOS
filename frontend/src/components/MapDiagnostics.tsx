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

function geometryStats(entities: any[]) {
  let points = 0;
  let lines = 0;
  let polygons = 0;
  const missing: string[] = [];
  const invalid: string[] = [];

  for (const entity of entities) {
    const geometry = entity.geometry;

    if (!geometry) {
      missing.push(entity.id);
      continue;
    }

    if (geometry.type === "Point") {
      if (isValidCoordinate(geometry.coordinates)) points += 1;
      else invalid.push(entity.id);
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

  return { points, lines, polygons, missing, invalid };
}

export default function MapDiagnostics({ entities }: Props) {
  const stats = geometryStats(entities);

  return (
    <section
      style={{
        marginTop: 16,
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

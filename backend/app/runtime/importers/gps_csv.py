import csv
from io import StringIO

def gps_csv_to_entities(text: str):
    warnings = []
    entities = []
    for i, row in enumerate(csv.DictReader(StringIO(text)), start=1):
        entity_id = row.get("object_id") or row.get("id")
        if not entity_id:
            warnings.append(f"row {i}: missing object_id")
            continue
        if not row.get("lat") or not row.get("lon"):
            warnings.append(f"{entity_id}: missing coordinates")
            continue
        try:
            lat = float(row["lat"])
            lon = float(row["lon"])
        except ValueError:
            warnings.append(f"{entity_id}: invalid coordinates")
            continue
        entities.append({
            "id": entity_id,
            "type": row.get("type") or "ReferencePoint",
            "name": row.get("name") or entity_id,
            "geometry": {"type": "Point", "coordinates": [lon, lat]},
            "properties": {
                "source": "gps_csv",
                "accuracy_m": row.get("accuracy_m"),
                "lod": row.get("lod", "LOD2"),
                "notes": row.get("notes", ""),
                "confidence": float(row.get("confidence") or 0.75)
            },
            "relations": [],
            "photos": [],
            "timeline": []
        })
    return entities, warnings

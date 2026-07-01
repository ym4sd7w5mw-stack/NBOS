from pathlib import Path
import json
from app.core.config import settings

RUNTIME_ENTITIES: list[dict] = []
RUNTIME_MEDIA: list[dict] = []
RUNTIME_REPORTS: list[dict] = []
RUNTIME_EVENTS: list[dict] = []
RUNTIME_MEASUREMENTS: list[dict] = []

def clear_runtime():
    RUNTIME_ENTITIES.clear()
    RUNTIME_MEDIA.clear()
    RUNTIME_REPORTS.clear()
    RUNTIME_EVENTS.clear()
    RUNTIME_MEASUREMENTS.clear()

def upsert_entities(entities: list[dict]):
    by_id = {e.get("id"): e for e in RUNTIME_ENTITIES}
    for e in entities:
        if e.get("id"):
            by_id[e["id"]] = e
    RUNTIME_ENTITIES.clear()
    RUNTIME_ENTITIES.extend(by_id.values())
    return len(entities)

def get_entity(entity_id: str):
    return next((e for e in RUNTIME_ENTITIES if e.get("id") == entity_id), None)

def add_event(event: dict):
    RUNTIME_EVENTS.append(event)
    entity = get_entity(event.get("entity_id"))
    if entity:
        entity.setdefault("timeline", []).append(event)
    return event

def snapshot_payload():
    return {
        "snapshot_version": settings.version,
        "objects": RUNTIME_ENTITIES,
        "media": RUNTIME_MEDIA,
        "reports": RUNTIME_REPORTS,
        "events": RUNTIME_EVENTS,
        "measurements": RUNTIME_MEASUREMENTS,
        "counts": {
            "objects": len(RUNTIME_ENTITIES),
            "media": len(RUNTIME_MEDIA),
            "reports": len(RUNTIME_REPORTS),
            "events": len(RUNTIME_EVENTS),
            "measurements": len(RUNTIME_MEASUREMENTS)
        }
    }

def save_snapshot(path: str | None = None):
    payload = snapshot_payload()
    output = Path(path or settings.snapshot_path)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    return payload

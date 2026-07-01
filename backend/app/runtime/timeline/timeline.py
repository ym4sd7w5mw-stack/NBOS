from datetime import datetime
from uuid import uuid4

def create_event(entity_id: str, event_type: str, notes: str = "", properties: dict | None = None) -> dict:
    return {
        "id": f"EVT-{uuid4().hex[:8]}",
        "entity_id": entity_id,
        "event_type": event_type,
        "event_date": datetime.utcnow().isoformat(),
        "notes": notes,
        "properties": properties or {}
    }

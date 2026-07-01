def generate_tasks(entities: list[dict]) -> list[dict]:
    tasks = []
    for entity in entities:
        eid = entity.get("id")
        if not entity.get("geometry"):
            tasks.append({"id": f"TASK-{eid}-GEOMETRY", "entity_id": eid, "priority": "high", "title": f"Zamerať geometriu pre {eid}"})
        if not entity.get("photos"):
            tasks.append({"id": f"TASK-{eid}-PHOTO", "entity_id": eid, "priority": "normal", "title": f"Nafotiť objekt {eid}"})
        if float(entity.get("properties", {}).get("confidence", 0) or 0) < 0.5:
            tasks.append({"id": f"TASK-{eid}-VERIFY", "entity_id": eid, "priority": "normal", "title": f"Overiť objekt {eid}"})
        if not entity.get("relations") and entity.get("type") in ["Well", "Pipe", "Tree", "Hive"]:
            tasks.append({"id": f"TASK-{eid}-RELATION", "entity_id": eid, "priority": "low", "title": f"Doplniť vzťahy pre {eid}"})
    return tasks

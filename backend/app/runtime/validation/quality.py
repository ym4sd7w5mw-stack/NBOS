def entity_quality(entity: dict) -> dict:
    score = 20
    missing = []
    if entity.get("geometry"):
        score += 30
    else:
        missing.append("geometry")
    if entity.get("photos"):
        score += 15
    else:
        missing.append("photos")
    confidence = float(entity.get("properties", {}).get("confidence", 0) or 0)
    score += min(20, int(confidence * 20))
    if entity.get("relations"):
        score += 10
    else:
        missing.append("relations")
    if entity.get("timeline"):
        score += 10
    else:
        missing.append("timeline")
    return {"entity_id": entity.get("id"), "score": min(100, score), "missing": missing}

def quality_report(entities: list[dict]) -> dict:
    items = [entity_quality(entity) for entity in entities]
    avg = round(sum(item["score"] for item in items) / max(1, len(items)), 1)
    return {"average_score": avg, "items": items, "low_quality": [item for item in items if item["score"] < 60]}

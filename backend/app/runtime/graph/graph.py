def graph_export(entities: list[dict]) -> dict:
    nodes = [{"id": entity.get("id"), "type": entity.get("type"), "name": entity.get("name")} for entity in entities]
    ids = {node["id"] for node in nodes}
    edges = []
    warnings = []
    for entity in entities:
        for relation in entity.get("relations", []):
            target = relation.get("target_id") or relation.get("target")
            edges.append({"source": entity.get("id"), "relation": relation.get("type") or relation.get("relation"), "target": target})
            if target and target not in ids:
                warnings.append(f"{entity.get('id')} relation target missing: {target}")
    return {"nodes": nodes, "edges": edges, "warnings": warnings}

def impact(entity_id: str, entities: list[dict]) -> dict:
    graph = graph_export(entities)
    affected = set()
    frontier = [entity_id]
    while frontier:
        current = frontier.pop()
        for edge in graph["edges"]:
            if edge["source"] == current and edge["target"] not in affected:
                affected.add(edge["target"])
                frontier.append(edge["target"])
    return {"source_id": entity_id, "affected": sorted(affected), "affected_count": len(affected)}

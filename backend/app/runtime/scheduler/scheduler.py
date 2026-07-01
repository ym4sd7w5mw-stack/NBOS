def schedule_suggestions(entities: list[dict]) -> list[dict]:
    suggestions = []
    for entity in entities:
        if entity.get("type") == "Hive" and not entity.get("timeline"):
            suggestions.append({"entity_id": entity.get("id"), "priority": "normal", "suggestion": "Naplánovať prvú kontrolu úľa."})
        if entity.get("type") == "Tree" and not entity.get("photos"):
            suggestions.append({"entity_id": entity.get("id"), "priority": "normal", "suggestion": "Doplniť fotku stromu a základný pas."})
        if entity.get("type") == "Well" and not entity.get("measurements"):
            suggestions.append({"entity_id": entity.get("id"), "priority": "high", "suggestion": "Spraviť prietokový test vrtu."})
    return suggestions

from app.core.object_definitions import OBJECT_DEFINITIONS

def missing_data_advice_for_entity(entity: dict):
    object_type = entity.get("type")
    definition = OBJECT_DEFINITIONS.get(object_type)
    if not definition:
        return []

    properties = entity.get("properties", {}) or {}
    advice = []

    for suggestion in definition.get("missing_data_suggestions", []):
        required = suggestion.get("requires", [])
        missing = [key for key in required if properties.get(key) in [None, "", []]]

        if missing:
            advice.append({
                "entity_id": entity.get("id"),
                "entity_name": entity.get("name"),
                "type": object_type,
                "missing": missing,
                "message": suggestion.get("message"),
                "unlocks": definition.get("capabilities", []),
            })

    return advice

def missing_data_advice(entities: list[dict]):
    result = []
    for entity in entities:
        result.extend(missing_data_advice_for_entity(entity))
    return result

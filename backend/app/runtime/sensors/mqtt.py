def mqtt_topic(domain: str, entity_id: str, variable: str) -> str:
    return f"nbos/{domain}/{entity_id}/{variable}"

def parse_sensor_message(topic: str, value) -> dict:
    parts = topic.split("/")
    if len(parts) < 4:
        return {"error": "invalid topic"}
    return {"domain": parts[1], "entity_id": parts[2], "variable": parts[3], "value": value}

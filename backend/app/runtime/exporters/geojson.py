def entities_to_geojson(entities: list[dict]) -> dict:
    features = []
    for entity in entities:
        if not entity.get("geometry"):
            continue
        props = dict(entity.get("properties", {}))
        props.update({"id": entity.get("id"), "type": entity.get("type"), "name": entity.get("name")})
        features.append({"type": "Feature", "geometry": entity["geometry"], "properties": props})
    return {"type": "FeatureCollection", "features": features}

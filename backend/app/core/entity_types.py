from app.core.object_definitions import OBJECT_DEFINITIONS

ENTITY_TYPES = {
    key: {
        "label": value["label"],
        "category": value["category"],
        "color": value["color"],
        "icon": value["icon"],
    }
    for key, value in OBJECT_DEFINITIONS.items()
}

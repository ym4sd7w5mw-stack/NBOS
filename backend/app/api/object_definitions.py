from fastapi import APIRouter

from app.core.object_definitions import OBJECT_DEFINITIONS

router = APIRouter(prefix="/runtime")

@router.get("/object-definitions")
def object_definitions():
    return OBJECT_DEFINITIONS

@router.get("/object-definitions/{object_type}")
def object_definition(object_type: str):
    return OBJECT_DEFINITIONS.get(object_type, {
        "error": "unknown object type",
        "object_type": object_type,
    })

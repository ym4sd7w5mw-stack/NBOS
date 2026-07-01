from fastapi import APIRouter

from app.core.entity_types import ENTITY_TYPES

router = APIRouter(prefix="/runtime")

@router.get("/entity-types")
def entity_types():
    return ENTITY_TYPES

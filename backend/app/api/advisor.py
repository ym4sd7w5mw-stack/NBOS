from fastapi import APIRouter

from app.runtime.store import RUNTIME_ENTITIES
from app.runtime.advisor import missing_data_advice

router = APIRouter(prefix="/runtime")

@router.get("/advisor/missing-data")
def advisor_missing_data():
    return {
        "count": len(missing_data_advice(RUNTIME_ENTITIES)),
        "items": missing_data_advice(RUNTIME_ENTITIES),
    }

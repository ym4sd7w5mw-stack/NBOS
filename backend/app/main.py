from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.runtime import router as runtime_router
from app.api.entity_types import router as entity_types_router
from app.runtime.store import load_snapshot

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_origin_regex=r"https://.*\.app\.github\.dev",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_load_snapshot():
    result = load_snapshot()
    print("NBOS snapshot autoload:", result)

@app.get("/")
def root():
    return {
        "name": settings.app_name,
        "version": settings.version,
        "status": "running",
    }

app.include_router(runtime_router)
app.include_router(entity_types_router)

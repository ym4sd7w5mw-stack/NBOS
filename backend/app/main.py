from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.runtime import router as runtime_router

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

@app.get("/")
def root():
    return {
        "name": settings.app_name,
        "version": settings.version,
        "status": "running",
    }

app.include_router(runtime_router)
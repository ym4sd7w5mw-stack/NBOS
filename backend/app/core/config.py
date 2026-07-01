from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "NBOS Local Digital Twin"
    version: str = "1.8"
    snapshot_path: str = "runtime_data/nbos_snapshot_v1_8.json"

settings = Settings()

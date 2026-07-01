from fastapi import APIRouter, UploadFile, File
import json
from app.runtime.store import *
from app.runtime.importers.gps_csv import gps_csv_to_entities
from app.runtime.importers.photo_log import parse_photo_log, attach_photos
from app.runtime.drone.manifest import parse_drone_manifest, mission_alpha_template
from app.runtime.exporters.geojson import entities_to_geojson
from app.runtime.exporters.qgis import qgis_manifest
from app.runtime.exporters.postgis import postgis_ddl
from app.runtime.graph.graph import graph_export, impact
from app.runtime.timeline.timeline import create_event
from app.runtime.sensors.mqtt import mqtt_topic, parse_sensor_message
from app.runtime.steward.steward import steward_next_actions
from app.runtime.tasks import generate_tasks

router = APIRouter(prefix="/runtime", tags=["runtime"])

@router.post("/load")
def load(payload: dict):
    clear_runtime()
    upsert_entities(payload.get("objects", payload.get("entities", [])))
    report = steward_next_actions(RUNTIME_ENTITIES, RUNTIME_MEDIA)
    RUNTIME_REPORTS.append(report)
    save_snapshot()
    return report

@router.post("/upload/field-package-json")
async def upload_field_package_json(file: UploadFile = File(...)):
    payload = json.loads((await file.read()).decode("utf-8"))
    return load(payload)

@router.post("/upload/gps-csv")
async def upload_gps(file: UploadFile = File(...)):
    entities, warnings = gps_csv_to_entities((await file.read()).decode("utf-8"))
    upsert_entities(entities)
    save_snapshot()
    return {"imported": len(entities), "warnings": warnings, "steward": steward_next_actions(RUNTIME_ENTITIES, RUNTIME_MEDIA)}

@router.post("/upload/photo-log")
async def upload_photo(file: UploadFile = File(...)):
    rows, warnings = parse_photo_log((await file.read()).decode("utf-8"))
    RUNTIME_MEDIA.extend(rows)
    linked = attach_photos(RUNTIME_ENTITIES, rows)
    save_snapshot()
    return {"photos": len(rows), "linked": linked, "warnings": warnings, "steward": steward_next_actions(RUNTIME_ENTITIES, RUNTIME_MEDIA)}

@router.get("/entities")
def entities():
    return RUNTIME_ENTITIES

@router.get("/geojson")
def geojson():
    return entities_to_geojson(RUNTIME_ENTITIES)

@router.get("/qgis/manifest")
def qgis():
    return qgis_manifest()

@router.get("/postgis/ddl.sql")
def ddl():
    return {"sql": postgis_ddl()}

@router.get("/graph")
def graph():
    return graph_export(RUNTIME_ENTITIES)

@router.get("/impact/{entity_id}")
def impact_route(entity_id: str):
    return impact(entity_id, RUNTIME_ENTITIES)

@router.get("/tasks")
def tasks():
    return generate_tasks(RUNTIME_ENTITIES)

@router.get("/steward")
def steward():
    return steward_next_actions(RUNTIME_ENTITIES, RUNTIME_MEDIA)

@router.post("/events")
def event(payload: dict):
    ev = create_event(payload.get("entity_id"), payload.get("event_type"), payload.get("notes", ""), payload.get("properties", {}))
    return add_event(ev)

@router.get("/snapshot")
def get_snapshot():
    return save_snapshot()

@router.post("/snapshot/load")
def load_saved_snapshot():
    return load_snapshot()

@router.get("/drone/mission-alpha")
def mission_alpha(date: str = "YYYY-MM-DD"):
    return mission_alpha_template(date)

@router.post("/drone/manifest")
def drone_manifest(payload: dict):
    return parse_drone_manifest(payload)

@router.get("/sensors/topic")
def sensor_topic(domain: str, entity_id: str, variable: str):
    return {"topic": mqtt_topic(domain, entity_id, variable)}

@router.post("/sensors/parse")
def sensor_parse(payload: dict):
    return parse_sensor_message(payload.get("topic", ""), payload.get("value"))

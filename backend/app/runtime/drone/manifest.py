def parse_drone_manifest(payload: dict) -> dict:
    missions = payload.get("missions", [])
    warnings = []
    if not payload.get("date"):
        warnings.append("Drone manifest missing date")
    if not missions:
        warnings.append("Drone manifest has no missions")
    return {
        "mission_set": payload.get("mission_set"),
        "date": payload.get("date"),
        "missions": len(missions),
        "mission_ids": [m.get("id") for m in missions],
        "expected_folders": [f"NBOS_DRONE_{payload.get('date','YYYY-MM-DD')}_{m.get('id')}" for m in missions],
        "warnings": warnings
    }

def mission_alpha_template(date: str = "YYYY-MM-DD") -> dict:
    return {
        "mission_set": "MISSION_ALPHA",
        "date": date,
        "missions": [
            {"id": "M001_ORTHO", "height_m_agl": 50, "gimbal_deg": -90, "priority": "critical"},
            {"id": "M002_BUILDINGS", "height_m_agl": 30, "gimbal_deg": -55, "priority": "high"},
            {"id": "M003_CONTEXT", "height_m_agl": 40, "gimbal_deg": -45, "priority": "normal"}
        ]
    }

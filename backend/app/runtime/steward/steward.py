from app.runtime.reports.report import build_report
from app.runtime.scheduler.scheduler import schedule_suggestions

def steward_next_actions(entities: list[dict], media: list[dict]):
    report = build_report(entities, media)
    suggestions = schedule_suggestions(entities)
    actions = []
    for item in report["quality"]["low_quality"]:
        actions.append({
            "entity_id": item["entity_id"],
            "priority": "high" if "geometry" in item["missing"] else "normal",
            "action": f"Doplniť: {', '.join(item['missing'])}"
        })
    return {
        "summary": "NBOS Steward pripravil ďalšie kroky pre zlepšenie digitálneho dvojčaťa.",
        "report": report,
        "schedule_suggestions": suggestions,
        "next_actions": actions[:10]
    }

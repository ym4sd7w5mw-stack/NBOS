from app.runtime.validation.quality import quality_report
from app.runtime.graph.graph import graph_export
from app.runtime.tasks import generate_tasks

def build_report(entities: list[dict], media: list[dict], warnings: list[str] | None = None):
    quality = quality_report(entities)
    graph = graph_export(entities)
    return {
        "objects": len(entities),
        "media": len(media),
        "relations": len(graph["edges"]),
        "warnings": (warnings or []) + graph.get("warnings", []),
        "quality": quality,
        "tasks": generate_tasks(entities)
    }

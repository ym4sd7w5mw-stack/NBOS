def qgis_manifest() -> dict:
    return {
        "project": "NBOS_QGIS_v1_8",
        "layers": [
            {"name": "nbos_entities", "geometry": "mixed", "source": "/runtime/geojson"},
            {"name": "nbos_tasks", "geometry": "Point", "source": "/runtime/tasks"},
            {"name": "nbos_graph", "source": "/runtime/graph"}
        ],
        "recommended_crs": "EPSG:4326 initially; refine after GPS/RTK survey"
    }

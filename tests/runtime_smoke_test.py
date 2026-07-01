from backend.app.runtime.importers.gps_csv import gps_csv_to_entities
from backend.app.runtime.graph.graph import impact

csv = '''object_id,type,name,lat,lon
WELL-0001,Well,Vrt,48.0,17.0
'''
entities, warnings = gps_csv_to_entities(csv)
assert len(entities) == 1
assert warnings == []
assert impact("WELL-0001", entities)["source_id"] == "WELL-0001"
print("NBOS smoke test OK")

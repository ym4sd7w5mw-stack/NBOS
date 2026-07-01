import csv
from io import StringIO

def parse_photo_log(text: str):
    rows = list(csv.DictReader(StringIO(text)))
    warnings = []
    for i, row in enumerate(rows, start=1):
        if not row.get("file_name"):
            warnings.append(f"photo row {i}: missing file_name")
        if not row.get("object_id"):
            warnings.append(f"photo row {i}: missing object_id")
    return rows, warnings

def attach_photos(entities: list[dict], photos: list[dict]):
    by_id = {e.get("id"): e for e in entities}
    linked = 0
    for photo in photos:
        oid = photo.get("object_id")
        if oid in by_id:
            by_id[oid].setdefault("photos", []).append(photo)
            linked += 1
    return linked

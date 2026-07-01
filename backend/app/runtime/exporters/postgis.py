def postgis_ddl() -> str:
    return '''
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS nbos_entities (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    geom GEOMETRY,
    properties JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS nbos_relations (
    id SERIAL PRIMARY KEY,
    source_id TEXT REFERENCES nbos_entities(id),
    relation_type TEXT NOT NULL,
    target_id TEXT REFERENCES nbos_entities(id),
    confidence NUMERIC DEFAULT 1.0
);

CREATE TABLE IF NOT EXISTS nbos_events (
    id TEXT PRIMARY KEY,
    entity_id TEXT REFERENCES nbos_entities(id),
    event_type TEXT NOT NULL,
    event_date TIMESTAMP DEFAULT now(),
    properties JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS nbos_measurements (
    id TEXT PRIMARY KEY,
    entity_id TEXT REFERENCES nbos_entities(id),
    variable TEXT NOT NULL,
    value NUMERIC,
    unit TEXT,
    measured_at TIMESTAMP DEFAULT now(),
    properties JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS nbos_media (
    id TEXT PRIMARY KEY,
    entity_id TEXT REFERENCES nbos_entities(id),
    file_name TEXT NOT NULL,
    media_type TEXT,
    properties JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS nbos_entities_geom_idx ON nbos_entities USING GIST (geom);
'''

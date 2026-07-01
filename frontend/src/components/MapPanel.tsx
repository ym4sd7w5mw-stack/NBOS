import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type Props = {
  entities: any[];
  selectedEntityId: string | null;
  onSelectEntity: (entity: any) => void;
};

function colorByType(type: string) {
  if (type === "Well") return "#2563eb";
  if (type === "Hive") return "#f59e0b";
  if (type === "Tree") return "#16a34a";
  if (type === "Pipe") return "#0ea5e9";
  return "#6b7280";
}

export default function MapPanel({ entities, selectedEntityId, onSelectEntity }: Props) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const entitiesRef = useRef<any[]>([]);
  const loadedRef = useRef(false);

  useEffect(() => {
    entitiesRef.current = entities;
  }, [entities]);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
        },
        layers: [{ id: "osm", type: "raster", source: "osm" }],
      },
      center: [17.0002, 48.0002],
      zoom: 17,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      loadedRef.current = true;

      if (!map.getSource("nbos")) {
        map.addSource("nbos", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        map.addLayer({
          id: "nbos-lines",
          type: "line",
          source: "nbos",
          filter: ["==", ["geometry-type"], "LineString"],
          paint: {
            "line-width": 4,
            "line-color": ["get", "color"],
          },
        });

        map.addLayer({
          id: "nbos-points",
          type: "circle",
          source: "nbos",
          filter: ["==", ["geometry-type"], "Point"],
          paint: {
            "circle-radius": ["case", ["==", ["get", "selected"], true], 13, 9],
            "circle-color": ["get", "color"],
            "circle-stroke-width": 3,
            "circle-stroke-color": "#ffffff",
          },
        });
      }
    });

    map.on("click", "nbos-points", (event) => {
      const feature = event.features?.[0];
      const id = feature?.properties?.id;
      if (!id) return;

      const entity = entitiesRef.current.find((item) => item.id === id);
      if (entity) onSelectEntity(entity);
    });

    map.on("mouseenter", "nbos-points", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "nbos-points", () => {
      map.getCanvas().style.cursor = "";
    });

    mapRef.current = map;
  }, [onSelectEntity]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const updateMapData = () => {
      if (!loadedRef.current || !map.getSource("nbos")) return;

      const features = entities
        .filter((entity) => entity.geometry)
        .map((entity) => ({
          type: "Feature",
          geometry: entity.geometry,
          properties: {
            id: entity.id,
            name: entity.name,
            type: entity.type,
            color: colorByType(entity.type),
            selected: entity.id === selectedEntityId,
          },
        }));

      const geojson: any = {
        type: "FeatureCollection",
        features,
      };

      const source = map.getSource("nbos") as maplibregl.GeoJSONSource;
      source.setData(geojson);

      const coordinates: [number, number][] = [];

      for (const feature of features) {
        const geometry: any = feature.geometry;
        if (geometry.type === "Point") coordinates.push(geometry.coordinates);
        if (geometry.type === "LineString") coordinates.push(...geometry.coordinates);
      }

      if (coordinates.length > 0) {
        const bounds = new maplibregl.LngLatBounds(coordinates[0], coordinates[0]);
        coordinates.forEach((coord) => bounds.extend(coord));
        map.fitBounds(bounds, { padding: 80, maxZoom: 18, duration: 600 });
      }
    };

    if (loadedRef.current) updateMapData();
    else map.once("load", updateMapData);
  }, [entities, selectedEntityId]);

  return (
    <section style={{ marginTop: 24 }}>
      <h2>Mapa</h2>
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: 520,
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #ddd",
        }}
      />
    </section>
  );
}

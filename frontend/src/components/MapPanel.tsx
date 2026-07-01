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

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
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

    mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

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

    const applyData = () => {
      const existingSource = map.getSource("nbos") as maplibregl.GeoJSONSource | undefined;

      if (existingSource) {
        existingSource.setData(geojson);
      } else {
        map.addSource("nbos", {
          type: "geojson",
          data: geojson,
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

        map.on("click", "nbos-points", (event) => {
          const feature = event.features?.[0];
          if (!feature) return;
          const entity = entities.find((item) => item.id === feature.properties?.id);
          if (entity) onSelectEntity(entity);
        });

        map.on("mouseenter", "nbos-points", () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", "nbos-points", () => {
          map.getCanvas().style.cursor = "";
        });
      }

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

    if (map.isStyleLoaded()) applyData();
    else map.once("load", applyData);
  }, [entities, selectedEntityId, onSelectEntity]);

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
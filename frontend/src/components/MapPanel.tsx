import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type Props = {
  entities: any[];
};

export default function MapPanel({ entities }: Props) {
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

    const geojson: any = {
      type: "FeatureCollection",
      features: entities
        .filter((entity) => entity.geometry)
        .map((entity) => ({
          type: "Feature",
          geometry: entity.geometry,
          properties: {
            id: entity.id,
            name: entity.name,
            type: entity.type,
          },
        })),
    };

    const applyData = () => {
      const existingSource = map.getSource("nbos") as maplibregl.GeoJSONSource | undefined;

      if (existingSource) {
        existingSource.setData(geojson);
        return;
      }

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
          "line-color": "#2563eb",
        },
      });

      map.addLayer({
        id: "nbos-points",
        type: "circle",
        source: "nbos",
        filter: ["==", ["geometry-type"], "Point"],
        paint: {
          "circle-radius": 9,
          "circle-color": "#16a34a",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      map.on("click", "nbos-points", (event) => {
        const feature = event.features?.[0];
        if (!feature) return;

        new maplibregl.Popup()
          .setLngLat((feature.geometry as any).coordinates)
          .setHTML(
            `<strong>${feature.properties?.id}</strong><br/>${feature.properties?.name}<br/>${feature.properties?.type}`
          )
          .addTo(map);
      });
    };

    if (map.isStyleLoaded()) applyData();
    else map.once("load", applyData);
  }, [entities]);

  return (
    <section style={{ marginTop: 24 }}>
      <h2>Mapa</h2>
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: 480,
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #ddd",
        }}
      />
    </section>
  );
}
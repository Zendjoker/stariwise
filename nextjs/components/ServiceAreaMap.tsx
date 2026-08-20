"use client";
import { useEffect } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const L: any;
}

export default function ServiceAreaMap() {
  useEffect(() => {
    // Dynamically inject Leaflet CSS + JS
    const addLink = () => {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        l.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        l.crossOrigin = "";
        document.head.appendChild(l);
      }
    };

    const initMap = () => {
      addLink();
      const el = document.getElementById("swMap");
      if (!el || (el as HTMLElement & { _leaflet_id?: number })._leaflet_id) return;

      const map = L.map(el, { center: [37.62, -122.14], zoom: 9, scrollWheelZoom: false });
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 18,
      }).addTo(map);

      const core = [[37.700,-122.130],[37.720,-122.030],[37.775,-121.965],[37.905,-122.055],[37.985,-122.130],[38.025,-122.290],[38.015,-122.410],[38.005,-122.545],[37.905,-122.562],[37.858,-122.538],[37.808,-122.528],[37.775,-122.532],[37.725,-122.532],[37.655,-122.508],[37.595,-122.415],[37.545,-122.330],[37.493,-122.238],[37.450,-122.150]];
      const ext  = [[37.450,-122.150],[37.400,-122.110],[37.290,-122.030],[37.210,-121.950],[37.230,-121.830],[37.330,-121.800],[37.450,-121.870],[37.560,-121.980],[37.700,-122.130]];
      const outline = [[38.005,-122.545],[38.015,-122.410],[38.025,-122.290],[37.985,-122.130],[37.905,-122.055],[37.775,-121.965],[37.720,-122.030],[37.700,-122.130],[37.560,-121.980],[37.450,-121.870],[37.330,-121.800],[37.230,-121.830],[37.210,-121.950],[37.290,-122.030],[37.400,-122.110],[37.450,-122.150],[37.493,-122.238],[37.545,-122.330],[37.595,-122.415],[37.655,-122.508],[37.725,-122.532],[37.775,-122.532],[37.808,-122.528],[37.858,-122.538],[37.905,-122.562]];

      const corePoly = L.polygon(core, { stroke: false, fillColor: "#4C9A3C", fillOpacity: 0.30 }).addTo(map).bindPopup("<strong>Core zone</strong><br>Flat rate, no travel fee.");
      const extPoly  = L.polygon(ext,  { stroke: false, fillColor: "#D69E2E", fillOpacity: 0.28 }).addTo(map).bindPopup("<strong>South Bay / San Jose</strong><br>Available on request (+$10).");
      L.polygon(outline, { color: "#2F6B26", weight: 2.5, fill: false, smoothFactor: 1.2, interactive: false }).addTo(map);

      map.fitBounds(corePoly.getBounds().extend(extPoly.getBounds()), { padding: [20, 20] });
      const refresh = () => map.invalidateSize(false);
      window.addEventListener("load", refresh);
      if ("ResizeObserver" in window) new ResizeObserver(refresh).observe(el);
      map.on("click", () => map.scrollWheelZoom.enable());
      el.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());
    };

    if (typeof L !== "undefined") {
      initMap();
    } else {
      const s = document.createElement("script");
      s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      s.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      s.crossOrigin = "";
      s.onload = initMap;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div
      id="swMap"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "var(--warm-grey)" }}
      role="img"
      aria-label="Map of the Stairwise Bay Area service zones"
    />
  );
}

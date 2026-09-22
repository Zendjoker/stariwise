"use client";
import dynamic from "next/dynamic";
import Reveal from "./Reveal";

// Leaflet requires browser APIs — must be client-side only
const Map = dynamic(() => import("./ServiceAreaMap"), { ssr: false, loading: () => <div style={{ background: "var(--warm-grey)", flex: 1 }} /> });

export default function ServiceArea() {
  return (
    <section id="areas" aria-labelledby="areas-heading">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Where we work</p>
          <h2 id="areas-heading">Where we work in the Bay Area.</h2>
          <p>Based in San Francisco and covering the whole Bay Area, up the Peninsula, across to the East Bay, and down to the South Bay. The core zone is a flat rate with no travel fee, and we&apos;ll quote anything beyond it.</p>
        </Reveal>

        <Reveal className="map-layout">
          <div className="map-frame">
            <Map />
            <div className="map-legend" aria-hidden="true">
              <p className="map-legend-title">Coverage</p>
              <p className="map-legend-row"><span className="swatch swatch-core" /> Core zone: flat rate</p>
              <p className="map-legend-row"><span className="swatch swatch-ext" /> South Bay: on request (+$10)</p>
            </div>
          </div>

          <div className="map-info">
            {[
              { cls: "zone-card-core", dot: "", title: "Core zone: flat rate, no travel fee", body: "All of San Francisco (including the Sunset), Daly City, South San Francisco, and down the Peninsula through San Mateo to Palo Alto. Across the bay: Richmond, Berkeley, Oakland, Alameda, San Leandro, Castro Valley, Hayward, San Ramon, and Walnut Creek." },
              { cls: "", dot: "zone-dot-neutral", title: "Boundaries", body: "North: up to Mill Valley and San Rafael. East: out through San Ramon and Walnut Creek." },
              { cls: "zone-card-ext", dot: "zone-dot-ext", title: "South Bay: on request", body: (<>Not a standard zone, but available on request with a flat <strong>$10 surcharge</strong>, including Mountain View, Palo Alto, and San Jose.</>) },
              { cls: "", dot: "zone-dot-neutral", title: "Beyond the zone", body: (<>Anything past the coverage area is quoted by mileage. <a href="#contact">Contact us for a price</a>.</>) },
            ].map(({ cls, dot, title, body }) => (
              <div key={title} className={`zone-card${cls ? " " + cls : ""}`}>
                <span className={`zone-dot${dot ? " " + dot : ""}`} />
                <div><h3>{title}</h3><p>{body}</p></div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

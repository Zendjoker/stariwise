"use client";
import { useState, useCallback } from "react";
import Reveal from "./Reveal";

type Category = "all" | "heavy" | "moving" | "assembly" | "cleaning" | "trash" | "office" | "storage" | "tools" | "vans";

const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "heavy", label: "Heavy Lifting" },
  { key: "moving", label: "Moving & Events" },
  { key: "assembly", label: "Assembly" },
  { key: "cleaning", label: "Cleaning" },
  { key: "trash", label: "Junk Removal" },
  { key: "office", label: "Offices" },
  { key: "storage", label: "Storage" },
  { key: "tools", label: "Tools & Gear" },
  { key: "vans", label: "Vans & Trucks" },
];

const ITEMS: { src: string; alt: string; cat: Category }[] = [
  { src: "/images/work-web/heavy-1.webp", alt: "Stairwise crew heavy lifting in SF", cat: "heavy" },
  { src: "/images/work-web/heavy-2.webp", alt: "Stairwise movers carrying a dresser", cat: "heavy" },
  { src: "/images/work-web/heavy-3.webp", alt: "Stairwise crew carrying a table on an SF street", cat: "heavy" },
  { src: "/images/work-web/moving-1.webp", alt: "Stairwise crew on a San Francisco move", cat: "moving" },
  { src: "/images/work-web/assembly-1.webp", alt: "Furniture assembled by Stairwise", cat: "assembly" },
  { src: "/images/work-web/cleaning-1.webp", alt: "Move-out cleaning by Stairwise", cat: "cleaning" },
  { src: "/images/work-web/trash-1.webp", alt: "Junk removal by Stairwise", cat: "trash" },
  { src: "/images/work-web/heavy-4.webp", alt: "Heavy item moved by Stairwise", cat: "heavy" },
  { src: "/images/work-web/vans-1.webp", alt: "Stairwise moving van in SF", cat: "vans" },
  { src: "/images/work-web/moving-2.webp", alt: "Stairwise crew loading a move", cat: "moving" },
  { src: "/images/work-web/office-1.webp", alt: "Office move by Stairwise", cat: "office" },
  { src: "/images/work-web/assembly-2.webp", alt: "Flat-pack furniture built by Stairwise", cat: "assembly" },
  { src: "/images/work-web/storage-1.webp", alt: "Storage organizing by Stairwise", cat: "storage" },
  { src: "/images/work-web/trash-2.webp", alt: "Furniture hauled away by Stairwise", cat: "trash" },
  { src: "/images/work-web/tools-1.webp", alt: "Stairwise dollies, straps and gear", cat: "tools" },
  { src: "/images/work-web/heavy-5.webp", alt: "Stairwise crew lifting a heavy item", cat: "heavy" },
  { src: "/images/work-web/moving-3.webp", alt: "Event setup and moving by Stairwise", cat: "moving" },
  { src: "/images/work-web/cleaning-2.webp", alt: "Deep cleaning by Stairwise", cat: "cleaning" },
  { src: "/images/work-web/office-2.webp", alt: "Commercial office relocation by Stairwise", cat: "office" },
  { src: "/images/work-web/vans-2.webp", alt: "Loaded Stairwise moving truck", cat: "vans" },
  { src: "/images/work-web/assembly-3.webp", alt: "Assembled shelving by Stairwise", cat: "assembly" },
  { src: "/images/work-web/storage-2.webp", alt: "Storage unit organized by Stairwise", cat: "storage" },
  { src: "/images/work-web/trash-3.webp", alt: "Cleared clutter by Stairwise", cat: "trash" },
  { src: "/images/work-web/moving-4.webp", alt: "Stairwise crew mid-move", cat: "moving" },
];

export default function WorkGallery() {
  const [active, setActive] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; idx: number } | null>(null);

  const visible = ITEMS.filter(i => active === "all" || i.cat === active);

  const openAt = useCallback((idx: number) => {
    const item = visible[idx];
    if (item) setLightbox({ ...item, idx });
  }, [visible]);

  const prev = () => lightbox && openAt((lightbox.idx - 1 + visible.length) % visible.length);
  const next = () => lightbox && openAt((lightbox.idx + 1) % visible.length);

  return (
    <section id="work" className="bg-grey" aria-labelledby="work-heading">
      <div className="wrap">
        <Reveal className="section-head center">
          <p className="eyebrow">Our work</p>
          <h2 id="work-heading">Real jobs, real crews.</h2>
          <p>A look at recent Stairwise jobs across San Francisco. Tap any photo to enlarge.</p>
        </Reveal>

        <Reveal className="gallery-filters" role="tablist" aria-label="Filter work photos">
          {FILTERS.map(({ key, label }) => (
            <button key={key} className={`gallery-filter${active === key ? " is-active" : ""}`} onClick={() => setActive(key)} aria-pressed={active === key}>
              {label}
            </button>
          ))}
        </Reveal>

        <Reveal className="gallery-grid">
          {visible.map((item, idx) => (
            <figure key={item.src} className="gallery-item" onClick={() => openAt(idx)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt} loading="lazy" />
            </figure>
          ))}
        </Reveal>
      </div>

      {lightbox && (
        <div className="lightbox open" role="dialog" aria-modal aria-label="Photo viewer" onClick={e => { if (e.target === e.currentTarget) setLightbox(null); }}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
          </button>
          <button className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lightbox-img" src={lightbox.src} alt={lightbox.alt} />
          <button className="lightbox-nav lightbox-next" onClick={next} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      )}
    </section>
  );
}

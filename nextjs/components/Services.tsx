import Reveal from "./Reveal";

const SERVICES = [
  {
    title: "Heavy Lifting",
    sub: "Pianos, safes, appliances & oversized items",
    desc: "Pianos, safes, appliances, gym equipment, marble tops. The awkward, back-breaking items that need a crew who's done it before.",
    items: ["Single heavy items or full loads", "Stairs, tight turns & walk-ups", "Straps, dollies & proper technique"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6.5 6.5h11v11h-11z"/><path d="M3 9v6M21 9v6M9 3h6M9 21h6"/></svg>,
  },
  {
    title: "Moving Help",
    sub: "Studios, apartments & full homes",
    desc: "Full-service local moves across San Francisco and the Peninsula. We wrap, carry, load, and set everything back down where it belongs.",
    items: ["Studios, apartments & full homes", "Padding, shrink wrap & blankets", "Loading, transport & unloading"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  },
  {
    title: "Furniture Assembly",
    sub: "Flat-pack, wall mounting & anchoring",
    desc: "Flat-pack, imported, or vintage, we build it right, level it, and haul away the boxes so your new place is ready to live in.",
    items: ["Beds, wardrobes, desks & shelving", "Wall mounting & anchoring", "Packaging removed & recycled"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5.4-5.4l-2.7 2.7-2.1-2.1z"/></svg>,
  },
  {
    title: "Trash & Junk Removal",
    sub: "Furniture, appliances & clutter hauled away",
    desc: "Old furniture, appliances, boxes, and clutter cleared out and hauled away. We load it, you don't have to touch it again.",
    items: ["Furniture, appliances & boxes", "Full-apartment or single-item hauls", "Disposal fees apply, quoted upfront"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
  },
  {
    title: "Cleaning",
    sub: "Move-in & move-out cleans",
    desc: "Move-in or move-out cleaning that gets the place genuinely clean: floors, surfaces, kitchens, bathrooms, and everything in between.",
    items: ["Move-in & move-out cleans", "Kitchens, bathrooms & floors", "Can be booked standalone"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 7h3l2-4h8l2 4h3a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a1 1 0 0 1 1-1z"/><path d="M12 11v6M9 14h6"/></svg>,
  },
  {
    title: "Offices",
    sub: "Commercial moves, desks & office setup",
    desc: "Office relocations, desk and workstation assembly, and after-hours or weekend moves so your team loses zero business days.",
    items: ["Desks, chairs & workstation assembly", "After-hours & weekend scheduling", "Labeled, organized, ready Monday morning"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1"/><path d="M9 21v-4h6v4"/></svg>,
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
);

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">What we do</p>
          <h2 id="services-heading">Six services, done right.</h2>
          <p>No bloated menus, no upsells. Every job gets the same careful crew, the same upfront rate, and the same standard of work.</p>
        </Reveal>

        <div className="cards-3">
          {SERVICES.map((s) => (
            <Reveal key={s.title} as="article" className="service-card">
              <span className="icon-badge">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="incl">
                {s.items.map((item) => (
                  <li key={item}><CheckIcon />{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState, useRef } from "react";
import { useAuth } from "@/lib/useAuth";

const SERVICES = [
  { v: "moving", l: "Moving Help" }, { v: "lifting", l: "Heavy Lifting" },
  { v: "assembly", l: "Furniture Assembly" }, { v: "cleaning", l: "Cleaning" },
  { v: "junk", l: "Junk Removal" }, { v: "van", l: "Van / Truck" }, { v: "other", l: "Other" },
];

export default function HelperOnboarding({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const { user, applyAsHelper, updateProfile } = useAuth();
  const [services, setServices] = useState<string[]>([]);
  const [bio, setBio]           = useState(user?.bio || "");
  const [experience, setExp]    = useState(user?.experience || "");
  const [location, setLoc]      = useState(user?.location || "");
  const [phone, setPhone]       = useState(user?.phone || "");
  const [picFile, setPicFile]   = useState<File | null>(null);
  const [picPreview, setPicPrev] = useState<string | null>(user?.profile_picture || null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [done, setDone]         = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleService = (v: string) =>
    setServices(prev => prev.includes(v) ? prev.filter(s => s !== v) : [...prev, v]);

  const onPicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPicFile(f);
    const reader = new FileReader();
    reader.onload = ev => setPicPrev(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bio.trim()) { setError("Please write a short bio."); return; }
    if (services.length === 0) { setError("Select at least one service you offer."); return; }
    if (!phone.trim()) { setError("Phone number is required."); return; }
    setLoading(true); setError("");

    // Upload profile picture first if changed
    if (picFile) {
      const fd = new FormData();
      fd.append("profile_picture", picFile);
      fd.append("phone", phone);
      fd.append("location", location);
      await updateProfile(fd);
    }

    const res = await applyAsHelper({ bio, experience, services_offered: services, location, phone });
    if (res.ok) { setDone(true); } else { setError(res.error || "Application failed."); }
    setLoading(false);
  };

  return (
    <div className="nh-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="nh-modal nh-modal-wide">
        <button className="nh-modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        </button>

        {done ? (
          <div className="nh-modal-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            <strong>Application submitted!</strong>
            <p>We&apos;ll review your profile and notify you by email. Most applications are reviewed within 24 hours.</p>
            <button className="btn btn-primary" style={{ marginTop: "1.2rem" }} onClick={onDone}>Got it</button>
          </div>
        ) : (
          <>
            <h2 className="nh-modal-title">Apply as a helper</h2>
            <p className="nh-modal-sub">Tell us about yourself. Once approved, you can apply to tasks and earn in SF.</p>

            <form onSubmit={submit} noValidate>
              {/* Profile picture */}
              <div className="helper-pic-upload" onClick={() => fileRef.current?.click()}>
                {picPreview
                  ? <img src={picPreview} alt="Profile" />
                  : <div className="helper-pic-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>}
                <div className="helper-pic-label">
                  <strong>Profile photo</strong>
                  <span>Click to upload</span>
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onPicChange} />
              </div>

              <div className="nh-form-grid">
                <div className="field">
                  <label htmlFor="ho-phone">Phone <span style={{ color: "#DC2626" }}>*</span></label>
                  <input type="tel" id="ho-phone" placeholder="(415) 555-0100" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div className="field">
                  <label htmlFor="ho-loc">Your neighborhood</label>
                  <input type="text" id="ho-loc" placeholder="e.g. Mission District, SF" value={location} onChange={e => setLoc(e.target.value)} />
                </div>
                <div className="field nh-full">
                  <label htmlFor="ho-bio">Bio <span style={{ color: "#DC2626" }}>*</span></label>
                  <textarea id="ho-bio" rows={3} value={bio} onChange={e => setBio(e.target.value)}
                    placeholder="Tell task posters about yourself: your background, reliability, anything that makes you a great helper." />
                </div>
                <div className="field nh-full">
                  <label htmlFor="ho-exp">Experience</label>
                  <textarea id="ho-exp" rows={2} value={experience} onChange={e => setExp(e.target.value)}
                    placeholder="e.g. 5 years moving experience in SF, licensed driver with cargo van, proficient with IKEA assembly…" />
                </div>
                <div className="field nh-full">
                  <label>Services you can offer <span style={{ color: "#DC2626" }}>*</span></label>
                  <div className="service-chips">
                    {SERVICES.map(({ v, l }) => (
                      <button key={v} type="button"
                        className={`service-chip${services.includes(v) ? " is-selected" : ""}`}
                        onClick={() => toggleService(v)}>{l}</button>
                    ))}
                  </div>
                </div>
              </div>
              {error && <p className="nh-error">{error}</p>}
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "1rem" }} disabled={loading}>
                {loading ? "Submitting…" : "Submit helper application"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

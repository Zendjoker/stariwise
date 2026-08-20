"use client";
import { useState, useRef } from "react";
import { useAuth } from "@/lib/useAuth";

export default function ProfilePanel({ onClose, onUpdated }: { onClose: () => void; onUpdated: () => void }) {
  const { user, updateProfile, logout } = useAuth();
  const [phone, setPhone]   = useState(user?.phone || "");
  const [loc, setLoc]       = useState(user?.location || "");
  const [bio, setBio]       = useState(user?.bio || "");
  const [picFile, setPic]   = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.profile_picture || null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved]   = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onPicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setPic(f);
    const r = new FileReader(); r.onload = ev => setPreview(ev.target?.result as string); r.readAsDataURL(f);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const fd = new FormData();
    fd.append("phone", phone); fd.append("location", loc); fd.append("bio", bio);
    if (picFile) fd.append("profile_picture", picFile);
    await updateProfile(fd);
    setSaved(true); setLoading(false); onUpdated();
  };

  if (!user) return null;

  return (
    <div className="nh-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="nh-modal">
        <button className="nh-modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        </button>
        <h2 className="nh-modal-title">Your profile</h2>
        <div className="profile-status">
          {user.helper_status === "approved" && <span className="status-pill approved">✓ Approved Helper</span>}
          {user.helper_status === "pending"  && <span className="status-pill pending">⏳ Pending Review</span>}
          {user.helper_status === "none"     && <span className="status-pill none">Not a helper yet</span>}
        </div>

        <div className="helper-pic-upload" onClick={() => fileRef.current?.click()} style={{ marginBottom: "1.2rem" }}>
          {preview
            ? <img src={preview} alt="Profile" />
            : <div className="helper-pic-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>}
          <div className="helper-pic-label"><strong>Profile photo</strong><span>Click to change</span></div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onPicChange} />
        </div>

        <form onSubmit={save} noValidate>
          <div className="nh-form-grid">
            <div className="field"><label>Phone</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} /></div>
            <div className="field"><label>Neighborhood</label>
              <input type="text" placeholder="Mission, SF" value={loc} onChange={e => setLoc(e.target.value)} /></div>
            <div className="field nh-full"><label>Bio</label>
              <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} /></div>
          </div>
          {saved && <p style={{ color: "var(--accent-green)", fontWeight: 600, marginTop: ".5rem" }}>✓ Saved!</p>}
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }} disabled={loading}>
            {loading ? "Saving…" : "Save changes"}
          </button>
        </form>

        <button onClick={() => { logout(); onClose(); }}
          style={{ width: "100%", marginTop: ".8rem", background: "none", border: "1px solid var(--border)", borderRadius: 999, padding: ".7rem", fontFamily: "inherit", cursor: "pointer", fontSize: ".92rem", color: "var(--deep-green)" }}>
          Sign out
        </button>
      </div>
    </div>
  );
}

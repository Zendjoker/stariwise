"use client";
import { useState } from "react";
import { useAuth } from "@/lib/useAuth";

function Field({ id, label, type = "text", placeholder = "", required = false, value, onChange, className = "" }: {
  id: string; label: string; type?: string; placeholder?: string;
  required?: boolean; value: string; onChange: (v: string) => void; className?: string;
}) {
  return (
    <div className={`field${className ? " " + className : ""}`}>
      <label htmlFor={id}>{label}{required && <span style={{ color: "#DC2626" }}> *</span>}</label>
      <input type={type} id={id} placeholder={placeholder} required={required} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

export default function AuthModal({
  mode, onClose, onSwitch, onDone,
}: { mode: "login" | "register"; onClose: () => void; onSwitch: (m: "login" | "register") => void; onDone: () => void; }) {
  const { login, register } = useAuth();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone]       = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    let res;
    if (mode === "login") {
      res = await login(email, password);
    } else {
      if (!name.trim()) { setError("Name is required."); setLoading(false); return; }
      res = await register({ name, email, password, phone, location });
    }
    if (res.ok) { onDone(); } else { setError(res.error || "Something went wrong."); }
    setLoading(false);
  };

  return (
    <div className="nh-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="nh-modal">
        <button className="nh-modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        </button>

        <div className="auth-header">
          <div className="auth-logo">🪜</div>
          <h2 className="nh-modal-title">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
          <p className="nh-modal-sub">{mode === "login" ? "Sign in to post tasks or apply as a helper." : "Join the SF helper network — post tasks or become a helper."}</p>
        </div>

        <form onSubmit={submit} noValidate>
          <div className="nh-form-grid">
            {mode === "register" && (
              <Field id="auth-name" label="Full name" value={name} onChange={setName} required className="nh-full" />
            )}
            <Field id="auth-email" label="Email" type="email" value={email} onChange={setEmail} required className="nh-full" />
            <Field id="auth-pass" label="Password" type="password" placeholder={mode === "register" ? "Min. 8 characters" : ""} value={password} onChange={setPassword} required className="nh-full" />
            {mode === "register" && (<>
              <Field id="auth-phone" label="Phone" type="tel" placeholder="(415) 555-0100" value={phone} onChange={setPhone} />
              <Field id="auth-loc" label="Your neighborhood" placeholder="e.g. Mission District, SF" value={location} onChange={setLocation} />
            </>)}
          </div>
          {error && <p className="nh-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "1rem" }} disabled={loading}>
            {loading ? "…" : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.1rem", fontSize: ".88rem", opacity: .7 }}>
          {mode === "login" ? "No account? " : "Already have one? "}
          <button onClick={() => onSwitch(mode === "login" ? "register" : "login")}
            style={{ background: "none", border: "none", color: "var(--accent-green)", fontWeight: 600, cursor: "pointer", fontSize: "inherit" }}>
            {mode === "login" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

// Remove duplicate FieldInner — Field above now handles className

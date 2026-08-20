"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface ManageData {
  task: {
    id: number; title: string; service_label: string; location: string;
    date_needed: string; status: string; poster_name: string;
    poster_phone: string; poster_email: string; application_count: number;
  };
  applications: {
    name: string; phone: string; email: string; message: string; applied_at: string;
  }[];
}

export default function ManagePage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData]       = useState<ManageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [updating, setUpdating] = useState(false);
  const [done, setDone]       = useState("");

  useEffect(() => {
    if (!token) return;
    fetch(`/api/helpers/tasks/manage/${token}/`)
      .then(r => { if (!r.ok) throw new Error("Not found"); return r.json(); })
      .then(setData)
      .catch(() => setError("Task not found. Check your link."))
      .finally(() => setLoading(false));
  }, [token]);

  async function action(act: "close" | "cancel") {
    setUpdating(true);
    const label = act === "close" ? "marked as filled" : "cancelled";
    try {
      await fetch(`/api/helpers/tasks/manage/${token}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: act }),
      });
      setDone(`Task ${label}.`);
      if (data) setData({ ...data, task: { ...data.task, status: act === "close" ? "filled" : "cancelled" } });
    } catch {
      setError("Action failed. Please try again.");
    }
    setUpdating(false);
  }

  if (loading) return <main><div className="wrap" style={{ paddingBlock: "6rem", textAlign: "center" }}>Loading…</div></main>;
  if (error)   return <main><div className="wrap" style={{ paddingBlock: "6rem", textAlign: "center" }}><strong>{error}</strong></div></main>;
  if (!data)   return null;

  const { task, applications } = data;

  return (
    <main>
      <div className="wrap" style={{ paddingBlock: "clamp(3rem,7vw,5.5rem)" }}>
        <p className="eyebrow">Task management</p>
        <h1 style={{ fontSize: "var(--fs-h2)", marginBottom: "1.5rem" }}>{task.title}</h1>

        <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem .8rem", marginBottom: "1.5rem" }}>
          {[
            `📍 ${task.location}`,
            `📅 ${task.date_needed}`,
            `🔖 ${task.service_label}`,
            `⬤ ${task.status.charAt(0).toUpperCase() + task.status.slice(1)}`,
          ].map(t => <span key={t} className="chip">{t}</span>)}
        </div>

        {task.status === "open" && !done && (
          <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <button className="btn btn-primary" onClick={() => action("close")} disabled={updating}>
              {updating ? "Updating…" : "Mark as filled ✓"}
            </button>
            <button className="btn btn-outline" onClick={() => action("cancel")} disabled={updating}>
              Cancel task
            </button>
          </div>
        )}
        {done && <p style={{ color: "var(--accent-green)", fontWeight: 600, marginBottom: "2rem" }}>✓ {done}</p>}

        <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>
          Applications ({applications.length})
        </h2>

        {applications.length === 0 ? (
          <p style={{ opacity: .7 }}>No applications yet. Share the task link to get helpers.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {applications.map((a, i) => (
              <div key={i} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.25rem", background: "var(--white)" }}>
                <strong>{a.name}</strong>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: ".4rem", fontSize: ".9rem" }}>
                  <a href={`tel:${a.phone}`} style={{ color: "var(--accent-green)", fontWeight: 600 }}>📞 {a.phone}</a>
                  {a.email && <a href={`mailto:${a.email}`} style={{ color: "var(--accent-green)" }}>✉️ {a.email}</a>}
                </div>
                {a.message && <p style={{ marginTop: ".6rem", fontSize: ".92rem", opacity: .82 }}>{a.message}</p>}
                <p style={{ fontSize: ".78rem", opacity: .55, marginTop: ".5rem" }}>Applied {new Date(a.applied_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

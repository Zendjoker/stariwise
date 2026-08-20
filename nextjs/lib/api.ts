const API_BASE =
  (typeof window !== "undefined"
    ? (window as Window & { STAIRWISE_API_BASE?: string }).STAIRWISE_API_BASE
    : undefined) ??
  process.env.NEXT_PUBLIC_API_BASE ??
  "/api";

export async function postJSON(path: string, data: Record<string, unknown>) {
  const res = await fetch(API_BASE.replace(/\/$/, "") + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json().catch(() => ({}));
}

"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  bio: string;
  location: string;
  phone: string;
  profile_picture: string | null;
  helper_status: "none" | "pending" | "approved" | "rejected";
  services_offered: string[];
  experience: string;
  is_helper: boolean;
}

interface AuthCtx {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  login:  (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  refresh: () => Promise<void>;
  updateProfile: (data: FormData | Record<string, unknown>) => Promise<{ ok: boolean; error?: string }>;
  applyAsHelper: (data: HelperApplyData) => Promise<{ ok: boolean; error?: string }>;
}

export interface RegisterData {
  name: string; email: string; password: string; phone: string; location: string;
}
export interface HelperApplyData {
  bio: string; experience: string; services_offered: string[]; location: string; phone: string;
}

const Ctx = createContext<AuthCtx | null>(null);
const TOKEN_KEY = "sw_auth_token";

async function apiFetch(path: string, opts: RequestInit = {}, token?: string | null) {
  const headers: Record<string, string> = {
    ...(opts.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!(opts.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(`/api${path}`, { ...opts, headers });
  const data = await res.json().catch(() => ({}));
  return data;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]   = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const t = typeof localStorage !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!t) { setLoading(false); return; }
    const data = await apiFetch("/auth/me/", {}, t);
    if (data.ok) { setUser(data.user); setToken(t); }
    else { localStorage.removeItem(TOKEN_KEY); setToken(null); setUser(null); }
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const _saveToken = (t: string, u: UserProfile) => {
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t); setUser(u);
  };

  const login = async (email: string, password: string) => {
    const data = await apiFetch("/auth/login/", { method: "POST", body: JSON.stringify({ email, password }) });
    if (data.ok) { _saveToken(data.token, data.user); return { ok: true }; }
    return { ok: false, error: data.error || "Login failed." };
  };

  const register = async (d: RegisterData) => {
    const data = await apiFetch("/auth/register/", { method: "POST", body: JSON.stringify(d) });
    if (data.ok) { _saveToken(data.token, data.user); return { ok: true }; }
    return { ok: false, error: data.error || "Registration failed." };
  };

  const logout = () => {
    if (token) apiFetch("/auth/logout/", { method: "POST" }, token);
    localStorage.removeItem(TOKEN_KEY);
    setToken(null); setUser(null);
  };

  const updateProfile = async (body: FormData | Record<string, unknown>) => {
    const isForm = body instanceof FormData;
    const data = await apiFetch("/auth/me/", {
      method: "PUT",
      body: isForm ? body : JSON.stringify(body),
      headers: isForm ? {} : { "Content-Type": "application/json" },
    }, token);
    if (data.ok) { setUser(data.user); return { ok: true }; }
    return { ok: false, error: data.error || "Update failed." };
  };

  const applyAsHelper = async (d: HelperApplyData) => {
    const data = await apiFetch("/auth/helper/apply/", { method: "POST", body: JSON.stringify(d) }, token);
    if (data.ok) {
      setUser(prev => prev ? { ...prev, helper_status: "pending" } : prev);
      return { ok: true };
    }
    return { ok: false, error: data.error || "Application failed." };
  };

  return (
    <Ctx.Provider value={{ user, token, loading, login, register, logout, refresh, updateProfile, applyAsHelper }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

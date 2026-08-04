import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => load("ac_user", null));
  const [saved, setSaved] = useState(() => load("ac_saved", []));
  const [searches, setSearches] = useState(() => load("ac_searches", []));
  const [reviews, setReviews] = useState(() => load("ac_reviews", []));

  useEffect(() => { localStorage.setItem("ac_user", JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem("ac_saved", JSON.stringify(saved)); }, [saved]);
  useEffect(() => { localStorage.setItem("ac_searches", JSON.stringify(searches)); }, [searches]);
  useEffect(() => { localStorage.setItem("ac_reviews", JSON.stringify(reviews)); }, [reviews]);

  // ---- mock auth (frontend only) ----
  const login = (email, name) =>
    setUser({ name: name || email.split("@")[0], email, role: email.includes("admin") ? "admin" : "user" });
  const register = (name, email) =>
    setUser({ name, email, role: email.includes("admin") ? "admin" : "user" });
  const logout = () => setUser(null);
  const setPhoto = (photo) => setUser((u) => (u ? { ...u, photo } : u));
  const updateProfile = (patch) => setUser((u) => (u ? { ...u, ...patch } : u));

  // ---- saved tools ----
  const toggleSaved = (slug) =>
    setSaved((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));
  const isSaved = (slug) => saved.includes(slug);

  // ---- search history ----
  const logSearch = (q) =>
    setSearches((s) => [{ q, at: Date.now() }, ...s.filter((x) => x.q !== q)].slice(0, 12));

  // ---- reviews ----
  const addReview = (review) =>
    setReviews((r) => [{ ...review, at: Date.now(), id: Date.now() }, ...r]);

  return (
    <AppContext.Provider
      value={{ user, login, register, logout, setPhoto, updateProfile, saved, toggleSaved, isSaved, searches, logSearch, reviews, addReview }}
    >
      {children}
    </AppContext.Provider>
  );
}

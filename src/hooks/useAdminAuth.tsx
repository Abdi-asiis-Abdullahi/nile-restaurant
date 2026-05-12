import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

const ADMIN_EMAIL = "engraage@gmail.com";
const ADMIN_PASSWORD = "raage6883";
const KEY = "nile_admin_auth_v1";

type Ctx = {
  isAuthed: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<Ctx | null>(null);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isAuthed) localStorage.setItem(KEY, "1");
      else localStorage.removeItem(KEY);
    } catch {}
  }, [isAuthed]);

  const login = useCallback((email: string, password: string) => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setIsAuthed(false), []);

  return <AuthContext.Provider value={{ isAuthed, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAdminAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
};

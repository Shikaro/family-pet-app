import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { FamilyInfo } from "../types";
import { getMe } from "../api";

interface AuthState {
  token: string | null;
  family: FamilyInfo | null;
  loading: boolean;
  setAuth: (token: string, family: FamilyInfo) => void;
  logout: () => void;
  refreshFamily: () => Promise<void>;
}

const AuthContext = createContext<AuthState>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [family, setFamily] = useState<FamilyInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const setAuth = (newToken: string, newFamily: FamilyInfo) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setFamily(newFamily);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activeChildId");
    setToken(null);
    setFamily(null);
  };

  const refreshFamily = async () => {
    try {
      const data = await getMe();
      setFamily(data.family);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    if (token) {
      refreshFamily().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, family, loading, setAuth, logout, refreshFamily }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

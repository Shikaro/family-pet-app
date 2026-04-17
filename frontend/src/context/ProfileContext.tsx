import { createContext, useContext, useState, ReactNode } from "react";
import { Child } from "../types";

type ProfileMode = "parent" | "child";

interface ProfileState {
  mode: ProfileMode;
  activeChild: Child | null;
  setParentMode: () => void;
  setChildMode: (child: Child) => void;
}

const ProfileContext = createContext<ProfileState>(null!);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ProfileMode>("parent");
  const [activeChild, setActiveChild] = useState<Child | null>(null);

  const setParentMode = () => {
    setMode("parent");
    setActiveChild(null);
    localStorage.removeItem("activeChildId");
  };

  const setChildMode = (child: Child) => {
    setMode("child");
    setActiveChild(child);
    localStorage.setItem("activeChildId", child.id);
  };

  return (
    <ProfileContext.Provider value={{ mode, activeChild, setParentMode, setChildMode }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}

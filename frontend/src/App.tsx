import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useProfile } from "./context/ProfileContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileSelectPage from "./pages/ProfileSelectPage";
import ChildDashboard from "./pages/ChildDashboard";
import ParentDashboard from "./pages/ParentDashboard";

function App() {
  const { token, loading } = useAuth();
  const { mode, activeChild } = useProfile();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  if (loading) {
    return <div className="loading-screen">🐾</div>;
  }

  // Не авторизован
  if (!token) {
    return authMode === "login"
      ? <LoginPage onSwitch={() => setAuthMode("register")} />
      : <RegisterPage onSwitch={() => setAuthMode("login")} />;
  }

  // Авторизован — выбираем режим
  if (mode === "parent" && !activeChild) {
    return <ProfileSelectPage />;
  }

  if (mode === "parent" && activeChild) {
    return <ParentDashboard />;
  }

  // Детский режим
  return <ChildDashboard />;
}

export default App;

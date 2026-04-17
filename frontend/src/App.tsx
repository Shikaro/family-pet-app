import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useProfile } from "./context/ProfileContext";
import { initSounds } from "./utils/sounds";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileSelectPage from "./pages/ProfileSelectPage";
import ChildDashboard from "./pages/ChildDashboard";
import ParentDashboard from "./pages/ParentDashboard";

function App() {
  const { token, loading } = useAuth();
  const { mode } = useProfile();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => { initSounds(); }, []);

  if (loading) {
    return <div className="loading-screen">🐾</div>;
  }

  if (!token) {
    return authMode === "login"
      ? <LoginPage onSwitch={() => setAuthMode("register")} />
      : <RegisterPage onSwitch={() => setAuthMode("login")} />;
  }

  // Родительский дашборд
  if (mode === "dashboard") {
    return <ParentDashboard />;
  }

  // Выбор профиля
  if (mode === "parent") {
    return <ProfileSelectPage />;
  }

  // Детский режим
  return <ChildDashboard />;
}

export default App;

import { useState } from "react";
import { Landing } from "./components/Landing";
import { Login } from "./components/Login";
import { ForgotPassword } from "./components/ForgotPassword";
import { DashboardLayout } from "./components/DashboardLayout";
import { Toaster } from "./components/ui/sonner";
import type { Role } from "./components/roles";

export type AppScreen = "landing" | "login" | "forgot" | "app";

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("landing");
  const [role, setRole] = useState<Role>("Administrador");

  return (
    <div className="size-full min-h-screen bg-slate-50 text-slate-900">
      {screen === "landing" && <Landing onLogin={() => setScreen("login")} />}
      {screen === "login" && (
        <Login
          onLogin={(r) => {
            setRole(r);
            setScreen("app");
          }}
          onForgot={() => setScreen("forgot")}
          onBack={() => setScreen("landing")}
        />
      )}
      {screen === "forgot" && <ForgotPassword onBack={() => setScreen("login")} />}
      {screen === "app" && (
        <DashboardLayout role={role} onLogout={() => setScreen("landing")} onSwitchRole={setRole} />
      )}
      <Toaster position="top-right" richColors />
    </div>
  );
}

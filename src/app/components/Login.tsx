import { useState } from "react";
import {
  GraduationCap, Eye, EyeOff, ArrowLeft, Mail, Lock, ShieldCheck,
  Crown, Briefcase, BookOpen, Heart, UserCircle, ClipboardList,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import type { Role } from "./roles";
import { roleStyles, roleUser } from "./roles";

interface LoginProps {
  onLogin: (role: Role) => void;
  onForgot: () => void;
  onBack: () => void;
}

const roleOptions: { role: Role; icon: any; desc: string }[] = [
  { role: "Administrador", icon: Crown, desc: "Acceso total" },
  { role: "Director", icon: Briefcase, desc: "Supervisión" },
  { role: "Docente", icon: BookOpen, desc: "Cursos y notas" },
  { role: "Padre", icon: Heart, desc: "Mis hijos" },
  { role: "Alumno", icon: UserCircle, desc: "Mi panel" },
  { role: "Auxiliar", icon: ClipboardList, desc: "Operativo" },
];

export function Login({ onLogin, onForgot, onBack }: LoginProps) {
  const [showPwd, setShowPwd] = useState(false);
  const [role, setRole] = useState<Role>("Administrador");
  const [email, setEmail] = useState(roleUser["Administrador"].email);
  const [pwd, setPwd] = useState("demo1234");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickRole = (r: Role) => {
    setRole(r);
    setEmail(roleUser[r].email);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return setErr("Ingresa un correo válido.");
    if (pwd.length < 6) return setErr("La contraseña debe tener al menos 6 caracteres.");
    setErr(null);
    setLoading(true);
    setTimeout(() => {
      toast.success(`Bienvenido como ${role}`);
      onLogin(role);
    }, 500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Lateral */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-12 flex-col justify-between overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-400/30 rounded-full blur-3xl" />
        <div className="relative flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div>EduGestión 360</div>
            <div className="text-xs text-blue-100/80">Sistema Académico Integral</div>
          </div>
        </div>

        <div className="relative space-y-6">
          <h2 className="text-4xl tracking-tight">Una experiencia diseñada para cada rol.</h2>
          <p className="text-blue-100/90 max-w-md">
            Administradores, directores, docentes, padres y alumnos acceden a una interfaz personalizada
            con los módulos y datos que realmente necesitan.
          </p>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {roleOptions.map((r) => {
              const I = r.icon;
              return (
                <div key={r.role} className="rounded-xl bg-white/10 backdrop-blur p-3 flex flex-col items-center gap-1">
                  <I className="w-5 h-5" />
                  <span className="text-xs">{r.role}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative flex items-center gap-3 text-sm text-blue-100/90">
          <ShieldCheck className="w-4 h-4" />
          Acceso seguro · Permisos basados en rol (RBAC)
        </div>
      </div>

      {/* Formulario */}
      <div className="flex flex-col p-6 sm:p-12 relative">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition mb-6 w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al sitio
        </button>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span>EduGestión 360</span>
            </div>

            <h1 className="text-3xl mb-2">Bienvenido de nuevo</h1>
            <p className="text-slate-500 mb-6">Selecciona tu rol e ingresa al sistema.</p>

            {/* Selector de rol */}
            <div className="mb-5">
              <div className="text-sm text-slate-700 mb-2">Ingresar como</div>
              <div className="grid grid-cols-3 gap-2">
                {roleOptions.map((r) => {
                  const I = r.icon;
                  const active = role === r.role;
                  const styles = roleStyles[r.role];
                  return (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => pickRole(r.role)}
                      className={`p-2.5 rounded-lg border text-left transition ${
                        active
                          ? `${styles.badge} ring-2 ${styles.ring}`
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <I className="w-4 h-4 mb-1" />
                      <div className="text-xs">{r.role}</div>
                      <div className="text-[10px] opacity-70">{r.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {err && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                {err}
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-700 mb-1.5 block">Correo o usuario</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm text-slate-700">Contraseña</label>
                  <button type="button" onClick={onForgot} className="text-sm text-blue-600 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type={showPwd ? "text" : "password"}
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-600 select-none">
                <Checkbox /> Mantener sesión iniciada
              </label>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? "Ingresando..." : `Iniciar sesión como ${role}`}
              </Button>

              <div className="text-center text-xs text-slate-500">
                El selector permite previsualizar la interfaz de cada rol.
              </div>
            </form>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 mt-6">© 2026 EduGestión 360 · v1.0</div>
      </div>
    </div>
  );
}

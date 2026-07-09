import { useState, useMemo } from "react";
import {
  LayoutDashboard, Users, GraduationCap, UserCheck, BookOpen, School,
  CalendarCheck, ClipboardList, Megaphone, Calendar, BarChart3, Settings,
  Search, Bell, ChevronDown, Menu, LogOut, HelpCircle, User, ChevronLeft, Home,
  ShieldOff, Crown, Briefcase, Heart, UserCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { Role, ViewKey } from "./roles";
import { permissions, roleStyles, roleUser } from "./roles";

import { Dashboard } from "./views/Dashboard";
import { DirectorDashboard } from "./views/DirectorDashboard";
import { TeacherDashboard } from "./views/TeacherDashboard";
import { ParentDashboard } from "./views/ParentDashboard";
import { StudentDashboard } from "./views/StudentDashboard";
import { AuxiliaryDashboard } from "./views/AuxiliaryDashboard";
import { UsersView } from "./views/Users";
import { Students } from "./views/Students";
import { Parents } from "./views/Parents";
import { Teachers } from "./views/Teachers";
import { Courses } from "./views/Courses";
import { Grades } from "./views/Grades";
import { Attendance } from "./views/Attendance";
import { GradesNotes } from "./views/GradesNotes";
import { Publications } from "./views/Publications";
import { CalendarView } from "./views/CalendarView";
import { Reports } from "./views/Reports";
import { SettingsView } from "./views/SettingsView";

interface DashboardLayoutProps {
  role: Role;
  onLogout: () => void;
  onSwitchRole: (r: Role) => void;
}

const navGroups: { label: string; items: { key: ViewKey; label: string; icon: any; badge?: string }[] }[] = [
  {
    label: "General",
    items: [{ key: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Comunidad",
    items: [
      { key: "users", label: "Usuarios", icon: Users },
      { key: "students", label: "Alumnos", icon: GraduationCap },
      { key: "parents", label: "Padres", icon: UserCheck },
      { key: "teachers", label: "Docentes", icon: BookOpen },
    ],
  },
  {
    label: "Académico",
    items: [
      { key: "courses", label: "Cursos", icon: School },
      { key: "grades", label: "Grados", icon: ClipboardList },
      { key: "attendance", label: "Asistencia", icon: CalendarCheck },
      { key: "notes", label: "Notas", icon: BarChart3 },
    ],
  },
  {
    label: "Gestión",
    items: [
      { key: "publications", label: "Publicaciones", icon: Megaphone, badge: "3" },
      { key: "calendar", label: "Calendario", icon: Calendar },
      { key: "reports", label: "Reportes", icon: BarChart3 },
      { key: "settings", label: "Configuración", icon: Settings },
    ],
  },
];

const titleMap: Record<ViewKey, { title: string; desc: string }> = {
  dashboard: { title: "Dashboard", desc: "Vista general personalizada" },
  users: { title: "Usuarios y Roles", desc: "Administra cuentas y permisos" },
  students: { title: "Alumnos", desc: "Gestión de estudiantes" },
  parents: { title: "Padres y Apoderados", desc: "Familias vinculadas" },
  teachers: { title: "Docentes", desc: "Plantilla académica" },
  courses: { title: "Cursos", desc: "Catálogo académico" },
  grades: { title: "Grados y Secciones", desc: "Estructura escolar" },
  attendance: { title: "Asistencia", desc: "Registro y reportes diarios" },
  notes: { title: "Notas y Calificaciones", desc: "Evaluaciones y promedios" },
  publications: { title: "Publicaciones", desc: "CMS de noticias del colegio" },
  calendar: { title: "Calendario Escolar", desc: "Eventos y actividades" },
  reports: { title: "Reportes y Analíticas", desc: "KPIs y exportación" },
  settings: { title: "Configuración", desc: "Preferencias del sistema" },
};

const roleIcon: Record<Role, any> = {
  Administrador: Crown,
  Director: Briefcase,
  Docente: BookOpen,
  Padre: Heart,
  Alumno: UserCircle,
  Auxiliar: ClipboardList,
};

function AccessDenied({ role, onHome }: { role: Role; onHome: () => void }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
        <ShieldOff className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-2xl mb-2">Acceso denegado</h2>
      <p className="text-slate-500 max-w-md mx-auto mb-6">
        Tu rol <span className="text-slate-900">{role}</span> no tiene permisos para acceder a este módulo.
        Contacta a un administrador si crees que esto es un error.
      </p>
      <Button onClick={onHome} className="bg-blue-600 hover:bg-blue-700 text-white">Volver al dashboard</Button>
    </div>
  );
}

export function DashboardLayout({ role, onLogout, onSwitchRole }: DashboardLayoutProps) {
  const [view, setView] = useState<ViewKey>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const allowed = permissions[role];
  const styles = roleStyles[role];
  const RoleIcon = roleIcon[role];
  const user = roleUser[role];

  // Filtrar navGroups según permisos
  const filteredGroups = useMemo(
    () =>
      navGroups
        .map((g) => ({ ...g, items: g.items.filter((it) => allowed.includes(it.key)) }))
        .filter((g) => g.items.length > 0),
    [allowed]
  );

  const hasAccess = allowed.includes(view);
  const currentMeta = titleMap[view];

  const renderDashboardByRole = () => {
    switch (role) {
      case "Administrador": return <Dashboard onNavigate={setView} />;
      case "Director": return <DirectorDashboard onNavigate={setView} />;
      case "Docente": return <TeacherDashboard onNavigate={setView} />;
      case "Padre": return <ParentDashboard onNavigate={setView} />;
      case "Alumno": return <StudentDashboard onNavigate={setView} />;
      case "Auxiliar": return <AuxiliaryDashboard onNavigate={setView} />;
    }
  };

  const renderView = () => {
    if (!hasAccess) return <AccessDenied role={role} onHome={() => setView("dashboard")} />;
    switch (view) {
      case "dashboard": return renderDashboardByRole();
      case "users": return <UsersView />;
      case "students": return <Students />;
      case "parents": return <Parents />;
      case "teachers": return <Teachers />;
      case "courses": return <Courses />;
      case "grades": return <Grades />;
      case "attendance": return <Attendance />;
      case "notes": return <GradesNotes />;
      case "publications": return <Publications />;
      case "calendar": return <CalendarView />;
      case "reports": return <Reports />;
      case "settings": return <SettingsView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside
        className={`${collapsed ? "w-20" : "w-64"} ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:sticky top-0 h-screen z-40 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col`}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="leading-tight">
                <div className="text-blue-700">EduManage</div>
                <div className="text-xs text-slate-500">Admin Panel</div>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-7 h-7 rounded-md border border-slate-200 items-center justify-center hover:bg-slate-50"
          >
            <ChevronLeft className={`w-4 h-4 text-slate-500 transition ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Tarjeta de rol */}
        {!collapsed && (
          <div className="m-3 mb-0">
            <div className={`relative rounded-xl p-3 bg-gradient-to-br ${styles.gradient} text-white overflow-hidden`}>
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/15 rounded-full blur-xl" />
              <div className="relative flex items-center gap-2 mb-1">
                <RoleIcon className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider opacity-90">Sesión activa</span>
              </div>
              <div className="relative text-sm">{role}</div>
              <div className="relative text-[11px] opacity-80 mt-0.5">{styles.tagline}</div>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {filteredGroups.map((g) => (
            <div key={g.label}>
              {!collapsed && (
                <div className="text-xs uppercase tracking-wider text-slate-400 px-2 mb-2">{g.label}</div>
              )}
              <ul className="space-y-1">
                {g.items.map((item) => {
                  const Icon = item.icon;
                  const active = view === item.key;
                  return (
                    <li key={item.key}>
                      <button
                        onClick={() => {
                          setView(item.key);
                          setMobileOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition relative ${
                          active
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-600 rounded-r" />}
                        <Icon className="w-4 h-4 shrink-0" />
                        {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                        {!collapsed && item.badge && (
                          <Badge className="bg-blue-600 text-white hover:bg-blue-600 h-5 px-1.5">{item.badge}</Badge>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {!collapsed && (
            <div className="px-2 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
              {allowed.length} módulos disponibles para este rol
            </div>
          )}
        </nav>

        <div className="border-t border-slate-200 p-3 shrink-0">
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
          <div className="h-16 px-4 sm:px-6 flex items-center gap-4">
            <button className="lg:hidden p-2 -ml-2" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative flex-1 max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Buscar..." className="pl-10 bg-slate-50 border-slate-200" />
            </div>

            <div className="flex-1 sm:hidden" />

            <div className="flex items-center gap-2">
              {/* Switcher de rol (demo) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden md:inline-flex">
                    Cambiar rol <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Vista previa por rol</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {(Object.keys(roleUser) as Role[]).map((r) => {
                    const I = roleIcon[r];
                    return (
                      <DropdownMenuItem
                        key={r}
                        onClick={() => { onSwitchRole(r); setView("dashboard"); }}
                        className={role === r ? "bg-slate-50" : ""}
                      >
                        <I className="w-4 h-4 mr-2" /> {r}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon"><HelpCircle className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-50">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                        {user.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm">{user.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <RoleIcon className="w-3 h-3" /> {role}
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="text-sm">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5">
                    <Badge className={`${styles.badge} hover:bg-current border`}>
                      <RoleIcon className="w-3 h-3 mr-1" /> {role}
                    </Badge>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><User className="w-4 h-4 mr-2" /> Perfil</DropdownMenuItem>
                  {allowed.includes("settings") && (
                    <DropdownMenuItem onClick={() => setView("settings")}>
                      <Settings className="w-4 h-4 mr-2" /> Configuración
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600 focus:text-red-700">
                    <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="px-4 sm:px-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Home className="w-3 h-3" />
              <span>EduManage</span>
              <span>/</span>
              <span className="text-slate-700">{currentMeta.title}</span>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-2xl">{currentMeta.title}</h1>
                  <p className="text-sm text-slate-500">{currentMeta.desc}</p>
                </div>
              </div>
              <Badge className={`${styles.badge} hover:bg-current border`}>
                <RoleIcon className="w-3 h-3 mr-1" /> Vista de {role}
              </Badge>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">{renderView()}</main>
      </div>
    </div>
  );
}

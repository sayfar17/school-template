export type Role =
  | "Administrador"
  | "Director"
  | "Docente"
  | "Padre"
  | "Alumno"
  | "Auxiliar";

export type ViewKey =
  | "dashboard"
  | "users"
  | "students"
  | "parents"
  | "teachers"
  | "courses"
  | "grades"
  | "attendance"
  | "notes"
  | "publications"
  | "calendar"
  | "reports"
  | "settings";

export const roleStyles: Record<Role, { badge: string; ring: string; gradient: string; tagline: string }> = {
  Administrador: {
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    ring: "ring-violet-200",
    gradient: "from-violet-600 to-indigo-600",
    tagline: "Control total del sistema",
  },
  Director: {
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    ring: "ring-blue-200",
    gradient: "from-blue-600 to-cyan-600",
    tagline: "Supervisión académica y administrativa",
  },
  Docente: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    ring: "ring-emerald-200",
    gradient: "from-emerald-600 to-teal-600",
    tagline: "Cursos, asistencia y evaluaciones",
  },
  Padre: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    ring: "ring-amber-200",
    gradient: "from-amber-500 to-orange-500",
    tagline: "Seguimiento de tus hijos",
  },
  Alumno: {
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    ring: "ring-sky-200",
    gradient: "from-sky-600 to-blue-600",
    tagline: "Mi vida académica",
  },
  Auxiliar: {
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    ring: "ring-slate-300",
    gradient: "from-slate-600 to-slate-800",
    tagline: "Control operativo diario",
  },
};

// Permisos por rol: qué vistas puede ver cada uno
export const permissions: Record<Role, ViewKey[]> = {
  Administrador: [
    "dashboard", "users", "students", "parents", "teachers",
    "courses", "grades", "attendance", "notes",
    "publications", "calendar", "reports", "settings",
  ],
  Director: [
    "dashboard", "students", "parents", "teachers",
    "courses", "grades", "attendance", "notes",
    "publications", "calendar", "reports",
  ],
  Docente: [
    "dashboard", "students", "courses",
    "attendance", "notes", "calendar",
  ],
  Padre: [
    "dashboard", "calendar", "publications",
  ],
  Alumno: [
    "dashboard", "calendar",
  ],
  Auxiliar: [
    "dashboard", "students", "attendance", "calendar",
  ],
};

export const roleUser: Record<Role, { name: string; email: string }> = {
  Administrador: { name: "María Rodríguez", email: "admin@edugestion360.edu.pe" },
  Director: { name: "Laura Vega", email: "director@edugestion360.edu.pe" },
  Docente: { name: "Carlos Mendoza", email: "docente@edugestion360.edu.pe" },
  Padre: { name: "Manuel Quispe", email: "padre@gmail.com" },
  Alumno: { name: "Sofía Quispe", email: "alumna@edugestion360.edu.pe" },
  Auxiliar: { name: "Ana Pérez", email: "auxiliar@edugestion360.edu.pe" },
};

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Role } from "../roles";

export interface User {
  id: number;
  name: string;
  email: string;
  dni: string;
  role: Role;
  active: boolean;
  phone: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  avg: number;
  attendance: number;
  status: "Regular" | "Destacado" | "Riesgo";
  img: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  parentName?: string;
  parentPhone?: string;
}

export interface Parent {
  name: string;
  dni: string;
  email: string;
  phone: string;
  kids: number;
  status: "Al día" | "Pendiente" | "Vencido";
}

export interface Teacher {
  name: string;
  spec: string;
  courses: number;
  hours: number;
  rating: number;
  img: string;
  email?: string;
  phone?: string;
}

export interface Course {
  name: string;
  level: string;
  teacher: string;
  students: number;
  hours: number;
  color: string;
}

export interface CalendarEvent {
  day: number;
  month: string; // e.g., "Junio 2026"
  t: string;
  c: "exam" | "meet" | "act" | "hol" | "evt";
}

export interface Post {
  img: string;
  title: string;
  date: string;
  cat: "Académico" | "Eventos" | "Comunicado";
  status: "Publicado" | "Borrador" | "Programado";
  desc: string;
}

export interface GradeRow {
  n: string;
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  fin: number;
  est: "AD" | "A" | "B" | "C";
}

export interface SystemSettings {
  schoolName: string;
  modularCode: string;
  ruc: string;
  director: string;
  address: string;
  mission: string;
  primaryColor: string;
  darkModeAuto: boolean;
  compactTheme: boolean;
}

export interface BackupItem {
  id: string;
  date: string;
  size: string;
  time: string;
}

export interface ActivityItem {
  who: string;
  action: string;
  time: string;
}

interface MockStoreContextProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  parents: Parent[];
  setParents: React.Dispatch<React.SetStateAction<Parent[]>>;
  teachers: Teacher[];
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  grades: Record<string, GradeRow[]>; // Course key (e.g., "mat", "com") -> GradeRow[]
  setGrades: React.Dispatch<React.SetStateAction<Record<string, GradeRow[]>>>;
  attendance: Record<string, Record<string, "P" | "T" | "F" | "J">>; // Date_Grade -> Record<StudentName, Status>
  setAttendance: React.Dispatch<React.SetStateAction<Record<string, Record<string, "P" | "T" | "F" | "J">>>>;
  settings: SystemSettings;
  setSettings: React.Dispatch<React.SetStateAction<SystemSettings>>;
  backups: BackupItem[];
  setBackups: React.Dispatch<React.SetStateAction<BackupItem[]>>;
  activities: ActivityItem[];
  logActivity: (who: string, action: string) => void;
}

const MockStoreContext = createContext<MockStoreContextProps | undefined>(undefined);

export function MockStoreProvider({ children }: { children: React.ReactNode }) {
  // Users state
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "María Rodríguez", email: "admin@edugestion360.edu.pe", dni: "45123456", role: "Administrador", active: true, phone: "+51 987 654 321" },
    { id: 2, name: "Carlos Mendoza", email: "docente@edugestion360.edu.pe", dni: "45987612", role: "Docente", active: true, phone: "+51 987 555 111" },
    { id: 3, name: "Laura Vega", email: "director@edugestion360.edu.pe", dni: "44321987", role: "Director", active: true, phone: "+51 987 222 333" },
    { id: 4, name: "Pedro Soto", email: "p.soto@edugestion360.edu.pe", dni: "46555666", role: "Docente", active: false, phone: "+51 987 444 555" },
    { id: 5, name: "Ana Pérez", email: "auxiliar@edugestion360.edu.pe", dni: "47888999", role: "Auxiliar", active: true, phone: "+51 987 666 777" },
    { id: 6, name: "Jorge Torres", email: "j.torres@gmail.com", dni: "48111222", role: "Padre", active: true, phone: "+51 987 888 999" },
    { id: 7, name: "Sofía Quispe", email: "alumna@edugestion360.edu.pe", dni: "78123456", role: "Alumno", active: true, phone: "+51 987 100 200" },
    { id: 8, name: "Diego Ramírez", email: "d.ramirez@gmail.com", dni: "48333444", role: "Padre", active: true, phone: "+51 987 300 400" },
  ]);

  // Students state
  const [students, setStudents] = useState<Student[]>([
    { id: "ALU-2026-001", name: "Sofía Quispe Mamani", grade: "5° A · Secundaria", avg: 17.5, attendance: 96, status: "Regular", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", email: "s.quispe@edugestion360.edu.pe", phone: "+51 987 100 200", birthDate: "2010-08-12", address: "Pariamarca", parentName: "Manuel Quispe", parentPhone: "+51 987 555 444" },
    { id: "ALU-2026-002", name: "Diego Ramírez Soto", grade: "3° A · Secundaria", avg: 15.5, attendance: 92, status: "Regular", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", email: "d.ramirez@gmail.com", phone: "+51 987 300 400", birthDate: "2012-05-14", address: "Pasco", parentName: "Diego Ramírez", parentPhone: "+51 987 300 400" },
    { id: "ALU-2026-003", name: "Valentina Cruz Pérez", grade: "5° A · Secundaria", avg: 18.8, attendance: 98, status: "Destacado", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", email: "v.cruz@edugestion360.edu.pe", phone: "+51 987 123 456", birthDate: "2010-11-22", address: "Pariamarca", parentName: "Roberto Cruz", parentPhone: "+51 987 111 000" },
    { id: "ALU-2026-004", name: "Mateo Torres Vega", grade: "4° A · Secundaria", avg: 13.0, attendance: 84, status: "Riesgo", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80", email: "m.torres@edugestion360.edu.pe", phone: "+51 987 333 444", birthDate: "2011-03-10", address: "Pasco", parentName: "Diana Torres", parentPhone: "+51 987 222 333" },
    { id: "ALU-2026-005", name: "Camila Flores Rojas", grade: "2° A · Secundaria", avg: 17.5, attendance: 97, status: "Regular", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80", email: "c.flores@edugestion360.edu.pe", phone: "+51 987 555 666", birthDate: "2013-09-05", address: "Pariamarca", parentName: "Andrés Flores", parentPhone: "+51 987 666 777" },
    { id: "ALU-2026-006", name: "Lucas Herrera Díaz", grade: "1° A · Secundaria", avg: 16.0, attendance: 94, status: "Regular", img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&q=80", email: "l.herrera@edugestion360.edu.pe", phone: "+51 987 777 888", birthDate: "2014-01-20", address: "Pariamarca", parentName: "Manuel Quispe", parentPhone: "+51 987 555 444" },
  ]);

  // Parents state
  const [parents, setParents] = useState<Parent[]>([
    { name: "Manuel Quispe", dni: "10123456", email: "m.quispe@gmail.com", phone: "+51 987 555 444", kids: 2, status: "Al día" },
    { name: "Carmen Soto", dni: "10987654", email: "c.soto@gmail.com", phone: "+51 987 333 222", kids: 2, status: "Al día" },
    { name: "Roberto Cruz", dni: "11222333", email: "r.cruz@gmail.com", phone: "+51 987 111 000", kids: 1, status: "Pendiente" },
    { name: "Diana Torres", dni: "12333444", email: "d.torres@gmail.com", phone: "+51 987 222 333", kids: 3, status: "Al día" },
    { name: "Andrés Flores", dni: "13444555", email: "a.flores@gmail.com", phone: "+51 987 666 777", kids: 1, status: "Vencido" },
  ]);

  // Teachers state
  const [teachers, setTeachers] = useState<Teacher[]>([
    { name: "Carlos Mendoza", spec: "Matemática", courses: 4, hours: 22, rating: 4.8, img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80", email: "c.mendoza@edugestion360.edu.pe", phone: "+51 987 555 111" },
    { name: "Laura Vega", spec: "Comunicación", courses: 3, hours: 18, rating: 4.9, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80", email: "l.vega@edugestion360.edu.pe", phone: "+51 987 222 333" },
    { name: "Pedro Soto", spec: "CTA (Biología)", courses: 5, hours: 24, rating: 4.6, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", email: "p.soto@edugestion360.edu.pe", phone: "+51 987 444 555" },
    { name: "Ana Pérez", spec: "Inglés", courses: 6, hours: 26, rating: 4.7, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", email: "a.perez@edugestion360.edu.pe", phone: "+51 987 666 777" },
    { name: "Jorge Torres", spec: "Historia y Sociales", courses: 4, hours: 20, rating: 4.5, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", email: "j.torres@gmail.com", phone: "+51 987 888 999" },
    { name: "Mónica Salas", spec: "Arte y Música", courses: 3, hours: 16, rating: 4.9, img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80", email: "m.salas@edugestion360.edu.pe", phone: "+51 987 111 222" },
  ]);

  // Courses state
  const [courses, setCourses] = useState<Course[]>([
    { name: "Matemática", level: "Secundaria", teacher: "Carlos Mendoza", students: 142, hours: 8, color: "bg-blue-500" },
    { name: "Comunicación", level: "Secundaria", teacher: "Laura Vega", students: 138, hours: 6, color: "bg-emerald-500" },
    { name: "Ciencia y Tecnología", level: "Secundaria", teacher: "Pedro Soto", students: 145, hours: 6, color: "bg-violet-500" },
    { name: "Inglés", level: "Todos", teacher: "Ana Pérez", students: 320, hours: 4, color: "bg-amber-500" },
    { name: "Historia y Geografía", level: "Secundaria", teacher: "Jorge Torres", students: 140, hours: 5, color: "bg-rose-500" },
    { name: "Arte y Música", level: "Secundaria", teacher: "Mónica Salas", students: 180, hours: 3, color: "bg-indigo-500" },
    { name: "Educación Física", level: "Todos", teacher: "Luis Aranda", students: 250, hours: 4, color: "bg-cyan-500" },
    { name: "Computación", level: "Secundaria", teacher: "Karla Núñez", students: 110, hours: 3, color: "bg-pink-500" },
  ]);

  // Events state
  const [events, setEvents] = useState<CalendarEvent[]>([
    { day: 3, month: "Junio 2026", t: "Día del trabajo", c: "hol" },
    { day: 6, month: "Junio 2026", t: "Feria de Ciencias", c: "act" },
    { day: 9, month: "Junio 2026", t: "Examen bimestral", c: "exam" },
    { day: 12, month: "Junio 2026", t: "Aniversario", c: "evt" },
    { day: 15, month: "Junio 2026", t: "Reunión padres 5°", c: "meet" },
    { day: 15, month: "Junio 2026", t: "Salida Secundaria", c: "act" },
    { day: 20, month: "Junio 2026", t: "Día del logro", c: "evt" },
    { day: 24, month: "Junio 2026", t: "Examen ciencias", c: "exam" },
    { day: 28, month: "Junio 2026", t: "Reunión docentes", c: "meet" },
  ]);

  // Posts state
  const [posts, setPosts] = useState<Post[]>([
    { img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", title: "Olimpiada Nacional de Matemática", date: "15 May 2026", cat: "Académico", status: "Publicado", desc: "Nuestros estudiantes de secundaria participarán en la Olimpiada Nacional de Matemática que se llevará a cabo en la capital..." },
    { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", title: "Feria de Ciencias 2026", date: "08 May 2026", cat: "Eventos", status: "Publicado", desc: "Se invita a toda la comunidad educativa a presenciar los mejores proyectos de Ciencia y Tecnología diseñados por nuestros alumnos." },
    { img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80", title: "Admisión 2027 abierta", date: "02 May 2026", cat: "Comunicado", status: "Publicado", desc: "Ya se encuentran abiertas las vacantes para el proceso de admisión del próximo año escolar. Cupos limitados para todos los niveles." },
    { img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80", title: "Día del logro 2026 (borrador)", date: "Programado 20 Jun", cat: "Eventos", status: "Borrador", desc: "En este evento se presentarán las metas de aprendizaje alcanzadas por los estudiantes a lo largo del primer semestre." },
  ]);

  // Grades state
  const [grades, setGrades] = useState<Record<string, GradeRow[]>>({
    mat: [
      { n: "Sofía Quispe", c1: 18, c2: 17, c3: 18, c4: 17, fin: 17.5, est: "AD" },
      { n: "Diego Ramírez", c1: 15, c2: 16, c3: 15, c4: 16, fin: 15.5, est: "A" },
      { n: "Valentina Cruz", c1: 19, c2: 18, c3: 19, c4: 19, fin: 18.8, est: "AD" },
      { n: "Mateo Torres", c1: 12, c2: 13, c3: 14, c4: 13, fin: 13.0, est: "B" },
      { n: "Camila Flores", c1: 17, c2: 18, c3: 17, c4: 18, fin: 17.5, est: "AD" },
      { n: "Lucas Herrera", c1: 16, c2: 15, c3: 17, c4: 16, fin: 16.0, est: "A" },
      { n: "Isabella Vargas", c1: 14, c2: 15, c3: 14, c4: 15, fin: 14.5, est: "A" },
    ],
    com: [
      { n: "Sofía Quispe", c1: 16, c2: 16, c3: 17, c4: 18, fin: 16.8, est: "A" },
      { n: "Diego Ramírez", c1: 14, c2: 15, c3: 14, c4: 15, fin: 14.5, est: "A" },
      { n: "Valentina Cruz", c1: 18, c2: 19, c3: 18, c4: 19, fin: 18.5, est: "AD" },
      { n: "Mateo Torres", c1: 11, c2: 12, c3: 13, c4: 12, fin: 12.0, est: "B" },
      { n: "Camila Flores", c1: 16, c2: 17, c3: 18, c4: 17, fin: 17.0, est: "AD" },
      { n: "Lucas Herrera", c1: 15, c2: 16, c3: 15, c4: 15, fin: 15.3, est: "A" },
      { n: "Isabella Vargas", c1: 15, c2: 14, c3: 16, c4: 15, fin: 15.0, est: "A" },
    ],
  });

  // Attendance states
  const [attendance, setAttendance] = useState<Record<string, Record<string, "P" | "T" | "F" | "J">>>({
    "2026-05-28_5a": {
      "Sofía Quispe": "P",
      "Diego Ramírez": "P",
      "Valentina Cruz": "P",
      "Mateo Torres": "T",
      "Camila Flores": "P",
      "Lucas Herrera": "P",
      "Isabella Vargas": "P",
      "Sebastián Ríos": "F",
      "Emilia Pérez": "P",
      "Joaquín Méndez": "J",
      "Renata Salazar": "P",
      "Bruno Castro": "P",
    },
  });

  // Settings state
  const [settings, setSettings] = useState<SystemSettings>({
    schoolName: "Colegio Tupac Amaru",
    modularCode: "1234567",
    ruc: "20123456789",
    director: "Laura Vega",
    address: "Pariamarca, Pasco, Perú",
    mission: "Brindar educación integral de excelencia basada en valores éticos y científicos...",
    primaryColor: "#2563eb",
    darkModeAuto: false,
    compactTheme: false,
  });

  // Backups state
  const [backups, setBackups] = useState<BackupItem[]>([
    { id: "BKP-001", date: "28 May", size: "2.4 GB", time: "03:00 a.m." },
    { id: "BKP-002", date: "27 May", size: "2.4 GB", time: "03:00 a.m." },
    { id: "BKP-003", date: "26 May", size: "2.3 GB", time: "03:00 a.m." },
    { id: "BKP-004", date: "25 May", size: "2.3 GB", time: "03:00 a.m." },
    { id: "BKP-005", date: "24 May", size: "2.3 GB", time: "03:00 a.m." },
    { id: "BKP-006", date: "23 May", size: "2.2 GB", time: "03:00 a.m." },
  ]);

  // Activity Log
  const [activities, setActivities] = useState<ActivityItem[]>([
    { who: "Carlos Mendoza", action: "registró 32 asistencias en 5°A", time: "Hace 5 min" },
    { who: "Laura Vega", action: "publicó 'Feria de Ciencias 2026'", time: "Hace 1 h" },
    { who: "Pedro Soto", action: "actualizó notas de Matemática Bimestre II", time: "Hace 2 h" },
    { who: "Ana Pérez", action: "matriculó a 3 nuevos alumnos", time: "Hace 4 h" },
  ]);

  const logActivity = (who: string, action: string) => {
    setActivities((prev) => [
      { who, action, time: "Hace unos instantes" },
      ...prev.slice(0, 15), // keep last 15
    ]);
  };

  return (
    <MockStoreContext.Provider
      value={{
        users,
        setUsers,
        students,
        setStudents,
        parents,
        setParents,
        teachers,
        setTeachers,
        courses,
        setCourses,
        events,
        setEvents,
        posts,
        setPosts,
        grades,
        setGrades,
        attendance,
        setAttendance,
        settings,
        setSettings,
        backups,
        setBackups,
        activities,
        logActivity,
      }}
    >
      {children}
    </MockStoreContext.Provider>
  );
}

export function useMockStore() {
  const context = useContext(MockStoreContext);
  if (!context) {
    throw new Error("useMockStore must be used within a MockStoreProvider");
  }
  return context;
}

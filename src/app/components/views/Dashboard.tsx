import {
  Users,
  GraduationCap,
  CalendarCheck,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Megaphone,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { useMockStore } from "./mockStore";

interface Props {
  onNavigate: (k: any) => void;
}

const attendanceData = [
  { d: "Lun", v: 96 },
  { d: "Mar", v: 94 },
  { d: "Mié", v: 97 },
  { d: "Jue", v: 92 },
  { d: "Vie", v: 95 },
];

const performanceData = [
  { c: "Mate", v: 16.2 },
  { c: "Comu", v: 17.1 },
  { c: "CTA", v: 15.8 },
  { c: "Soc", v: 16.9 },
  { c: "Ingl", v: 15.2 },
  { c: "Arte", v: 18.4 },
];

export function Dashboard({ onNavigate }: Props) {
  const { students, teachers, events: storeEvents, posts, activities } = useMockStore();

  const averageGrade = students.length
    ? (students.reduce((acc, s) => acc + s.avg, 0) / students.length).toFixed(1)
    : "0.0";

  const stats = [
    { label: "Total alumnos", value: students.length.toString(), delta: "+4.2%", up: true, icon: GraduationCap, color: "bg-blue-100 text-blue-600" },
    { label: "Total docentes", value: teachers.length.toString(), delta: "+2", up: true, icon: Users, color: "bg-indigo-100 text-indigo-600" },
    { label: "Asistencia hoy", value: "94.6%", delta: "-1.1%", up: false, icon: CalendarCheck, color: "bg-emerald-100 text-emerald-600" },
    { label: "Promedio general", value: averageGrade, delta: "+0.3", up: true, icon: TrendingUp, color: "bg-amber-100 text-amber-600" },
  ];

  const mapCategoryBadge: Record<string, string> = {
    exam: "bg-red-100 text-red-700",
    meet: "bg-blue-100 text-blue-700",
    act: "bg-emerald-100 text-emerald-700",
    hol: "bg-amber-100 text-amber-700",
    evt: "bg-indigo-100 text-indigo-700",
  };

  const displayedEvents = storeEvents.slice(0, 4).map(e => ({
    d: e.day.toString().padStart(2, "0"),
    m: e.month.split(" ")[0].slice(0, 3),
    t: e.t,
    c: mapCategoryBadge[e.c] || "bg-slate-100 text-slate-700"
  }));

  const alerts = [
    { t: `${students.filter(s => s.status === "Riesgo").length} alumnos en riesgo académico`, wrap: "bg-amber-50 border-amber-100", icon: "text-amber-600", i: AlertCircle },
    { t: "Boletines del bimestre I listos", wrap: "bg-emerald-50 border-emerald-100", icon: "text-emerald-600", i: CheckCircle2 },
    { t: "Pagos pendientes: 24 familias", wrap: "bg-red-50 border-red-100", icon: "text-red-600", i: Clock },
  ];

  const enrollment = [
    { name: "Secundaria", value: students.length, color: "#0ea5e9" },
  ];

  const events = displayedEvents;
  const activity = activities;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-slate-200 hover:shadow-md transition">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge
                    className={`${s.up ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"} hover:bg-current`}
                  >
                    {s.up ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                    {s.delta}
                  </Badge>
                </div>
                <div className="mt-4">
                  <div className="text-3xl tracking-tight">{s.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3>Asistencia semanal</h3>
                <p className="text-sm text-slate-500">Porcentaje de asistencia (últimos 5 días)</p>
              </div>
              <Badge variant="outline">Esta semana</Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="d" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[80, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <h3 className="mb-1">Distribución de alumnos</h3>
            <p className="text-sm text-slate-500 mb-4">Por nivel educativo</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={enrollment} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {enrollment.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3>Rendimiento por curso</h3>
                <p className="text-sm text-slate-500">Promedio general · Bimestre II</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => onNavigate("notes")}>Ver detalle</Button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="c" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 20]} />
                  <Tooltip />
                  <Bar dataKey="v" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3>Próximos eventos</h3>
              <Button variant="ghost" size="sm" className="text-blue-600" onClick={() => onNavigate("calendar")}>Ver todo</Button>
            </div>
            <ul className="space-y-3">
              {events.map((e) => (
                <li key={e.t} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
                  <div className={`w-12 h-12 rounded-lg ${e.c} flex flex-col items-center justify-center shrink-0`}>
                    <div className="text-sm leading-none">{e.d}</div>
                    <div className="text-[10px] uppercase mt-0.5">{e.m}</div>
                  </div>
                  <div className="text-sm">{e.t}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Alerts + Activity + News */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-5">
            <h3 className="mb-4">Alertas importantes</h3>
            <ul className="space-y-3">
              {alerts.map((a) => {
                const I = a.i;
                return (
                  <li key={a.t} className={`flex items-start gap-3 p-3 rounded-lg border ${a.wrap}`}>
                    <I className={`w-4 h-4 mt-0.5 shrink-0 ${a.icon}`} />
                    <span className="text-sm text-slate-700">{a.t}</span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3>Actividad reciente</h3>
              <Badge variant="outline">En vivo</Badge>
            </div>
            <ul className="divide-y divide-slate-100">
              {activity.map((a, i) => (
                <li key={i} className="py-3 flex items-center gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                      {a.who.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">
                      <span className="text-slate-900">{a.who}</span>{" "}
                      <span className="text-slate-500">{a.action}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{a.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Publicaciones recientes */}
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3>Publicaciones recientes</h3>
              <p className="text-sm text-slate-500">Últimas noticias publicadas en el sitio</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate("publications")}>
              <Megaphone className="w-4 h-4 mr-2" /> Gestionar
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {posts.slice(0, 3).map((p) => (
              <div key={p.title} className="rounded-lg border border-slate-200 p-4">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-2">{p.cat}</Badge>
                <div className="text-sm">{p.title}</div>
                <div className="text-xs text-slate-500 mt-1">{p.date} · 2026</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Download, FileText, TrendingUp, Users, GraduationCap, CalendarCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const attendance = [
  { m: "Ene", v: 95 },
  { m: "Feb", v: 96 },
  { m: "Mar", v: 94 },
  { m: "Abr", v: 93 },
  { m: "May", v: 95 },
];

const academic = [
  { l: "Secundaria", v: 15.9 },
];

const pie = [
  { name: "AD (18-20)", value: 32, c: "#10b981" },
  { name: "A (14-17)", value: 48, c: "#3b82f6" },
  { name: "B (11-13)", value: 15, c: "#f59e0b" },
  { name: "C (0-10)", value: 5, c: "#ef4444" },
];

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Asistencia anual", v: "94.6%", i: CalendarCheck, c: "bg-emerald-100 text-emerald-600" },
          { l: "Promedio general", v: "16.4", i: TrendingUp, c: "bg-blue-100 text-blue-600" },
          { l: "Aprobados", v: "95%", i: GraduationCap, c: "bg-indigo-100 text-indigo-600" },
          { l: "Retención", v: "98.2%", i: Users, c: "bg-amber-100 text-amber-600" },
        ].map((s) => {
          const I = s.i;
          return (
            <Card key={s.l} className="border-slate-200">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${s.c} flex items-center justify-center`}>
                  <I className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl">{s.v}</div>
                  <div className="text-sm text-slate-500">{s.l}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3>Tendencia de asistencia</h3>
                <p className="text-sm text-slate-500">Promedio mensual 2026</p>
              </div>
              <Button variant="outline"><Download className="w-4 h-4 mr-2" />PDF</Button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendance}>
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="m" stroke="#94a3b8" fontSize={12} />
                  <YAxis domain={[80, 100]} stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={2.5} fill="url(#g)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <h3 className="mb-1">Distribución de notas</h3>
            <p className="text-sm text-slate-500 mb-4">Bimestre II</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pie} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={2}>
                    {pie.map((e, i) => <Cell key={i} fill={e.c} />)}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-5">
            <h3 className="mb-1">Rendimiento por nivel</h3>
            <p className="text-sm text-slate-500 mb-4">Promedio académico</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={academic} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 20]} stroke="#94a3b8" fontSize={12} />
                  <YAxis type="category" dataKey="l" stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="v" fill="#6366f1" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3>Reportes descargables</h3>
              <Badge variant="outline">Mayo 2026</Badge>
            </div>
            <ul className="space-y-2">
              {[
                "Reporte de asistencia general",
                "Boletines del Bimestre II",
                "Estadísticas de rendimiento",
                "Listado de alumnos en riesgo",
                "Promedios por docente",
                "Reporte financiero familias",
              ].map((r) => (
                <li key={r} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{r}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">PDF</Button>
                    <Button variant="ghost" size="sm">Excel</Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

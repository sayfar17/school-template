import { TrendingUp, Users, BookOpen, CalendarCheck, AlertTriangle, Award } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

const compareData = [
  { g: "1°", actual: 16.2, anterior: 15.6 },
  { g: "2°", actual: 16.8, anterior: 16.1 },
  { g: "3°", actual: 15.9, anterior: 15.4 },
  { g: "4°", actual: 16.5, anterior: 16.0 },
  { g: "5°", actual: 17.1, anterior: 16.7 },
];

const attendanceTrend = [
  { m: "Ene", v: 95 },
  { m: "Feb", v: 96 },
  { m: "Mar", v: 94 },
  { m: "Abr", v: 95 },
  { m: "May", v: 94.6 },
];

const ranking = [
  { g: "5° A", avg: 17.4, color: "bg-emerald-500" },
  { g: "6° A Prim", avg: 17.1, color: "bg-emerald-500" },
  { g: "3° B", avg: 16.8, color: "bg-blue-500" },
  { g: "4° A", avg: 16.5, color: "bg-blue-500" },
  { g: "1° C", avg: 14.2, color: "bg-amber-500" },
];

export function DirectorDashboard({ onNavigate }: { onNavigate: (k: any) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Promedio institucional", v: "16.4", d: "+0.4 vs 2025", i: TrendingUp, c: "bg-blue-100 text-blue-600" },
          { l: "Asistencia general", v: "94.6%", d: "−1.1% vs Abr", i: CalendarCheck, c: "bg-emerald-100 text-emerald-600" },
          { l: "Docentes activos", v: "85 / 88", d: "3 con licencia", i: BookOpen, c: "bg-indigo-100 text-indigo-600" },
          { l: "Alumnos en riesgo", v: "42", d: "Requieren tutoría", i: AlertTriangle, c: "bg-red-100 text-red-600" },
        ].map((s) => {
          const I = s.i;
          return (
            <Card key={s.l} className="border-slate-200">
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-lg ${s.c} flex items-center justify-center mb-3`}>
                  <I className="w-5 h-5" />
                </div>
                <div className="text-3xl">{s.v}</div>
                <div className="text-sm text-slate-500 mt-1">{s.l}</div>
                <div className="text-xs text-slate-400 mt-1">{s.d}</div>
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
                <h3>Comparativa de promedios por grado</h3>
                <p className="text-sm text-slate-500">Bimestre actual vs. anterior</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => onNavigate("reports")}>Ver reportes</Button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={compareData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="g" stroke="#94a3b8" fontSize={12} />
                  <YAxis domain={[0, 20]} stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="anterior" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="actual" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-500" />
              <h3>Top aulas del año</h3>
            </div>
            <ul className="space-y-3">
              {ranking.map((r, i) => (
                <li key={r.g}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{i + 1}. {r.g}</span>
                    <Badge variant="outline">{r.avg}</Badge>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full ${r.color}`} style={{ width: `${(r.avg / 20) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3>Tendencia de asistencia</h3>
                <p className="text-sm text-slate-500">Promedio mensual institucional</p>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Saludable</Badge>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="m" stroke="#94a3b8" fontSize={12} />
                  <YAxis domain={[85, 100]} stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <h3 className="mb-4">Próximos eventos</h3>
            <ul className="space-y-3">
              {[
                { d: "28 May", t: "Reunión con docentes" },
                { d: "02 Jun", t: "Examen bimestral" },
                { d: "06 Jun", t: "Feria de Ciencias" },
                { d: "12 Jun", t: "Aniversario del colegio" },
              ].map((e) => (
                <li key={e.t} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                  <CalendarCheck className="w-4 h-4 text-blue-600" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">{e.t}</div>
                    <div className="text-xs text-slate-500">{e.d} · 2026</div>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full mt-4" onClick={() => onNavigate("calendar")}>
              Ver calendario completo
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
        <CardContent className="p-5">
          <h3 className="mb-4">Indicadores académicos</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { l: "Aprobación", v: 95, c: "bg-emerald-500" },
              { l: "Retención escolar", v: 98, c: "bg-blue-500" },
              { l: "Satisfacción docente", v: 89, c: "bg-violet-500" },
            ].map((k) => (
              <div key={k.l} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{k.l}</span>
                  <span>{k.v}%</span>
                </div>
                <Progress value={k.v} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

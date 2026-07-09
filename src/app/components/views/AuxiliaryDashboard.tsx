import { CalendarCheck, AlertTriangle, UserX, Clock, Plus, FileWarning } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

const absentees = [
  { n: "Mateo Torres", g: "4°C Sec", days: 3, reason: "Sin reportar" },
  { n: "Lucas Herrera", g: "1°B Sec", days: 2, reason: "Médico" },
  { n: "Renata Salazar", g: "5°A Sec", days: 1, reason: "Sin reportar" },
  { n: "Bruno Castro", g: "3°B Sec", days: 4, reason: "Sin reportar" },
];

const incidents = [
  { t: "Tardanza reiterada", a: "Diego R. · 5°A", d: "10:15", level: "Leve" },
  { t: "Uniforme incompleto", a: "Camila F. · 4°B", d: "08:30", level: "Leve" },
  { t: "Ausencia injustificada", a: "Bruno C. · 3°B", d: "Hoy", level: "Grave" },
];

const levelColor: Record<string, string> = {
  Leve: "bg-amber-100 text-amber-700",
  Grave: "bg-red-100 text-red-700",
};

export function AuxiliaryDashboard({ onNavigate }: { onNavigate: (k: any) => void }) {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200 overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm opacity-90">Turno mañana</div>
              <h2 className="text-2xl">Control operativo del día</h2>
              <p className="text-sm opacity-80 mt-1">28 May 2026 · 07:50 am</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => onNavigate("attendance")} className="bg-white text-slate-900 hover:bg-slate-100">
                <CalendarCheck className="w-4 h-4 mr-2" /> Tomar asistencia
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Plus className="w-4 h-4 mr-2" /> Registrar incidencia
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Alumnos presentes", v: "1,182", s: "94.6%", i: CalendarCheck, c: "bg-emerald-100 text-emerald-600" },
          { l: "Ausentes hoy", v: "68", s: "5.4%", i: UserX, c: "bg-red-100 text-red-600" },
          { l: "Tardanzas", v: "23", s: "Antes de las 10", i: Clock, c: "bg-amber-100 text-amber-600" },
          { l: "Incidencias", v: "5", s: "Hoy registradas", i: FileWarning, c: "bg-violet-100 text-violet-600" },
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
                <div className="text-xs text-slate-400 mt-1">{s.s}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3>Alumnos ausentes hoy</h3>
                <p className="text-sm text-slate-500">Contactar a apoderados</p>
              </div>
              <Button variant="outline" size="sm">Reportar</Button>
            </div>
            <ul className="divide-y divide-slate-100">
              {absentees.map((a) => (
                <li key={a.n} className="py-3 flex items-center gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-slate-100 text-slate-700 text-xs">
                      {a.n.split(" ").map((p) => p[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">{a.n}</div>
                    <div className="text-xs text-slate-500">{a.g} · {a.reason}</div>
                  </div>
                  <Badge className={`${a.days >= 3 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"} hover:bg-current`}>
                    {a.days} {a.days === 1 ? "día" : "días"}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3>Incidencias recientes</h3>
                <p className="text-sm text-slate-500">Últimas 24 horas</p>
              </div>
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white">
                <Plus className="w-4 h-4 mr-2" /> Nueva
              </Button>
            </div>
            <ul className="space-y-2">
              {incidents.map((inc) => (
                <li key={inc.a} className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm">{inc.t}</div>
                    <Badge className={`${levelColor[inc.level]} hover:bg-current`}>{inc.level}</Badge>
                  </div>
                  <div className="text-xs text-slate-500">{inc.a} · {inc.d}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3>Asistencia por nivel</h3>
              <p className="text-sm text-slate-500">Resumen del día</p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Estable</Badge>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { l: "Inicial", p: 215, t: 220, pct: 97.7 },
              { l: "Primaria", p: 512, t: 540, pct: 94.8 },
              { l: "Secundaria", p: 455, t: 490, pct: 92.9 },
            ].map((n) => (
              <div key={n.l} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span>{n.l}</span>
                  <span className="text-2xl">{n.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${n.pct}%` }} />
                </div>
                <div className="text-xs text-slate-500 mt-2">{n.p} de {n.t} presentes</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

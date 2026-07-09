import { useState } from "react";
import { Download, MessageSquare, Calendar, TrendingUp, CalendarCheck, Bell, FileText } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const kids = [
  { name: "Sofía Quispe", grade: "5°A Sec", avg: 17.4, att: 96, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" },
  { name: "Mateo Quispe", grade: "3° Prim", avg: 16.2, att: 98, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
];

const subjectAvg = [
  { c: "Mate", v: 17.5 },
  { c: "Comu", v: 18.2 },
  { c: "CTA", v: 17.0 },
  { c: "Inglés", v: 16.8 },
  { c: "Arte", v: 19.0 },
];

export function ParentDashboard({ onNavigate }: { onNavigate: (k: any) => void }) {
  const [kid, setKid] = useState(kids[0]);

  return (
    <div className="space-y-6">
      {/* Selector de hijo */}
      <Card className="border-slate-200 overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-5">
            <div className="text-sm opacity-90">Hola, Manuel</div>
            <h2 className="text-2xl">Sigue el progreso de tus hijos</h2>
          </div>
          <div className="p-5 flex gap-3 flex-wrap">
            {kids.map((k) => {
              const active = kid.name === k.name;
              return (
                <button
                  key={k.name}
                  onClick={() => setKid(k)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition ${
                    active ? "border-amber-400 bg-amber-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={k.img} />
                    <AvatarFallback>{k.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-sm">{k.name}</div>
                    <div className="text-xs text-slate-500">{k.grade}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* KPIs del hijo */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <TrendingUp className="w-4 h-4" /> <span className="text-sm">Promedio</span>
            </div>
            <div className="text-3xl text-blue-700">{kid.avg}</div>
            <Progress value={kid.avg * 5} className="mt-3 h-1.5" />
            <div className="text-xs text-emerald-600 mt-2">↑ Subió 0.3 vs bimestre I</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <CalendarCheck className="w-4 h-4" /> <span className="text-sm">Asistencia</span>
            </div>
            <div className="text-3xl text-emerald-600">{kid.att}%</div>
            <Progress value={kid.att} className="mt-3 h-1.5" />
            <div className="text-xs text-slate-500 mt-2">2 tardanzas este mes</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <FileText className="w-4 h-4" /> <span className="text-sm">Boletines</span>
            </div>
            <div className="text-3xl">2</div>
            <div className="text-xs text-slate-500 mt-2">Bimestre I y II disponibles</div>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              <Download className="w-3 h-3 mr-2" /> Descargar último
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-slate-200">
          <CardContent className="p-5">
            <h3 className="mb-1">Notas por curso</h3>
            <p className="text-sm text-slate-500 mb-4">Bimestre II · {kid.name}</p>
            <div className="space-y-3">
              {subjectAvg.map((s) => (
                <div key={s.c}>
                  <div className="flex items-center justify-between mb-1.5 text-sm">
                    <span>{s.c}</span>
                    <Badge className={`${
                      s.v >= 18 ? "bg-emerald-100 text-emerald-700" :
                      s.v >= 14 ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    } hover:bg-current`}>{s.v}</Badge>
                  </div>
                  <Progress value={s.v * 5} className="h-2" />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="mb-3 text-sm text-slate-700">Evolución del promedio</h4>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[{m:"B-I",v:17.1},{m:"B-II",v:17.4}]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="m" stroke="#94a3b8" fontSize={11} />
                    <YAxis domain={[10, 20]} stroke="#94a3b8" fontSize={11} />
                    <Tooltip />
                    <Line type="monotone" dataKey="v" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3>Observaciones del docente</h3>
              </div>
              <ul className="space-y-3">
                {[
                  { t: "Excelente desempeño en Matemática.", a: "Carlos M.", d: "Hoy" },
                  { t: "Participación destacada en Comunicación.", a: "Laura V.", d: "Ayer" },
                  { t: "Recordar traer materiales de arte.", a: "Mónica S.", d: "Lun" },
                ].map((o, i) => (
                  <li key={i} className="border-l-2 border-blue-400 pl-3">
                    <p className="text-sm">{o.t}</p>
                    <p className="text-xs text-slate-500 mt-1">{o.a} · {o.d}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-amber-500" />
                <h3>Comunicados</h3>
              </div>
              <ul className="space-y-2">
                {[
                  "Reunión de padres 5°A · 30 May",
                  "Pago de pensión Mayo disponible",
                  "Feria de Ciencias 06 Jun",
                ].map((m) => (
                  <li key={m} className="p-2 rounded-lg bg-slate-50 text-sm">{m}</li>
                ))}
              </ul>
              <Button variant="outline" className="w-full mt-3" onClick={() => onNavigate("publications")}>
                Ver todos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3>Próximos eventos escolares</h3>
            <Button variant="ghost" onClick={() => onNavigate("calendar")} className="text-blue-600">Ver calendario</Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { d: "28", m: "May", t: "Reunión de padres" },
              { d: "02", m: "Jun", t: "Examen bimestral" },
              { d: "06", m: "Jun", t: "Feria de Ciencias" },
              { d: "20", m: "Jun", t: "Día del logro" },
            ].map((e) => (
              <div key={e.t} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200">
                <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-700 flex flex-col items-center justify-center shrink-0">
                  <span className="text-sm leading-none">{e.d}</span>
                  <span className="text-[10px] uppercase">{e.m}</span>
                </div>
                <div className="text-sm">{e.t}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

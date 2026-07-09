import { BookOpen, CalendarCheck, TrendingUp, Trophy, Flame, Clock, Sparkles } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const subjects = [
  { c: "Matemática", t: "Carlos Mendoza", color: "bg-blue-500", grade: 17 },
  { c: "Comunicación", t: "Laura Vega", color: "bg-emerald-500", grade: 18 },
  { c: "CTA", t: "Pedro Soto", color: "bg-violet-500", grade: 17 },
  { c: "Inglés", t: "Ana Pérez", color: "bg-amber-500", grade: 16 },
  { c: "Historia", t: "Jorge Torres", color: "bg-rose-500", grade: 17 },
  { c: "Arte", t: "Mónica Salas", color: "bg-indigo-500", grade: 19 },
];

const exams = [
  { c: "Matemática · Cap. 5", d: "Mañana", urgent: true },
  { c: "Comunicación · Ensayo", d: "Vie 30 May", urgent: false },
  { c: "CTA · Práctica 4", d: "Lun 02 Jun", urgent: false },
];

const performance = [
  { name: "Promedio", value: 87, fill: "#0ea5e9" },
];

const subjectBars = subjects.map((s) => ({ c: s.c.slice(0, 4), v: s.grade }));

export function StudentDashboard({ onNavigate }: { onNavigate: (k: any) => void }) {
  return (
    <div className="space-y-6">
      {/* Hero motivacional */}
      <Card className="border-slate-200 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white p-6 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-cyan-300/30 rounded-full blur-3xl" />
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm opacity-90 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> ¡Hola, Sofía!
                </div>
                <h2 className="text-3xl mt-1">Vas por buen camino 🚀</h2>
                <p className="opacity-90 mt-1">5°A · Secundaria · 32 compañeros</p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-3xl">17.4</div>
                  <div className="text-xs opacity-90">Promedio</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl">3°</div>
                  <div className="text-xs opacity-90">Puesto</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl flex items-center gap-1"><Flame className="w-6 h-6 text-amber-300" />12</div>
                  <div className="text-xs opacity-90">Días seguidos</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Cursos", v: "6", i: BookOpen, c: "bg-sky-100 text-sky-600" },
          { l: "Asistencia", v: "96%", i: CalendarCheck, c: "bg-emerald-100 text-emerald-600" },
          { l: "Tareas pendientes", v: "3", i: Clock, c: "bg-amber-100 text-amber-600" },
          { l: "Insignias", v: "7", i: Trophy, c: "bg-violet-100 text-violet-600" },
        ].map((s) => {
          const I = s.i;
          return (
            <Card key={s.l} className="border-slate-200">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${s.c} flex items-center justify-center`}>
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
            <h3 className="mb-4">Mis cursos</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {subjects.map((s) => (
                <div key={s.c} className="rounded-lg border border-slate-200 p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${s.color} text-white flex items-center justify-center`}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <Badge variant="outline">{s.grade}/20</Badge>
                  </div>
                  <div className="text-sm">{s.c}</div>
                  <div className="text-xs text-slate-500">{s.t}</div>
                  <Progress value={s.grade * 5} className="mt-3 h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <h3 className="mb-2">Rendimiento general</h3>
              <p className="text-xs text-slate-500 mb-2">% de aprovechamiento</p>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="60%" outerRadius="100%" data={performance} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={20} fill="#0ea5e9" />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center -mt-24 mb-12">
                <div className="text-3xl text-sky-600">87%</div>
                <div className="text-xs text-slate-500">¡Muy bien!</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-amber-500" />
                <h3>Próximas evaluaciones</h3>
              </div>
              <ul className="space-y-2">
                {exams.map((e) => (
                  <li key={e.c} className={`p-3 rounded-lg ${e.urgent ? "bg-red-50 border border-red-100" : "bg-slate-50 border border-slate-100"}`}>
                    <div className="text-sm">{e.c}</div>
                    <div className={`text-xs mt-0.5 ${e.urgent ? "text-red-600" : "text-slate-500"}`}>{e.d}</div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-slate-200">
          <CardContent className="p-5">
            <h3 className="mb-4">Notas por curso</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectBars}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="c" stroke="#94a3b8" fontSize={12} />
                  <YAxis domain={[0, 20]} stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="v" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3>Logros</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { e: "🏆", t: "Top 5" },
                { e: "📚", t: "Lector" },
                { e: "🔥", t: "Racha 10" },
                { e: "🎨", t: "Creativo" },
                { e: "⚡", t: "Veloz" },
                { e: "🌟", t: "Estrella" },
              ].map((b) => (
                <div key={b.t} className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-3 text-center">
                  <div className="text-2xl">{b.e}</div>
                  <div className="text-[11px] text-slate-600 mt-1">{b.t}</div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-sky-600 hover:bg-sky-700 text-white" onClick={() => onNavigate("calendar")}>
              Ver mi calendario
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

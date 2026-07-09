import { BookOpen, ClipboardList, Users, Clock, CalendarCheck, PenSquare, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

const myCourses = [
  { c: "Matemática 5°A", students: 32, next: "Hoy 09:30", color: "bg-blue-500" },
  { c: "Matemática 5°B", students: 30, next: "Hoy 11:00", color: "bg-indigo-500" },
  { c: "Matemática 4°A", students: 33, next: "Mañana 08:00", color: "bg-emerald-500" },
  { c: "Refuerzo 5° Sec", students: 12, next: "Vie 14:00", color: "bg-violet-500" },
];

const pending = [
  { t: "Registrar asistencia · 5°A", urgent: true },
  { t: "Calificar examen · 4°A (28 entregas)", urgent: true },
  { t: "Subir prácticas Cap. 4 · 5°B", urgent: false },
  { t: "Revisar tareas · Refuerzo", urgent: false },
];

const schedule = [
  { d: "Lun", b: ["Mate 5A", "Mate 5B", "—", "Mate 4A", "Refuerzo"] },
  { d: "Mar", b: ["Mate 5A", "—", "Mate 4B", "Mate 4A", "—"] },
  { d: "Mié", b: ["Mate 5B", "Mate 5A", "—", "—", "Reunión"] },
  { d: "Jue", b: ["Mate 4A", "Mate 4B", "Mate 5A", "—", "—"] },
  { d: "Vie", b: ["—", "Mate 5B", "Mate 4B", "—", "Refuerzo"] },
];

export function TeacherDashboard({ onNavigate }: { onNavigate: (k: any) => void }) {
  return (
    <div className="space-y-6">
      {/* Saludo + acciones rápidas */}
      <Card className="border-slate-200 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm opacity-90">¡Hola, Carlos!</div>
                <h2 className="text-2xl">Tienes 4 cursos y 2 tareas pendientes hoy</h2>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => onNavigate("attendance")} className="bg-white text-emerald-700 hover:bg-emerald-50">
                  <CalendarCheck className="w-4 h-4 mr-2" /> Registrar asistencia
                </Button>
                <Button variant="secondary" onClick={() => onNavigate("notes")} className="bg-white text-emerald-700 hover:bg-emerald-50">
                  <PenSquare className="w-4 h-4 mr-2" /> Calificar
                </Button>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-4">
            {[
              { l: "Cursos", v: "4", i: BookOpen },
              { l: "Alumnos", v: "107", i: Users },
              { l: "Pendientes", v: "4", i: ClipboardList },
              { l: "Horas semana", v: "22h", i: Clock },
            ].map((s) => {
              const I = s.i;
              return (
                <div key={s.l} className="p-5 border-t border-slate-100 sm:border-l flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <I className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl">{s.v}</div>
                    <div className="text-xs text-slate-500">{s.l}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3>Mis cursos</h3>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("courses")} className="text-blue-600">
                Ver todos <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {myCourses.map((c) => (
                <div key={c.c} className="rounded-lg border border-slate-200 p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${c.color} text-white flex items-center justify-center`}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className="text-xs">{c.students} alumnos</Badge>
                  </div>
                  <div>{c.c}</div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Próxima clase: {c.next}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => onNavigate("attendance")}>Asistencia</Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => onNavigate("notes")}>Notas</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <h3 className="mb-4">Pendientes</h3>
            <ul className="space-y-2">
              {pending.map((p) => (
                <li
                  key={p.t}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    p.urgent ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <ClipboardList className={`w-4 h-4 mt-0.5 ${p.urgent ? "text-amber-600" : "text-slate-500"}`} />
                  <div className="flex-1">
                    <div className="text-sm">{p.t}</div>
                    {p.urgent && <Badge className="bg-amber-600 text-white hover:bg-amber-600 mt-1 text-xs">Urgente</Badge>}
                  </div>
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
              <h3>Horario semanal</h3>
              <p className="text-sm text-slate-500">Tus bloques de clase</p>
            </div>
            <Badge variant="outline">Semana actual</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="p-2">Día</th>
                  {["08:00", "09:30", "11:00", "12:30", "14:00"].map((h) => (
                    <th key={h} className="p-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map((d) => (
                  <tr key={d.d} className="border-t border-slate-100">
                    <td className="p-2 text-slate-500">{d.d}</td>
                    {d.b.map((b, i) => (
                      <td key={i} className="p-2">
                        {b === "—" ? (
                          <span className="text-slate-300">—</span>
                        ) : (
                          <span className="inline-block px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs">{b}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardContent className="p-5">
          <h3 className="mb-4">Mis estudiantes destacados</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { n: "Valentina Cruz", g: "5°A", a: 19.2 },
              { n: "Sofía Quispe", g: "5°A", a: 18.4 },
              { n: "Camila Flores", g: "5°B", a: 18.0 },
              { n: "Lucas Herrera", g: "4°A", a: 17.5 },
            ].map((s) => (
              <div key={s.n} className="rounded-lg border border-slate-200 p-4 flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                    {s.n.split(" ").map((p) => p[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{s.n}</div>
                  <div className="text-xs text-slate-500">{s.g}</div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{s.a}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

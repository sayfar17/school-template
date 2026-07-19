import { useState, useEffect } from "react";
import { Download, Save, Check, Clock, X, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useMockStore } from "./mockStore";

type Status = "P" | "T" | "F" | "J";

const defaultStudents = [
  "Sofía Quispe", "Diego Ramírez", "Valentina Cruz", "Mateo Torres", "Camila Flores",
  "Lucas Herrera", "Isabella Vargas", "Sebastián Ríos", "Emilia Pérez", "Joaquín Méndez",
  "Renata Salazar", "Bruno Castro",
];

const gradeMapping: Record<string, string> = {
  "1a": "1° A · Secundaria",
  "2a": "2° A · Secundaria",
  "3a": "3° A · Secundaria",
  "4a": "4° A · Secundaria",
  "5a": "5° A · Secundaria",
};

const data = [
  { d: "Lun", p: 28, t: 2, f: 2 },
  { d: "Mar", p: 27, t: 3, f: 2 },
  { d: "Mié", p: 29, t: 2, f: 1 },
  { d: "Jue", p: 26, t: 4, f: 2 },
  { d: "Vie", p: 28, t: 2, v: 2 },
];

const statusBtn = (s: Status, active: boolean) => {
  const map: Record<Status, string> = {
    P: active ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    T: active ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100",
    F: active ? "bg-red-600 text-white" : "bg-red-50 text-red-700 hover:bg-red-100",
    J: active ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100",
  };
  return map[s];
};

export function Attendance() {
  const { students, attendance, setAttendance, logActivity } = useMockStore();

  // Filters state
  const [date, setDate] = useState("2026-05-28");
  const [level, setLevel] = useState("sec");
  const [grade, setGrade] = useState("5a");
  const [course, setCourse] = useState("all");

  // Loading states
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Get students list for this grade
  const gradeLabel = gradeMapping[grade] || "5° A · Secundaria";
  const studentsList = students.filter(s => s.grade === gradeLabel).map(s => s.name);
  const activeStudents = studentsList.length ? studentsList : defaultStudents;

  // Local state for current marks
  const attendanceKey = `${date}_${grade}`;
  const [marks, setMarks] = useState<Record<string, Status>>({});

  // Sync local marks when filter changes or store attendance is updated
  useEffect(() => {
    const saved = attendance[attendanceKey] || {};
    const initialMarks = Object.fromEntries(
      activeStudents.map((s) => [s, saved[s] || "P"])
    );
    setMarks(initialMarks);
  }, [date, grade, attendance, students]);

  const counts = Object.values(marks).reduce(
    (acc, v) => ({ ...acc, [v]: (acc[v] || 0) + 1 }),
    { P: 0, T: 0, F: 0, J: 0 } as Record<Status, number>
  );

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setAttendance((prev) => ({
        ...prev,
        [attendanceKey]: marks,
      }));
      logActivity("Carlos Mendoza", `registró ${activeStudents.length} asistencias en ${gradeLabel}`);
      toast.success("Asistencia guardada correctamente en el sistema");
      setSaving(false);
    }, 1000);
  };

  const handleExport = () => {
    setExporting(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Generando reporte de asistencia...",
        success: `Reporte de asistencia_${date}_${grade}.xlsx descargado`,
        error: "Error al exportar",
      }
    ).finally(() => setExporting(false));
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="grid sm:grid-cols-4 gap-4 mb-2">
            <div>
              <Label>Fecha</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1.5"
                disabled={saving}
              />
            </div>
            <div>
              <Label>Nivel</Label>
              <Select value={level} onValueChange={setLevel} disabled={saving}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sec">Secundaria</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Grado / Sección</Label>
              <Select value={grade} onValueChange={setGrade} disabled={saving}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1a">1° A</SelectItem>
                  <SelectItem value="2a">2° A</SelectItem>
                  <SelectItem value="3a">3° A</SelectItem>
                  <SelectItem value="4a">4° A</SelectItem>
                  <SelectItem value="5a">5° A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Curso (opcional)</Label>
              <Select value={course} onValueChange={setCourse} disabled={saving}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="mat">Matemática</SelectItem>
                  <SelectItem value="com">Comunicación</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3>Registro de asistencia · {gradeLabel.split(" · ")[0]}</h3>
                <p className="text-sm text-slate-500">{date} · {activeStudents.length} alumnos</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExport} disabled={exporting || saving}>
                  <Download className="w-4 h-4 mr-2" />Exportar
                </Button>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white" disabled={saving || exporting}>
                  <Save className="w-4 h-4 mr-2" />{saving ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {activeStudents.map((s) => {
                const currentMark = marks[s] || "P";
                return (
                  <div key={s} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                          {s.split(" ").map((p) => p[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{s}</span>
                    </div>
                    <div className="flex gap-1.5">
                      {(["P", "T", "F", "J"] as Status[]).map((st) => (
                        <button
                          key={st}
                          onClick={() => setMarks((prev) => ({ ...prev, [s]: st }))}
                          className={`w-8 h-8 rounded-md text-xs font-semibold transition ${statusBtn(st, currentMark === st)}`}
                          title={{ P: "Presente", T: "Tardanza", F: "Falta", J: "Justificado" }[st]}
                          disabled={saving}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <h3 className="mb-4">Resumen del día</h3>
              <div className="space-y-3">
                {[
                  { l: "Presentes", v: counts.P || 0, wrap: "bg-emerald-50 border-emerald-100", ic: "text-emerald-600", bd: "bg-emerald-600", i: Check },
                  { l: "Tardanzas", v: counts.T || 0, wrap: "bg-amber-50 border-amber-100", ic: "text-amber-600", bd: "bg-amber-500", i: Clock },
                  { l: "Faltas", v: counts.F || 0, wrap: "bg-red-50 border-red-100", ic: "text-red-600", bd: "bg-red-600", i: X },
                  { l: "Justificados", v: counts.J || 0, wrap: "bg-blue-50 border-blue-100", ic: "text-blue-600", bd: "bg-blue-600", i: FileText },
                ].map((r) => {
                  const I = r.i;
                  return (
                    <div key={r.l} className={`flex items-center justify-between p-3 rounded-lg border ${r.wrap}`}>
                      <div className="flex items-center gap-2">
                        <I className={`w-4 h-4 ${r.ic}`} />
                        <span className="text-sm">{r.l}</span>
                      </div>
                      <Badge className={`text-white hover:opacity-90 ${r.bd}`}>{r.v}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-5">
              <h3 className="mb-4">Tendencia semanal</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="d" fontSize={11} stroke="#94a3b8" />
                    <YAxis fontSize={11} stroke="#94a3b8" />
                    <Tooltip />
                    <Bar dataKey="p" stackId="a" fill="#10b981" />
                    <Bar dataKey="t" stackId="a" fill="#f59e0b" />
                    <Bar dataKey="f" stackId="a" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

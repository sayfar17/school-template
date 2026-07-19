import { useState, useEffect } from "react";
import { Download, Save, Trophy } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { useMockStore, GradeRow } from "./mockStore";

const estColor: Record<string, string> = {
  AD: "bg-emerald-100 text-emerald-700",
  A: "bg-blue-100 text-blue-700",
  B: "bg-amber-100 text-amber-700",
  C: "bg-red-100 text-red-700",
};

const trend = [
  { b: "B-I", v: 15.2 },
  { b: "B-II", v: 16.4 },
  { b: "B-III", v: 16.8 },
  { b: "B-IV", v: 17.1 },
];

export function GradesNotes() {
  const { grades, setGrades, logActivity } = useMockStore();

  // Filters state
  const [course, setCourse] = useState("mat");
  const [gradeSection, setGradeSection] = useState("5a");
  const [period, setPeriod] = useState("b2");
  const [viewType, setViewType] = useState("tab");

  // Loading states
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Local state for the editable grid
  const [rowsState, setRowsState] = useState<GradeRow[]>([]);

  // Sync with store when course changes
  useEffect(() => {
    setRowsState(grades[course] || []);
  }, [course, grades]);

  const handleGradeChange = (studentName: string, competency: "c1" | "c2" | "c3" | "c4", valueStr: string) => {
    let val = parseFloat(valueStr);
    if (isNaN(val)) val = 0;
    if (val < 0) val = 0;
    if (val > 20) val = 20;

    setRowsState((prev) =>
      prev.map((row) => {
        if (row.n === studentName) {
          const updatedRow = { ...row, [competency]: val };
          // Recalculate average
          const avg = (updatedRow.c1 + updatedRow.c2 + updatedRow.c3 + updatedRow.c4) / 4;
          updatedRow.fin = parseFloat(avg.toFixed(1));
          // Recalculate achievement level
          if (avg >= 17.0) updatedRow.est = "AD";
          else if (avg >= 14.0) updatedRow.est = "A";
          else if (avg >= 11.0) updatedRow.est = "B";
          else updatedRow.est = "C";

          return updatedRow;
        }
        return row;
      })
    );
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setGrades((prev) => ({
        ...prev,
        [course]: rowsState,
      }));
      const courseLabel = course === "mat" ? "Matemática" : "Comunicación";
      logActivity("Carlos Mendoza", `actualizó las notas de ${courseLabel} Bimestre II`);
      toast.success("Calificaciones guardadas y consolidadas correctamente");
      setSaving(false);
    }, 1000);
  };

  const handleExport = () => {
    setExporting(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Generando libreta de notas...",
        success: `Boletines_${course}_B2.pdf descargados`,
        error: "Error al exportar",
      }
    ).finally(() => setExporting(false));
  };

  const sorted = [...rowsState].sort((a, b) => b.fin - a.fin);
  const courseNameLabel = course === "mat" ? "Matemática" : "Comunicación";

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="grid sm:grid-cols-4 gap-4">
            <div>
              <Label>Curso</Label>
              <Select value={course} onValueChange={setCourse} disabled={saving}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mat">Matemática</SelectItem>
                  <SelectItem value="com">Comunicación</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Grado/Sección</Label>
              <Select value={gradeSection} onValueChange={setGradeSection} disabled={saving}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="5a">5° A · Secundaria</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Periodo</Label>
              <Select value={period} onValueChange={setPeriod} disabled={saving}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="b1">Bimestre I</SelectItem>
                  <SelectItem value="b2">Bimestre II</SelectItem>
                  <SelectItem value="b3">Bimestre III</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Vista</Label>
              <Select value={viewType} onValueChange={setViewType} disabled={saving}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tab">Tabla editable</SelectItem>
                  <SelectItem value="alu">Por alumno</SelectItem>
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
                <h3>Calificaciones · {courseNameLabel} 5°A</h3>
                <p className="text-sm text-slate-500">Bimestre II · 4 competencias</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExport} disabled={exporting || saving}>
                  <Download className="w-4 h-4 mr-2" />Boletines
                </Button>
                <Button onClick={handleSave} disabled={saving || exporting} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Save className="w-4 h-4 mr-2" />{saving ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-slate-50">
                  <tr className="text-left">
                    <th className="p-3">Alumno</th>
                    <th className="p-2 text-center">C1</th>
                    <th className="p-2 text-center">C2</th>
                    <th className="p-2 text-center">C3</th>
                    <th className="p-2 text-center">C4</th>
                    <th className="p-2 text-center">Final</th>
                    <th className="p-2 text-center">Nivel</th>
                  </tr>
                </thead>
                <tbody>
                  {rowsState.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-slate-400">No hay calificaciones disponibles</td>
                    </tr>
                  ) : (
                    rowsState.map((r) => (
                      <tr key={r.n} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-7 h-7">
                              <AvatarFallback className="text-[10px] bg-blue-100 text-blue-700">
                                {r.n.split(" ").map((p) => p[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            {r.n}
                          </div>
                        </td>
                        {["c1", "c2", "c3", "c4"].map((k) => (
                          <td key={k} className="p-2 text-center">
                            <Input
                              type="number"
                              min="0"
                              max="20"
                              value={(r as any)[k]}
                              onChange={(e) => handleGradeChange(r.n, k as any, e.target.value)}
                              className="w-14 h-8 text-center mx-auto"
                              disabled={saving}
                            />
                          </td>
                        ))}
                        <td className="p-2 text-center">
                          <span className="px-2 py-1 rounded-md bg-slate-100 font-semibold">{r.fin}</span>
                        </td>
                        <td className="p-2 text-center">
                          <Badge className={`${estColor[r.est]} hover:bg-current`}>{r.est}</Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3>Ranking del aula</h3>
              </div>
              <ul className="space-y-2">
                {sorted.slice(0, 5).map((s, i) => (
                  <li key={s.n} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                        i === 0 ? "bg-amber-100 text-amber-700" : i === 1 ? "bg-slate-100 text-slate-700" : i === 2 ? "bg-orange-100 text-orange-700" : "bg-slate-50 text-slate-500"
                      }`}>{i + 1}</span>
                      <span className="text-sm">{s.n}</span>
                    </div>
                    <Badge variant="outline">{s.fin}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-5">
              <h3 className="mb-1">Evolución del aula</h3>
              <p className="text-xs text-slate-500 mb-4">Promedio por bimestre</p>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="b" fontSize={11} stroke="#94a3b8" />
                    <YAxis domain={[10, 20]} fontSize={11} stroke="#94a3b8" />
                    <Tooltip />
                    <Line type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

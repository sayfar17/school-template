import { Download, Save, Trophy } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const rows = [
  { n: "Sofía Quispe", c1: 18, c2: 17, c3: 18, c4: 17, fin: 17.5, est: "AD" },
  { n: "Diego Ramírez", c1: 15, c2: 16, c3: 15, c4: 16, fin: 15.5, est: "A" },
  { n: "Valentina Cruz", c1: 19, c2: 18, c3: 19, c4: 19, fin: 18.8, est: "AD" },
  { n: "Mateo Torres", c1: 12, c2: 13, c3: 14, c4: 13, fin: 13.0, est: "B" },
  { n: "Camila Flores", c1: 17, c2: 18, c3: 17, c4: 18, fin: 17.5, est: "AD" },
  { n: "Lucas Herrera", c1: 16, c2: 15, c3: 17, c4: 16, fin: 16.0, est: "A" },
  { n: "Isabella Vargas", c1: 14, c2: 15, c3: 14, c4: 15, fin: 14.5, est: "A" },
];

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
  const sorted = [...rows].sort((a, b) => b.fin - a.fin);

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="grid sm:grid-cols-4 gap-4">
            <div><Label>Curso</Label><Select defaultValue="mat"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="mat">Matemática</SelectItem><SelectItem value="com">Comunicación</SelectItem></SelectContent></Select></div>
            <div><Label>Grado/Sección</Label><Select defaultValue="5a"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="5a">5° A · Secundaria</SelectItem></SelectContent></Select></div>
            <div><Label>Periodo</Label><Select defaultValue="b2"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="b1">Bimestre I</SelectItem><SelectItem value="b2">Bimestre II</SelectItem><SelectItem value="b3">Bimestre III</SelectItem></SelectContent></Select></div>
            <div><Label>Vista</Label><Select defaultValue="tab"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="tab">Tabla editable</SelectItem><SelectItem value="alu">Por alumno</SelectItem></SelectContent></Select></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3>Calificaciones · Matemática 5°A</h3>
                <p className="text-sm text-slate-500">Bimestre II · 4 competencias</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline"><Download className="w-4 h-4 mr-2" />Boletines</Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Save className="w-4 h-4 mr-2" />Guardar</Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-slate-50">
                  <tr className="text-left">
                    <th className="p-3">Alumno</th>
                    <th className="p-2">C1</th>
                    <th className="p-2">C2</th>
                    <th className="p-2">C3</th>
                    <th className="p-2">C4</th>
                    <th className="p-2">Final</th>
                    <th className="p-2">Nivel</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.n} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-7 h-7"><AvatarFallback className="text-[10px] bg-blue-100 text-blue-700">{r.n.split(" ").map((p) => p[0]).join("")}</AvatarFallback></Avatar>
                          {r.n}
                        </div>
                      </td>
                      {["c1", "c2", "c3", "c4"].map((k) => (
                        <td key={k} className="p-2">
                          <Input defaultValue={(r as any)[k]} className="w-14 h-8 text-center" />
                        </td>
                      ))}
                      <td className="p-2"><span className="px-2 py-1 rounded-md bg-slate-100">{r.fin}</span></td>
                      <td className="p-2"><Badge className={`${estColor[r.est]} hover:bg-current`}>{r.est}</Badge></td>
                    </tr>
                  ))}
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
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
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

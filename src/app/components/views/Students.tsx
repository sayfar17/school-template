import { useState } from "react";
import { Plus, Search, Download, Phone, Mail, MapPin, FileText, Calendar, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Progress } from "../ui/progress";

const students = [
  { id: "ALU-2026-001", name: "Sofía Quispe Mamani", grade: "5° A · Secundaria", avg: 17.4, attendance: 96, status: "Regular", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" },
  { id: "ALU-2026-002", name: "Diego Ramírez Soto", grade: "3° A · Secundaria", avg: 15.8, attendance: 92, status: "Regular", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
  { id: "ALU-2026-003", name: "Valentina Cruz Pérez", grade: "5° A · Secundaria", avg: 18.1, attendance: 98, status: "Destacado", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
  { id: "ALU-2026-004", name: "Mateo Torres Vega", grade: "4° A · Secundaria", avg: 13.2, attendance: 84, status: "Riesgo", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80" },
  { id: "ALU-2026-005", name: "Camila Flores Rojas", grade: "2° A · Secundaria", avg: 17.9, attendance: 97, status: "Regular", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80" },
  { id: "ALU-2026-006", name: "Lucas Herrera Díaz", grade: "1° A · Secundaria", avg: 16.5, attendance: 94, status: "Regular", img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&q=80" },
];

const statusColor: Record<string, string> = {
  Regular: "bg-blue-100 text-blue-700",
  Destacado: "bg-emerald-100 text-emerald-700",
  Riesgo: "bg-red-100 text-red-700",
};

export function Students() {
  const [selected, setSelected] = useState(students[0]);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lista */}
        <Card className="lg:col-span-1 border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3>Alumnos</h3>
                <p className="text-xs text-slate-500">{students.length} de 1,250 registrados</p>
              </div>
              <Button size="icon" className="bg-blue-600 hover:bg-blue-700 text-white"><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Buscar alumno..." className="pl-10" />
            </div>
            <div className="space-y-1 max-h-[600px] overflow-y-auto">
              {students.map((s) => {
                const active = selected.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelected(s)}
                    className={`w-full p-3 rounded-lg flex items-center gap-3 text-left transition ${
                      active ? "bg-blue-50 border border-blue-200" : "hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={s.img} />
                      <AvatarFallback>{s.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{s.name}</div>
                      <div className="text-xs text-slate-500 truncate">{s.grade}</div>
                    </div>
                    <Badge className={`${statusColor[s.status]} hover:bg-current text-xs`}>{s.status}</Badge>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Perfil */}
        <Card className="lg:col-span-2 border-slate-200">
          <CardContent className="p-0">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl" />
            <div className="p-6 -mt-16">
              <div className="flex items-end gap-4 mb-6">
                <Avatar className="w-24 h-24 ring-4 ring-white">
                  <AvatarImage src={selected.img} />
                  <AvatarFallback>{selected.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 mt-12">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2>{selected.name}</h2>
                    <Badge className={`${statusColor[selected.status]} hover:bg-current`}>{selected.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-500">{selected.id} · {selected.grade}</p>
                </div>
                <div className="flex gap-2 mt-12">
                  <Button variant="outline"><Download className="w-4 h-4 mr-2" />Boletín</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Editar</Button>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-xs text-slate-500 mb-1">Promedio general</div>
                  <div className="text-2xl text-blue-700">{selected.avg}</div>
                  <Progress value={selected.avg * 5} className="mt-2 h-1.5" />
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-xs text-slate-500 mb-1">Asistencia</div>
                  <div className="text-2xl text-emerald-600">{selected.attendance}%</div>
                  <Progress value={selected.attendance} className="mt-2 h-1.5" />
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="text-xs text-slate-500 mb-1">Puesto en aula</div>
                  <div className="text-2xl">3°</div>
                  <div className="text-xs text-emerald-600 mt-2">↑ Subió 2 puestos</div>
                </div>
              </div>

              <Tabs defaultValue="info">
                <TabsList>
                  <TabsTrigger value="info">Información</TabsTrigger>
                  <TabsTrigger value="academic">Histórico</TabsTrigger>
                  <TabsTrigger value="attendance">Asistencia</TabsTrigger>
                  <TabsTrigger value="docs">Documentos</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="pt-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { i: Mail, l: "Email", v: "s.quispe@edugestion360.edu.pe" },
                      { i: Phone, l: "Teléfono", v: "+51 987 100 200" },
                      { i: Calendar, l: "Fecha de nacimiento", v: "12 Ago 2010" },
                      { i: MapPin, l: "Dirección", v: "Pariamarca" },
                    ].map((d) => (
                      <div key={d.l} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                          <d.i className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">{d.l}</div>
                          <div className="text-sm">{d.v}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-sm mb-1">Apoderado</div>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9"><AvatarFallback>MQ</AvatarFallback></Avatar>
                      <div>
                        <div className="text-sm">Manuel Quispe Choque</div>
                        <div className="text-xs text-slate-500">Padre · +51 987 555 444</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="academic" className="pt-6 space-y-3">
                  {[
                    { p: "Bimestre I 2026", avg: 17.2 },
                    { p: "Bimestre II 2026", avg: 17.4 },
                    { p: "Año 2025", avg: 16.8 },
                    { p: "Año 2024", avg: 16.1 },
                  ].map((p) => (
                    <div key={p.p} className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm">{p.p}</span>
                      </div>
                      <Badge variant="outline">{p.avg}</Badge>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="attendance" className="pt-6">
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => {
                      const r = d % 9 === 0 ? "F" : d % 7 === 0 ? "T" : "P";
                      const c = r === "P" ? "bg-emerald-100 text-emerald-700" : r === "T" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";
                      return (
                        <div key={d} className={`h-12 rounded-md ${c} flex flex-col items-center justify-center text-xs`}>
                          <span>{d}</span>
                          <span>{r}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-4 mt-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-100" /> Presente</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-100" /> Tardanza</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100" /> Falta</span>
                  </div>
                </TabsContent>

                <TabsContent value="docs" className="pt-6 space-y-2">
                  {["Partida de nacimiento.pdf", "DNI escaneado.pdf", "Ficha médica 2026.pdf", "Boletín 2025.pdf"].map((f) => (
                    <div key={f} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{f}</span>
                      </div>
                      <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

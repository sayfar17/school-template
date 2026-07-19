import { useState } from "react";
import { Plus, Search, Download, Phone, Mail, MapPin, FileText, Calendar, TrendingUp, CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { useMockStore, Student } from "./mockStore";

const statusColor: Record<string, string> = {
  Regular: "bg-blue-100 text-blue-700",
  Destacado: "bg-emerald-100 text-emerald-700",
  Riesgo: "bg-red-100 text-red-700",
};

export function Students() {
  const { students, setStudents, logActivity } = useMockStore();
  const [selectedId, setSelectedId] = useState<string>(students[0]?.id || "");
  const [q, setQ] = useState("");

  // Modals state
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("5° A · Secundaria");
  const [avg, setAvg] = useState("15.0");
  const [attendance, setAttendance] = useState("95");
  const [status, setStatus] = useState<"Regular" | "Destacado" | "Riesgo">("Regular");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");

  const selected = students.find((s) => s.id === selectedId) || students[0];

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(q.toLowerCase()) ||
    s.id.toLowerCase().includes(q.toLowerCase()) ||
    s.grade.toLowerCase().includes(q.toLowerCase())
  );

  const resetForm = () => {
    setName("");
    setGrade("5° A · Secundaria");
    setAvg("15.0");
    setAttendance("95");
    setStatus("Regular");
    setEmail("");
    setPhone("");
    setBirthDate("");
    setAddress("");
    setParentName("");
    setParentPhone("");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Por favor ingresa el nombre");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const nextNum = students.length ? Math.max(...students.map(s => parseInt(s.id.split("-")[2]))) + 1 : 1;
      const newId = `ALU-2026-${nextNum.toString().padStart(3, "0")}`;
      const newStudent: Student = {
        id: newId,
        name,
        grade,
        avg: parseFloat(avg) || 14.0,
        attendance: parseInt(attendance) || 95,
        status,
        img: `https://images.unsplash.com/photo-${1544005313 + nextNum}?w=200&q=80`,
        email: email || `${name.toLowerCase().replace(/ /g, ".")}@edugestion360.edu.pe`,
        phone: phone || "+51 987 000 000",
        birthDate: birthDate || "2010-08-12",
        address: address || "Pariamarca",
        parentName: parentName || "Manuel Quispe",
        parentPhone: parentPhone || "+51 987 555 444",
      };

      setStudents((prev) => [...prev, newStudent]);
      setSelectedId(newStudent.id);
      logActivity("Administrador", `matriculó al alumno ${newStudent.name} (${newStudent.id})`);
      toast.success("Alumno matriculado correctamente");
      setLoading(false);
      setOpen(false);
      resetForm();
    }, 1000);
  };

  const startEdit = () => {
    if (!selected) return;
    setName(selected.name);
    setGrade(selected.grade);
    setAvg(selected.avg.toString());
    setAttendance(selected.attendance.toString());
    setStatus(selected.status);
    setEmail(selected.email || "");
    setPhone(selected.phone || "");
    setBirthDate(selected.birthDate || "");
    setAddress(selected.address || "");
    setParentName(selected.parentName || "");
    setParentPhone(selected.parentPhone || "");
    setEditOpen(true);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setLoading(true);
    setTimeout(() => {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === selected.id
            ? {
                ...s,
                name,
                grade,
                avg: parseFloat(avg) || 14.0,
                attendance: parseInt(attendance) || 95,
                status,
                email,
                phone,
                birthDate,
                address,
                parentName,
                parentPhone,
              }
            : s
        )
      );
      logActivity("Administrador", `actualizó los datos del alumno ${name}`);
      toast.success("Perfil de alumno actualizado");
      setLoading(false);
      setEditOpen(false);
      resetForm();
    }, 1000);
  };

  const simulateDownload = (filename: string) => {
    setDownloading(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1200)),
      {
        loading: `Preparando descarga de ${filename}...`,
        success: `${filename} descargado con éxito`,
        error: "Error en la descarga",
      }
    ).finally(() => setDownloading(false));
  };

  const handleDelete = () => {
    if (!selected) return;
    if (confirm(`¿Estás seguro de que deseas retirar al estudiante ${selected.name}?`)) {
      const deletedName = selected.name;
      const deletedId = selected.id;
      setStudents((prev) => prev.filter((s) => s.id !== selectedId));
      logActivity("Administrador", `retiró al estudiante ${deletedName} (${deletedId})`);
      toast.success("Estudiante retirado del sistema");
      setSelectedId("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lista */}
        <Card className="lg:col-span-1 border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3>Alumnos</h3>
                <p className="text-xs text-slate-500">{filtered.length} de {students.length} registrados</p>
              </div>
              <Button size="icon" onClick={() => { resetForm(); setOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar alumno..."
                className="pl-10"
              />
            </div>
            <div className="space-y-1 max-h-[600px] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400">No se encontraron alumnos</div>
              ) : (
                filtered.map((s) => {
                  const active = selected?.id === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedId(s.id)}
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
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Perfil */}
        <Card className="lg:col-span-2 border-slate-200">
          {selected ? (
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
                    <Button variant="outline" onClick={() => simulateDownload(`Boletin_${selected.id}.pdf`)} disabled={downloading}>
                      <Download className="w-4 h-4 mr-2" />Boletín
                    </Button>
                    <Button onClick={startEdit} className="bg-blue-600 hover:bg-blue-700 text-white">Editar</Button>
                    <Button variant="ghost" size="icon" onClick={handleDelete} className="text-red-500 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
                        { i: Mail, l: "Email", v: selected.email || "s.quispe@edugestion360.edu.pe" },
                        { i: Phone, l: "Teléfono", v: selected.phone || "+51 987 100 200" },
                        { i: Calendar, l: "Fecha de nacimiento", v: selected.birthDate || "12 Ago 2010" },
                        { i: MapPin, l: "Dirección", v: selected.address || "Pariamarca" },
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
                        <Avatar className="w-9 h-9"><AvatarFallback>AP</AvatarFallback></Avatar>
                        <div>
                          <div className="text-sm">{selected.parentName || "Manuel Quispe Choque"}</div>
                          <div className="text-xs text-slate-500">Padre · {selected.parentPhone || "+51 987 555 444"}</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="academic" className="pt-6 space-y-3">
                    {[
                      { p: "Bimestre I 2026", avg: (selected.avg - 0.3).toFixed(1) },
                      { p: "Bimestre II 2026", avg: selected.avg },
                      { p: "Año 2025", avg: (selected.avg - 0.7).toFixed(1) },
                      { p: "Año 2024", avg: (selected.avg - 1.2).toFixed(1) },
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
                        <Button variant="ghost" size="sm" onClick={() => simulateDownload(f)} disabled={downloading}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          ) : (
            <div className="p-12 text-center text-slate-400">Selecciona un alumno de la lista para ver su perfil</div>
          )}
        </Card>
      </div>

      {/* Modal registrar alumno */}
      <Dialog open={open} onOpenChange={(v) => { if (!loading) setOpen(v); }}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={handleCreate}>
            <DialogHeader>
              <DialogTitle>Matricular nuevo estudiante</DialogTitle>
              <DialogDescription>Registra la información del alumno y vincula su apoderado.</DialogDescription>
            </DialogHeader>
            <div className="grid sm:grid-cols-2 gap-4 py-4">
              <div className="sm:col-span-2">
                <Label>Nombre Completo <span className="text-red-500">*</span></Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Sofía Quispe Mamani" className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Grado y Sección</Label>
                <Select value={grade} onValueChange={setGrade} disabled={loading}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1° A · Secundaria">1° A · Secundaria</SelectItem>
                    <SelectItem value="2° A · Secundaria">2° A · Secundaria</SelectItem>
                    <SelectItem value="3° A · Secundaria">3° A · Secundaria</SelectItem>
                    <SelectItem value="4° A · Secundaria">4° A · Secundaria</SelectItem>
                    <SelectItem value="5° A · Secundaria">5° A · Secundaria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Estado de rendimiento</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as any)} disabled={loading}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Destacado">Destacado</SelectItem>
                    <SelectItem value="Riesgo">Riesgo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Promedio Inicial (0-20)</Label>
                <Input type="number" min="0" max="20" step="0.1" value={avg} onChange={(e) => setAvg(e.target.value)} className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Porcentaje de asistencia inicial (0-100)</Label>
                <Input type="number" min="0" max="100" value={attendance} onChange={(e) => setAttendance(e.target.value)} className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Correo</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alumno@edugestion360.edu.pe" className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+51 ..." className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Fecha de nacimiento</Label>
                <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Dirección</Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Calle ..." className="mt-1.5" disabled={loading} />
              </div>
              <div className="sm:col-span-2 border-t border-slate-100 pt-3 mt-2">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">Información del apoderado</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre Apoderado</Label>
                    <Input value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="Manuel Quispe" className="mt-1.5" disabled={loading} />
                  </div>
                  <div>
                    <Label>Teléfono Apoderado</Label>
                    <Input value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} placeholder="+51 ..." className="mt-1.5" disabled={loading} />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancelar</Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                {loading ? "Matriculando..." : "Matricular"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal editar alumno */}
      <Dialog open={editOpen} onOpenChange={(v) => { if (!loading) setEditOpen(v); }}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={handleEdit}>
            <DialogHeader>
              <DialogTitle>Editar datos del estudiante</DialogTitle>
              <DialogDescription>Actualiza el perfil del estudiante.</DialogDescription>
            </DialogHeader>
            <div className="grid sm:grid-cols-2 gap-4 py-4">
              <div className="sm:col-span-2">
                <Label>Nombre Completo <span className="text-red-500">*</span></Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Grado y Sección</Label>
                <Select value={grade} onValueChange={setGrade} disabled={loading}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1° A · Secundaria">1° A · Secundaria</SelectItem>
                    <SelectItem value="2° A · Secundaria">2° A · Secundaria</SelectItem>
                    <SelectItem value="3° A · Secundaria">3° A · Secundaria</SelectItem>
                    <SelectItem value="4° A · Secundaria">4° A · Secundaria</SelectItem>
                    <SelectItem value="5° A · Secundaria">5° A · Secundaria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Estado de rendimiento</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as any)} disabled={loading}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Destacado">Destacado</SelectItem>
                    <SelectItem value="Riesgo">Riesgo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Promedio general (0-20)</Label>
                <Input type="number" min="0" max="20" step="0.1" value={avg} onChange={(e) => setAvg(e.target.value)} className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Porcentaje de asistencia (0-100)</Label>
                <Input type="number" min="0" max="100" value={attendance} onChange={(e) => setAttendance(e.target.value)} className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Correo</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Fecha de nacimiento</Label>
                <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Dirección</Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1.5" disabled={loading} />
              </div>
              <div className="sm:col-span-2 border-t border-slate-100 pt-3 mt-2">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">Información del apoderado</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre Apoderado</Label>
                    <Input value={parentName} onChange={(e) => setParentName(e.target.value)} className="mt-1.5" disabled={loading} />
                  </div>
                  <div>
                    <Label>Teléfono Apoderado</Label>
                    <Input value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} className="mt-1.5" disabled={loading} />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)} disabled={loading}>Cancelar</Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                {loading ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

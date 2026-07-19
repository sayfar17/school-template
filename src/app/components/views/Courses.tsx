import { useState } from "react";
import { Plus, BookOpen, Users, Clock, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useMockStore, Course } from "./mockStore";

const paletteColors = [
  { name: "Azul", value: "bg-blue-500" },
  { name: "Esmeralda", value: "bg-emerald-500" },
  { name: "Violeta", value: "bg-violet-500" },
  { name: "Ámbar", value: "bg-amber-500" },
  { name: "Rosa", value: "bg-rose-500" },
  { name: "Índigo", value: "bg-indigo-500" },
  { name: "Cian", value: "bg-cyan-500" },
  { name: "Fucsia", value: "bg-pink-500" },
];

export function Courses() {
  const { courses, setCourses, teachers, logActivity } = useMockStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Secundaria");
  const [teacher, setTeacher] = useState(teachers[0]?.name || "Carlos Mendoza");
  const [studentsCount, setStudentsCount] = useState("30");
  const [hours, setHours] = useState("4");
  const [color, setColor] = useState("bg-blue-500");

  const resetForm = () => {
    setName("");
    setLevel("Secundaria");
    setTeacher(teachers[0]?.name || "Carlos Mendoza");
    setStudentsCount("30");
    setHours("4");
    setColor("bg-blue-500");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Por favor ingresa el nombre del curso");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const newCourse: Course = {
        name,
        level,
        teacher,
        students: parseInt(studentsCount) || 30,
        hours: parseInt(hours) || 4,
        color,
      };

      setCourses((prev) => [...prev, newCourse]);
      logActivity("Administrador", `registró el curso de ${name} con el docente ${teacher}`);
      toast.success("Curso creado correctamente");
      setLoading(false);
      setOpen(false);
      resetForm();
    }, 1000);
  };

  const handleDelete = (courseName: string) => {
    if (confirm(`¿Estás seguro de eliminar el curso ${courseName}?`)) {
      setCourses((prev) => prev.filter((c) => c.name !== courseName));
      logActivity("Administrador", `eliminó el curso ${courseName}`);
      toast.success("Curso eliminado");
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="grid">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="grid">Cards</TabsTrigger>
            <TabsTrigger value="table">Tabla</TabsTrigger>
            <TabsTrigger value="calendar">Calendario</TabsTrigger>
          </TabsList>
          <Button onClick={() => { resetForm(); setOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />Nuevo curso
          </Button>
        </div>

        <TabsContent value="grid" className="pt-5">
          {courses.length === 0 ? (
            <div className="text-center py-10 text-slate-400">No hay cursos registrados</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {courses.map((c) => (
                <Card key={c.name} className="border-slate-200 hover:shadow-md transition overflow-hidden relative group">
                  <div className={`h-2 ${c.color}`} />
                  <CardContent className="p-5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 absolute top-4 right-4 transition"
                      onClick={() => handleDelete(c.name)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg ${c.color} text-white flex items-center justify-center`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <Badge variant="outline" className="mr-6">{c.level}</Badge>
                    </div>
                    <h3 className="mb-1 text-slate-900 font-medium">{c.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-[10px] bg-slate-100">{c.teacher[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-slate-500">{c.teacher}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.students} alumnos</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.hours}h/sem</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="table" className="pt-5">
          <Card className="border-slate-200">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="p-3">Curso</th>
                    <th className="p-3">Nivel</th>
                    <th className="p-3">Docente</th>
                    <th className="p-3">Alumnos</th>
                    <th className="p-3">Horas</th>
                    <th className="p-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-slate-400">No hay cursos registrados</td>
                    </tr>
                  ) : (
                    courses.map((c) => (
                      <tr key={c.name} className="border-t border-slate-100 hover:bg-slate-50 transition">
                        <td className="p-3 font-medium">{c.name}</td>
                        <td className="p-3"><Badge variant="outline">{c.level}</Badge></td>
                        <td className="p-3">{c.teacher}</td>
                        <td className="p-3">{c.students}</td>
                        <td className="p-3">{c.hours}h</td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(c.name)} className="text-red-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="pt-5">
          <Card className="border-slate-200">
            <CardContent className="p-6 text-center text-slate-500">
              Vista calendario académico — Próximo bimestre · 09 Jun al 11 Ago
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal nuevo curso */}
      <Dialog open={open} onOpenChange={(v) => { if (!loading) setOpen(v); }}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleCreate}>
            <DialogHeader>
              <DialogTitle>Crear nuevo curso</DialogTitle>
              <DialogDescription>Añade un nuevo curso a la currícula escolar.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Nombre del Curso <span className="text-red-500">*</span></Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Física Elemental" className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Nivel Educativo</Label>
                <Select value={level} onValueChange={setLevel} disabled={loading}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Primaria">Primaria</SelectItem>
                    <SelectItem value="Secundaria">Secundaria</SelectItem>
                    <SelectItem value="Todos">Todos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Docente Asignado</Label>
                <Select value={teacher} onValueChange={setTeacher} disabled={loading}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {teachers.map((t) => (
                      <SelectItem key={t.name} value={t.name}>{t.name} ({t.spec})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>N° Alumnos aprox.</Label>
                  <Input type="number" min="5" max="500" value={studentsCount} onChange={(e) => setStudentsCount(e.target.value)} className="mt-1.5" disabled={loading} />
                </div>
                <div>
                  <Label>Horas semanales</Label>
                  <Input type="number" min="1" max="12" value={hours} onChange={(e) => setHours(e.target.value)} className="mt-1.5" disabled={loading} />
                </div>
              </div>
              <div>
                <Label>Color de Tarjeta</Label>
                <Select value={color} onValueChange={setColor} disabled={loading}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {paletteColors.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancelar</Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                {loading ? "Creando..." : "Crear curso"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

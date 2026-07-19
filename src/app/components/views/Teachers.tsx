import { useState } from "react";
import { Plus, Search, Mail, Phone, Star, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { useMockStore, Teacher } from "./mockStore";

export function Teachers() {
  const { teachers, setTeachers, logActivity } = useMockStore();
  const [q, setQ] = useState("");
  const [selectedTeacherName, setSelectedTeacherName] = useState(teachers[0]?.name || "Carlos Mendoza");

  // Dialog state
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [spec, setSpec] = useState("Matemática");
  const [courses, setCourses] = useState("4");
  const [hours, setHours] = useState("20");
  const [rating, setRating] = useState("4.8");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(q.toLowerCase()) ||
    t.spec.toLowerCase().includes(q.toLowerCase())
  );

  const resetForm = () => {
    setName("");
    setSpec("Matemática");
    setCourses("4");
    setHours("20");
    setRating("4.8");
    setEmail("");
    setPhone("");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const nextNum = teachers.length + 1;
      const newTeacher: Teacher = {
        name,
        spec,
        courses: parseInt(courses) || 3,
        hours: parseInt(hours) || 20,
        rating: parseFloat(rating) || 4.5,
        img: `https://images.unsplash.com/photo-${1573497019940 + nextNum}?w=200&q=80`,
        email: email || `${name.toLowerCase().replace(/ /g, ".")}@edugestion360.edu.pe`,
        phone: phone || "+51 987 555 111",
      };

      setTeachers((prev) => [...prev, newTeacher]);
      setSelectedTeacherName(newTeacher.name);
      logActivity("Administrador", `registró al docente ${name} (${spec})`);
      toast.success("Docente registrado con éxito");
      setLoading(false);
      setOpen(false);
      resetForm();
    }, 1000);
  };

  const handleDelete = (teacher: Teacher, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selecting the card when clicking delete
    if (confirm(`¿Estás seguro de que deseas dar de baja al docente ${teacher.name}?`)) {
      setTeachers((prev) => prev.filter((t) => t.name !== teacher.name));
      logActivity("Administrador", `retiró al docente ${teacher.name}`);
      toast.success("Docente dado de baja");
      if (selectedTeacherName === teacher.name) {
        setSelectedTeacherName(teachers.find((t) => t.name !== teacher.name)?.name || "");
      }
    }
  };

  const selectedTeacher = teachers.find((t) => t.name === selectedTeacherName) || teachers[0];

  // Dynamically generate schedule based on the selected teacher's specialty
  const getDynamicSchedule = (teacherSpec: string) => {
    const defaultSpec = teacherSpec || "Matemática";
    const shortSpec = defaultSpec.slice(0, 4);
    return [
      { day: "Lun", blocks: [`${shortSpec} 5A`, `${shortSpec} 5B`, "—", `${shortSpec} 4A`, "Refuerzo"] },
      { day: "Mar", blocks: [`${shortSpec} 5A`, "—", `${shortSpec} 4B`, `${shortSpec} 4A`, "—"] },
      { day: "Mié", blocks: [`${shortSpec} 5B`, `${shortSpec} 5A`, "—", "—", "Reunión"] },
      { day: "Jue", blocks: [`${shortSpec} 4A`, `${shortSpec} 4B`, `${shortSpec} 5A`, "—", "—"] },
      { day: "Vie", blocks: ["—", `${shortSpec} 5B`, `${shortSpec} 4B`, "—", "Refuerzo"] },
    ];
  };

  const schedule = selectedTeacher ? getDynamicSchedule(selectedTeacher.spec) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar docente..."
            className="pl-10"
          />
        </div>
        <Button onClick={() => { resetForm(); setOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />Nuevo docente
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-3 text-center py-10 text-slate-400">
            No se encontraron docentes coincidentes
          </div>
        ) : (
          filtered.map((t) => {
            const active = selectedTeacherName === t.name;
            return (
              <Card
                key={t.name}
                onClick={() => setSelectedTeacherName(t.name)}
                className={`border-slate-200 hover:shadow-md transition cursor-pointer relative group ${
                  active ? "ring-2 ring-blue-500 bg-blue-50/20" : ""
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={t.img} />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{t.name}</div>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mt-1">{t.spec}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 absolute top-2 right-2 transition"
                      onClick={(e) => handleDelete(t, e)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div className="rounded-lg bg-slate-50 p-2">
                      <div className="text-lg">{t.courses}</div>
                      <div className="text-xs text-slate-500">Cursos</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2">
                      <div className="text-lg">{t.hours}h</div>
                      <div className="text-xs text-slate-500">Semana</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 flex flex-col items-center">
                      <div className="text-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {t.rating}
                      </div>
                      <div className="text-xs text-slate-500">Rating</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      {t.email || `${t.name.toLowerCase().replace(/ /g, ".")}@edugestion360.edu.pe`}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {t.phone || "+51 987 555 111"}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span>Rendimiento de aulas</span>
                      <span>{Math.round(t.rating * 18)}%</span>
                    </div>
                    <Progress value={t.rating * 18} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {selectedTeacher && (
        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3>Horario semanal — {selectedTeacher.name}</h3>
                <p className="text-sm text-slate-500">Cursos y bloques asignados en {selectedTeacher.spec}</p>
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
                    <tr key={d.day} className="border-t border-slate-100">
                      <td className="p-2 text-slate-500 font-medium">{d.day}</td>
                      {d.blocks.map((b, i) => (
                        <td key={i} className="p-2">
                          {b === "—" ? (
                            <span className="text-slate-300">—</span>
                          ) : (
                            <span className="inline-block px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                              {b}
                            </span>
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
      )}

      {/* Modal registrar docente */}
      <Dialog open={open} onOpenChange={(v) => { if (!loading) setOpen(v); }}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleCreate}>
            <DialogHeader>
              <DialogTitle>Registrar nuevo docente</DialogTitle>
              <DialogDescription>Añade los datos de la ficha profesional del docente.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Nombre Completo <span className="text-red-500">*</span></Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Carlos Mendoza" className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Especialidad / Curso principal</Label>
                <Select value={spec} onValueChange={setSpec} disabled={loading}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Matemática">Matemática</SelectItem>
                    <SelectItem value="Comunicación">Comunicación</SelectItem>
                    <SelectItem value="Biología">Biología</SelectItem>
                    <SelectItem value="Inglés">Inglés</SelectItem>
                    <SelectItem value="Historia">Historia</SelectItem>
                    <SelectItem value="Arte y Música">Arte y Música</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>N° Cursos</Label>
                  <Input type="number" min="1" max="10" value={courses} onChange={(e) => setCourses(e.target.value)} className="mt-1.5" disabled={loading} />
                </div>
                <div>
                  <Label>Horas/Sem.</Label>
                  <Input type="number" min="1" max="40" value={hours} onChange={(e) => setHours(e.target.value)} className="mt-1.5" disabled={loading} />
                </div>
                <div>
                  <Label>Rating (0-5)</Label>
                  <Input type="number" min="0" max="5" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} className="mt-1.5" disabled={loading} />
                </div>
              </div>
              <div>
                <Label>Correo electrónico</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="c.mendoza@edugestion360.edu.pe" className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+51 ..." className="mt-1.5" disabled={loading} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancelar</Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                {loading ? "Registrando..." : "Registrar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

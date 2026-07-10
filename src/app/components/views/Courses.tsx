import { Plus, BookOpen, Users, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

const courses = [
  { name: "Matemática", level: "Secundaria", teacher: "Carlos Mendoza", students: 142, hours: 8, color: "bg-blue-500" },
  { name: "Comunicación", level: "Secundaria", teacher: "Laura Vega", students: 138, hours: 6, color: "bg-emerald-500" },
  { name: "Ciencia y Tecnología", level: "Secundaria", teacher: "Pedro Soto", students: 145, hours: 6, color: "bg-violet-500" },
  { name: "Inglés", level: "Todos", teacher: "Ana Pérez", students: 320, hours: 4, color: "bg-amber-500" },
  { name: "Historia y Geografía", level: "Secundaria", teacher: "Jorge Torres", students: 140, hours: 5, color: "bg-rose-500" },
  { name: "Arte y Música", level: "Secundaria", teacher: "Mónica Salas", students: 180, hours: 3, color: "bg-indigo-500" },
  { name: "Educación Física", level: "Todos", teacher: "Luis Aranda", students: 250, hours: 4, color: "bg-cyan-500" },
  { name: "Computación", level: "Secundaria", teacher: "Karla Núñez", students: 110, hours: 3, color: "bg-pink-500" },
];

export function Courses() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="grid">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="grid">Cards</TabsTrigger>
            <TabsTrigger value="table">Tabla</TabsTrigger>
            <TabsTrigger value="calendar">Calendario</TabsTrigger>
          </TabsList>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Plus className="w-4 h-4 mr-2" />Nuevo curso</Button>
        </div>

        <TabsContent value="grid" className="pt-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {courses.map((c) => (
              <Card key={c.name} className="border-slate-200 hover:shadow-md transition overflow-hidden">
                <div className={`h-2 ${c.color}`} />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${c.color} text-white flex items-center justify-center`}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <Badge variant="outline">{c.level}</Badge>
                  </div>
                  <h3 className="mb-1">{c.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Avatar className="w-6 h-6"><AvatarFallback className="text-[10px] bg-slate-100">{c.teacher[0]}</AvatarFallback></Avatar>
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
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.name} className="border-t border-slate-100">
                      <td className="p-3">{c.name}</td>
                      <td className="p-3"><Badge variant="outline">{c.level}</Badge></td>
                      <td className="p-3">{c.teacher}</td>
                      <td className="p-3">{c.students}</td>
                      <td className="p-3">{c.hours}h</td>
                    </tr>
                  ))}
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
    </div>
  );
}

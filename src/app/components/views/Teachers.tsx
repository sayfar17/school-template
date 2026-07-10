import { Plus, Search, Mail, Phone, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";

const teachers = [
  { name: "Carlos Mendoza", spec: "Matemática", courses: 4, hours: 22, rating: 4.8, img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80" },
  { name: "Laura Vega", spec: "Comunicación", courses: 3, hours: 18, rating: 4.9, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80" },
  { name: "Pedro Soto", spec: "CTA (Biología)", courses: 5, hours: 24, rating: 4.6, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
  { name: "Ana Pérez", spec: "Inglés", courses: 6, hours: 26, rating: 4.7, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
  { name: "Jorge Torres", spec: "Historia y Sociales", courses: 4, hours: 20, rating: 4.5, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
  { name: "Mónica Salas", spec: "Arte y Música", courses: 3, hours: 16, rating: 4.9, img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80" },
];

const schedule = [
  { day: "Lun", blocks: ["Mate 5A", "Mate 5B", "—", "Mate 4A", "Refuerzo"] },
  { day: "Mar", blocks: ["Mate 5A", "—", "Mate 4B", "Mate 4A", "—"] },
  { day: "Mié", blocks: ["Mate 5B", "Mate 5A", "—", "—", "Reunión"] },
  { day: "Jue", blocks: ["Mate 4A", "Mate 4B", "Mate 5A", "—", "—"] },
  { day: "Vie", blocks: ["—", "Mate 5B", "Mate 4B", "—", "Refuerzo"] },
];

export function Teachers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Buscar docente..." className="pl-10" />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Plus className="w-4 h-4 mr-2" />Nuevo docente</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map((t) => (
          <Card key={t.name} className="border-slate-200 hover:shadow-md transition">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={t.img} />
                  <AvatarFallback>{t.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div>{t.name}</div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mt-1">{t.spec}</Badge>
                </div>
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
                  <div className="text-lg flex items-center gap-1"><Star className="w-3 h-3 fill-amber-500 text-amber-500" />{t.rating}</div>
                  <div className="text-xs text-slate-500">Rating</div>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {t.name.toLowerCase().replace(/ /g, ".")}@edugestion360.edu.pe</div>
                <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> +51 987 ··· ···</div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span>Rendimiento de aulas</span><span>{Math.round(t.rating * 18)}%</span>
                </div>
                <Progress value={t.rating * 18} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3>Horario semanal — Carlos Mendoza</h3>
              <p className="text-sm text-slate-500">Cursos y bloques asignados</p>
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
                    <td className="p-2 text-slate-500">{d.day}</td>
                    {d.blocks.map((b, i) => (
                      <td key={i} className="p-2">
                        {b === "—" ? (
                          <span className="text-slate-300">—</span>
                        ) : (
                          <span className="inline-block px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs">{b}</span>
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
    </div>
  );
}

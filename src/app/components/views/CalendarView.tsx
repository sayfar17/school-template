import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { useMockStore, CalendarEvent } from "./mockStore";

type Cat = "exam" | "meet" | "act" | "hol" | "evt";
const catColor: Record<Cat, string> = {
  exam: "bg-red-500",
  meet: "bg-blue-500",
  act: "bg-emerald-500",
  hol: "bg-amber-500",
  evt: "bg-violet-500",
};
const catLabel: Record<Cat, string> = {
  exam: "Examen",
  meet: "Reunión",
  act: "Actividad",
  hol: "Feriado",
  evt: "Institucional",
};

interface MonthData {
  name: string;
  days: number;
  startDay: number; // 0 for Mon, 1 for Tue... 6 for Sun
}

const monthsList: MonthData[] = [
  { name: "Mayo 2026", days: 31, startDay: 4 }, // starts on Fri
  { name: "Junio 2026", days: 30, startDay: 0 }, // starts on Mon
  { name: "Julio 2026", days: 31, startDay: 2 }, // starts on Wed
  { name: "Agosto 2026", days: 31, startDay: 5 }, // starts on Sat
];

export function CalendarView() {
  const { events, setEvents, logActivity } = useMockStore();
  const [view, setView] = useState<"month" | "week" | "agenda">("month");

  // Navigation state
  const [monthIndex, setMonthIndex] = useState(1); // Junio 2026 is index 1
  const currentMonthData = monthsList[monthIndex] || monthsList[1];
  const currentMonthName = currentMonthData.name;

  // Dialog state
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [dateStr, setDateStr] = useState("2026-06-15");
  const [category, setCategory] = useState<Cat>("exam");

  const handlePrevMonth = () => {
    if (monthIndex > 0) setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    if (monthIndex < monthsList.length - 1) setMonthIndex(monthIndex + 1);
  };

  const resetForm = () => {
    setTitle("");
    setDateStr("2026-06-15");
    setCategory("exam");
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dateStr) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Parse day and month from dateStr (format: YYYY-MM-DD)
      const parts = dateStr.split("-");
      const day = parseInt(parts[2]) || 1;
      const monthNum = parseInt(parts[1]) || 6;
      const year = parts[0] || "2026";

      const spanishMonths = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      const parsedMonthName = `${spanishMonths[monthNum - 1]} ${year}`;

      const newEvent: CalendarEvent = {
        day,
        month: parsedMonthName,
        t: title,
        c: category,
      };

      setEvents((prev) => [...prev, newEvent]);
      logActivity("Administrador", `añadió el evento "${title}" al calendario`);
      toast.success("Evento calendarizado correctamente");

      // Automatically jump to the month of the created event
      const foundIdx = monthsList.findIndex((m) => m.name.toLowerCase() === parsedMonthName.toLowerCase());
      if (foundIdx !== -1) {
        setMonthIndex(foundIdx);
      }

      setLoading(false);
      setOpen(false);
      resetForm();
    }, 1000);
  };

  const handleDeleteEvent = (evt: CalendarEvent) => {
    if (confirm(`¿Estás seguro de eliminar el evento "${evt.t}"?`)) {
      setEvents((prev) => prev.filter((e) => !(e.day === evt.day && e.month === evt.month && e.t === evt.t)));
      logActivity("Administrador", `eliminó el evento "${evt.t}"`);
      toast.success("Evento eliminado");
    }
  };

  // Filter events matching the selected month
  const currentMonthEvents = events.filter(
    (e) => e.month.toLowerCase() === currentMonthName.toLowerCase()
  );

  // Group events by day for the calendar grid
  const eventsByDay: Record<number, CalendarEvent[]> = {};
  currentMonthEvents.forEach((e) => {
    if (!eventsByDay[e.day]) eventsByDay[e.day] = [];
    eventsByDay[e.day].push(e);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={handlePrevMonth} disabled={monthIndex === 0}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-slate-900 font-semibold">{currentMonthName}</h2>
          <Button variant="outline" size="icon" onClick={handleNextMonth} disabled={monthIndex === monthsList.length - 1}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setMonthIndex(1)}>Hoy (Junio)</Button>
        </div>
        <div className="flex gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as any)}>
            <TabsList>
              <TabsTrigger value="month">Mes</TabsTrigger>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => { resetForm(); setOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />Nuevo evento
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 border-slate-200">
          <CardContent className="p-5">
            <div className="grid grid-cols-7 text-xs text-slate-500 mb-2 font-medium">
              {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
                <div key={d} className="px-2 py-1.5 text-center">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: currentMonthData.startDay }).map((_, i) => (
                <div key={`pre${i}`} className="min-h-[88px] bg-slate-50/50 rounded-lg border border-slate-100/50" />
              ))}
              {Array.from({ length: currentMonthData.days }, (_, i) => i + 1).map((d) => {
                const evs = eventsByDay[d] || [];
                const isToday = currentMonthName === "Junio 2026" && d === 28;
                return (
                  <div
                    key={d}
                    className={`min-h-[88px] rounded-lg border p-1.5 text-xs transition ${
                      isToday ? "border-blue-500 bg-blue-50/50" : "border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`text-right font-medium ${isToday ? "text-blue-700" : "text-slate-500"}`}>{d}</div>
                    <div className="space-y-1 mt-1">
                      {evs.map((e, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            toast(
                              <div className="flex flex-col gap-1.5 py-0.5">
                                <span className="font-semibold text-slate-900">{e.t}</span>
                                <span className="text-xs text-slate-500">Fecha: {e.day} de {e.month}</span>
                                <Badge className={`w-fit text-[10px] text-white hover:opacity-90 ${catColor[e.c]}`}>{catLabel[e.c]}</Badge>
                                <Button variant="destructive" size="sm" onClick={() => { handleDeleteEvent(e); toast.dismiss(); }} className="h-7 mt-1.5 w-full flex items-center justify-center gap-1.5 text-xs">
                                  <Trash2 className="w-3.5 h-3.5" /> Eliminar Evento
                                </Button>
                              </div>,
                              { duration: 4000 }
                            );
                          }}
                          className={`px-1.5 py-0.5 rounded text-white text-[10px] truncate cursor-pointer hover:opacity-90 transition ${catColor[e.c]}`}
                        >
                          {e.t}
                        </div>
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
              <h3 className="mb-4">Categorías</h3>
              <ul className="space-y-2">
                {(Object.keys(catColor) as Cat[]).map((c) => (
                  <li key={c} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded ${catColor[c]}`} />
                      <span className="text-sm font-medium text-slate-700">{catLabel[c]}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-5">
              <h3 className="mb-4">Próximos del mes</h3>
              <ul className="space-y-3">
                {currentMonthEvents.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-400">No hay eventos este mes</div>
                ) : (
                  currentMonthEvents.slice(0, 6).map((e, i) => (
                    <li key={`${e.day}-${i}`} className="flex items-start gap-3 group relative">
                      <div className={`w-1 self-stretch rounded ${catColor[e.c]}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800 truncate">{e.t}</div>
                        <div className="text-xs text-slate-500">{e.day} {currentMonthName.split(" ")[0]} 2026</div>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(e)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-50 p-1 rounded transition self-center"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal registrar evento */}
      <Dialog open={open} onOpenChange={(v) => { if (!loading) setOpen(v); }}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleCreateEvent}>
            <DialogHeader>
              <DialogTitle>Programar nuevo evento</DialogTitle>
              <DialogDescription>Asigna una fecha, título y categoría al evento.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Título del Evento <span className="text-red-500">*</span></Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Reunión de coordinación" className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Fecha <span className="text-red-500">*</span></Label>
                <Input type="date" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Categoría</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as Cat)} disabled={loading}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(Object.keys(catLabel) as Cat[]).map((c) => (
                      <SelectItem key={c} value={c}>{catLabel[c]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancelar</Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                {loading ? "Programando..." : "Programar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

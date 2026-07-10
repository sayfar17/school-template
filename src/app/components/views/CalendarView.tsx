import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

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

const events: Record<number, { t: string; c: Cat }[]> = {
  3: [{ t: "Día del trabajo", c: "hol" }],
  6: [{ t: "Feria de Ciencias", c: "act" }],
  9: [{ t: "Examen bimestral", c: "exam" }],
  12: [{ t: "Aniversario", c: "evt" }],
  15: [{ t: "Reunión padres 5°", c: "meet" }, { t: "Salida Secundaria", c: "act" }],
  20: [{ t: "Día del logro", c: "evt" }],
  24: [{ t: "Examen ciencias", c: "exam" }],
  28: [{ t: "Reunión docentes", c: "meet" }],
};

export function CalendarView() {
  const [view, setView] = useState<"month" | "week" | "agenda">("month");
  const daysInMonth = 30;
  const startDay = 1; // Lun

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon"><ChevronLeft className="w-4 h-4" /></Button>
          <h2>Junio 2026</h2>
          <Button variant="outline" size="icon"><ChevronRight className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm">Hoy</Button>
        </div>
        <div className="flex gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as any)}>
            <TabsList>
              <TabsTrigger value="month">Mes</TabsTrigger>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Plus className="w-4 h-4 mr-2" />Nuevo evento</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 border-slate-200">
          <CardContent className="p-5">
            <div className="grid grid-cols-7 text-xs text-slate-500 mb-2">
              {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
                <div key={d} className="px-2 py-1.5">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startDay }).map((_, i) => <div key={`pre${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                const evs = events[d] || [];
                const today = d === 28;
                return (
                  <div
                    key={d}
                    className={`min-h-[88px] rounded-lg border p-1.5 text-xs ${
                      today ? "border-blue-500 bg-blue-50" : "border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`text-right ${today ? "text-blue-700" : "text-slate-500"}`}>{d}</div>
                    <div className="space-y-1 mt-1">
                      {evs.map((e, i) => (
                        <div key={i} className={`px-1.5 py-0.5 rounded text-white text-[10px] truncate ${catColor[e.c]}`}>
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
                  <li key={c} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded ${catColor[c]}`} />
                      <span className="text-sm">{catLabel[c]}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-5">
              <h3 className="mb-4">Próximos</h3>
              <ul className="space-y-3">
                {Object.entries(events).flatMap(([day, list]) =>
                  list.map((e, i) => (
                    <li key={`${day}-${i}`} className="flex items-start gap-3">
                      <div className={`w-1 self-stretch rounded ${catColor[e.c]}`} />
                      <div>
                        <div className="text-sm">{e.t}</div>
                        <div className="text-xs text-slate-500">{day} Jun 2026</div>
                      </div>
                    </li>
                  ))
                ).slice(0, 6)}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

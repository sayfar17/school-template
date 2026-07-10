import { Plus, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const grades = [
  { level: "Secundaria", sections: ["1°", "2°", "3°", "4°", "5°"], students: 50 },
];

export function Grades() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Plus className="w-4 h-4 mr-2" />Nuevo grado</Button>
      </div>

      <div className="space-y-6">
        {grades.map((g) => (
          <Card key={g.level} className="border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3>{g.level}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3" /> {g.students} estudiantes
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{g.sections.length} grados</Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {g.sections.map((s) => (
                  <div key={s} className="rounded-lg border border-slate-200 p-4 hover:border-blue-300 hover:shadow-sm transition">
                    <div className="text-lg">{s}</div>
                    <div className="text-xs text-slate-500 mt-1">Secciones A</div>
                    <div className="mt-3 flex -space-x-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 ring-2 ring-white" />
                      ))}
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-[10px] flex items-center justify-center ring-2 ring-white text-slate-600">+10</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

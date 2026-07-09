import { Plus, Search, Phone, Mail, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const parents = [
  { name: "Manuel Quispe", dni: "10123456", email: "m.quispe@gmail.com", phone: "+51 987 555 444", kids: 1, status: "Al día" },
  { name: "Carmen Soto", dni: "10987654", email: "c.soto@gmail.com", phone: "+51 987 333 222", kids: 2, status: "Al día" },
  { name: "Roberto Cruz", dni: "11222333", email: "r.cruz@gmail.com", phone: "+51 987 111 000", kids: 1, status: "Pendiente" },
  { name: "Diana Torres", dni: "12333444", email: "d.torres@gmail.com", phone: "+51 987 222 333", kids: 3, status: "Al día" },
  { name: "Andrés Flores", dni: "13444555", email: "a.flores@gmail.com", phone: "+51 987 666 777", kids: 1, status: "Vencido" },
];

const statusColor: Record<string, string> = {
  "Al día": "bg-emerald-100 text-emerald-700",
  Pendiente: "bg-amber-100 text-amber-700",
  Vencido: "bg-red-100 text-red-700",
};

export function Parents() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { l: "Familias activas", v: "820", c: "bg-blue-100 text-blue-600" },
          { l: "Hijos vinculados", v: "1,250", c: "bg-emerald-100 text-emerald-600" },
          { l: "Pagos pendientes", v: "24", c: "bg-amber-100 text-amber-600" },
        ].map((s) => (
          <Card key={s.l} className="border-slate-200">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${s.c} flex items-center justify-center`}>
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl">{s.v}</div>
                <div className="text-sm text-slate-500">{s.l}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Buscar padre/madre..." className="pl-10" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Plus className="w-4 h-4 mr-2" />Nuevo apoderado</Button>
          </div>

          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Apoderado</TableHead>
                  <TableHead>DNI</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Hijos</TableHead>
                  <TableHead>Estado pago</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parents.map((p) => (
                  <TableRow key={p.dni} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9"><AvatarFallback className="bg-amber-100 text-amber-700 text-xs">{p.name[0]}</AvatarFallback></Avatar>
                        <div>{p.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{p.dni}</TableCell>
                    <TableCell>
                      <div className="text-xs text-slate-600 space-y-0.5">
                        <div className="flex items-center gap-1"><Mail className="w-3 h-3" />{p.email}</div>
                        <div className="flex items-center gap-1"><Phone className="w-3 h-3" />{p.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{p.kids}</Badge></TableCell>
                    <TableCell><Badge className={`${statusColor[p.status]} hover:bg-current`}>{p.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

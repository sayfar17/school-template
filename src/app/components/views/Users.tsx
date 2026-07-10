import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Pencil,
  Trash2,
  KeyRound,
  Eye,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner";

const roles = ["Administrador", "Director", "Docente", "Padre", "Alumno", "Auxiliar"];
const roleColor: Record<string, string> = {
  Administrador: "bg-violet-100 text-violet-700",
  Director: "bg-blue-100 text-blue-700",
  Docente: "bg-emerald-100 text-emerald-700",
  Padre: "bg-amber-100 text-amber-700",
  Alumno: "bg-sky-100 text-sky-700",
  Auxiliar: "bg-slate-100 text-slate-700",
};

const initialUsers = [
  { id: 1, name: "María Rodríguez", email: "maria.r@edugestion360.edu.pe", dni: "45123456", role: "Administrador", active: true, phone: "+51 987 654 321" },
  { id: 2, name: "Carlos Mendoza", email: "c.mendoza@edugestion360.edu.pe", dni: "45987612", role: "Docente", active: true, phone: "+51 987 555 111" },
  { id: 3, name: "Laura Vega", email: "l.vega@edugestion360.edu.pe", dni: "44321987", role: "Director", active: true, phone: "+51 987 222 333" },
  { id: 4, name: "Pedro Soto", email: "p.soto@edugestion360.edu.pe", dni: "46555666", role: "Docente", active: false, phone: "+51 987 444 555" },
  { id: 5, name: "Ana Pérez", email: "a.perez@edugestion360.edu.pe", dni: "47888999", role: "Auxiliar", active: true, phone: "+51 987 666 777" },
  { id: 6, name: "Jorge Torres", email: "j.torres@gmail.com", dni: "48111222", role: "Padre", active: true, phone: "+51 987 888 999" },
  { id: 7, name: "Sofía Quispe", email: "s.quispe@edugestion360.edu.pe", dni: "78123456", role: "Alumno", active: true, phone: "+51 987 100 200" },
  { id: 8, name: "Diego Ramírez", email: "d.ramirez@gmail.com", dni: "48333444", role: "Padre", active: true, phone: "+51 987 300 400" },
];

export function UsersView() {
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [q, setQ] = useState("");

  const filtered = users.filter((u) => {
    const matchesFilter = filter === "Todos" || u.role === filter;
    const matchesQuery =
      u.name.toLowerCase().includes(q.toLowerCase()) ||
      u.email.toLowerCase().includes(q.toLowerCase()) ||
      u.dni.includes(q);
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Resumen por rol */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {roles.map((r) => {
          const count = users.filter((u) => u.role === r).length;
          return (
            <Card key={r} className="border-slate-200">
              <CardContent className="p-4">
                <Badge className={`${roleColor[r]} hover:bg-current mb-2`}>{r}</Badge>
                <div className="text-2xl">{count}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="Todos">Todos</TabsTrigger>
                {roles.map((r) => (
                  <TabsTrigger key={r} value={r}>{r}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar nombre, email, DNI..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
              <Button variant="outline"><Download className="w-4 h-4 mr-2" />Exportar</Button>
              <Button onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" /> Nuevo usuario
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>DNI</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u) => (
                  <TableRow key={u.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {u.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm">{u.name}</div>
                          <div className="text-xs text-slate-500">{u.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{u.dni}</TableCell>
                    <TableCell>
                      <Badge className={`${roleColor[u.role]} hover:bg-current`}>{u.role}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{u.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${u.active ? "bg-emerald-500" : "bg-slate-300"}`} />
                        <span className="text-sm">{u.active ? "Activo" : "Inactivo"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="w-4 h-4 mr-2" />Ver perfil</DropdownMenuItem>
                          <DropdownMenuItem><Pencil className="w-4 h-4 mr-2" />Editar</DropdownMenuItem>
                          <DropdownMenuItem><KeyRound className="w-4 h-4 mr-2" />Resetear contraseña</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setUsers(users.map((x) => x.id === u.id ? { ...x, active: !x.active } : x));
                              toast.success(`Usuario ${u.active ? "desactivado" : "activado"}`);
                            }}
                          >
                            {u.active ? "Desactivar" : "Activar"} cuenta
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
            <span>Mostrando {filtered.length} de {users.length} usuarios</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm">Anterior</Button>
              <Button variant="outline" size="sm" className="bg-blue-50 text-blue-700 border-blue-200">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Siguiente</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal nuevo usuario */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Registrar nuevo usuario</DialogTitle>
            <DialogDescription>Completa los datos del nuevo usuario y asigna un rol.</DialogDescription>
          </DialogHeader>
          <div className="grid sm:grid-cols-2 gap-4 py-2">
            <div><Label>Nombres</Label><Input placeholder="Juan Carlos" className="mt-1.5" /></div>
            <div><Label>Apellidos</Label><Input placeholder="Pérez García" className="mt-1.5" /></div>
            <div><Label>DNI</Label><Input placeholder="12345678" className="mt-1.5" /></div>
            <div><Label>Fecha de nacimiento</Label><Input type="date" className="mt-1.5" /></div>
            <div><Label>Correo</Label><Input type="email" placeholder="usuario@edugestion360.edu.pe" className="mt-1.5" /></div>
            <div><Label>Teléfono</Label><Input placeholder="+51 ..." className="mt-1.5" /></div>
            <div className="sm:col-span-2"><Label>Dirección</Label><Input placeholder="Av. Lima 123" className="mt-1.5" /></div>
            <div>
              <Label>Rol</Label>
              <Select>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Selecciona un rol" /></SelectTrigger>
                <SelectContent>
                  {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch defaultChecked id="active" />
              <Label htmlFor="active">Cuenta activa</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                toast.success("Usuario creado correctamente");
                setOpen(false);
              }}
            >
              Crear usuario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

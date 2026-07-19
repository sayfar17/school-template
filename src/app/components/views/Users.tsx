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

import { useMockStore, User } from "./mockStore";

export function UsersView() {
  const { users, setUsers, logActivity } = useMockStore();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [q, setQ] = useState("");

  // Form states
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState("Docente");
  const [active, setActive] = useState(true);

  // Selected User states
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState<number | null>(null);

  const filtered = users.filter((u) => {
    const matchesFilter = filter === "Todos" || u.role === filter;
    const matchesQuery =
      u.name.toLowerCase().includes(q.toLowerCase()) ||
      u.email.toLowerCase().includes(q.toLowerCase()) ||
      u.dni.includes(q);
    return matchesFilter && matchesQuery;
  });

  const resetForm = () => {
    setNames("");
    setLastNames("");
    setDni("");
    setEmail("");
    setPhone("");
    setSelectedRole("Docente");
    setActive(true);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!names || !lastNames || !dni || !email) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newUser: User = {
        id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: `${names} ${lastNames}`,
        email,
        dni,
        role: selectedRole as Role,
        active,
        phone: phone || "+51 987 000 000",
      };

      setUsers((prev) => [...prev, newUser]);
      logActivity(newUser.name, `registró una nueva cuenta (${newUser.role})`);
      toast.success("Usuario creado correctamente");
      setLoading(false);
      setOpen(false);
      resetForm();
    }, 1000);
  };

  const startEdit = (user: User) => {
    setEditingUser(user);
    const splitName = user.name.split(" ");
    setNames(splitName[0] || "");
    setLastNames(splitName.slice(1).join(" ") || "");
    setDni(user.dni);
    setEmail(user.email);
    setPhone(user.phone);
    setSelectedRole(user.role);
    setActive(user.active);
    setEditOpen(true);
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setLoading(true);
    setTimeout(() => {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                name: `${names} ${lastNames}`,
                email,
                dni,
                role: selectedRole as Role,
                active,
                phone,
              }
            : u
        )
      );
      logActivity(`${names} ${lastNames}`, `actualizó su perfil de usuario`);
      toast.success("Usuario actualizado correctamente");
      setLoading(false);
      setEditOpen(false);
      setEditingUser(null);
      resetForm();
    }, 1000);
  };

  const handleDeleteUser = (user: User) => {
    setActionId(user.id);
    setTimeout(() => {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      logActivity("Administrador", `eliminó la cuenta del usuario ${user.name}`);
      toast.success("Usuario eliminado de la base de datos");
      setActionId(null);
    }, 600);
  };

  const handleResetPassword = (user: User) => {
    setActionId(user.id);
    setTimeout(() => {
      toast.success(`Contraseña de ${user.name} reseteada a "demo1234"`);
      setActionId(null);
    }, 800);
  };

  const handleToggleStatus = (user: User) => {
    setActionId(user.id);
    setTimeout(() => {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u))
      );
      toast.success(`Cuenta de ${user.name} ${user.active ? "desactivada" : "activada"}`);
      setActionId(null);
    }, 500);
  };

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
              <Button variant="outline" onClick={() => {
                toast.promise(
                  new Promise((resolve) => setTimeout(resolve, 800)),
                  {
                    loading: "Generando reporte de usuarios...",
                    success: "Archivo usuarios_colegio.xlsx descargado",
                    error: "Error al generar reporte",
                  }
                );
              }}><Download className="w-4 h-4 mr-2" />Exportar</Button>
              <Button onClick={() => { resetForm(); setOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white">
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
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                      No se encontraron usuarios coincidentes
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((u) => (
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
                          <span className="text-sm">
                            {actionId === u.id ? "Actualizando..." : u.active ? "Activo" : "Inactivo"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={actionId === u.id}>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => { setViewingUser(u); setViewOpen(true); }}>
                              <Eye className="w-4 h-4 mr-2" />Ver perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => startEdit(u)}>
                              <Pencil className="w-4 h-4 mr-2" />Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleResetPassword(u)}>
                              <KeyRound className="w-4 h-4 mr-2" />Resetear contraseña
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(u)}>
                              {u.active ? "Desactivar" : "Activar"} cuenta
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(u)}>
                              <Trash2 className="w-4 h-4 mr-2" />Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
            <span>Mostrando {filtered.length} de {users.length} usuarios</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm">Anterior</Button>
              <Button variant="outline" size="sm" className="bg-blue-50 text-blue-700 border-blue-200">1</Button>
              <Button variant="outline" size="sm">Siguiente</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal nuevo usuario */}
      <Dialog open={open} onOpenChange={(v) => { if (!loading) setOpen(v); }}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={handleCreateUser}>
            <DialogHeader>
              <DialogTitle>Registrar nuevo usuario</DialogTitle>
              <DialogDescription>Completa los datos del nuevo usuario y asigna un rol.</DialogDescription>
            </DialogHeader>
            <div className="grid sm:grid-cols-2 gap-4 py-4">
              <div>
                <Label>Nombres <span className="text-red-500">*</span></Label>
                <Input value={names} onChange={(e) => setNames(e.target.value)} placeholder="Juan Carlos" className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Apellidos <span className="text-red-500">*</span></Label>
                <Input value={lastNames} onChange={(e) => setLastNames(e.target.value)} placeholder="Pérez García" className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>DNI <span className="text-red-500">*</span></Label>
                <Input value={dni} onChange={(e) => setDni(e.target.value)} placeholder="12345678" className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Fecha de nacimiento</Label>
                <Input type="date" className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Correo <span className="text-red-500">*</span></Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="usuario@edugestion360.edu.pe" className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+51 ..." className="mt-1.5" disabled={loading} />
              </div>
              <div className="sm:col-span-2">
                <Label>Dirección</Label>
                <Input placeholder="Av. Lima 123" className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Rol</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole} disabled={loading}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Selecciona un rol" /></SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch checked={active} onCheckedChange={setActive} id="active" disabled={loading} />
                <Label htmlFor="active">Cuenta activa</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancelar</Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
              >
                {loading ? "Registrando..." : "Crear usuario"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal editar usuario */}
      <Dialog open={editOpen} onOpenChange={(v) => { if (!loading) setEditOpen(v); }}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={handleEditUser}>
            <DialogHeader>
              <DialogTitle>Editar datos de usuario</DialogTitle>
              <DialogDescription>Modifica los campos del perfil seleccionado.</DialogDescription>
            </DialogHeader>
            <div className="grid sm:grid-cols-2 gap-4 py-4">
              <div>
                <Label>Nombres <span className="text-red-500">*</span></Label>
                <Input value={names} onChange={(e) => setNames(e.target.value)} className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Apellidos <span className="text-red-500">*</span></Label>
                <Input value={lastNames} onChange={(e) => setLastNames(e.target.value)} className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>DNI <span className="text-red-500">*</span></Label>
                <Input value={dni} onChange={(e) => setDni(e.target.value)} className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Fecha de nacimiento</Label>
                <Input type="date" className="mt-1.5" defaultValue="1990-05-15" disabled={loading} />
              </div>
              <div>
                <Label>Correo <span className="text-red-500">*</span></Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" disabled={loading} />
              </div>
              <div className="sm:col-span-2">
                <Label>Dirección</Label>
                <Input placeholder="Dirección guardada..." className="mt-1.5" disabled={loading} />
              </div>
              <div>
                <Label>Rol</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole} disabled={loading}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch checked={active} onCheckedChange={setActive} id="edit-active" disabled={loading} />
                <Label htmlFor="edit-active">Cuenta activa</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)} disabled={loading}>Cancelar</Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal ver perfil */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Información del usuario</DialogTitle>
          </DialogHeader>
          {viewingUser && (
            <div className="space-y-4 py-3">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">
                    {viewingUser.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{viewingUser.name}</h3>
                  <Badge className={`${roleColor[viewingUser.role]} mt-1`}>{viewingUser.role}</Badge>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-3 space-y-2.5 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">DNI:</span> <span className="font-medium">{viewingUser.dni}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Correo:</span> <span className="font-medium">{viewingUser.email}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Teléfono:</span> <span className="font-medium">{viewingUser.phone}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Estado:</span> <Badge variant={viewingUser.active ? "default" : "outline"} className={viewingUser.active ? "bg-emerald-500 hover:bg-emerald-600" : ""}>{viewingUser.active ? "Activo" : "Inactivo"}</Badge></div>
              </div>
              <DialogFooter className="pt-2">
                <Button onClick={() => setViewOpen(false)}>Cerrar</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState } from "react";
import { Plus, Search, Phone, Mail, Users, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { toast } from "sonner";
import { useMockStore, Parent } from "./mockStore";

const statusColor: Record<string, string> = {
  "Al día": "bg-emerald-100 text-emerald-700",
  Pendiente: "bg-amber-100 text-amber-700",
  Vencido: "bg-red-100 text-red-700",
};

export function Parents() {
  const { parents, setParents, logActivity } = useMockStore();
  const [q, setQ] = useState("");

  // Modal states
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [kids, setKids] = useState("1");
  const [status, setStatus] = useState<"Al día" | "Pendiente" | "Vencido">("Al día");

  const filtered = parents.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.dni.includes(q) ||
    p.email.toLowerCase().includes(q.toLowerCase())
  );

  const resetForm = () => {
    setName("");
    setDni("");
    setEmail("");
    setPhone("");
    setKids("1");
    setStatus("Al día");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dni || !email) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const newParent: Parent = {
        name,
        dni,
        email,
        phone: phone || "+51 987 000 000",
        kids: parseInt(kids) || 1,
        status,
      };
      setParents((prev) => [...prev, newParent]);
      logActivity("Administrador", `registró al apoderado ${name}`);
      toast.success("Apoderado registrado correctamente");
      setLoading(false);
      setOpen(false);
      resetForm();
    }, 1000);
  };

  const startEdit = (parent: Parent) => {
    setEditingParent(parent);
    setName(parent.name);
    setDni(parent.dni);
    setEmail(parent.email);
    setPhone(parent.phone);
    setKids(parent.kids.toString());
    setStatus(parent.status);
    setEditOpen(true);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingParent) return;
    setLoading(true);
    setTimeout(() => {
      setParents((prev) =>
        prev.map((p) =>
          p.dni === editingParent.dni
            ? {
                name,
                dni,
                email,
                phone,
                kids: parseInt(kids) || 1,
                status,
              }
            : p
        )
      );
      logActivity("Administrador", `actualizó los datos del apoderado ${name}`);
      toast.success("Datos del apoderado actualizados");
      setLoading(false);
      setEditOpen(false);
      setEditingParent(null);
      resetForm();
    }, 1000);
  };

  const handleDelete = (parent: Parent) => {
    if (confirm(`¿Estás seguro de eliminar a ${parent.name}?`)) {
      setParents((prev) => prev.filter((p) => p.dni !== parent.dni));
      logActivity("Administrador", `eliminó al apoderado ${parent.name}`);
      toast.success("Apoderado eliminado correctamente");
    }
  };

  // Stats calculations
  const familiesCount = parents.length;
  const kidsCount = parents.reduce((acc, p) => acc + p.kids, 0);
  const pendingCount = parents.filter((p) => p.status !== "Al día").length;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { l: "Familias activas", v: familiesCount.toString(), c: "bg-blue-100 text-blue-600" },
          { l: "Hijos vinculados", v: kidsCount.toString(), c: "bg-emerald-100 text-emerald-600" },
          { l: "Pagos pendientes", v: pendingCount.toString(), c: "bg-amber-100 text-amber-600" },
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
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar padre/madre..."
                className="pl-10"
              />
            </div>
            <Button onClick={() => { resetForm(); setOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />Nuevo apoderado
            </Button>
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
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-slate-400">
                      No se encontraron apoderados
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((p) => (
                    <TableRow key={p.dni} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9">
                            <AvatarFallback className="bg-amber-100 text-amber-700 text-xs">
                              {p.name[0]}
                            </AvatarFallback>
                          </Avatar>
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
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => startEdit(p)}>
                              <Pencil className="w-4 h-4 mr-2" />Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(p)}>
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
        </CardContent>
      </Card>

      {/* Modal nuevo apoderado */}
      <Dialog open={open} onOpenChange={(v) => { if (!loading) setOpen(v); }}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleCreate}>
            <DialogHeader>
              <DialogTitle>Registrar nuevo apoderado</DialogTitle>
              <DialogDescription>Añade los datos de contacto y el estado de la matrícula.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Nombre Completo <span className="text-red-500">*</span></Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Manuel Quispe" className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>DNI <span className="text-red-500">*</span></Label>
                <Input value={dni} onChange={(e) => setDni(e.target.value)} placeholder="10123456" className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Correo electrónico <span className="text-red-500">*</span></Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@gmail.com" className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Teléfono móvil</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+51 ..." className="mt-1.5" disabled={loading} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>N° de Hijos Matriculados</Label>
                  <Input type="number" min="1" max="10" value={kids} onChange={(e) => setKids(e.target.value)} className="mt-1.5" disabled={loading} />
                </div>
                <div>
                  <Label>Estado de pago</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as any)} disabled={loading}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Al día">Al día</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="Vencido">Vencido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

      {/* Modal editar apoderado */}
      <Dialog open={editOpen} onOpenChange={(v) => { if (!loading) setEditOpen(v); }}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleEdit}>
            <DialogHeader>
              <DialogTitle>Editar apoderado</DialogTitle>
              <DialogDescription>Modifica los datos del apoderado seleccionado.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Nombre Completo <span className="text-red-500">*</span></Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>DNI <span className="text-red-500">*</span></Label>
                <Input value={dni} onChange={(e) => setDni(e.target.value)} className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Correo electrónico <span className="text-red-500">*</span></Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" required disabled={loading} />
              </div>
              <div>
                <Label>Teléfono móvil</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" disabled={loading} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>N° de Hijos</Label>
                  <Input type="number" min="1" max="10" value={kids} onChange={(e) => setKids(e.target.value)} className="mt-1.5" disabled={loading} />
                </div>
                <div>
                  <Label>Estado de pago</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as any)} disabled={loading}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Al día">Al día</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="Vencido">Vencido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)} disabled={loading}>Cancelar</Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                {loading ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

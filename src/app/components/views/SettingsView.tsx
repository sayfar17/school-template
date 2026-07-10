import { Building2, Palette, Shield, Database, Bell, ImagePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { toast } from "sonner";

export function SettingsView() {
  const palette = ["#2563eb", "#0ea5e9", "#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="school">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full sm:w-auto">
          <TabsTrigger value="school"><Building2 className="w-4 h-4 mr-2" />Colegio</TabsTrigger>
          <TabsTrigger value="brand"><Palette className="w-4 h-4 mr-2" />Marca</TabsTrigger>
          <TabsTrigger value="security"><Shield className="w-4 h-4 mr-2" />Seguridad</TabsTrigger>
          <TabsTrigger value="backup"><Database className="w-4 h-4 mr-2" />Backups</TabsTrigger>
          <TabsTrigger value="notif"><Bell className="w-4 h-4 mr-2" />Notif.</TabsTrigger>
        </TabsList>

        <TabsContent value="school" className="pt-5">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <h3 className="mb-1">Información del colegio</h3>
              <p className="text-sm text-slate-500 mb-6">Datos institucionales mostrados en boletines y reportes.</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <Label>Logo institucional</Label>
                    <div className="mt-1.5 flex gap-2">
                      <Button variant="outline"><ImagePlus className="w-4 h-4 mr-2" />Subir logo</Button>
                      <Button variant="ghost">Quitar</Button>
                    </div>
                  </div>
                </div>
                <div><Label>Nombre</Label><Input defaultValue="Colegio Tupac Amaru" className="mt-1.5" /></div>
                <div><Label>Código modular</Label><Input defaultValue="1234567" className="mt-1.5" /></div>
                <div><Label>RUC</Label><Input defaultValue="20123456789" className="mt-1.5" /></div>
                <div><Label>Director</Label><Input defaultValue="Laura Vega" className="mt-1.5" /></div>
                <div className="sm:col-span-2"><Label>Dirección</Label><Input defaultValue="Pariamarca, Pasco, Perú" className="mt-1.5" /></div>
                <div className="sm:col-span-2"><Label>Misión</Label><Textarea rows={3} defaultValue="Brindar educación integral de excelencia..." className="mt-1.5" /></div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline">Cancelar</Button>
                <Button onClick={() => toast.success("Configuración guardada")} className="bg-blue-600 hover:bg-blue-700 text-white">Guardar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brand" className="pt-5">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <h3 className="mb-1">Identidad visual</h3>
              <p className="text-sm text-slate-500 mb-6">Personaliza colores del sistema.</p>
              <Label className="mb-3 block">Color primario</Label>
              <div className="flex gap-3 flex-wrap">
                {palette.map((c, i) => (
                  <button
                    key={c}
                    className={`w-12 h-12 rounded-xl ring-offset-2 ring-2 ${i === 0 ? "ring-slate-900" : "ring-transparent"}`}
                    style={{ background: c }}
                  />
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div>
                  <Label>Modo oscuro automático</Label>
                  <div className="mt-2 p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="text-sm">Habilitar modo oscuro según hora</span>
                    <Switch />
                  </div>
                </div>
                <div>
                  <Label>Tema compacto</Label>
                  <div className="mt-2 p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="text-sm">Reducir espaciado de tablas</span>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="pt-5">
          <Card className="border-slate-200">
            <CardContent className="p-6 space-y-4">
              <h3 className="mb-1">Seguridad y permisos</h3>
              <p className="text-sm text-slate-500 mb-4">Reglas de acceso al sistema.</p>
              {[
                { l: "Autenticación de dos factores (2FA)", d: "Requerida para todos los administradores" },
                { l: "Bloqueo tras 5 intentos fallidos", d: "Protección contra fuerza bruta" },
                { l: "Expiración de sesión 8 h", d: "Cierre automático por inactividad" },
                { l: "Forzar cambio de contraseña cada 90 días", d: "" },
              ].map((p, i) => (
                <div key={p.l} className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                  <div>
                    <div className="text-sm">{p.l}</div>
                    {p.d && <div className="text-xs text-slate-500">{p.d}</div>}
                  </div>
                  <Switch defaultChecked={i < 3} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="pt-5">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <h3 className="mb-1">Copias de seguridad</h3>
              <p className="text-sm text-slate-500 mb-6">Última copia: 28 May 2026 · 03:00 a.m.</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {["28 May", "27 May", "26 May", "25 May", "24 May", "23 May"].map((d) => (
                  <div key={d} className="p-4 rounded-lg border border-slate-200">
                    <div className="text-sm">Backup {d}</div>
                    <div className="text-xs text-slate-500">2.4 GB · 03:00 a.m.</div>
                    <Button variant="outline" size="sm" className="mt-2 w-full">Restaurar</Button>
                  </div>
                ))}
              </div>
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">Crear copia ahora</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notif" className="pt-5">
          <Card className="border-slate-200">
            <CardContent className="p-6 space-y-3">
              <h3 className="mb-1">Notificaciones</h3>
              <p className="text-sm text-slate-500 mb-4">Decide qué eventos recibir por email.</p>
              {[
                "Nuevo alumno matriculado",
                "Pagos pendientes",
                "Alertas de inasistencia",
                "Publicaciones programadas",
                "Reportes semanales",
              ].map((n, i) => (
                <div key={n} className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                  <span className="text-sm">{n}</span>
                  <Switch defaultChecked={i % 2 === 0} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

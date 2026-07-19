import { useState } from "react";
import { Building2, Palette, Shield, Database, Bell, ImagePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { toast } from "sonner";
import { useMockStore, BackupItem } from "./mockStore";

export function SettingsView() {
  const { settings, setSettings, backups, setBackups, logActivity } = useMockStore();
  const palette = ["#2563eb", "#0ea5e9", "#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

  // Local Form states (School)
  const [schoolName, setSchoolName] = useState(settings.schoolName);
  const [modularCode, setModularCode] = useState(settings.modularCode);
  const [ruc, setRuc] = useState(settings.ruc);
  const [director, setDirector] = useState(settings.director);
  const [address, setAddress] = useState(settings.address);
  const [mission, setMission] = useState(settings.mission);

  // Local Brand states
  const [primaryColor, setPrimaryColor] = useState(settings.primaryColor);
  const [darkModeAuto, setDarkModeAuto] = useState(settings.darkModeAuto);
  const [compactTheme, setCompactTheme] = useState(settings.compactTheme);

  // Loading states
  const [savingSchool, setSavingSchool] = useState(false);
  const [creatingBackup, setCreatingBackup] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  const handleSaveSchool = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSchool(true);
    setTimeout(() => {
      setSettings((prev) => ({
        ...prev,
        schoolName,
        modularCode,
        ruc,
        director,
        address,
        mission,
      }));
      logActivity(director || "Director", "actualizó la información institucional del colegio");
      toast.success("Información institucional guardada con éxito");
      setSavingSchool(false);
    }, 1000);
  };

  const handleSaveBrand = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 800)),
      {
        loading: "Aplicando cambios de marca...",
        success: () => {
          setSettings((prev) => ({
            ...prev,
            primaryColor,
            darkModeAuto,
            compactTheme,
          }));
          logActivity(director || "Director", "actualizó la identidad visual del panel");
          return "Identidad visual actualizada";
        },
        error: "Error al guardar marca",
      }
    );
  };

  const handleCreateBackup = () => {
    setCreatingBackup(true);
    setTimeout(() => {
      const now = new Date();
      const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      const day = now.getDate();
      const month = monthNames[now.getMonth()];
      const dateStr = `${day} ${month}`;
      const hour = now.getHours().toString().padStart(2, "0");
      const min = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "p.m." : "a.m.";

      const newBkp: BackupItem = {
        id: `BKP-${(backups.length + 1).toString().padStart(3, "0")}`,
        date: dateStr,
        size: "2.4 GB",
        time: `${hour}:${min} ${ampm}`,
      };

      setBackups((prev) => [newBkp, ...prev]);
      logActivity(director || "Director", `creó la copia de seguridad: ${newBkp.id}`);
      toast.success(`Copia de seguridad ${newBkp.id} creada con éxito`);
      setCreatingBackup(false);
    }, 1200);
  };

  const handleRestoreBackup = (bkp: BackupItem) => {
    setRestoringId(bkp.id);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Restaurando base de datos a copia ${bkp.id} (${bkp.date})...`,
        success: () => {
          logActivity(director || "Director", `restauró el sistema a la copia ${bkp.id}`);
          setRestoringId(null);
          return `Sistema restaurado correctamente a la versión de ${bkp.date}`;
        },
        error: "Error al restaurar",
      }
    );
  };

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
              <form onSubmit={handleSaveSchool}>
                <h3 className="mb-1 text-slate-900 font-semibold">Información del colegio</h3>
                <p className="text-sm text-slate-500 mb-6">Datos institucionales mostrados en boletines y reportes.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl" style={{ backgroundColor: primaryColor }}>
                      {schoolName ? schoolName.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase() : "COL"}
                    </div>
                    <div className="flex-1">
                      <Label>Logo institucional</Label>
                      <div className="mt-1.5 flex gap-2">
                        <Button type="button" variant="outline" onClick={() => toast.info("Subida de logo simulada")}><ImagePlus className="w-4 h-4 mr-2" />Subir logo</Button>
                        <Button type="button" variant="ghost" onClick={() => toast.warning("Logo removido")}>Quitar</Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Nombre</Label>
                    <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="mt-1.5" required disabled={savingSchool} />
                  </div>
                  <div>
                    <Label>Código modular</Label>
                    <Input value={modularCode} onChange={(e) => setModularCode(e.target.value)} className="mt-1.5" required disabled={savingSchool} />
                  </div>
                  <div>
                    <Label>RUC</Label>
                    <Input value={ruc} onChange={(e) => setRuc(e.target.value)} className="mt-1.5" required disabled={savingSchool} />
                  </div>
                  <div>
                    <Label>Director</Label>
                    <Input value={director} onChange={(e) => setDirector(e.target.value)} className="mt-1.5" required disabled={savingSchool} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Dirección</Label>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1.5" required disabled={savingSchool} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Misión</Label>
                    <Textarea rows={3} value={mission} onChange={(e) => setMission(e.target.value)} className="mt-1.5" required disabled={savingSchool} />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button type="button" variant="outline" onClick={() => {
                    setSchoolName(settings.schoolName);
                    setModularCode(settings.modularCode);
                    setRuc(settings.ruc);
                    setDirector(settings.director);
                    setAddress(settings.address);
                    setMission(settings.mission);
                    toast("Cambios revertidos");
                  }} disabled={savingSchool}>Cancelar</Button>
                  <Button type="submit" disabled={savingSchool} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]" style={{ backgroundColor: primaryColor }}>
                    {savingSchool ? "Guardando..." : "Guardar"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brand" className="pt-5">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <h3 className="mb-1 text-slate-900 font-semibold">Identidad visual</h3>
              <p className="text-sm text-slate-500 mb-6">Personaliza colores del sistema.</p>
              <Label className="mb-3 block">Color primario</Label>
              <div className="flex gap-3 flex-wrap mb-6">
                {palette.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setPrimaryColor(c)}
                    className={`w-12 h-12 rounded-xl transition-all duration-200 cursor-pointer ${
                      primaryColor === c ? "ring-offset-2 ring-2 ring-slate-950 scale-105" : "hover:scale-105"
                    }`}
                    style={{ background: c }}
                  />
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Modo oscuro automático</Label>
                  <div className="mt-2 p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="text-sm text-slate-600">Habilitar modo oscuro según hora</span>
                    <Switch checked={darkModeAuto} onCheckedChange={setDarkModeAuto} />
                  </div>
                </div>
                <div>
                  <Label>Tema compacto</Label>
                  <div className="mt-2 p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="text-sm text-slate-600">Reducir espaciado de tablas</span>
                    <Switch checked={compactTheme} onCheckedChange={setCompactTheme} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button type="button" variant="outline" onClick={() => {
                  setPrimaryColor(settings.primaryColor);
                  setDarkModeAuto(settings.darkModeAuto);
                  setCompactTheme(settings.compactTheme);
                }}>Cancelar</Button>
                <Button type="button" onClick={handleSaveBrand} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]" style={{ backgroundColor: primaryColor }}>
                  Aplicar cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="pt-5">
          <Card className="border-slate-200">
            <CardContent className="p-6 space-y-4">
              <h3 className="mb-1 text-slate-900 font-semibold">Seguridad y permisos</h3>
              <p className="text-sm text-slate-500 mb-4">Reglas de acceso al sistema.</p>
              {[
                { l: "Autenticación de dos factores (2FA)", d: "Requerida para todos los administradores" },
                { l: "Bloqueo tras 5 intentos fallidos", d: "Protección contra fuerza bruta" },
                { l: "Expiración de sesión 8 h", d: "Cierre automático por inactividad" },
                { l: "Forzar cambio de contraseña cada 90 días", d: "" },
              ].map((p, i) => (
                <div key={p.l} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition">
                  <div>
                    <div className="text-sm text-slate-900 font-medium">{p.l}</div>
                    {p.d && <div className="text-xs text-slate-500">{p.d}</div>}
                  </div>
                  <Switch defaultChecked={i < 3} onCheckedChange={() => toast.success("Política de seguridad actualizada")} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="pt-5">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <h3 className="mb-1 text-slate-900 font-semibold">Copias de seguridad</h3>
              <p className="text-sm text-slate-500 mb-6">
                Última copia realizada con éxito. Total registradas: {backups.length}
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {backups.map((d) => (
                  <div key={d.id} className="p-4 rounded-lg border border-slate-200 flex flex-col justify-between hover:bg-slate-50 transition">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Backup {d.date}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{d.id} · {d.size} · {d.time}</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full"
                      disabled={restoringId !== null || creatingBackup}
                      onClick={() => handleRestoreBackup(d)}
                    >
                      {restoringId === d.id ? "Restaurando..." : "Restaurar"}
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleCreateBackup}
                disabled={creatingBackup || restoringId !== null}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white min-w-[160px]"
                style={{ backgroundColor: primaryColor }}
              >
                {creatingBackup ? "Haciendo copia..." : "Crear copia ahora"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notif" className="pt-5">
          <Card className="border-slate-200">
            <CardContent className="p-6 space-y-3">
              <h3 className="mb-1 text-slate-900 font-semibold">Notificaciones</h3>
              <p className="text-sm text-slate-500 mb-4">Decide qué eventos recibir por email.</p>
              {[
                "Nuevo alumno matriculado",
                "Pagos pendientes",
                "Alertas de inasistencia",
                "Publicaciones programadas",
                "Reportes semanales",
              ].map((n, i) => (
                <div key={n} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition">
                  <span className="text-sm text-slate-700">{n}</span>
                  <Switch defaultChecked={i % 2 === 0} onCheckedChange={(val) => toast.success(`Preferencia de notificación actualizada: ${val ? "Activada" : "Desactivada"}`)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

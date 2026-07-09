import { useState } from "react";
import { Plus, Image as ImageIcon, Calendar, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner";

const posts = [
  { img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", title: "Olimpiada Nacional de Matemática", date: "15 May 2026", cat: "Académico", status: "Publicado" },
  { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", title: "Feria de Ciencias 2026", date: "08 May 2026", cat: "Eventos", status: "Publicado" },
  { img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80", title: "Admisión 2027 abierta", date: "02 May 2026", cat: "Comunicado", status: "Publicado" },
  { img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80", title: "Día del logro 2026 (borrador)", date: "Programado 20 Jun", cat: "Eventos", status: "Borrador" },
];

const statusColor: Record<string, string> = {
  Publicado: "bg-emerald-100 text-emerald-700",
  Borrador: "bg-amber-100 text-amber-700",
  Programado: "bg-blue-100 text-blue-700",
};

export function Publications() {
  const [title, setTitle] = useState("Bienvenida al año escolar 2026");
  const [desc, setDesc] = useState("Compartimos con la comunidad educativa los detalles más importantes del nuevo año académico...");

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3>Editor de publicación</h3>
              <Badge variant="outline">CMS</Badge>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Título</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Categoría</Label>
                  <Select defaultValue="aca">
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aca">Académico</SelectItem>
                      <SelectItem value="eve">Eventos</SelectItem>
                      <SelectItem value="com">Comunicado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Fecha</Label>
                  <Input type="date" defaultValue="2026-05-28" className="mt-1.5" />
                </div>
              </div>

              <div>
                <Label>Imagen destacada</Label>
                <div className="mt-1.5 border-2 border-dashed border-slate-200 rounded-lg p-6 text-center text-slate-500 hover:border-blue-400 cursor-pointer">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Arrastra una imagen o haz clic para subir</p>
                  <p className="text-xs">PNG, JPG hasta 5MB</p>
                </div>
              </div>

              <div>
                <Label>Descripción</Label>
                <Textarea rows={6} value={desc} onChange={(e) => setDesc(e.target.value)} className="mt-1.5" />
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline">Guardar borrador</Button>
                <Button variant="outline"><Calendar className="w-4 h-4 mr-2" />Programar</Button>
                <Button onClick={() => toast.success("Publicado correctamente")} className="bg-blue-600 hover:bg-blue-700 text-white flex-1">Publicar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3>Vista previa</h3>
              <Button variant="ghost" size="sm"><Eye className="w-4 h-4 mr-2" />Ver en sitio</Button>
            </div>
            <article className="rounded-xl border border-slate-200 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80"
                alt="preview"
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-2">Académico</Badge>
                <h2 className="mb-2">{title}</h2>
                <p className="text-sm text-slate-600">{desc}</p>
                <div className="text-xs text-slate-400 mt-3">Publicado por María Rodríguez · 28 May 2026</div>
              </div>
            </article>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3>Publicaciones recientes</h3>
              <p className="text-sm text-slate-500">{posts.length} publicaciones</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Plus className="w-4 h-4 mr-2" />Nueva</Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {posts.map((p) => (
              <div key={p.title} className="rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition">
                <div className="relative">
                  <ImageWithFallback src={p.img} alt={p.title} className="w-full h-36 object-cover" />
                  <Badge className={`absolute top-2 left-2 ${statusColor[p.status]} hover:bg-current`}>{p.status}</Badge>
                </div>
                <div className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">{p.cat}</Badge>
                  <div className="text-sm line-clamp-2">{p.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{p.date}</div>
                  <div className="flex gap-1 mt-3 pt-3 border-t border-slate-100">
                    <Button variant="ghost" size="sm" className="flex-1"><Pencil className="w-3 h-3" /></Button>
                    <Button variant="ghost" size="sm" className="flex-1"><Eye className="w-3 h-3" /></Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-red-600"><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

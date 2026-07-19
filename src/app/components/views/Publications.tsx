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
import { useMockStore, Post } from "./mockStore";

const statusColor: Record<string, string> = {
  Publicado: "bg-emerald-100 text-emerald-700",
  Borrador: "bg-amber-100 text-amber-700",
  Programado: "bg-blue-100 text-blue-700",
};

const catMapping: Record<string, "Académico" | "Eventos" | "Comunicado"> = {
  aca: "Académico",
  eve: "Eventos",
  com: "Comunicado",
  "Académico": "Académico",
  "Eventos": "Eventos",
  "Comunicado": "Comunicado",
};

const revCatMapping: Record<string, string> = {
  "Académico": "aca",
  "Eventos": "eve",
  "Comunicado": "com",
};

export function Publications() {
  const { posts, setPosts, logActivity } = useMockStore();

  // Form & Preview state
  const [title, setTitle] = useState("Bienvenida al año escolar 2026");
  const [desc, setDesc] = useState("Compartimos con la comunidad educativa los detalles más importantes del nuevo año académico...");
  const [category, setCategory] = useState("aca");
  const [dateStr, setDateStr] = useState("2026-05-28");
  const [imgUrl, setImgUrl] = useState("https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80");

  // Editing state
  const [editingTitle, setEditingTitle] = useState<string | null>(null);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setCategory("aca");
    setDateStr("2026-05-28");
    setImgUrl("https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80");
    setEditingTitle(null);
  };

  const getFormattedDate = (val: string) => {
    if (!val) return "28 May 2026";
    const parts = val.split("-");
    if (parts.length < 3) return val;
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const day = parseInt(parts[2]);
    const monthIndex = parseInt(parts[1]) - 1;
    return `${day} ${months[monthIndex] || "May"} ${parts[0]}`;
  };

  const handleSavePost = (status: "Publicado" | "Borrador" | "Programado") => {
    if (!title || !desc) {
      toast.error("Por favor completa el título y la descripción");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const categoryName = catMapping[category] || "Académico";
      const formattedDate = status === "Programado" ? `Programado ${getFormattedDate(dateStr).slice(0, 6)}` : getFormattedDate(dateStr);

      const postData: Post = {
        title,
        desc,
        cat: categoryName,
        date: formattedDate,
        img: imgUrl || "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
        status,
      };

      if (editingTitle) {
        // Edit mode
        setPosts((prev) => prev.map((p) => (p.title === editingTitle ? postData : p)));
        logActivity("Administrador", `actualizó la publicación: "${title}"`);
        toast.success(`Publicación actualizada como ${status.toLowerCase()}`);
      } else {
        // Create mode
        setPosts((prev) => [postData, ...prev]);
        logActivity("Administrador", `creó la publicación: "${title}"`);
        toast.success(`Publicación creada como ${status.toLowerCase()}`);
      }

      setLoading(false);
      resetForm();
    }, 1000);
  };

  const handleEditClick = (post: Post) => {
    setEditingTitle(post.title);
    setTitle(post.title);
    setDesc(post.desc || "");
    setCategory(revCatMapping[post.cat] || "aca");
    setImgUrl(post.img);
    if (post.date.includes("Programado")) {
      setDateStr("2026-06-20");
    } else {
      setDateStr("2026-05-28");
    }
    toast.info("Publicación cargada en el editor");
  };

  const handleViewClick = (post: Post) => {
    setTitle(post.title);
    setDesc(post.desc || "");
    setCategory(revCatMapping[post.cat] || "aca");
    setImgUrl(post.img);
    toast.info("Cargado en vista previa");
  };

  const handleDeletePost = (postTitle: string) => {
    setActionId(postTitle);
    setTimeout(() => {
      setPosts((prev) => prev.filter((p) => p.title !== postTitle));
      logActivity("Administrador", `eliminó la publicación: "${postTitle}"`);
      toast.success("Publicación eliminada");
      setActionId(null);
      if (editingTitle === postTitle) {
        resetForm();
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3>{editingTitle ? "Editar publicación" : "Editor de publicación"}</h3>
              {editingTitle ? (
                <Button variant="ghost" size="sm" onClick={resetForm} className="text-slate-500">Cancelar edición</Button>
              ) : (
                <Badge variant="outline">CMS</Badge>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label>Título</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" disabled={loading} placeholder="Escribe el título aquí..." />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Categoría</Label>
                  <Select value={category} onValueChange={setCategory} disabled={loading}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aca">Académico</SelectItem>
                      <SelectItem value="eve">Eventos</SelectItem>
                      <SelectItem value="com">Comunicado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Fecha de Publicación</Label>
                  <Input type="date" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="mt-1.5" disabled={loading} />
                </div>
              </div>

              <div>
                <Label>Imagen destacada (URL)</Label>
                <Input
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="mt-1.5 mb-2"
                  disabled={loading}
                />
                <div
                  onClick={() => {
                    const samplePics = [
                      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
                      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
                      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
                      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
                    ];
                    const randPic = samplePics[Math.floor(Math.random() * samplePics.length)];
                    setImgUrl(randPic);
                    toast.success("Imagen aleatoria cargada");
                  }}
                  className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center text-slate-500 hover:border-blue-400 cursor-pointer transition"
                >
                  <ImageIcon className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                  <p className="text-xs font-medium">Haz clic aquí para asignar una imagen de muestra aleatoria</p>
                </div>
              </div>

              <div>
                <Label>Descripción</Label>
                <Textarea rows={5} value={desc} onChange={(e) => setDesc(e.target.value)} className="mt-1.5" disabled={loading} placeholder="Escribe el cuerpo o sumario de la noticia..." />
              </div>

              <div className="flex gap-2 pt-2 flex-wrap">
                <Button variant="outline" onClick={() => handleSavePost("Borrador")} disabled={loading}>
                  Guardar borrador
                </Button>
                <Button variant="outline" onClick={() => handleSavePost("Programard" as any)} disabled={loading}>
                  <Calendar className="w-4 h-4 mr-2" />Programar
                </Button>
                <Button
                  onClick={() => handleSavePost("Publicado")}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex-1 min-w-[120px]"
                >
                  {loading ? "Procesando..." : editingTitle ? "Actualizar y Publicar" : "Publicar ahora"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3>Vista previa en tiempo real</h3>
              <Badge variant="secondary">Vista previa</Badge>
            </div>
            <article className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <ImageWithFallback
                src={imgUrl || "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80"}
                alt="preview"
                className="w-full h-48 object-cover transition duration-300"
              />
              <div className="p-5">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-2">
                  {catMapping[category] || "Académico"}
                </Badge>
                <h2 className="mb-2 text-xl font-bold text-slate-800 line-clamp-2">{title || "Sin Título"}</h2>
                <p className="text-sm text-slate-600 line-clamp-4 min-h-[80px]">{desc || "Sin descripción..."}</p>
                <div className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
                  Publicado por María Rodríguez · {getFormattedDate(dateStr)}
                </div>
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
              <p className="text-sm text-slate-500">{posts.length} publicaciones registradas</p>
            </div>
            <Button variant="outline" onClick={resetForm}><Plus className="w-4 h-4 mr-2" />Nueva publicación</Button>
          </div>
          {posts.length === 0 ? (
            <div className="text-center py-10 text-slate-400">No hay publicaciones recientes</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {posts.map((p) => (
                <div key={p.title} className="rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="relative">
                      <ImageWithFallback src={p.img} alt={p.title} className="w-full h-36 object-cover" />
                      <Badge className={`absolute top-2 left-2 ${statusColor[p.status]} hover:bg-current`}>{p.status}</Badge>
                    </div>
                    <div className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">{p.cat}</Badge>
                      <div className="text-sm font-medium line-clamp-2 min-h-[40px] text-slate-800">{p.title}</div>
                      <div className="text-xs text-slate-500 mt-1">{p.date}</div>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <div className="flex gap-1 mt-3 pt-3 border-t border-slate-100">
                      <Button variant="ghost" size="sm" className="flex-1 hover:bg-slate-100" onClick={() => handleEditClick(p)} disabled={actionId === p.title}>
                        <Pencil className="w-3.5 h-3.5 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 hover:bg-slate-100" onClick={() => handleViewClick(p)} disabled={actionId === p.title}>
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 hover:bg-red-50 text-red-600" onClick={() => handleDeletePost(p.title)} disabled={actionId === p.title}>
                        {actionId === p.title ? "..." : <Trash2 className="w-3.5 h-3.5" />}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import {
  GraduationCap,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  Users,
  Trophy,
  Library,
  Monitor,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

interface LandingProps {
  onLogin: () => void;
}

const services = [
  {
    icon: GraduationCap,
    title: "Educación Secundaria",
    desc: "Preparación académica sólida orientada a la universidad.",
  },
  {
    icon: Trophy,
    title: "Actividades Extracurriculares",
    desc: "Deportes, arte, música y robótica para desarrollar talentos.",
  },
  {
    icon: Monitor,
    title: "Plataforma Virtual",
    desc: "Aulas digitales, tareas y comunicación familia-colegio 24/7.",
  },
  {
    icon: Users,
    title: "Tutoría Personalizada",
    desc: "Acompañamiento académico y emocional individualizado.",
  },
];

const news = [
  {
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    date: "06 Jun 2026",
    cat: "Comunicado",
    title: "Feliz día del maestro",
    desc: "Tu vocación transforma vidas y construye el futuro. ¡Feliz día a quienes guían nuestros pasos!",
  },
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    date: "27 Abr 2026",
    cat: "Eventos",
    title: "Juegos Escolares Deportivos y Paradeportivos 2026",
    desc: "Así se vivió los  Juegos Escolares Deportivos y Paradeportivos 2026  en la I.E. Tupac Amaru- Etapa Institucional!",
  },
  {
    img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
    date: "01 Ene 2026",
    cat: "Comunicado",
    title: "Inicio del proceso de admisión 2026",
    desc: "Conoce los requisitos y fechas importantes del próximo año académico.",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
  "https://images.unsplash.com/photo-1581726690015-c9861fa5057f?w=600&q=80",
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80",
  "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80",
  "https://images.unsplash.com/photo-1503676593006-f6c8d4b73c8d?w=600&q=80",
  "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",
];

export function Landing({ onLogin }: LandingProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-blue-700">EduGestión 360</span>
              <span className="text-xs text-slate-500">
                Colegio Tupac Amaru
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a
              href="#inicio"
              className="hover:text-blue-600 transition"
            >
              Inicio
            </a>
            <a
              href="#nosotros"
              className="hover:text-blue-600 transition"
            >
              Nosotros
            </a>
            <a
              href="#servicios"
              className="hover:text-blue-600 transition"
            >
              Servicios
            </a>
            <a
              href="#noticias"
              className="hover:text-blue-600 transition"
            >
              Noticias
            </a>
            <a
              href="#galeria"
              className="hover:text-blue-600 transition"
            >
              Galería
            </a>
            <a
              href="#contacto"
              className="hover:text-blue-600 transition"
            >
              Contacto
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={onLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Iniciar sesión
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-4 flex flex-col gap-3 text-sm">
              {[
                "Inicio",
                "Nosotros",
                "Servicios",
                "Noticias",
                "Galería",
                "Contacto",
              ].map((m) => (
                <a
                  key={m}
                  href={`#${m.toLowerCase()}`}
                  className="py-1 text-slate-700"
                >
                  {m}
                </a>
              ))}
              <Button
                onClick={onLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white mt-2"
              >
                Iniciar sesión
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-5">
              Año Académico 2026 · Matrículas abiertas
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 mb-6">
              Formamos líderes con{" "}
              <span className="text-blue-600">propósito</span> y
              excelencia académica
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl">
              Una plataforma educativa integral que conecta
              estudiantes, docentes y familias en un solo lugar.
              Gestiona, aprende y crece con EduGestión 360.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300"
              >
                Conocer más
              </Button>
              <Button
                size="lg"
                onClick={onLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Ingresar al sistema{" "}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "50+", l: "Estudiantes" },
                { n: "10", l: "Docentes" },
                { n: "31", l: "Años" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl text-blue-700">
                    {s.n}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-200/40 rounded-3xl blur-2xl" />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=80"
              alt="Estudiantes en aula"
              className="relative rounded-2xl shadow-2xl w-full h-[460px] object-cover"
            />
            <Card className="absolute -bottom-6 -left-6 shadow-xl border-slate-200 hidden sm:block">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-emerald-600" />
                </div>
                
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section
        id="nosotros"
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="outline" className="mb-3">
            Sobre el colegio
          </Badge>
          <h2 className="text-3xl lg:text-4xl mb-4">
            Tres décadas formando a las nuevas generaciones
          </h2>
          <p className="text-slate-600">
            Desde 1994, ofrecemos una educación de calidad
            basada en valores, innovación y compromiso con la
            comunidad.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Nuestra Historia",
              d: "Fundado en 1994, hemos graduado a estudiantes que hoy son profesionales destacados.",
              c: "bg-blue-50 text-blue-700",
            },
            {
              t: "Misión",
              d: "Brindar educación integral de excelencia que forme ciudadanos íntegros, críticos y comprometidos con su sociedad.",
              c: "bg-emerald-50 text-emerald-700",
            },
            {
              t: "Visión",
              d: "Ser referente educativo a nivel nacional reconocido por la innovación pedagógica y la formación humana.",
              c: "bg-amber-50 text-amber-700",
            },
          ].map((b) => (
            <Card
              key={b.t}
              className="border-slate-200 hover:shadow-md transition"
            >
              <CardContent className="p-6">
                <div
                  className={`inline-flex px-3 py-1 rounded-full text-xs ${b.c} mb-4`}
                >
                  {b.t}
                </div>
                <p className="text-slate-600">{b.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Respeto",
            "Excelencia",
            "Integridad",
            "Innovación",
          ].map((v) => (
            <div
              key={v}
              className="rounded-xl border border-slate-200 bg-white p-5 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white inline-flex items-center justify-center mb-3">
                {v[0]}
              </div>
              <div className="text-slate-900">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-3">
              Servicios
            </Badge>
            <h2 className="text-3xl lg:text-4xl mb-4">
              Una propuesta educativa completa
            </h2>
            <p className="text-slate-600">
              Acompañamos a nuestros estudiantes durante toda su
              trayectoria escolar.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Card
                key={s.title}
                className="border-slate-200 hover:border-blue-300 hover:shadow-lg transition group"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600">
                    {s.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Noticias */}
      <section
        id="noticias"
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <Badge variant="outline" className="mb-3">
              Publicaciones
            </Badge>
            <h2 className="text-3xl lg:text-4xl">
              Noticias y comunicados
            </h2>
          </div>
          <Button variant="outline">
            Ver todas <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((n) => (
            <Card
              key={n.title}
              className="overflow-hidden border-slate-200 hover:shadow-lg transition"
            >
              <ImageWithFallback
                src={n.img}
                alt={n.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3 text-xs text-slate-500">
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    {n.cat}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {n.date}
                  </span>
                </div>
                <h3 className="mb-2 line-clamp-2">{n.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                  {n.desc}
                </p>
                <Button
                  variant="link"
                  className="px-0 text-blue-600"
                >
                  Leer más{" "}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-3">
              Galería
            </Badge>
            <h2 className="text-3xl lg:text-4xl mb-3">
              Momentos que nos definen
            </h2>
            <p className="text-slate-600">
              Eventos, actividades y aprendizajes a lo largo del
              año escolar.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.map((g, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl ${i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
              >
                <ImageWithFallback
                  src={g}
                  alt={`Galería ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section
        id="contacto"
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Badge variant="outline" className="mb-3">
              Contacto
            </Badge>
            <h2 className="text-3xl lg:text-4xl mb-4">
              Hablemos sobre la educación de tus hijos
            </h2>
            <p className="text-slate-600 mb-8">
              Estamos para responder tus dudas sobre matrículas,
              programas y servicios.
            </p>
            <div className="space-y-5">
              {[
                {
                  i: MapPin,
                  t: "Dirección",
                  v: "Pariamarca, Pasco, Perú",
                },
                {
                  i: Phone,
                  t: "Teléfono",
                  v: "+51 ",
                },
                {
                  i: Mail,
                  t: "Email",
                  v: "tupacamaru@hotmail.com",
                },
              ].map((c) => (
                <div
                  key={c.t}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <c.i className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">
                      {c.t}
                    </div>
                    <div className="text-slate-900">{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl overflow-hidden border border-slate-200 h-56 bg-slate-100 flex items-center justify-center text-slate-400">
              <MapPin className="w-8 h-8 mr-2" /> Mapa
              interactivo
            </div>
          </div>
          <Card className="border-slate-200">
            <CardContent className="p-6 sm:p-8">
              <h3 className="mb-1">Envíanos un mensaje</h3>
              <p className="text-sm text-slate-500 mb-6">
                Responderemos en menos de 24 horas.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success(
                    "¡Mensaje enviado! Te contactaremos pronto.",
                  );
                }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-700 mb-1.5 block">
                      Nombre
                    </label>
                    <Input placeholder="Tu nombre" required />
                  </div>
                  <div>
                    <label className="text-sm text-slate-700 mb-1.5 block">
                      Apellido
                    </label>
                    <Input placeholder="Tu apellido" required />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-700 mb-1.5 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-700 mb-1.5 block">
                    Teléfono
                  </label>
                  <Input placeholder="+51 ..." />
                </div>
                <div>
                  <label className="text-sm text-slate-700 mb-1.5 block">
                    Mensaje
                  </label>
                  <Textarea
                    rows={4}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Enviar mensaje{" "}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white">EduGestión360</span>
            </div>
            <p className="text-sm text-slate-400">
              Plataforma educativa integral para colegios
              modernos.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Youtube, Twitter].map(
                (I, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 transition flex items-center justify-center"
                  >
                    <I className="w-4 h-4" />
                  </a>
                ),
              )}
            </div>
          </div>
          {[
            {
              t: "Enlaces",
              l: [
                "Inicio",
                "Nosotros",
                "Servicios",
                "Noticias",
              ],
            },
            {
              t: "Académico",
              l: [
                "Secundaria",
                "Secundaria",
                "Admisión",
                "Calendario",
              ],
            },
            {
              t: "Soporte",
              l: [
                "Centro de ayuda",
                "Plataforma virtual",
                "Política de privacidad",
                "Términos",
              ],
            },
          ].map((c) => (
            <div key={c.t}>
              <div className="text-white mb-4">{c.t}</div>
              <ul className="space-y-2 text-sm">
                {c.l.map((i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-white transition"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-sm text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
          <span>
            © 2026 EduGestión 360 · Colegio Tupac Amaru. Todos los
            derechos reservados.
          </span>
          <span>Hecho con ♥ para la educación</span>
        </div>
      </footer>
    </div>
  );
}
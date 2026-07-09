import { useState } from "react";
import { GraduationCap, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ForgotPasswordProps {
  onBack: () => void;
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al login
        </button>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-5">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>

          {!sent ? (
            <>
              <h1 className="text-2xl mb-2">Recuperar contraseña</h1>
              <p className="text-slate-500 mb-6 text-sm">
                Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm text-slate-700 mb-1.5 block">Correo institucional</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@colegio.edu.pe"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Enviar enlace
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-2xl mb-2">¡Correo enviado!</h1>
              <p className="text-slate-500 mb-6 text-sm">
                Hemos enviado un enlace de recuperación a <span className="text-slate-900">{email || "tu correo"}</span>.
                Revisa tu bandeja y sigue las instrucciones.
              </p>
              <Button onClick={onBack} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Volver al login
              </Button>
              <p className="text-xs text-slate-400 mt-4">
                ¿No recibiste el correo? Revisa spam o{" "}
                <button onClick={() => setSent(false)} className="text-blue-600 hover:underline">intenta de nuevo</button>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

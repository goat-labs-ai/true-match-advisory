"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AnimatedSection from "@/components/AnimatedSection";
import {
  candidatesSchema,
  validateCvFileClient,
  type CandidatesFormData,
} from "@/lib/validations/candidates";

export default function CandidatesForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [cvError, setCvError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CandidatesFormData>({
    resolver: zodResolver(candidatesSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      rodo: false as unknown as true,
      future: false,
    },
  });

  const onSubmit = async (data: CandidatesFormData) => {
    setServerError("");
    setCvError("");

    const files = fileInputRef.current?.files;
    const fileError = validateCvFileClient(files);
    if (fileError) {
      setCvError(fileError);
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("linkedin", data.linkedin || "");
    formData.append("rodo", String(data.rodo));
    formData.append("future", String(data.future ?? false));

    if (files && files.length > 0) {
      formData.append("cv", files[0]);
    }

    try {
      const res = await fetch("/api/contact/candidate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Wystąpił błąd");
      }

      setSubmitted(true);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Nie udało się wysłać aplikacji. Spróbuj ponownie."
      );
    }
  };

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <AnimatedSection>
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-8">Dla kandydatów</p>
            <h1 className="font-serif text-3xl md:text-4xl leading-snug text-foreground mb-10 text-balance">
              Współpracuję z ekspertami i liderami, którzy chcą rozwijać swoją karierę w organizacjach o&nbsp;wysokiej kulturze zarządzania.
            </h1>
            <p className="font-sans text-muted-foreground leading-relaxed mb-20">
              Jeśli jesteś doświadczonym specjalistą lub managerem i szukasz nowych wyzwań — napisz do mnie. Każdą aplikację traktuję indywidualnie i z pełną dyskrecją.
            </p>
          </AnimatedSection>

          {submitted ? (
            <AnimatedSection>
              <div className="py-12">
                <p className="font-serif text-2xl text-foreground mb-4">Dziękuję za przesłanie.</p>
                <p className="font-sans text-muted-foreground">Skontaktuję się z Tobą w ciągu 3 dni roboczych.</p>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection delay={0.1}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                {[
                  { label: "Imię i nazwisko", field: "name" as const, type: "text", required: true },
                  { label: "Email", field: "email" as const, type: "email", required: true },
                  { label: "Telefon", field: "phone" as const, type: "tel", required: true },
                  { label: "LinkedIn", field: "linkedin" as const, type: "url", required: false },
                ].map(({ label, field, type }) => (
                  <div key={field}>
                    <label className="block text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground mb-3">{label}</label>
                    <input
                      type={type}
                      {...register(field)}
                      className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                    {errors[field] && (
                      <p className="mt-2 text-xs font-sans text-destructive">{errors[field].message}</p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground mb-3">CV (PDF, maks. 5 MB)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    ref={fileInputRef}
                    onChange={() => setCvError("")}
                    className="w-full font-sans text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-border file:bg-transparent file:text-foreground file:font-sans file:text-sm file:cursor-pointer"
                  />
                  {cvError && (
                    <p className="mt-2 text-xs font-sans text-destructive">{cvError}</p>
                  )}
                </div>

                <div className="space-y-4 pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("rodo")}
                      className="mt-1 accent-gold"
                    />
                    <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji procesu rekrutacyjnego, zgodnie z RODO.
                    </span>
                  </label>
                  {errors.rodo && (
                    <p className="text-xs font-sans text-destructive">{errors.rodo.message}</p>
                  )}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("future")}
                      className="mt-1 accent-gold"
                    />
                    <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                      Wyrażam zgodę na przetwarzanie moich danych na potrzeby przyszłych procesów rekrutacyjnych.
                    </span>
                  </label>
                </div>

                {serverError && (
                  <p className="text-sm font-sans text-destructive">{serverError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 px-10 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? "Wysyłanie..." : "Wyślij CV"}
                </button>
              </form>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}

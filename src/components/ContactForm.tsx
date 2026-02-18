"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AnimatedSection from "@/components/AnimatedSection";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      position: "",
      email: "",
      phone: "",
      description: "",
      rodo: false as unknown as true,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: "" }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Wystąpił błąd");
      }

      setSubmitted(true);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Nie udało się wysłać wiadomości. Spróbuj ponownie."
      );
    }
  };

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <AnimatedSection>
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-8">Kontakt</p>
            <h1 className="font-serif text-3xl md:text-4xl leading-snug text-foreground mb-10 text-balance">
              Porozmawiajmy o&nbsp;Twoich potrzebach rekrutacyjnych.
            </h1>
            <p className="font-sans text-muted-foreground leading-relaxed mb-8">
              Wypełnij formularz lub napisz bezpośrednio na adres:
            </p>
            <p className="font-sans text-foreground">kontakt@truematchadvisory.com</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {submitted ? (
              <div className="py-12">
                <p className="font-serif text-2xl text-foreground mb-4">Dziękuję za wiadomość.</p>
                <p className="font-sans text-muted-foreground">Odpowiem w ciągu 24 godzin z propozycją terminu spotkania.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                {/* Honeypot — hidden from real users, catches bots */}
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
                />
                {[
                  { label: "Imię i nazwisko", field: "name" as const, type: "text" },
                  { label: "Firma", field: "company" as const, type: "text" },
                  { label: "Stanowisko", field: "position" as const, type: "text" },
                  { label: "Email", field: "email" as const, type: "email" },
                  { label: "Telefon", field: "phone" as const, type: "tel" },
                ].map(({ label, field, type }) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground mb-3">{label}</label>
                    <input
                      id={field}
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
                  <label htmlFor="description" className="block text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground mb-3">Opis potrzeby</label>
                  <textarea
                    id="description"
                    rows={4}
                    {...register("description")}
                    className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                  {errors.description && (
                    <p className="mt-2 text-xs font-sans text-destructive">{errors.description.message}</p>
                  )}
                </div>

                <label className="flex items-start gap-3 cursor-pointer pt-4">
                  <input
                    type="checkbox"
                    {...register("rodo")}
                    className="mt-1 accent-gold"
                  />
                  <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie, zgodnie z RODO.
                  </span>
                </label>
                {errors.rodo && (
                  <p className="text-xs font-sans text-destructive">{errors.rodo.message}</p>
                )}

                {serverError && (
                  <p className="text-sm font-sans text-destructive">{serverError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 px-10 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

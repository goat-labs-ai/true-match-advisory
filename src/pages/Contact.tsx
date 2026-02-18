import { useState } from "react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useSeo } from "@/hooks/use-seo";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", position: "", email: "", phone: "", description: "", rodo: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  useSeo({
    title: "Kontakt — Umów Rozmowę | TrueMatch Advisory",
    description: "Skontaktuj się z TrueMatch Advisory. Porozmawiajmy o rekrutacji managerów, executive search lub headhuntingu ekspertów dla Twojej organizacji.",
  });

  return (
    <Layout>
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
              <p className="font-sans text-foreground">kontakt@truematch.pl</p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              {submitted ? (
                <div className="py-12">
                  <p className="font-serif text-2xl text-foreground mb-4">Dziękuję za wiadomość.</p>
                  <p className="font-sans text-muted-foreground">Odpowiem w ciągu 24 godzin.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {[
                    { label: "Imię i nazwisko", field: "name", type: "text" },
                    { label: "Firma", field: "company", type: "text" },
                    { label: "Stanowisko", field: "position", type: "text" },
                    { label: "Email", field: "email", type: "email" },
                    { label: "Telefon", field: "phone", type: "tel" },
                  ].map(({ label, field, type }) => (
                    <div key={field}>
                      <label className="block text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground mb-3">{label}</label>
                      <input
                        type={type}
                        required
                        value={form[field as keyof typeof form] as string}
                        onChange={(e) => update(field, e.target.value)}
                        className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground mb-3">Opis potrzeby</label>
                    <textarea
                      required
                      rows={4}
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-4">
                    <input
                      type="checkbox"
                      required
                      checked={form.rodo}
                      onChange={(e) => update("rodo", e.target.checked)}
                      className="mt-1 accent-gold"
                    />
                    <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                      Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie, zgodnie z RODO.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="mt-8 px-10 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-wide hover:opacity-90 transition-opacity"
                  >
                    Wyślij wiadomość
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

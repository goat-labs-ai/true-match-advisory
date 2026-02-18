import { useState } from "react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useSeo } from "@/hooks/use-seo";

const Candidates = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", linkedin: "",
    rodo: false, future: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  useSeo({
    title: "Dla Kandydatów — Kariera z TrueMatch Advisory | Headhunting Ekspertów",
    description: "Współpracuję z ekspertami i liderami szukającymi nowych wyzwań. Dyskretny headhunting, indywidualne podejście i dostęp do ofert executive search.",
  });

  return (
    <Layout>
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
                <form onSubmit={handleSubmit} className="space-y-8">
                  {[
                    { label: "Imię i nazwisko", field: "name", type: "text" },
                    { label: "Email", field: "email", type: "email" },
                    { label: "Telefon", field: "phone", type: "tel" },
                    { label: "LinkedIn", field: "linkedin", type: "url" },
                  ].map(({ label, field, type }) => (
                    <div key={field}>
                      <label className="block text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground mb-3">{label}</label>
                      <input
                        type={type}
                        required={field !== "linkedin"}
                        value={form[field as keyof typeof form] as string}
                        onChange={(e) => update(field, e.target.value)}
                        className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground mb-3">CV (PDF)</label>
                    <input
                      type="file"
                      accept=".pdf"
                      className="w-full font-sans text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-border file:bg-transparent file:text-foreground file:font-sans file:text-sm file:cursor-pointer"
                    />
                  </div>

                  <div className="space-y-4 pt-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={form.rodo}
                        onChange={(e) => update("rodo", e.target.checked)}
                        className="mt-1 accent-gold"
                      />
                      <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji procesu rekrutacyjnego, zgodnie z RODO.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.future}
                        onChange={(e) => update("future", e.target.checked)}
                        className="mt-1 accent-gold"
                      />
                      <span className="font-sans text-xs text-muted-foreground leading-relaxed">
                        Wyrażam zgodę na przetwarzanie moich danych na potrzeby przyszłych procesów rekrutacyjnych.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 px-10 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-wide hover:opacity-90 transition-opacity"
                  >
                    Wyślij CV
                  </button>
                </form>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Candidates;

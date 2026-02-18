import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Proces Rekrutacji — Jak Działa Executive Search",
  description:
    "Pięć etapów precyzyjnego procesu rekrutacyjnego: od analizy potrzeb po onboarding. Uporządkowany direct search oparty na decyzjach, nie intuicji.",
};

const steps = [
  {
    num: "01",
    title: "Analiza potrzeb",
    desc: "Głębokie zrozumienie organizacji, kultury, strategii i profilu idealnego kandydata. Definiuję nie tylko kompetencje twarde, ale też dopasowanie kulturowe.",
    weight: "Bez właściwej definicji roli nawet najlepszy kandydat będzie nietrafioną decyzją.",
  },
  {
    num: "02",
    title: "Strategia pozyskania",
    desc: "Mapowanie rynku talentów, identyfikacja kanałów dotarcia, opracowanie komunikacji i harmonogramu procesu.",
    weight: "Źle dobrana strategia dotarcia oznacza utratę czasu — i dostępu do właściwych ludzi.",
  },
  {
    num: "03",
    title: "Direct search i selekcja",
    desc: "Aktywne dotarcie do kandydatów — także tych nieposzukujących pracy. Pogłębione rozmowy, weryfikacja kompetencji i motywacji.",
    weight: "Najlepsi kandydaci nie aplikują. Trzeba do nich dotrzeć i przekonać do rozmowy.",
  },
  {
    num: "04",
    title: "Shortlista 3–5 kandydatów",
    desc: "Prezentacja precyzyjnie wyselekcjonowanych kandydatów z pełnym raportem: doświadczenie, kompetencje, motywacja, oczekiwania.",
    weight: "Jakość shortlisty decyduje o jakości decyzji. Każda rekomendacja jest uzasadniona.",
  },
  {
    num: "05",
    title: "Wsparcie do zatrudnienia i onboarding",
    desc: "Koordynacja procesu ofertowego, negocjacje warunków, wsparcie na etapie wdrożenia nowego pracownika.",
    weight: "Proces nie kończy się na ofercie. Pierwsze miesiące przesądzają o powodzeniu zatrudnienia.",
  },
];

export default function ProcessPage() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-8">Proces</p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl max-w-3xl mb-8">
            Pięć kroków do właściwego zatrudnienia.
          </h1>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mb-24">
            Proces jest uporządkowany, mierzalny i&nbsp;oparty na decyzjach, nie intuicji.
          </p>
        </AnimatedSection>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <AnimatedSection key={step.num} delay={i * 0.08}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 border-t border-border/50">
                <div className="lg:col-span-1">
                  <p className="font-serif text-3xl text-gold">{step.num}</p>
                </div>
                <div className="lg:col-span-3">
                  <h2 className="font-serif text-xl text-foreground">{step.title}</h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="font-sans text-muted-foreground leading-relaxed mb-4">{step.desc}</p>
                  <p className="font-sans text-sm text-foreground/60 italic">{step.weight}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

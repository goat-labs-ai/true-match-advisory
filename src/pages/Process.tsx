import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const steps = [
  {
    num: "01",
    title: "Analiza potrzeb",
    desc: "Głębokie zrozumienie organizacji, kultury, strategii i profilu idealnego kandydata. Definiuję nie tylko kompetencje twarde, ale też dopasowanie kulturowe.",
  },
  {
    num: "02",
    title: "Strategia pozyskania",
    desc: "Mapowanie rynku talentów, identyfikacja kanałów dotarcia, opracowanie komunikacji i harmonogramu procesu.",
  },
  {
    num: "03",
    title: "Direct search i selekcja",
    desc: "Aktywne dotarcie do kandydatów — także tych nieposzukujących pracy. Pogłębione rozmowy, weryfikacja kompetencji i motywacji.",
  },
  {
    num: "04",
    title: "Shortlista 3–5 kandydatów",
    desc: "Prezentacja precyzyjnie wyselekcjonowanych kandydatów z pełnym raportem: doświadczenie, kompetencje, motywacja, oczekiwania.",
  },
  {
    num: "05",
    title: "Wsparcie do zatrudnienia i onboarding",
    desc: "Koordynacja procesu ofertowego, negocjacje warunków, wsparcie na etapie wdrożenia nowego pracownika.",
  },
];

const Process = () => (
  <Layout>
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-8">Proces</p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl max-w-3xl mb-8">
            Pięć kroków do właściwego zatrudnienia.
          </h1>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mb-24">
            Każdy etap jest transparentny — na bieżąco informuję o postępach i wspólnie podejmujemy kluczowe decyzje.
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
                  <p className="font-sans text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Process;

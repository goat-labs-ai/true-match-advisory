import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const services = [
  {
    title: "Rekrutacja specjalistów",
    who: "Dla firm poszukujących doświadczonych specjalistów w kluczowych obszarach: finanse, IT, inżynieria, marketing, sprzedaż.",
    how: "Direct search, weryfikacja kompetencji, pogłębione wywiady behawioralne. Prezentacja 3–5 najlepszych kandydatów.",
    model: "Success fee — 18–22% rocznego wynagrodzenia brutto.",
    guarantee: "3 miesiące gwarancji zatrudnienia.",
  },
  {
    title: "Rekrutacja managerska",
    who: "Dla organizacji budujących silne struktury zarządcze — dyrektorzy działów, Head of, VP.",
    how: "Analiza potrzeb organizacyjnych, mapowanie rynku talentów, precyzyjna selekcja i rekomendacja kandydatów z udokumentowanym doświadczeniem w zarządzaniu.",
    model: "Success fee — 20–22% rocznego wynagrodzenia brutto.",
    guarantee: "6 miesięcy gwarancji zatrudnienia.",
  },
  {
    title: "Executive search",
    who: "Dla zarządów i rad nadzorczych — CEO, CFO, COO, członkowie zarządu, kluczowi liderzy strategiczni.",
    how: "Dyskretny, wieloetapowy proces oparty na relacjach, referencjach i pogłębionej ocenie dopasowania kulturowego.",
    model: "Indywidualnie ustalane warunki współpracy.",
    guarantee: "6 miesięcy gwarancji zatrudnienia.",
  },
  {
    title: "Headhunting niszowych kompetencji",
    who: "Dla firm poszukujących unikatowych profili — rzadkie specjalizacje, niszowe technologie, kompetencje trudne do znalezienia na otwartym rynku.",
    how: "Precyzyjny mapping rynku, dotarcie do kandydatów niedostępnych w tradycyjnych kanałach, indywidualne podejście do każdego procesu.",
    model: "Success fee lub retainer — warunki ustalane indywidualnie.",
    guarantee: "3–6 miesięcy gwarancji zatrudnienia.",
  },
];

const Services = () => (
  <Layout>
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-8">Usługi</p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl max-w-3xl mb-8 text-balance">
            Kompleksowe wsparcie w pozyskiwaniu kluczowych talentów.
          </h1>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mb-24">
            Każdy proces jest inny. Dlatego każdą współpracę zaczynam od głębokiego zrozumienia organizacji, kultury i realnych potrzeb.
          </p>
        </AnimatedSection>

        <div className="space-y-32">
          {services.map((s, i) => (
            <AnimatedSection key={s.title}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                  <p className="text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground mb-3">0{i + 1}</p>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground">{s.title}</h2>
                </div>
                <div className="lg:col-span-8 space-y-8">
                  <div>
                    <p className="text-xs font-sans uppercase tracking-[0.2em] text-gold mb-3">Dla kogo</p>
                    <p className="font-sans text-muted-foreground leading-relaxed">{s.who}</p>
                  </div>
                  <div>
                    <p className="text-xs font-sans uppercase tracking-[0.2em] text-gold mb-3">Jak działam</p>
                    <p className="font-sans text-muted-foreground leading-relaxed">{s.how}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-12">
                    <div>
                      <p className="text-xs font-sans uppercase tracking-[0.2em] text-gold mb-3">Model rozliczenia</p>
                      <p className="font-sans text-muted-foreground leading-relaxed">{s.model}</p>
                    </div>
                    <div>
                      <p className="text-xs font-sans uppercase tracking-[0.2em] text-gold mb-3">Gwarancja</p>
                      <p className="font-sans text-muted-foreground leading-relaxed">{s.guarantee}</p>
                    </div>
                  </div>
                </div>
              </div>
              {i < services.length - 1 && (
                <div className="mt-20 border-b border-border/50" />
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;

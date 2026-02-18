import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import nataliaOffice from "@/assets/natalia-office.jpg";

export const metadata: Metadata = {
  title: "O mnie — Natalia | Executive Search",
  description:
    "Doświadczenie w executive search i rekrutacji managerów. Łączę strategiczne myślenie z głębokim zrozumieniem ludzi i organizacji.",
};

const values = [
  { title: "Partnerstwo", desc: "Traktuję każdy proces jak wspólny projekt biznesowy. Jestem po tej samej stronie co klient." },
  { title: "Poufność", desc: "Informacje o procesie, kandydatach i warunkach są traktowane z najwyższą dyskrecją." },
  { title: "Jakość ponad ilość", desc: "3–5 starannie wyselekcjonowanych kandydatów zamiast dziesiątek losowych CV." },
  { title: "Odpowiedzialność za efekt", desc: "Gwarancja zatrudnienia i wsparcie na etapie onboardingu. Odpowiadam za rezultat." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <AnimatedSection>
              <div className="w-full max-w-md">
                <Image
                  src={nataliaOffice}
                  alt="Natalia — założycielka TrueMatch Advisory"
                  className="w-full object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-8">O mnie</p>
              <h1 className="font-serif text-3xl md:text-4xl leading-snug text-foreground mb-10 text-balance">
                Łączę strategiczne myślenie z&nbsp;głębokim zrozumieniem ludzi i&nbsp;organizacji.
              </h1>
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed">
                <p>
                  Przez lata pracowałam jako Dyrektorka HR w międzynarodowych organizacjach. Prowadziłam procesy rekrutacyjne, po których kandydaci pisali, że to najbardziej profesjonalna rekrutacja w ich życiu.
                </p>
                <p>
                  Wyciągałam na rozmowy osoby z najwyższych szczebli globalnych korporacji — ludzi, którzy nie szukali pracy. Przekonywałam ich precyzją procesu, jakością rozmowy i wiarygodnością oferty.
                </p>
                <p>
                  TrueMatch Advisory to naturalna kontynuacja tego doświadczenia — butikowa firma, w której każdy klient i każdy kandydat otrzymuje indywidualną uwagę na najwyższym poziomie.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold-light mb-8">Wartości</p>
            <h2 className="font-serif text-3xl md:text-4xl max-w-2xl mb-20">
              Fundamenty, na których buduję każdą współpracę.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <p className="font-serif text-xl text-gold-light mb-4">{v.title}</p>
                <p className="font-sans text-sm opacity-70 leading-relaxed max-w-md">{v.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

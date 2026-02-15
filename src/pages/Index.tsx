import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import nataliaPortrait from "@/assets/natalia-portrait.jpg";
import nataliaPhone from "@/assets/natalia-phone.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => (
  <Layout>
    {/* HERO */}
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-muted-foreground mb-8">
              Executive Search & Recruitment Advisory
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.15] text-foreground mb-8 text-balance">
              Rekrutuję ekspertów i&nbsp;liderów, którzy realnie budują wartość biznesu.
            </h1>
            <p className="text-lg font-sans text-muted-foreground max-w-lg mb-12 leading-relaxed">
              Butikowa rekrutacja specjalistów i kadry managerskiej w modelu success fee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-wide hover:opacity-90 transition-opacity"
              >
                Umów rozmowę
              </Link>
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center px-8 py-4 border border-foreground/20 text-foreground font-sans text-sm tracking-wide hover:border-foreground/40 transition-colors"
              >
                Porozmawiajmy o rekrutacji
              </Link>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="hidden lg:flex justify-end">
            <div className="w-80 xl:w-96">
              <img
                src={nataliaPortrait}
                alt="Natalia — założycielka TrueMatch Advisory"
                className="w-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* PROBLEM */}
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <AnimatedSection>
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-8">Wyzwanie</p>
            <div className="space-y-6">
              <p className="font-serif text-2xl md:text-3xl text-foreground leading-snug">
                Trudno znaleźć właściwego kandydata?
              </p>
              <p className="font-serif text-2xl md:text-3xl text-foreground leading-snug">
                CV nie odzwierciedlają realnych kompetencji?
              </p>
              <p className="font-serif text-2xl md:text-3xl text-foreground leading-snug">
                Proces trwa miesiącami?
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="lg:pt-8">
              <img
                src={nataliaPhone}
                alt="Natalia w trakcie rozmowy z klientem"
                className="w-full max-w-sm object-cover mb-8"
              />
              <p className="font-sans text-muted-foreground leading-relaxed text-lg">
                Większość procesów rekrutacyjnych kończy się kompromisem. Zatrudniasz osobę, która „wystarczy" — zamiast tej, która realnie zmieni dynamikę organizacji. Dobrze przeprowadzony direct search eliminuje ten problem u źródła.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* PODEJŚCIE */}
    <section className="py-32 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold-light mb-8">Podejście</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] max-w-3xl mb-16 text-balance">
            Nie wysyłam dziesiątek CV.<br />
            Prezentuję 3–5 precyzyjnie dopasowanych kandydatów.
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { title: "Direct search", desc: "Aktywne dotarcie do najlepszych kandydatów, także tych, którzy nie szukają pracy." },
            { title: "Relacje", desc: "Lata budowanych kontaktów na poziomie senior i C-level w Polsce i za granicą." },
            { title: "Poufność", desc: "Dyskrecja na każdym etapie — zarówno wobec klienta, jak i kandydata." },
            { title: "Jakość rozmowy", desc: "Każda rekomendacja oparta na pogłębionej analizie kompetencji i dopasowania kulturowego." },
          ].map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <p className="font-serif text-xl mb-4 text-gold-light">{item.title}</p>
              <p className="font-sans text-sm leading-relaxed opacity-70">{item.desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* MODEL WSPÓŁPRACY */}
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-8">Model współpracy</p>
          <h2 className="font-serif text-3xl md:text-4xl max-w-2xl mb-20">
            Transparentne warunki, mierzalne efekty.
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {[
            { label: "Model", value: "Success fee" },
            { label: "Wynagrodzenie", value: "18–22% rocznego wynagrodzenia brutto" },
            { label: "Gwarancja", value: "3–6 miesięcy" },
            { label: "Proces", value: "Transparentny i mierzalny" },
          ].map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.08}>
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground mb-3">{item.label}</p>
              <p className="font-serif text-xl text-foreground">{item.value}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-8 text-balance">
            Szukasz eksperta lub lidera?
          </h2>
          <p className="font-sans text-lg text-muted-foreground mb-12">
            Umów 30-minutową rozmowę wstępną.
          </p>
          <Link
            to="/kontakt"
            className="inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground font-sans text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Umów rozmowę
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default Index;

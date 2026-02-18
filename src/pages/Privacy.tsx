import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useSeo } from "@/hooks/use-seo";

const Privacy = () => {
  useSeo({
    title: "Polityka Prywatności | TrueMatch Advisory",
    description: "Polityka prywatności TrueMatch Advisory. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.",
  });

  return (
  <Layout>
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-8">Informacje prawne</p>
          <h1 className="font-serif text-3xl md:text-4xl mb-16">Polityka prywatności</h1>
          <div className="space-y-8 font-sans text-muted-foreground leading-relaxed text-sm">
            <div>
              <h2 className="font-serif text-lg text-foreground mb-4">1. Administrator danych</h2>
              <p>Administratorem danych osobowych jest TrueMatch Advisory. Kontakt: kontakt@truematch.pl.</p>
            </div>
            <div>
              <h2 className="font-serif text-lg text-foreground mb-4">2. Zakres przetwarzania</h2>
              <p>Przetwarzamy dane osobowe podane dobrowolnie za pośrednictwem formularzy kontaktowych oraz aplikacji kandydatów, w tym: imię i nazwisko, adres e-mail, numer telefonu, dane zawodowe, CV.</p>
            </div>
            <div>
              <h2 className="font-serif text-lg text-foreground mb-4">3. Cel przetwarzania</h2>
              <p>Dane przetwarzane są w celu: odpowiedzi na zapytania, realizacji procesów rekrutacyjnych, prowadzenia przyszłych procesów rekrutacyjnych (za zgodą).</p>
            </div>
            <div>
              <h2 className="font-serif text-lg text-foreground mb-4">4. Prawa użytkownika</h2>
              <p>Użytkownik ma prawo do: dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu wobec przetwarzania.</p>
            </div>
            <div>
              <h2 className="font-serif text-lg text-foreground mb-4">5. Okres przechowywania</h2>
              <p>Dane przechowywane są przez okres niezbędny do realizacji celów przetwarzania, nie dłużej niż 24 miesiące od ostatniego kontaktu, chyba że wyrażono zgodę na dłuższe przechowywanie.</p>
            </div>
            <div>
              <h2 className="font-serif text-lg text-foreground mb-4">6. Kontakt</h2>
              <p>W sprawach dotyczących ochrony danych osobowych prosimy o kontakt pod adresem: kontakt@truematch.pl.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
  );
};

export default Privacy;

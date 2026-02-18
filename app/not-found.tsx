import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-32">
      <div className="max-w-md text-center px-6">
        <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-8">
          Błąd 404
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
          Strona nie&nbsp;została znaleziona
        </h1>
        <p className="font-sans text-muted-foreground leading-relaxed mb-10">
          Strona, której szukasz, nie istnieje lub została przeniesiona.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 border border-foreground/20 text-foreground font-sans text-sm tracking-wide hover:border-foreground/40 transition-colors"
          >
            Strona główna
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Kontakt
          </Link>
        </div>
      </div>
    </section>
  );
}

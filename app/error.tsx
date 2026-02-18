"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-32">
      <div className="max-w-md text-center px-6">
        <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-8">
          Wystąpił błąd
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
          Coś poszło nie&nbsp;tak
        </h1>
        <p className="font-sans text-muted-foreground leading-relaxed mb-10">
          Przepraszamy za utrudnienia. Spróbuj odświeżyć stronę.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-wide hover:opacity-90 transition-opacity"
        >
          Spróbuj ponownie
        </button>
      </div>
    </section>
  );
}

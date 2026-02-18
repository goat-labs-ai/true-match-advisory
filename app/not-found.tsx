import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Strona nie została znaleziona</p>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}

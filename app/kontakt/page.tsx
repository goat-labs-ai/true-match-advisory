import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt — Umów Rozmowę",
  description:
    "Skontaktuj się z TrueMatch Advisory. Porozmawiajmy o rekrutacji managerów, executive search lub headhuntingu ekspertów dla Twojej organizacji.",
};

export default function ContactPage() {
  return <ContactForm />;
}

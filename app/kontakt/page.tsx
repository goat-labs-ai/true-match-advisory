import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się w sprawie rekrutacji specjalistów, managerów i executive search. Odpowiedź w ciągu 24 godzin.",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  return <ContactForm />;
}

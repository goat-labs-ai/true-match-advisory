import type { Metadata } from "next";
import CandidatesForm from "@/components/CandidatesForm";

export const metadata: Metadata = {
  title: "Dla kandydatów",
  description:
    "Współpraca dla ekspertów i liderów. Dyskretny proces, jasna komunikacja i selekcja dopasowana do kultury organizacji.",
  alternates: { canonical: "/dla-kandydatow" },
};

export default function CandidatesPage() {
  return <CandidatesForm />;
}

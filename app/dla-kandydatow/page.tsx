import type { Metadata } from "next";
import CandidatesForm from "@/components/CandidatesForm";

export const metadata: Metadata = {
  title: "Dla Kandydatów — Kariera i Headhunting Ekspertów",
  description:
    "Współpracuję z ekspertami i liderami szukającymi nowych wyzwań. Dyskretny headhunting, indywidualne podejście i dostęp do ofert executive search.",
};

export default function CandidatesPage() {
  return <CandidatesForm />;
}

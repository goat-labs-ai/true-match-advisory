import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const candidatesSchema = z.object({
  name: z.string().min(2, "Imię i nazwisko jest wymagane"),
  email: z.string().email("Podaj prawidłowy adres email"),
  phone: z
    .string()
    .min(7, "Podaj prawidłowy numer telefonu")
    .regex(/^[+\d\s()-]+$/, "Podaj prawidłowy numer telefonu"),
  linkedin: z
    .string()
    .url("Podaj prawidłowy adres URL")
    .optional()
    .or(z.literal("")),
  rodo: z.literal(true, {
    errorMap: () => ({ message: "Zgoda na przetwarzanie danych jest wymagana" }),
  }),
  future: z.boolean().optional(),
});

export type CandidatesFormData = z.infer<typeof candidatesSchema>;

/** Server-side only — validates the uploaded file from FormData */
export function validateCvFile(file: File | null): string | null {
  if (!file) return null;
  if (file.type !== "application/pdf") return "CV musi być w formacie PDF";
  if (file.size > MAX_FILE_SIZE) return "Plik CV nie może przekraczać 5 MB";
  return null;
}

/** Client-side — validates a FileList from an input */
export function validateCvFileClient(files: FileList | null): string | null {
  if (!files || files.length === 0) return null;
  const file = files[0];
  if (file.type !== "application/pdf") return "CV musi być w formacie PDF";
  if (file.size > MAX_FILE_SIZE) return "Plik CV nie może przekraczać 5 MB";
  return null;
}

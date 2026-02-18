import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Imię i nazwisko jest wymagane"),
  company: z.string().min(1, "Nazwa firmy jest wymagana"),
  position: z.string().min(1, "Stanowisko jest wymagane"),
  email: z.string().email("Podaj prawidłowy adres email"),
  phone: z
    .string()
    .min(7, "Podaj prawidłowy numer telefonu")
    .regex(/^[+\d\s()-]+$/, "Podaj prawidłowy numer telefonu"),
  description: z.string().min(10, "Opis potrzeby musi mieć co najmniej 10 znaków"),
  rodo: z.literal(true, {
    errorMap: () => ({ message: "Zgoda na przetwarzanie danych jest wymagana" }),
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

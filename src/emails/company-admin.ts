import { esc, escMultiline, formatDate } from "./utils";
import { styles, wrapHtml, privacyFooter } from "./layout";

export interface CompanyAdminData {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  description: string;
  sentAt?: Date;
}

export function renderCompanyAdminEmail(data: CompanyAdminData) {
  const {
    name,
    company,
    position,
    email,
    phone,
    description,
    sentAt = new Date(),
  } = data;

  const subject = `[TrueMatch] Zapytanie firmowe — ${company} / ${name}`;

  const html = wrapHtml(`
    <h1 style="${styles.heading}">Nowe zapytanie z formularza kontaktowego</h1>

    <p style="${styles.label}">Imię i nazwisko</p>
    <p style="${styles.value}">${esc(name)}</p>

    <p style="${styles.label}">Firma</p>
    <p style="${styles.value}">${esc(company)}</p>

    <p style="${styles.label}">Stanowisko</p>
    <p style="${styles.value}">${esc(position)}</p>

    <p style="${styles.label}">Email</p>
    <p style="${styles.value}"><a href="mailto:${esc(email)}" style="${styles.link}">${esc(email)}</a></p>

    <p style="${styles.label}">Telefon</p>
    <p style="${styles.value}">${esc(phone)}</p>

    <hr style="${styles.divider}" />

    <p style="${styles.label}">Opis potrzeby</p>
    <p style="${styles.value}">${escMultiline(description)}</p>

    <hr style="${styles.divider}" />
    <p style="${styles.meta_text}">Wysłano: ${formatDate(sentAt)}</p>
    <p style="${styles.meta_text}">Źródło: formularz kontaktowy truematchadvisory.com</p>

    ${privacyFooter()}
  `);

  const text = [
    `NOWE ZAPYTANIE Z FORMULARZA KONTAKTOWEGO`,
    ``,
    `Imię i nazwisko: ${name}`,
    `Firma: ${company}`,
    `Stanowisko: ${position}`,
    `Email: ${email}`,
    `Telefon: ${phone}`,
    ``,
    `--- Opis potrzeby ---`,
    description,
    ``,
    `---`,
    `Wysłano: ${formatDate(sentAt)}`,
    `Źródło: formularz kontaktowy truematchadvisory.com`,
  ].join("\n");

  return { subject, html, text };
}

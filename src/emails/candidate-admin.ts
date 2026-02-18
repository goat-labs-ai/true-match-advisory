import { esc, formatDate } from "./utils";
import { styles, wrapHtml, privacyFooter } from "./layout";

export interface CandidateAdminData {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  hasCv: boolean;
  cvFilename?: string;
  future: boolean;
  sentAt?: Date;
}

export function renderCandidateAdminEmail(data: CandidateAdminData) {
  const {
    name,
    email,
    phone,
    linkedin,
    hasCv,
    cvFilename,
    future,
    sentAt = new Date(),
  } = data;

  const subject = `[TrueMatch] Aplikacja kandydata — ${name}`;

  const linkedinRow = linkedin
    ? `<p style="${styles.label}">LinkedIn</p>
       <p style="${styles.value}"><a href="${esc(linkedin)}" style="${styles.link}">${esc(linkedin)}</a></p>`
    : "";

  const html = wrapHtml(`
    <h1 style="${styles.heading}">Nowa aplikacja z formularza dla kandydatów</h1>

    <p style="${styles.label}">Imię i nazwisko</p>
    <p style="${styles.value}">${esc(name)}</p>

    <p style="${styles.label}">Email</p>
    <p style="${styles.value}"><a href="mailto:${esc(email)}" style="${styles.link}">${esc(email)}</a></p>

    <p style="${styles.label}">Telefon</p>
    <p style="${styles.value}">${esc(phone)}</p>

    ${linkedinRow}

    <hr style="${styles.divider}" />

    <p style="${styles.label}">CV załączone</p>
    <p style="${styles.value}">${hasCv ? `Tak — ${esc(cvFilename || "CV.pdf")}` : "Nie"}</p>

    <p style="${styles.label}">Zgoda RODO</p>
    <p style="${styles.value}">Tak</p>

    <p style="${styles.label}">Zgoda na przyszłe procesy</p>
    <p style="${styles.value}">${future ? "Tak" : "Nie"}</p>

    <hr style="${styles.divider}" />
    <p style="${styles.meta_text}">Wysłano: ${formatDate(sentAt)}</p>
    <p style="${styles.meta_text}">Źródło: formularz dla kandydatów truematchadvisory.com</p>

    ${privacyFooter()}
  `);

  const text = [
    `NOWA APLIKACJA Z FORMULARZA DLA KANDYDATÓW`,
    ``,
    `Imię i nazwisko: ${name}`,
    `Email: ${email}`,
    `Telefon: ${phone}`,
    ...(linkedin ? [`LinkedIn: ${linkedin}`] : []),
    ``,
    `CV załączone: ${hasCv ? `Tak — ${cvFilename || "CV.pdf"}` : "Nie"}`,
    `Zgoda RODO: Tak`,
    `Zgoda na przyszłe procesy: ${future ? "Tak" : "Nie"}`,
    ``,
    `---`,
    `Wysłano: ${formatDate(sentAt)}`,
    `Źródło: formularz dla kandydatów truematchadvisory.com`,
  ].join("\n");

  return { subject, html, text };
}

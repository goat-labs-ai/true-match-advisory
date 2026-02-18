import { esc } from "./utils";
import {
  styles,
  wrapHtml,
  signatureBlock,
  signatureText,
  privacyFooter,
  privacyFooterText,
} from "./layout";

export interface CompanyReplyData {
  name: string;
  replyTo?: string;
}

export function renderCompanyReplyEmail(data: CompanyReplyData) {
  const { name, replyTo } = data;

  const subject = "Potwierdzenie otrzymania wiadomości — TrueMatch Advisory";

  const html = wrapHtml(`
    <h1 style="${styles.heading}">Dziękuję za wiadomość</h1>

    <p style="${styles.body_text}">Szanowny/a ${esc(name)},</p>

    <p style="${styles.body_text}">
      Dziękuję za kontakt z TrueMatch Advisory. Potwierdzam otrzymanie Twojej wiadomości.
    </p>

    <p style="${styles.body_text}">
      Odpowiem w ciągu 24 godzin z propozycją terminu spotkania.
    </p>

    <p style="${styles.body_text}">Pozdrawiam,</p>

    ${signatureBlock(replyTo)}

    ${privacyFooter()}
  `);

  const text = [
    `Dziękuję za wiadomość`,
    ``,
    `Szanowny/a ${name},`,
    ``,
    `Dziękuję za kontakt z TrueMatch Advisory. Potwierdzam otrzymanie Twojej wiadomości.`,
    ``,
    `Odpowiem w ciągu 24 godzin z propozycją terminu spotkania.`,
    ``,
    `Pozdrawiam,`,
    signatureText(replyTo),
    ``,
    privacyFooterText(),
  ].join("\n");

  return { subject, html, text };
}

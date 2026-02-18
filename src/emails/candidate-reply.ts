import { esc } from "./utils";
import {
  styles,
  wrapHtml,
  signatureBlock,
  signatureText,
  privacyFooter,
  privacyFooterText,
} from "./layout";

export interface CandidateReplyData {
  name: string;
  replyTo?: string;
}

export function renderCandidateReplyEmail(data: CandidateReplyData) {
  const { name, replyTo } = data;

  const subject = "Potwierdzenie otrzymania aplikacji — TrueMatch Advisory";

  const html = wrapHtml(`
    <h1 style="${styles.heading}">Dziękuję za przesłanie aplikacji</h1>

    <p style="${styles.body_text}">Szanowny/a ${esc(name)},</p>

    <p style="${styles.body_text}">
      Dziękuję za zainteresowanie współpracą z TrueMatch Advisory. Potwierdzam otrzymanie Twojej aplikacji.
    </p>

    <p style="${styles.body_text}">
      Skontaktuję się z Tobą w ciągu 3 dni roboczych.
    </p>

    <p style="${styles.body_text}">Pozdrawiam,</p>

    ${signatureBlock(replyTo)}

    ${privacyFooter()}
  `);

  const text = [
    `Dziękuję za przesłanie aplikacji`,
    ``,
    `Szanowny/a ${name},`,
    ``,
    `Dziękuję za zainteresowanie współpracą z TrueMatch Advisory. Potwierdzam otrzymanie Twojej aplikacji.`,
    ``,
    `Skontaktuję się z Tobą w ciągu 3 dni roboczych.`,
    ``,
    `Pozdrawiam,`,
    signatureText(replyTo),
    ``,
    privacyFooterText(),
  ].join("\n");

  return { subject, html, text };
}

const PRIVACY_URL = "https://truematchadvisory.com/polityka-prywatnosci";
const MAIL_REPLY_TO_FALLBACK = "kontakt@truematchadvisory.com";

// -- Shared inline styles --------------------------------------------------

export const styles = {
  body: 'margin: 0; padding: 0; background-color: #faf9f7; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1a1a2e;',
  wrapper: "max-width: 600px; margin: 0 auto; padding: 48px 32px;",
  heading: 'font-family: ui-serif, Georgia, "Times New Roman", serif; font-size: 18px; font-weight: 500; color: #1a1a2e; margin: 0 0 32px 0; letter-spacing: 0.01em;',
  label: "font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin: 0 0 4px 0;",
  value: "font-size: 14px; color: #1a1a2e; margin: 0 0 20px 0; line-height: 1.6;",
  body_text: "font-size: 15px; line-height: 1.7; color: #1a1a2e; margin: 0 0 16px 0;",
  divider: "border: none; border-top: 1px solid #e8e6e1; margin: 32px 0;",
  accent_line: "border: none; border-top: 2px solid #c9a84c; width: 40px; margin: 0 0 32px 0;",
  meta_text: "font-size: 12px; color: #999; margin: 0 0 4px 0;",
  footer_text: "font-size: 12px; color: #aaa; line-height: 1.6; margin: 0;",
  link: "color: #1a1a2e; text-decoration: none;",
  sig_name: "font-size: 14px; color: #1a1a2e; margin: 0; font-weight: 500;",
  sig_company: "font-size: 13px; color: #666; margin: 2px 0 0 0;",
  sig_email: "font-size: 13px; color: #666; margin: 2px 0 0 0;",
} as const;

// -- Shared blocks ---------------------------------------------------------

export function signatureBlock(replyTo?: string): string {
  const email = replyTo || MAIL_REPLY_TO_FALLBACK;
  return `
    <p style="${styles.sig_name}">Natalia</p>
    <p style="${styles.sig_company}">TrueMatch Advisory</p>
    <p style="${styles.sig_email}"><a href="mailto:${email}" style="${styles.link}">${email}</a></p>
  `;
}

export function signatureText(replyTo?: string): string {
  const email = replyTo || MAIL_REPLY_TO_FALLBACK;
  return `Natalia\nTrueMatch Advisory\n${email}`;
}

export function privacyFooter(): string {
  return `
    <hr style="${styles.divider}" />
    <p style="${styles.footer_text}">
      Twoje dane przetwarzane są zgodnie z naszą
      <a href="${PRIVACY_URL}" style="color: #aaa;">polityką prywatności</a>.
    </p>
  `;
}

export function privacyFooterText(): string {
  return `---\nTwoje dane przetwarzane są zgodnie z naszą polityką prywatności: ${PRIVACY_URL}`;
}

// -- Full HTML wrapper -----------------------------------------------------

export function wrapHtml(content: string): string {
  return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="${styles.body}">
  <div style="${styles.wrapper}">
    <hr style="${styles.accent_line}" />
    ${content}
  </div>
</body>
</html>`;
}

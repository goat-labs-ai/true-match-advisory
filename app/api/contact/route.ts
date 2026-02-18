import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Mail service is not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const body = await request.json();
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, company, position, email, phone, description } = result.data;

  const mailFrom = process.env.MAIL_FROM || "kontakt@truematchadvisory.com";
  const mailTo = process.env.MAIL_TO || "natalia@truematchadvisory.com";
  const mailReplyTo = process.env.MAIL_REPLY_TO || mailTo;

  try {
    // 1. Notification email to the business
    await resend.emails.send({
      from: `TrueMatch Advisory <${mailFrom}>`,
      to: mailTo,
      replyTo: email,
      subject: `Nowe zapytanie od ${name} — ${company}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
          <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 24px; border-bottom: 1px solid #e5e5e5; padding-bottom: 16px;">
            Nowe zapytanie z formularza kontaktowego
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px; vertical-align: top;">Imię i nazwisko</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Firma</td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Stanowisko</td>
              <td style="padding: 8px 0;">${position}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a1a2e;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Telefon</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
            <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Opis potrzeby</p>
            <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${description}</p>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: #999;">
            Wiadomość wysłana z formularza na truematchadvisory.com
          </p>
        </div>
      `,
    });

    // 2. Autoresponder to the sender
    await resend.emails.send({
      from: `TrueMatch Advisory <${mailFrom}>`,
      to: email,
      replyTo: mailReplyTo,
      subject: "Potwierdzenie otrzymania wiadomości — TrueMatch Advisory",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
            Szanowny/a ${name},
          </p>
          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
            Dziękuję za wiadomość. Potwierdzam jej otrzymanie.
          </p>
          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
            Odpowiem w ciągu 24 godzin z propozycją terminu spotkania.
          </p>
          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 4px;">
            Pozdrawiam,
          </p>
          <p style="font-size: 15px; line-height: 1.7;">
            Natalia<br/>
            <span style="color: #666; font-size: 13px;">TrueMatch Advisory</span><br/>
            <a href="mailto:${mailReplyTo}" style="color: #666; font-size: 13px;">${mailReplyTo}</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}

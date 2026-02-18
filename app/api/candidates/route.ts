import { NextResponse } from "next/server";
import { Resend } from "resend";
import { candidatesSchema, validateCvFile } from "@/lib/validations/candidates";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Mail service is not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const formData = await request.formData();

  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    linkedin: formData.get("linkedin") as string,
    rodo: formData.get("rodo") === "true",
    future: formData.get("future") === "true",
  };

  const result = candidatesSchema.safeParse(raw);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, phone, linkedin, future } = result.data;

  const cvFile = formData.get("cv") as File | null;
  const cvError = validateCvFile(cvFile);
  if (cvError) {
    return NextResponse.json(
      { error: cvError },
      { status: 400 }
    );
  }

  const mailFrom = process.env.MAIL_FROM || "kontakt@truematchadvisory.com";
  const mailTo = process.env.MAIL_TO || "natalia@truematchadvisory.com";
  const mailReplyTo = process.env.MAIL_REPLY_TO || mailTo;

  // Prepare CV attachment if present
  const attachments: { filename: string; content: Buffer }[] = [];
  if (cvFile && cvFile.size > 0) {
    const buffer = Buffer.from(await cvFile.arrayBuffer());
    attachments.push({
      filename: cvFile.name || "CV.pdf",
      content: buffer,
    });
  }

  try {
    // 1. Notification email to the business
    await resend.emails.send({
      from: `TrueMatch Advisory <${mailFrom}>`,
      to: mailTo,
      replyTo: email,
      subject: `Nowa aplikacja kandydata — ${name}`,
      attachments,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
          <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 24px; border-bottom: 1px solid #e5e5e5; padding-bottom: 16px;">
            Nowa aplikacja z formularza dla kandydatów
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px; vertical-align: top;">Imię i nazwisko</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a1a2e;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Telefon</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>
            ${linkedin ? `
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">LinkedIn</td>
              <td style="padding: 8px 0;"><a href="${linkedin}" style="color: #1a1a2e;">${linkedin}</a></td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">CV załączone</td>
              <td style="padding: 8px 0;">${attachments.length > 0 ? "Tak" : "Nie"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Zgoda RODO</td>
              <td style="padding: 8px 0;">Tak</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Przyszłe procesy</td>
              <td style="padding: 8px 0;">${future ? "Tak" : "Nie"}</td>
            </tr>
          </table>
          <p style="margin-top: 32px; font-size: 12px; color: #999;">
            Aplikacja wysłana z formularza na truematchadvisory.com
          </p>
        </div>
      `,
    });

    // 2. Autoresponder to the candidate
    await resend.emails.send({
      from: `TrueMatch Advisory <${mailFrom}>`,
      to: email,
      replyTo: mailReplyTo,
      subject: "Potwierdzenie otrzymania aplikacji — TrueMatch Advisory",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
            Szanowny/a ${name},
          </p>
          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
            Dziękuję za przesłanie aplikacji. Potwierdzam jej otrzymanie.
          </p>
          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
            Skontaktuję się w ciągu 3 dni roboczych.
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
    console.error("Failed to send candidate email:", error);
    return NextResponse.json(
      { error: "Nie udało się wysłać aplikacji. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}

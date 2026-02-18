import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";
import { renderCompanyAdminEmail, renderCompanyReplyEmail } from "@/emails";
import { checkOrigin, checkHoneypot, rateLimit } from "@/lib/api-helpers";

export async function POST(request: Request) {
  // ── Guards ────────────────────────────────────────────────────────────
  const originError = checkOrigin(request);
  if (originError) return originError;

  const rateLimitError = rateLimit(request);
  if (rateLimitError) return rateLimitError;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Mail service is not configured" },
      { status: 503 }
    );
  }

  // ── Parse & validate ──────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  // Honeypot check
  const honeypotError = checkHoneypot(
    (body as Record<string, unknown>)?.website as string | undefined
  );
  if (honeypotError) return honeypotError;

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, company, position, email, phone, description } = result.data;

  // ── Send emails ───────────────────────────────────────────────────────
  const resend = new Resend(apiKey);
  const mailFrom = process.env.MAIL_FROM || "kontakt@truematchadvisory.com";
  const mailTo = process.env.MAIL_TO || "natalia@truematchadvisory.com";
  const mailReplyTo = process.env.MAIL_REPLY_TO || mailTo;

  const adminEmail = renderCompanyAdminEmail({
    name,
    company,
    position,
    email,
    phone,
    description,
  });

  const replyEmail = renderCompanyReplyEmail({
    name,
    replyTo: mailReplyTo,
  });

  try {
    await Promise.all([
      resend.emails.send({
        from: `TrueMatch Advisory <${mailFrom}>`,
        to: mailTo,
        replyTo: email,
        subject: adminEmail.subject,
        html: adminEmail.html,
        text: adminEmail.text,
      }),
      resend.emails.send({
        from: `TrueMatch Advisory <${mailFrom}>`,
        to: email,
        replyTo: mailReplyTo,
        subject: replyEmail.subject,
        html: replyEmail.html,
        text: replyEmail.text,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}

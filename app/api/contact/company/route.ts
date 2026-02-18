import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";
import { renderCompanyAdminEmail, renderCompanyReplyEmail } from "@/emails";

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

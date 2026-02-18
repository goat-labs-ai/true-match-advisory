import { NextResponse } from "next/server";
import { Resend } from "resend";
import { candidatesSchema, validateCvFile } from "@/lib/validations/candidates";
import { renderCandidateAdminEmail, renderCandidateReplyEmail } from "@/emails";
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

  // ── Parse FormData ────────────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  // Honeypot check
  const honeypotError = checkHoneypot(formData.get("website") as string | null);
  if (honeypotError) return honeypotError;

  // ── Validate fields ───────────────────────────────────────────────────
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

  // ── Validate CV file ──────────────────────────────────────────────────
  const cvFile = formData.get("cv") as File | null;
  const cvError = validateCvFile(cvFile);
  if (cvError) {
    return NextResponse.json(
      { error: cvError },
      { status: 400 }
    );
  }

  // ── Send emails ───────────────────────────────────────────────────────
  const resend = new Resend(apiKey);
  const mailFrom = process.env.MAIL_FROM || "kontakt@truematchadvisory.com";
  const mailTo = process.env.MAIL_TO || "natalia@truematchadvisory.com";
  const mailReplyTo = process.env.MAIL_REPLY_TO || mailTo;

  // Prepare CV attachment if present
  const attachments: { filename: string; content: Buffer }[] = [];
  let cvFilename: string | undefined;
  if (cvFile && cvFile.size > 0) {
    cvFilename = cvFile.name || "CV.pdf";
    const buffer = Buffer.from(await cvFile.arrayBuffer());
    attachments.push({ filename: cvFilename, content: buffer });
  }

  const adminEmail = renderCandidateAdminEmail({
    name,
    email,
    phone,
    linkedin: linkedin || undefined,
    hasCv: attachments.length > 0,
    cvFilename,
    future: future ?? false,
  });

  const replyEmail = renderCandidateReplyEmail({
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
        attachments,
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
    console.error("Failed to send candidate email:", error);
    return NextResponse.json(
      { error: "Nie udało się wysłać aplikacji. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

// ── Allowed origins ─────────────────────────────────────────────────────

const ALLOWED_ORIGINS = [
  "https://truematchadvisory.com",
  "https://www.truematchadvisory.com",
];

if (process.env.NODE_ENV === "development") {
  ALLOWED_ORIGINS.push("http://localhost:3000", "http://localhost:3001");
}

if (process.env.NEXT_PUBLIC_SITE_URL) {
  ALLOWED_ORIGINS.push(process.env.NEXT_PUBLIC_SITE_URL);
}

/**
 * Verify that the request Origin header matches an allowed origin.
 * Returns an error response if the origin is not allowed, or null if OK.
 */
export function checkOrigin(request: Request): NextResponse | null {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Allow requests without origin (e.g. server-side, curl in dev)
  if (!origin && !referer) {
    if (process.env.NODE_ENV === "development") return null;
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  const requestOrigin = origin || new URL(referer!).origin;

  if (!ALLOWED_ORIGINS.includes(requestOrigin)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  return null;
}

// ── Honeypot check ──────────────────────────────────────────────────────

/**
 * Check honeypot field. If filled, it's a bot — return 200 silently.
 * Returns a fake success response if bot detected, or null if human.
 */
export function checkHoneypot(value: string | null | undefined): NextResponse | null {
  if (value) {
    // Bot detected — return fake success to not alert the bot
    return NextResponse.json({ success: true });
  }
  return null;
}

// ── In-memory rate limiter ──────────────────────────────────────────────
// For production with multiple instances, replace with Upstash Redis.
// This works fine for single-instance Vercel deployments.

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window per IP

/**
 * Rate limit by IP address.
 * Returns an error response if rate limited, or null if OK.
 */
export function rateLimit(request: Request): NextResponse | null {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return null;
  }

  entry.count++;

  if (entry.count > RATE_LIMIT_MAX) {
    return NextResponse.json(
      { error: "Zbyt wiele prób. Spróbuj ponownie za minutę." },
      { status: 429 }
    );
  }

  return null;
}

// Periodic cleanup of expired entries (every 5 minutes)
if (typeof globalThis !== "undefined") {
  const CLEANUP_INTERVAL = 5 * 60 * 1000;
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap) {
      if (now > entry.resetAt) rateLimitMap.delete(key);
    }
  }, CLEANUP_INTERVAL).unref?.();
}

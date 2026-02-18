# TrueMatch Advisory

Butikowa firma executive search i rekrutacji managerów.

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Resend

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values (at minimum: RESEND_API_KEY)

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

### Scripts

| Command          | Description                 |
|------------------|-----------------------------|
| `npm run dev`    | Start development server    |
| `npm run build`  | Production build            |
| `npm run start`  | Start production server     |
| `npm run lint`   | Run ESLint                  |

## Environment Variables

| Variable                 | Required | Description                                      |
|--------------------------|----------|--------------------------------------------------|
| `NEXT_PUBLIC_SITE_URL`   | Yes      | Canonical site URL (default: `https://truematchadvisory.com`) |
| `RESEND_API_KEY`         | Yes      | Resend API key for transactional emails           |
| `MAIL_FROM`              | Yes      | Sender address (`kontakt@truematchadvisory.com`)  |
| `MAIL_TO`                | Yes      | Admin inbox (supports Gmail fallback)             |
| `MAIL_REPLY_TO`          | Yes      | Reply-to address (defaults to `MAIL_TO`)          |

Optional (for future scaling):

| Variable                    | Description                          |
|-----------------------------|--------------------------------------|
| `UPSTASH_REDIS_REST_URL`    | Upstash Redis for distributed rate limiting |
| `UPSTASH_REDIS_REST_TOKEN`  | Upstash Redis auth token             |
| `R2_ACCOUNT_ID`             | Cloudflare R2 for CV storage         |
| `R2_ACCESS_KEY_ID`          | R2 access key                        |
| `R2_SECRET_ACCESS_KEY`      | R2 secret key                        |
| `R2_BUCKET_NAME`            | R2 bucket name                       |
| `R2_PUBLIC_BASE_URL`        | R2 public URL prefix                 |

## Deploy to Vercel

### 1. Connect repository

- Import the repository at [vercel.com/new](https://vercel.com/new)
- Framework preset: **Next.js** (auto-detected)
- Root directory: `.` (default)

### 2. Set environment variables

In **Vercel → Project → Settings → Environment Variables**, add all required vars from the table above.

### 3. Deploy

Push to `main` — Vercel builds and deploys automatically.

## Cloudflare DNS Setup

The site uses Cloudflare DNS in front of Vercel.

### DNS Records

| Type  | Name | Content                     | Proxy |
|-------|------|-----------------------------|-------|
| CNAME | `@`  | `cname.vercel-dns.com`      | DNS only (grey cloud) |
| CNAME | `www`| `cname.vercel-dns.com`      | DNS only (grey cloud) |

> **Important:** Set proxy to "DNS only" (grey cloud) — Vercel handles TLS. Using Cloudflare proxy (orange cloud) causes TLS conflicts.

### Vercel Domain Configuration

In **Vercel → Project → Settings → Domains**, add:

1. `truematchadvisory.com` (primary)
2. `www.truematchadvisory.com` → redirects to `truematchadvisory.com` (handled via `next.config.ts`)

## Resend Email Verification

1. Go to [resend.com/domains](https://resend.com/domains)
2. Add domain: `truematchadvisory.com`
3. Add the DNS records Resend provides (DKIM, SPF, DMARC) to Cloudflare
4. Verify in Resend dashboard
5. Use your API key as `RESEND_API_KEY`

### Required DNS records for Resend

| Type  | Name                          | Content                              |
|-------|-------------------------------|--------------------------------------|
| TXT   | `@`                           | SPF record from Resend               |
| CNAME | Resend DKIM selector          | DKIM value from Resend               |
| TXT   | `_dmarc`                      | `v=DMARC1; p=none;` (minimum)        |

## Project Structure

```
app/                        # Next.js App Router pages
  layout.tsx                # Root layout (fonts, metadata, JSON-LD, nav, footer)
  page.tsx                  # / (home)
  o-mnie/page.tsx           # /o-mnie
  uslugi/page.tsx           # /uslugi
  proces/page.tsx           # /proces
  dla-kandydatow/page.tsx   # /dla-kandydatow
  kontakt/page.tsx          # /kontakt
  polityka-prywatnosci/     # /polityka-prywatnosci
  not-found.tsx             # 404 page
  error.tsx                 # Error boundary
  sitemap.ts                # Dynamic sitemap
  robots.ts                 # Dynamic robots.txt
  api/contact/
    company/route.ts        # Company contact form API
    candidate/route.ts      # Candidate application API
src/
  components/               # React components (Navbar, Footer, forms, ui/)
  emails/                   # Email templates (HTML + plain text)
  lib/                      # Utilities, validation schemas, API helpers
  assets/                   # Static images
```

## Security

- **Headers:** HSTS, CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy (via `next.config.ts`)
- **API:** Origin check, honeypot fields, in-memory rate limiting (5 req/min per IP)
- **Validation:** Zod schemas on both client and server
- **File uploads:** PDF only, max 5 MB (constrained by Vercel serverless 4.5 MB body limit)

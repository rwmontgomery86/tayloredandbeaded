# Taylored & Beaded

Showcase website for Taylored & Beaded — one-of-a-kind handmade beaded jewelry
by Taylor. Next.js (App Router) + Tailwind v4 + Framer Motion + Sanity + Resend.

There is **no cart or checkout**: visitors browse and send an inquiry; Taylor
handles payment personally in her replies (bundle deals and Cash App/Zelle are
deliberately not published on the site).

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

The site renders fully from built-in **seed content** (real cropped product
photos + generated placeholders) until Sanity is configured, so it works with
zero env vars.

## Going live — one-time setup

### 1. Sanity (content management)

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage)
   (dataset: `production`).
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Restart the dev server, open `http://localhost:3000/studio`, sign in, and
   add content:
   - **Pricing** — seeded values: necklaces $25, others $15 (per-product
     override available on each product)
   - **Products** — photos, category, colors, featured/new flags
   - **Site Settings** and **Care Guide** singletons
4. In sanity.io/manage → API → CORS origins, add `http://localhost:3000` and
   the production domain (with credentials) so the embedded Studio can sign in.

Once Sanity has products, the seed content disappears automatically.

### 2. Resend (contact form + newsletter)

1. Create a free account at [resend.com](https://resend.com), make an API key.
2. Create an **Audience** (for newsletter signups) and copy its ID.
3. Set `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, and `CONTACT_TO_EMAIL`
   (Taylor's inbox) in `.env.local` / Vercel.
4. Verify the sending domain in Resend (SPF/DKIM DNS records) and then set
   `CONTACT_FROM_EMAIL="Taylored & Beaded <hello@yourdomain.com>"`. Until
   then, mail sends from `onboarding@resend.dev`.

In development with no Resend keys, form submissions are logged to the server
console and reported as successful.

### 3. Deploy to Vercel

1. Push to GitHub, import the repo in Vercel.
2. Add every variable from `.env.example` to Vercel (Production + Preview),
   including `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`.
3. After the first deploy, add a webhook in sanity.io/manage → API → Webhooks:
   - URL: `https://yourdomain.com/api/revalidate`
   - Trigger on create/update/delete for all document types
   - Projection: `{ "_type": _type, "slug": slug.current }`
   - Secret: the same value as `SANITY_REVALIDATE_SECRET`
   Edits in Studio then go live within seconds (hourly fallback otherwise).

## Architecture notes

- `src/lib/data.ts` — single data access layer; falls back to `src/lib/seed.ts`
  when Sanity isn't configured. Pages never know which source they render.
- Pricing: `product.price ?? pricing[category]` (Pricing singleton in Studio).
- `src/components/motion/` — Reveal/Stagger/FloatDecor wrappers keep pages as
  server components; all motion honors `prefers-reduced-motion`.
- Design tokens live in `src/app/globals.css` (`@theme`); brand guidance in
  `DESIGN.md` and `PRODUCT.md`.

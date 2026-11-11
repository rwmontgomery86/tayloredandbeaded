# Taylored & Beaded

Showcase website for Taylored & Beaded — one-of-a-kind handmade beaded jewelry
by Taylor. Next.js (App Router) + Tailwind v4 + Framer Motion + Sanity + Resend.

Configurable pieces can be bought online through **Square hosted checkout**
("Buy now") when `CHECKOUT_ENABLED=true`; with it off, the same form sends
Taylor an order request by email instead. Curated Edit pieces stay
inquiry-only. Bundle deals and Cash App/Zelle are deliberately not published
on the site.

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
3. Run `npm run sanity:seed` to populate the dataset with the built-in seed
   content (products with photos, collections, FAQ, pricing, care guide, and
   site settings). Idempotent — safe to re-run.
4. Restart the dev server, open `http://localhost:3000/studio`, sign in, and
   edit content from there.
5. In sanity.io/manage → API → CORS origins, add `http://localhost:3000` and
   the production domain (with credentials) so the embedded Studio can sign
   in. (Localhost can also be added via
   `npx sanity cors add http://localhost:3000 --credentials`.)

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

### 3. Square (online checkout)

1. In Taylor's Square account, create an app at developer.squareup.com.
2. Set `SQUARE_ACCESS_TOKEN` and `SQUARE_LOCATION_ID` (sandbox values on
   Preview, production values on Production) and `SQUARE_ENVIRONMENT`
   (`sandbox` or `production`).
3. Set `CHECKOUT_ENABLED=true` to swap "Request this piece" for "Buy now".
   Product pages are statically generated, so flipping it needs a redeploy.
4. Shipping charge, free-shipping threshold and sales tax live in the
   Pricing singleton in Studio.

Shoppers pay on Square's page and return to `/order/thanks`; orders (with the
piece's options in the line-item note) show up in Taylor's Square Dashboard.

### 4. Deploy to Vercel

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

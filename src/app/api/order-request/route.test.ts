import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ProductDetailData } from "@/lib/types";
import { SEED_CUSTOMIZATION } from "@/lib/seed";

const sent: { to: string; subject: string; text: string }[] = [];

vi.mock("resend", () => ({
  Resend: class {
    emails = {
      send: async (mail: { to: string; subject: string; text: string }) => {
        sent.push(mail);
        return { error: null };
      },
    };
  },
}));

const parker: ProductDetailData = {
  id: "seed-parker-necklace",
  name: "Parker",
  slug: "parker-necklace",
  category: "necklaces",
  availability: "year-round",
  origin: "handmade",
  price: 25,
  images: [],
  colors: [],
  newArrival: false,
  sold: false,
  related: [],
};

const mocks = vi.hoisted(() => ({
  getProduct: vi.fn(),
}));

vi.mock("@/lib/data", () => ({
  getProduct: mocks.getProduct,
  getCustomization: async () => SEED_CUSTOMIZATION,
  getPricing: async () => ({
    necklaces: 25,
    bracelets: 15,
    "bag-charms": 15,
  }),
}));

import { POST } from "./route";

function request(body: unknown) {
  return new Request("http://localhost/api/order-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const valid = {
  slug: "parker-necklace",
  config: { initialCharm: true, initial: "a", matchingBracelet: true },
  name: "Jess",
  email: "jess@example.com",
  notes: "For my sister!",
  elapsed: 10_000,
};

describe("POST /api/order-request", () => {
  beforeEach(() => {
    sent.length = 0;
    mocks.getProduct.mockResolvedValue(parker);
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "taylor@example.com");
  });

  it("rejects an invalid payload", async () => {
    const res = await POST(request({ slug: "", name: "" }));
    expect(res.status).toBe(400);
    expect(sent).toHaveLength(0);
  });

  it("pretends success on a filled honeypot", async () => {
    const res = await POST(request({ ...valid, website: "spam.example" }));
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(0);
  });

  it("pretends success on a superhuman submit", async () => {
    const res = await POST(request({ ...valid, elapsed: 500 }));
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(0);
  });

  it("requires the initial when the initial charm is on", async () => {
    const res = await POST(
      request({ ...valid, config: { initialCharm: true } }),
    );
    expect(res.status).toBe(400);
  });

  it("404s for an unknown or curated piece", async () => {
    mocks.getProduct.mockResolvedValue(null);
    expect((await POST(request(valid))).status).toBe(404);

    mocks.getProduct.mockResolvedValue({ ...parker, origin: "curated" });
    expect((await POST(request(valid))).status).toBe(404);
  });

  it("refuses a sold premade piece", async () => {
    mocks.getProduct.mockResolvedValue({
      ...parker,
      availability: "premade",
      sold: true,
    });
    expect((await POST(request(valid))).status).toBe(409);
  });

  it("recomputes the total server-side and emails both parties", async () => {
    const res = await POST(request({ ...valid, total: 1 }));
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(2);

    const [toTaylor, toShopper] = sent;
    expect(toTaylor.to).toBe("taylor@example.com");
    // 25 base + 3 initial charm + 15 matching bracelet, never the client's number
    expect(toTaylor.text).toContain("Total: $43");
    expect(toTaylor.text).toContain("“A”");
    expect(toTaylor.text).toContain("For my sister!");

    expect(toShopper.to).toBe("jess@example.com");
    expect(toShopper.text).toContain("Total: $43");
    expect(toShopper.text).toContain("No payment is taken online");
  });

  it("strips add-ons the product doesn't offer", async () => {
    mocks.getProduct.mockResolvedValue({ ...parker, availability: "premade" });
    const res = await POST(request(valid));
    expect(res.status).toBe(200);
    // premade necklaces can't take the matching bracelet: 25 + 3 only
    expect(sent[0].text).toContain("Total: $28");
    expect(sent[0].text).not.toContain("Matching bracelet");
  });

  const confetti = {
    ...parker,
    name: "Bag Charm",
    slug: "confetti-bag-charm",
    category: "bag-charms" as const,
    availability: "year-round" as const,
  };

  it("carries bag-charm choices into the email and prices the scarf", async () => {
    mocks.getProduct.mockResolvedValue(confetti);
    const res = await POST(
      request({
        ...valid,
        slug: "confetti-bag-charm",
        config: {
          beadColor: "Seafoam Green",
          personalization: "MAMA",
          charms: ["MAMA", "Bow"],
          bagScarf: true,
          matchingBracelet: true, // not offered on bag charms — must be stripped
        },
      }),
    );
    expect(res.status).toBe(200);
    const text = sent[0].text;
    // price override 25 + $5 scarf; no bracelet, no initial charm
    expect(text).toContain("Total: $30");
    expect(text).toContain("Bead color: Seafoam Green");
    expect(text).toContain("Charms: MAMA, Bow");
    expect(text).toContain("Initial or name: “MAMA”");
    expect(text).not.toContain("Matching bracelet");
  });

  it("requires a valid bead color for bag charms", async () => {
    mocks.getProduct.mockResolvedValue(confetti);
    const missing = await POST(
      request({ ...valid, slug: "confetti-bag-charm", config: {} }),
    );
    expect(missing.status).toBe(400);

    const unknown = await POST(
      request({
        ...valid,
        slug: "confetti-bag-charm",
        config: { beadColor: "Chartreuse" },
      }),
    );
    expect(unknown.status).toBe(400);
    expect(sent).toHaveLength(0);
  });

  it("rejects personalization that isn't name-like (e.g. URLs)", async () => {
    mocks.getProduct.mockResolvedValue(confetti);
    const res = await POST(
      request({
        ...valid,
        slug: "confetti-bag-charm",
        config: { beadColor: "Pink", personalization: "https://x.co" },
      }),
    );
    expect(res.status).toBe(400);
    expect(sent).toHaveLength(0);
  });

  it("rejects charms that aren't in the configured options", async () => {
    mocks.getProduct.mockResolvedValue(confetti);
    const res = await POST(
      request({
        ...valid,
        slug: "confetti-bag-charm",
        config: { beadColor: "Pink", charms: ["MAMA", "Not A Real Charm"] },
      }),
    );
    expect(res.status).toBe(400);
    expect(sent).toHaveLength(0);
  });

  it("excludes shopper-written text from the confirmation email", async () => {
    const res = await POST(request(valid));
    expect(res.status).toBe(200);
    const toShopper = sent[1];
    expect(toShopper.text).not.toContain("For my sister!");
    expect(toShopper.text).not.toContain("Jess");
  });

  it("does not price the scarf for non-bag-charm products", async () => {
    const res = await POST(
      request({ ...valid, config: { bagScarf: true } }),
    );
    expect(res.status).toBe(200);
    expect(sent[0].text).toContain("Total: $25");
  });

  it("fails closed when email is unconfigured outside development", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await POST(request(valid));
    expect(res.status).toBe(503);
  });
});

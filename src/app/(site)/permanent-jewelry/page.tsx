import type { Metadata } from "next";
import PjBookingBrochure from "@/components/permanent-jewelry/PjBookingBrochure";
import { getFaq } from "@/lib/data";

export const metadata: Metadata = {
  title: "Permanent Jewelry",
  description:
    "Dainty chains custom-fit and welded closed, in person — permanent jewelry at pop-ups, parties, and local events. Book Taylor for a fitting or for your event.",
};

export default async function PermanentJewelryPage() {
  const faq = await getFaq();
  const pjFaq = faq.filter((f) => f.category === "permanent-jewelry");

  return <PjBookingBrochure faq={pjFaq.length > 0 ? pjFaq : undefined} />;
}

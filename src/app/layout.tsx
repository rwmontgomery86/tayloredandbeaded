import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSettings } from "@/lib/data";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Taylored & Beaded — Handmade Beaded Jewelry",
    template: "%s — Taylored & Beaded",
  },
  description:
    "One-of-a-kind handmade beaded necklaces, bracelets, anklets, and bag charms. Colorful, meaningful pieces made to celebrate life's little moments.",
  openGraph: {
    siteName: "Taylored & Beaded",
    type: "website",
    images: ["/brand/og-card.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {/* Without JS, Framer Motion's SSR'd initial styles would hide content */}
        <noscript>
          <style>{`[style*="opacity"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <AnnouncementBar messages={settings.announcementMessages} />
        <Header instagramUrl={settings.instagramUrl} />
        <main className="flex-1">{children}</main>
        <Footer instagramUrl={settings.instagramUrl} />
      </body>
    </html>
  );
}

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
  title: {
    default: "Taylored & Beaded — Handmade Beaded Jewelry",
    template: "%s — Taylored & Beaded",
  },
  description:
    "One-of-a-kind handmade beaded necklaces, bracelets, anklets, and bag charms. Colorful, meaningful pieces made to celebrate life's little moments.",
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
        <AnnouncementBar messages={settings.announcementMessages} />
        <Header instagramUrl={settings.instagramUrl} />
        <main className="flex-1">{children}</main>
        <Footer instagramUrl={settings.instagramUrl} />
      </body>
    </html>
  );
}

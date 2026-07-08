import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  return (
    <>
      {/* Without JS, Framer Motion's SSR'd initial styles would hide content */}
      <noscript>
        <style>{`[style*="opacity"]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <AnnouncementBar messages={settings.announcementMessages} />
      <Header instagramUrl={settings.instagramUrl} />
      <main className="flex-1">{children}</main>
      <Footer instagramUrl={settings.instagramUrl} />
    </>
  );
}

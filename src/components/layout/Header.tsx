"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { InstagramIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";
import { INSTAGRAM_URL } from "@/lib/site";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-cream/95 backdrop-blur-sm transition-shadow duration-500",
        scrolled && "shadow-[0_1px_0_0_rgba(61,55,51,0.08)]",
      )}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5 py-3 md:px-8 md:py-4">
        {/* left: nav (desktop) / menu button (mobile) */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline text-[0.72rem] tracking-[0.18em] uppercase text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="justify-self-start p-2 -ml-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>

        {/* center: logo */}
        <Link href="/" aria-label="Taylored & Beaded — home" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.png"
            alt=""
            width={88}
            height={88}
            priority
            className={cn(
              "transition-[width,height] duration-500",
              scrolled ? "h-14 w-14 md:h-16 md:w-16" : "h-16 w-16 md:h-[88px] md:w-[88px]",
            )}
          />
        </Link>

        {/* right: instagram */}
        <div className="flex items-center justify-end gap-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Taylored & Beaded on Instagram"
            className="p-2 -mr-2 text-ink transition-colors hover:text-mauve-deep"
          >
            <InstagramIcon size={20} />
          </a>
        </div>
      </div>

      {/* mobile nav panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-x-0 top-full flex h-[calc(100dvh-100%)] flex-col gap-2 bg-cream px-8 pt-10 md:hidden"
          >
            {NAV.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-serif text-3xl text-ink"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

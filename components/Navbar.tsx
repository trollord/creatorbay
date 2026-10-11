"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Menu, X } from "lucide-react";
import { navLinks, contact, whatsappLink, instagramLink } from "@/lib/site";
import { getLenis } from "@/components/motion/SmoothScroll";
import BLogo from "@/components/BLogo";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof v === "function" ? v(open) : v) ? pathname : null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > lastY.current + 2);
      if (y < lastY.current - 2) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(
    () => {
      const el = menuRef.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: open ? 1 : 0 });
        return;
      }
      if (open) {
        gsap.timeline()
          .set(el, { autoAlpha: 1 })
          .fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.out" })
          .from("[data-menu-link]", { yPercent: 110, duration: 0.8, stagger: 0.06, ease: "expo.out" }, 0.1)
          .from("[data-menu-foot]", { autoAlpha: 0, y: 16, duration: 0.5 }, 0.35);
      } else {
        gsap.to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.45, ease: "power3.in", onComplete: () => gsap.set(el, { autoAlpha: 0 }) });
      }
    },
    { dependencies: [open], scope: menuRef }
  );

  const solid = scrolled && !open;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[80] flex justify-center px-3 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:px-5 md:pt-4"
        style={{ transform: hidden && !open ? "translateY(-120%)" : "translateY(0)" }}
      >
        <nav
          aria-label="Main"
          className={`flex w-full items-center justify-between rounded-full transition-[max-width,background-color,padding,box-shadow] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            solid
              ? "max-w-[1080px] bg-ink/92 py-2 pl-3 pr-2 text-paper shadow-[0_14px_40px_rgba(0,0,0,0.25)] ring-1 ring-white/10 backdrop-blur-md"
              : `max-w-[1600px] py-2 pl-2 pr-1 ${open ? "text-ink" : "text-ink"}`
          }`}
        >
          <Link href="/" aria-label="Creator Bay home" className="group flex items-center gap-2.5">
            <BLogo className="h-9 w-auto transition-transform duration-300 ease-out group-hover:-rotate-6" body={solid ? "#fb3036" : "#1d1d1d"} />
            <span className="font-display text-[26px] leading-none tracking-[0.01em] [word-spacing:0.22em]">Creator Bay</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative rounded-full px-4 py-2 text-[15px] font-medium"
                >
                  <span className="relative inline-block overflow-hidden align-top">
                    <span className="block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full">
                      {l.name}
                    </span>
                    <span className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0">
                      {l.name}
                    </span>
                  </span>
                  {active && (
                    <span className={`absolute bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${solid ? "bg-red" : "bg-ink"}`} />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className={`ml-2 inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-[transform,background-color] duration-200 ease-out active:scale-[0.97] ${
                solid ? "bg-red text-ink hover:bg-paper" : "bg-ink text-paper hover:bg-ink-2"
              }`}
            >
              <span className="rec-dot h-2 w-2 rounded-full bg-current" />
              Start a campaign
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`relative grid h-11 w-11 place-items-center rounded-full transition-transform duration-150 ease-out active:scale-[0.94] md:hidden ${
              solid ? "bg-red text-ink" : "bg-ink text-paper"
            }`}
          >
            <Menu
              size={22}
              strokeWidth={2.4}
              aria-hidden
              className={`absolute transition-[opacity,transform] duration-200 ease-out ${open ? "scale-50 rotate-90 opacity-0" : "opacity-100"}`}
            />
            <X
              size={22}
              strokeWidth={2.4}
              aria-hidden
              className={`absolute transition-[opacity,transform] duration-200 ease-out ${open ? "opacity-100" : "scale-50 -rotate-90 opacity-0"}`}
            />
          </button>
        </nav>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        className="invisible fixed inset-0 z-[70] flex flex-col justify-between bg-red px-5 pb-8 pt-28 text-ink md:hidden"
        aria-hidden={!open}
      >
        <ul className="flex flex-col">
          {[{ name: "Home", href: "/" }, ...navLinks].map((l) => (
            <li key={l.href} className="overflow-hidden">
              <Link
                data-menu-link
                href={l.href}
                tabIndex={open ? 0 : -1}
                className="font-display block py-1 text-[19vw] leading-[0.9]"
              >
                {l.name}
                {pathname === l.href && <span className="ml-3 inline-block h-4 w-4 rounded-full bg-ink align-middle" />}
              </Link>
            </li>
          ))}
        </ul>
        <div data-menu-foot className="flex flex-col gap-2 text-[15px] font-medium">
          <a href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1}>{contact.email}</a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
            WhatsApp {contact.whatsappDisplay}
          </a>
          <a href={instagramLink} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
            @{contact.instagram}
          </a>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { navLinks, contact, whatsappLink, instagramLink } from "@/lib/site";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-wordmark] span", {
        yPercent: 100,
        ease: "expo.out",
        duration: 1.3,
        stagger: 0.045,
        scrollTrigger: { trigger: "[data-wordmark]", start: "top 95%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <footer ref={ref} className="on-dark relative overflow-hidden bg-ink text-paper">
      <div className="gutter grid gap-12 pt-20 pb-10 grid-cols-[minmax(0,1fr)] md:grid-cols-12 md:pt-28">
        <div className="md:col-span-5">
          <p className="max-w-[22ch] text-[28px] font-semibold leading-[1.1] md:text-[34px]">
            Influencer marketing for brands and events.
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="mt-8 inline-block border-b-2 border-red pb-1 text-[18px] font-medium transition-colors duration-200 hover:text-red"
          >
            {contact.email}
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="mb-4 text-[13px] text-paper/45">Pages</p>
          <ul className="flex flex-col gap-2 text-[17px]">
            <li>
              <Link href="/" className="transition-colors duration-200 hover:text-red">Home</Link>
            </li>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors duration-200 hover:text-red">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="mb-4 text-[13px] text-paper/45">Talk to us</p>
          <ul className="flex flex-col gap-2 text-[17px]">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-red">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-red">
                Instagram
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="transition-colors duration-200 hover:text-red">
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="gutter flex flex-col gap-3 border-t border-white/10 py-6 text-[13px] text-paper/50 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Creator Bay LLP. Mumbai, India.</p>
        <div className="flex gap-5">
          <Link href="/privacy-policy" className="transition-colors duration-200 hover:text-paper">
            Privacy policy
          </Link>
          <Link href="/terms-and-conditions" className="transition-colors duration-200 hover:text-paper">
            Terms &amp; conditions
          </Link>
        </div>
      </div>

      <p
        data-wordmark
        aria-hidden
        className="font-display flex select-none justify-between overflow-hidden px-[1vw] pb-[1.5vw] text-[14.6vw] leading-[0.8] text-red"
      >
        {"CREATOR BAY".split("").map((c, i) =>
          c === " " ? (
            <span key={i} className="inline-block w-[0.32em]" />
          ) : (
            <span key={i} className="inline-block">
              {c}
            </span>
          )
        )}
      </p>
    </footer>
  );
}

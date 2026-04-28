"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarCtx {
  scrolled: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const NavbarContext = createContext<NavbarCtx>({
  scrolled: false,
  mobileOpen: false,
  setMobileOpen: () => {},
});

const useNavbar = () => useContext(NavbarContext);

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Services", link: "/services" },
  { name: "Work", link: "/work" },
  { name: "Contact", link: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY > 40) setMobileOpen(false);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const active = scrolled || mobileOpen;

  return (
    <NavbarContext.Provider value={{ scrolled, mobileOpen, setMobileOpen }}>
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ padding: scrolled ? "10px 20px 0" : "0" }}
      >
        <div
          className="w-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            maxWidth: scrolled ? "min(960px, calc(100vw - 40px))" : "100%",
            borderRadius: scrolled ? "2rem" : mobileOpen ? "1.25rem" : "0",
            background: scrolled
              ? "rgba(10,10,10,0.92)"
              : mobileOpen
              ? "rgba(15,15,15,0.98)"
              : "transparent",
            boxShadow: active
              ? "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)"
              : "none",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            overflow: "hidden",
          }}
        >
          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-between px-6 lg:px-8 h-[64px]">
            <NavLogo scrolled={scrolled} />
            <nav className="flex items-center gap-7">
              {navItems.map((item) => {
                const isActive = pathname === item.link;
                return (
                  <Link
                    key={item.link}
                    href={item.link}
                    className="text-sm font-medium relative group transition-colors duration-200"
                    style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.55)" }}
                  >
                    {item.name}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
                      style={{
                        width: isActive ? "100%" : "0",
                        background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                      }}
                    />
                    {!isActive && (
                      <span
                        className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                        style={{ background: "linear-gradient(90deg, #8b5cf6, #ec4899)" }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/contact"
              className="text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                color: "#fff",
              }}
            >
              Work With Us
            </Link>
          </div>

          {/* Mobile nav */}
          <div className="md:hidden">
            <div className="flex items-center justify-between px-5 h-[60px]">
              <NavLogo scrolled={scrolled} />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                className="p-2 rounded-lg focus:outline-none"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className="block h-0.5 w-full rounded-full transition-all duration-300 origin-center"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none",
                    }}
                  />
                  <span
                    className="block h-0.5 w-full rounded-full transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      opacity: mobileOpen ? 0 : 1,
                    }}
                  />
                  <span
                    className="block h-0.5 w-full rounded-full transition-all duration-300 origin-center"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none",
                    }}
                  />
                </div>
              </button>
            </div>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex flex-col gap-1 px-5 pb-6 pt-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {navItems.map((item, i) => (
                      <motion.div
                        key={item.link}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={item.link}
                          onClick={() => setMobileOpen(false)}
                          className="block py-3 text-sm font-medium text-white/70 hover:text-white transition-colors"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navItems.length * 0.05 }}
                      className="mt-2"
                    >
                      <Link
                        href="/contact"
                        onClick={() => setMobileOpen(false)}
                        className="block w-full text-center py-3 rounded-full text-sm font-semibold text-white"
                        style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
                      >
                        Work With Us
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </NavbarContext.Provider>
  );
}

function NavLogo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 group shrink-0">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
        style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
      >
        CB
      </div>
      <span className="font-bold text-lg tracking-tight text-white">
        Creator<span style={{ color: "#8b5cf6" }}>Bay</span>
      </span>
    </Link>
  );
}

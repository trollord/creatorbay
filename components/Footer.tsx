"use client";

import Link from "next/link";
import { Share2, MessageCircle, Mail } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "#080808" }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #8b5cf6, #ec4899, transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
                style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
              >
                CB
              </div>
              <span className="font-bold text-xl text-white">
                Creator<span style={{ color: "#8b5cf6" }}>Bay</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              Influencer Marketing That Drives Reach, Relevance &amp; Results.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>
              Get In Touch
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:hello@creatorbaymedia.net"
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-white group"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.2)" }}
                >
                  <Mail size={14} color="#8b5cf6" />
                </div>
                hello@creatorbaymedia.net
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-white group"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)" }}
                >
                  <MessageCircle size={14} color="#25d366" />
                </div>
                Chat on WhatsApp
              </a>
              <a
                href="https://instagram.com/creatorbay.media"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-white group"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)" }}
                >
                  <Share2 size={14} color="#ec4899" />
                </div>
                @creatorbay.media
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2025 CreatorBay. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/creatorbay.media"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Share2 size={14} color="rgba(255,255,255,0.5)" />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <MessageCircle size={14} color="rgba(255,255,255,0.5)" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

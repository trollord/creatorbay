"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const values = [
  {
    number: "01",
    title: "Precision Over Volume",
    desc: "We don't chase follower counts. We match brands with creators whose audiences actually care — because relevance always outperforms reach alone.",
    color: "#8b5cf6",
    icon: "🎯",
  },
  {
    number: "02",
    title: "Creativity With Purpose",
    desc: "Every piece of content we produce or commission is built around a clear objective. Aesthetic without strategy is just noise.",
    color: "#ec4899",
    icon: "✨",
  },
  {
    number: "03",
    title: "Transparency & Trust",
    desc: "You'll always know what's happening, why it's happening, and what results it's driving. No fluff, no guesswork.",
    color: "#f59e0b",
    icon: "🔐",
  },
  {
    number: "04",
    title: "Results That Matter",
    desc: "Footfall. Engagement. Brand recall. Conversions. We measure what moves your business forward — nothing else.",
    color: "#06b6d4",
    icon: "📈",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
              top: "-10%",
              right: "10%",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.25)",
              color: "#8b5cf6",
            }}
          >
            About CreatorBay
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-8"
          >
            Built for Brands
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              That Want to Be Seen
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            CreatorBay was founded on one belief: the right creator, paired with the right brand,
            creates something unstoppable.
          </motion.p>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <FadeUp>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6 leading-tight">
                  We understand the creator economy{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    from the inside out.
                  </span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  We are an influencer marketing and creative campaign agency working with brands,
                  events, restaurants, hospitality businesses, and digital pages. Our approach blends
                  data-driven creator selection with culturally relevant storytelling — delivering
                  campaigns that don&apos;t just reach audiences, but resonate with them.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
                  That&apos;s why every campaign we build is rooted in authenticity, aligned with your
                  brand identity, and designed to convert attention into action. Whether you&apos;re
                  launching a product, filling seats at an event, or building your brand&apos;s online
                  presence — CreatorBay is your strategic partner from concept to content.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
                >
                  Work With Us
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </FadeUp>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "5000+", label: "Creators in Network", color: "#8b5cf6" },
                { value: "30+", label: "Campaigns Delivered", color: "#ec4899" },
                { value: "400K+", label: "Organic Impressions", color: "#f59e0b" },
                { value: "18%", label: "Avg. Engagement Rate", color: "#06b6d4" },
              ].map((stat, i) => (
                <FadeUp key={i} delay={0.1 + i * 0.08}>
                  <div
                    className="p-6 rounded-2xl text-center"
                    style={{
                      background: `${stat.color}08`,
                      border: `1px solid ${stat.color}20`,
                    }}
                  >
                    <div
                      className="text-3xl font-black mb-2"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {stat.label}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest mb-4 block" style={{ color: "#8b5cf6" }}>
              Our Values
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              What Drives{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Everything We Do
              </span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-8 rounded-2xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Glow */}
                  <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${value.color}12 0%, transparent 70%)`,
                      transform: "translate(30%, -30%)",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{
                          background: `${value.color}15`,
                          border: `1px solid ${value.color}25`,
                        }}
                      >
                        {value.icon}
                      </div>
                      <div>
                        <span
                          className="text-xs font-bold uppercase tracking-widest block mb-1"
                          style={{ color: `${value.color}70` }}
                        >
                          {value.number}
                        </span>
                        <h3 className="text-lg font-bold text-white">{value.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 text-center">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Ready to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Grow Together?
            </span>
          </h2>
          <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
            Let&apos;s build campaigns that don&apos;t just reach audiences — they move them.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
            >
              Start a Campaign
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              View Services
            </Link>
          </div>
        </FadeUp>
      </section>
    </>
  );
}

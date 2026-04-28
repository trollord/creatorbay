"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

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

const campaigns = [
  {
    id: 1,
    category: "Event Marketing",
    title: "The Grand Launch Experience",
    subtitle: "12 creator partnerships · 400K+ organic impressions · Sold-out event",
    description:
      "A product launch event transformed into a cultural moment. We partnered with 12 lifestyle and entertainment creators who built authentic anticipation, live coverage, and post-event buzz — turning a single evening into a week-long conversation.",
    metric1: { value: "400K+", label: "Organic Impressions" },
    metric2: { value: "12", label: "Creator Partners" },
    metric3: { value: "100%", label: "Tickets Sold" },
    quote: "CreatorBay understood the vibe of our event perfectly. The content felt native, not sponsored.",
    color: "#8b5cf6",
    tag: "Events",
  },
  {
    id: 2,
    category: "Restaurant Collaboration",
    title: "Weekend Footfall Campaign",
    subtitle: "8 food creator visits · 3x increase in weekend reservations within 2 weeks",
    description:
      "A premium restaurant struggling with weekend visibility partnered with us to drive awareness through authentic food storytelling. Eight carefully selected food and lifestyle creators visited, shared, and championed the experience — tripling weekend reservations in just 14 days.",
    metric1: { value: "3x", label: "Weekend Reservations" },
    metric2: { value: "8", label: "Food Creators" },
    metric3: { value: "14", label: "Days to Results" },
    quote: "We were fully booked every weekend after the campaign wrapped. Genuinely impressive.",
    color: "#ec4899",
    tag: "Restaurants",
  },
  {
    id: 3,
    category: "Brand + Reel Creation",
    title: "Viral Reel Content Series",
    subtitle: "6-reel series · 250K views · 18% engagement rate",
    description:
      "A DTC brand needed content that performed, not just looked good. We conceptualised, produced, and distributed a 6-reel series across creator channels and the brand's own page — generating 250,000 organic views and an 18% engagement rate that industry benchmarks sit at 3–5%.",
    metric1: { value: "250K", label: "Total Views" },
    metric2: { value: "18%", label: "Engagement Rate" },
    metric3: { value: "6", label: "Reels Produced" },
    quote: "The reels felt native, not sponsored. That's the magic of working with people who get the platform.",
    color: "#f59e0b",
    tag: "Brand",
  },
];

const categories = ["All", "Events", "Restaurants", "Brand"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeFilter === "All" ? campaigns : campaigns.filter((c) => c.tag === activeFilter);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
              top: "-10%",
              left: "20%",
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
              top: "10%",
              right: "15%",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.25)",
              color: "#f59e0b",
            }}
          >
            Our Work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-6"
          >
            Campaigns That
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Moved the Needle
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Real brands. Real creators. Real results.
          </motion.p>
        </div>
      </section>

      {/* ── Filter tabs ───────────────────────────────────────────────────── */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: activeFilter === cat ? "linear-gradient(135deg, #8b5cf6, #ec4899)" : "rgba(255,255,255,0.05)",
                  color: activeFilter === cat ? "#fff" : "rgba(255,255,255,0.5)",
                  border: activeFilter === cat ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Campaign cards ────────────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((campaign, i) => (
                <motion.div
                  key={campaign.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CardContainer containerClassName="h-full" className="h-full">
                    <CardBody className="h-full">
                      <div
                        className="h-full p-6 rounded-2xl flex flex-col cursor-pointer"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: `1px solid ${expandedId === campaign.id ? campaign.color + "40" : "rgba(255,255,255,0.07)"}`,
                          transition: "border-color 0.3s ease",
                        }}
                        onClick={() =>
                          setExpandedId(expandedId === campaign.id ? null : campaign.id)
                        }
                      >
                        {/* Glow */}
                        <div
                          className="absolute top-0 left-0 right-0 h-px"
                          style={{ background: `linear-gradient(90deg, transparent, ${campaign.color}50, transparent)` }}
                        />

                        <CardItem translateZ={40}>
                          <span
                            className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                            style={{ background: `${campaign.color}15`, color: campaign.color }}
                          >
                            {campaign.category}
                          </span>
                        </CardItem>

                        <CardItem translateZ={60} className="mt-4 mb-3">
                          <h3 className="text-xl font-bold text-white leading-tight">
                            {campaign.title}
                          </h3>
                        </CardItem>

                        <CardItem translateZ={50}>
                          <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {campaign.subtitle}
                          </p>

                          {/* Metrics */}
                          <div className="grid grid-cols-3 gap-3 mb-5">
                            {[campaign.metric1, campaign.metric2, campaign.metric3].map((m, mi) => (
                              <div
                                key={mi}
                                className="text-center p-2 rounded-xl"
                                style={{ background: `${campaign.color}08` }}
                              >
                                <div className="text-lg font-black" style={{ color: campaign.color }}>
                                  {m.value}
                                </div>
                                <div className="text-[9px] leading-tight" style={{ color: "rgba(255,255,255,0.3)" }}>
                                  {m.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardItem>

                        <AnimatePresence>
                          {expandedId === campaign.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p
                                className="text-xs leading-relaxed mb-4"
                                style={{ color: "rgba(255,255,255,0.5)" }}
                              >
                                {campaign.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <CardItem translateZ={30} className="mt-auto">
                          <p
                            className="text-xs italic leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                          >
                            &ldquo;{campaign.quote}&rdquo;
                          </p>
                          <div
                            className="text-xs mt-3 font-medium"
                            style={{ color: campaign.color }}
                          >
                            {expandedId === campaign.id ? "Click to collapse ↑" : "Click to read more ↓"}
                          </div>
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="py-32 px-6 text-center"
        style={{ background: "rgba(255,255,255,0.015)" }}
      >
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Ready to see your brand{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              here?
            </span>
          </h2>
          <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
            Let&apos;s build your next campaign together.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
          >
            Start a Collaboration
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </FadeUp>
      </section>
    </>
  );
}

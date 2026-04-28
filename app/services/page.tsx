"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StackedCards from "@/components/ui/stacked-cards";

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

const services = [
  {
    label: "01 — Event Marketing",
    title: "Influencer Marketing for Events",
    description:
      "Turn your event into a moment people talk about — before, during, and long after it ends. We source and manage creators who authentically amplify your event, driving awareness, ticket sales, and on-ground footfall through compelling content across Instagram, YouTube, and beyond.",
    icon: "🎪",
  },
  {
    label: "02 — Brand Strategy",
    title: "Brand Collaborations",
    description:
      "We craft strategic partnerships between brands and creators that go beyond a single post. Through long-form collaborations, ambassador programmes, and co-created campaigns, we build associations that stick and audiences that trust.",
    icon: "🤝",
  },
  {
    label: "03 — Hospitality",
    title: "Restaurant & Hospitality Collaborations",
    description:
      "In the food and hospitality space, visibility is everything. We connect restaurants, cafes, and lounges with the right food and lifestyle creators to drive footfall, increase reservations, and build a loyal community around your venue.",
    icon: "🍽️",
  },
  {
    label: "04 — Production",
    title: "Creative Production",
    description:
      "Great campaigns need great content. Our creative production service delivers high-quality visuals, campaign assets, and photography that are platform-ready and brand-consistent — crafted to perform, not just to look good.",
    icon: "📸",
  },
  {
    label: "05 — Short-Form Video",
    title: "Reel Creation for Brands & Pages",
    description:
      "Short-form video is the most powerful discovery tool on social media today. We conceptualise, shoot, and edit scroll-stopping reels that grow your page, build brand personality, and put your business in front of the audiences that matter.",
    icon: "🎬",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "We dive deep into your brand, goals, and target audience to understand exactly what success looks like for you.",
  },
  {
    step: "02",
    title: "Creator Matching",
    desc: "Using data and cultural insight, we handpick creators from our network of 5000+ who genuinely align with your brand.",
  },
  {
    step: "03",
    title: "Campaign Build",
    desc: "We develop the creative brief, content strategy, and campaign timeline — handling every detail end-to-end.",
  },
  {
    step: "04",
    title: "Execution & Live",
    desc: "Creators go live, we manage the process, monitor performance, and ensure everything is on-brand and on-time.",
  },
  {
    step: "05",
    title: "Results & Report",
    desc: "Full campaign report with reach, engagement, conversions, and insights to inform your next move.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-40 pb-12 md:pb-16 px-5 md:px-6 overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
              top: "-20%",
              left: "50%",
              transform: "translateX(-50%)",
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
              background: "rgba(236,72,153,0.1)",
              border: "1px solid rgba(236,72,153,0.25)",
              color: "#ec4899",
            }}
          >
            What We Offer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1] md:leading-[0.95] mb-6"
          >
            Everything You Need{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              to Grow Through Creators
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            From strategy to execution, CreatorBay delivers end-to-end influencer marketing and
            content solutions tailored to your brand.
          </motion.p>
        </div>
      </section>

      {/* ── Stacked Cards (Services) ──────────────────────────────────────── */}
      <section className="px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <StackedCards cards={services} />
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12 md:mb-16">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-4 block"
              style={{ color: "#f59e0b" }}
            >
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
              Our{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Process
              </span>
            </h2>
          </FadeUp>

          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: "linear-gradient(180deg, #8b5cf6, #ec4899, transparent)" }}
            />

            <div className="flex flex-col gap-12">
              {processSteps.map((step, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div
                    className={`relative flex gap-8 items-start md:items-center ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Step number bubble */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 hidden sm:flex">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black z-10"
                        style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)", color: "#fff" }}
                      >
                        {step.step}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full md:w-5/12 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="p-6 rounded-2xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <div
                          className="text-xs font-bold uppercase tracking-widest mb-2"
                          style={{ color: "#8b5cf6" }}
                        >
                          Step {step.step}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                          {step.desc}
                        </p>
                      </motion.div>
                    </div>

                    {/* Spacer for other side */}
                    <div className="hidden md:block w-5/12" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6 text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Ready to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Get Started?
            </span>
          </h2>
          <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
            Tell us about your campaign and we&apos;ll get back to you within 24 hours.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
          >
            Send My Brief
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </FadeUp>
      </section>
    </>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

/* ─── Fade-up helper ─────────────────────────────────────────────────────── */
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

/* ─── Animated counter ───────────────────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const duration = 1800;
    const fps = 60;
    const totalFrames = (duration / 1000) * fps;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / fps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Home page ──────────────────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 80]);

  const services = [
    {
      icon: "🎪",
      title: "Event Marketing",
      desc: "Turn your event into a moment people talk about — before, during, and long after.",
    },
    {
      icon: "🤝",
      title: "Brand Collaborations",
      desc: "Strategic partnerships that go beyond a single post and build lasting brand associations.",
    },
    {
      icon: "🍽️",
      title: "Restaurant & Hospitality",
      desc: "Drive footfall, reservations, and community around your venue with the right creators.",
    },
    {
      icon: "🎬",
      title: "Reel Creation",
      desc: "Scroll-stopping short-form video that grows your page and builds brand personality.",
    },
    {
      icon: "📸",
      title: "Creative Production",
      desc: "High-quality visuals and campaign assets that are platform-ready and brand-consistent.",
    },
    {
      icon: "📊",
      title: "Strategy & Analytics",
      desc: "Data-driven creator selection paired with culturally relevant storytelling.",
    },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      >
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
              top: "10%",
              left: "50%",
              x: "-50%",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
              bottom: "20%",
              right: "10%",
            }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
              top: "30%",
              left: "5%",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </div>

        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 max-w-5xl mx-auto">
          {/* Eyebrow */}
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
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
            Influencer Marketing Agency
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1] md:leading-[0.95] tracking-tight mb-6 text-balance"
          >
            We Turn{" "}
            <span
              className="gradient-text"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Creators
            </span>
            {" "}Into Your Most{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ec4899, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Powerful
            </span>{" "}
            Marketing Channel
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            CreatorBay connects brands, events, and restaurants with the right creators —
            building campaigns that drive real reach, deep engagement, and measurable results.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
            >
              Work With Us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/services"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-white/10"
              style={{
                color: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Book a Campaign
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <div className="w-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.4)" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      <section className="py-10 px-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { value: 5000, suffix: "+", label: "Creators in Network" },
            { value: 30, suffix: "+", label: "Campaigns Delivered" },
            { value: 400, suffix: "K+", label: "Organic Impressions" },
            { value: 18, suffix: "%", label: "Avg. Engagement Rate" },
          ].map((stat, i) => (
            <FadeUp key={i} delay={i * 0.1} className="text-center">
              <div
                className="text-4xl font-black mb-1"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                {stat.label}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── What We Do ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeUp>
                <span
                  className="text-xs font-semibold uppercase tracking-widest mb-4 block"
                  style={{ color: "#8b5cf6" }}
                >
                  What We Do
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6 tracking-tight">
                  We&apos;re not just an agency.{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    We&apos;re your creative growth partner.
                  </span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
                  CreatorBay is a full-service influencer marketing and content agency built for brands
                  that want to grow smarter. From discovering the right creators to executing
                  high-quality campaigns — we handle everything so you don&apos;t have to.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: <Users size={16} />, text: "5000+ vetted creators across every niche" },
                    { icon: <TrendingUp size={16} />, text: "End-to-end campaign management" },
                    { icon: <Zap size={16} />, text: "Results you can actually measure" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(139,92,246,0.15)", color: "#8b5cf6" }}
                      >
                        {item.icon}
                      </div>
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.4} className="mt-8">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#8b5cf6" }}
                >
                  Learn more about us
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </FadeUp>
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-2 gap-4">
              {services.map((svc, i) => (
                <FadeUp key={i} delay={0.1 + i * 0.07}>
                  <div
                    className="p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="text-2xl mb-3">{svc.icon}</div>
                    <h3 className="text-sm font-bold mb-2 text-white">{svc.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {svc.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Campaigns ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest mb-4 block" style={{ color: "#ec4899" }}>
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Campaigns That{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Moved the Needle
              </span>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
              Real brands. Real creators. Real results.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                label: "Event Marketing",
                title: "Sold-Out Event Campaign",
                metric: "400K+",
                metricLabel: "organic impressions",
                detail: "12 creator partnerships, sold-out event",
                color: "#8b5cf6",
                quote: "CreatorBay understood the vibe of our event perfectly.",
              },
              {
                label: "Restaurant Collaboration",
                title: "Restaurant Footfall Drive",
                metric: "3x",
                metricLabel: "weekend reservations",
                detail: "8 food creator visits, 2-week campaign",
                color: "#ec4899",
                quote: "We were fully booked every weekend after the campaign.",
              },
              {
                label: "Brand + Reel Creation",
                title: "Viral Reel Series",
                metric: "250K",
                metricLabel: "views, 18% engagement",
                detail: "6-reel content series, brand-consistent",
                color: "#f59e0b",
                quote: "The reels felt native, not sponsored. That's the magic.",
              },
            ].map((campaign, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <CardContainer containerClassName="h-full" className="h-full">
                  <CardBody className="h-full">
                    <div
                      className="h-full p-6 rounded-2xl flex flex-col"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <CardItem translateZ={40}>
                        <span
                          className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                          style={{
                            background: `${campaign.color}15`,
                            color: campaign.color,
                          }}
                        >
                          {campaign.label}
                        </span>
                      </CardItem>
                      <CardItem translateZ={60} className="mt-4 mb-2">
                        <h3 className="text-lg font-bold text-white">{campaign.title}</h3>
                      </CardItem>
                      <CardItem translateZ={50}>
                        <div className="mb-4">
                          <span className="text-3xl font-black" style={{ color: campaign.color }}>
                            {campaign.metric}
                          </span>
                          <span className="text-sm ml-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {campaign.metricLabel}
                          </span>
                        </div>
                        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {campaign.detail}
                        </p>
                      </CardItem>
                      <CardItem translateZ={30} className="mt-auto">
                        <p
                          className="text-sm italic leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                          &ldquo;{campaign.quote}&rdquo;
                        </p>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="text-center mt-12">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
            >
              See All Campaigns
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <div
              className="block px-5 sm:px-8 py-10 sm:py-14 md:py-16 rounded-2xl md:rounded-3xl w-full"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.1) 100%)",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight">
                Ready to Build{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Something Powerful?
                </span>
              </h2>
              <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
                Whether you have a brief ready or just an idea — we&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto text-center px-8 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
                >
                  Start a Collaboration
                </Link>
                <Link
                  href="/services"
                  className="w-full sm:w-auto text-center px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-white/5"
                  style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

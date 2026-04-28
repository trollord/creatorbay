"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, MessageCircle, Share2, ArrowRight, CheckCircle } from "lucide-react";

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
  "Influencer Marketing for Events",
  "Brand Collaborations",
  "Restaurant & Hospitality Collaborations",
  "Creative Production",
  "Reel Creation for Brands & Pages",
  "Strategy & Consultation",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${focused === field ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`,
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxShadow: focused === field ? "0 0 0 3px rgba(139,92,246,0.1)" : "none",
  });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-40 pb-12 md:pb-16 px-5 md:px-6 overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
              top: "-10%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
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
            Get In Touch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1] md:leading-[0.95] mb-6"
          >
            Let&apos;s Build
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Something Together
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Whether you have a brief ready or just an idea, we&apos;d love to hear from you.
            Our team will get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ── Form + Contact ────────────────────────────────────────────────── */}
      <section className="py-10 md:py-16 px-5 md:px-6 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl"
                  style={{
                    background: "rgba(139,92,246,0.05)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    minHeight: "400px",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle size={56} color="#8b5cf6" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mt-6 mb-3">
                    Brief Received!
                  </h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Thanks for reaching out. Our team will review your brief and get back to you
                    within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-xs font-medium mb-2"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        Your Name *
                      </label>
                      <input
                        name="name"
                        required
                        placeholder="Alex Johnson"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("name")}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-medium mb-2"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        Business / Brand Name *
                      </label>
                      <input
                        name="brand"
                        required
                        placeholder="Your Brand Co."
                        value={form.brand}
                        onChange={handleChange}
                        onFocus={() => setFocused("brand")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("brand")}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-xs font-medium mb-2"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="hello@yourbrand.com"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("email")}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-medium mb-2"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("phone")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-medium mb-2"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      Service You&apos;re Interested In
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      onFocus={() => setFocused("service")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("service"), cursor: "pointer" }}
                    >
                      <option value="" style={{ background: "#1a1a1a" }}>
                        Select a service...
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s} style={{ background: "#1a1a1a" }}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-medium mb-2"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      Tell Us About Your Campaign *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Describe your campaign goals, timeline, budget range, and anything else that would help us understand your brief..."
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("message"), resize: "vertical", minHeight: "120px" }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="flex items-center justify-center gap-3 py-4 px-8 rounded-full text-sm font-semibold text-white transition-all duration-300"
                    style={{
                      background: loading
                        ? "rgba(139,92,246,0.5)"
                        : "linear-gradient(135deg, #8b5cf6, #ec4899)",
                      cursor: loading ? "not-allowed" : "pointer",
                      boxShadow: loading ? "none" : "0 4px 24px rgba(139,92,246,0.3)",
                    }}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send My Brief
                        <ArrowRight size={14} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <FadeUp>
              <h3 className="text-lg font-bold text-white mb-2">Prefer to reach us directly?</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                We&apos;re quick to respond across all channels.
              </p>
            </FadeUp>

            {[
              {
                icon: <Mail size={18} />,
                label: "Email Us",
                value: "hello@creatorbaymedia.net",
                href: "mailto:hello@creatorbaymedia.net",
                color: "#8b5cf6",
              },
              {
                icon: <MessageCircle size={18} />,
                label: "Chat on WhatsApp",
                value: "Quick response guaranteed",
                href: "https://wa.me/1234567890",
                color: "#25d366",
              },
              {
                icon: <Share2 size={18} />,
                label: "Follow Our Work",
                value: "@creatorbay.media",
                href: "https://instagram.com/creatorbay.media",
                color: "#ec4899",
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-4 p-5 rounded-2xl block"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}25`,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-white">{item.value}</div>
                  </div>
                </motion.a>
              </FadeUp>
            ))}

            {/* Response time */}
            <FadeUp delay={0.3}>
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "rgba(139,92,246,0.05)",
                  border: "1px solid rgba(139,92,246,0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-semibold text-green-400">Currently Active</span>
                </div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  We typically respond within <strong className="text-white">24 hours</strong>.
                  For urgent campaigns, WhatsApp is the fastest way to reach us.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}

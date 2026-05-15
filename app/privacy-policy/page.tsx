"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Mail, MessageCircle } from "lucide-react";

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

export default function PrivacyPolicyPage() {
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
              border: "1px solid rgba(139,92,246,0.2)",
              color: "#a78bfa",
            }}
          >
            <Shield size={14} />
            Privacy Policy
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Your Privacy <span style={{ color: "#8b5cf6" }}>Matters</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            How CreatorBay collects, uses, and protects your information.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xs mt-6"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Last updated: May 15, 2026
          </motion.p>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <section className="relative pb-20 md:pb-28 px-5 md:px-6">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div
              className="rounded-2xl p-7 md:p-10 space-y-10"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Section title="1. Introduction">
                <p>
                  CreatorBay (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is an influencer marketing
                  agency that connects brands, events, and restaurants with creators. This Privacy Policy
                  explains how we collect, use, store, and share information when you visit our website,
                  contact us, or engage with our services — including communications over WhatsApp,
                  email, or phone.
                </p>
                <p>
                  By using our website or services, you agree to the practices described in this policy.
                </p>
              </Section>

              <Section title="2. Information We Collect">
                <p>We may collect the following categories of information:</p>
                <ul>
                  <li>
                    <strong>Contact details</strong> you submit through our forms or share with us
                    directly — including your name, brand name, email address, and phone number.
                  </li>
                  <li>
                    <strong>Project details</strong> you share with us about your campaign, service
                    requirements, budget, or business goals.
                  </li>
                  <li>
                    <strong>Communication records</strong> of messages exchanged with us via WhatsApp,
                    email, contact forms, or phone.
                  </li>
                  <li>
                    <strong>Technical data</strong> such as IP address, browser type, device information,
                    and pages visited, collected automatically when you browse our website.
                  </li>
                </ul>
              </Section>

              <Section title="3. How We Use Your Information">
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Respond to your inquiries and provide the services you request.</li>
                  <li>
                    Send campaign updates, proposals, invoices, and other transactional messages —
                    including over WhatsApp, where you have opted in.
                  </li>
                  <li>
                    Coordinate with creators, vendors, and partners on your behalf to deliver the
                    contracted services.
                  </li>
                  <li>Maintain records for accounting, tax, and legal compliance.</li>
                  <li>Improve our website, content, and service offerings.</li>
                </ul>
              </Section>

              <Section title="4. WhatsApp Business Communications">
                <p>
                  We use the WhatsApp Business Platform to communicate with clients and prospects who
                  have shared their phone number with us or initiated contact through WhatsApp. By
                  reaching out to us on WhatsApp or providing your number for WhatsApp follow-up, you
                  consent to receive messages from CreatorBay related to your inquiry, your active
                  campaign, or service updates.
                </p>
                <p>
                  We do not send unsolicited marketing on WhatsApp. You can opt out at any time by
                  replying &quot;STOP&quot; to any of our WhatsApp messages or by emailing us at the
                  address below.
                </p>
              </Section>

              <Section title="5. Sharing Your Information">
                <p>
                  We do not sell your personal information. We share information only as needed to
                  deliver the services you have engaged us for, including with:
                </p>
                <ul>
                  <li>
                    <strong>Creators and influencers</strong> we are coordinating for your campaign
                    (limited to what is necessary for the collaboration).
                  </li>
                  <li>
                    <strong>Service providers</strong> we rely on — such as email, hosting, analytics,
                    payment, and messaging platforms (including Meta / WhatsApp).
                  </li>
                  <li>
                    <strong>Legal and regulatory authorities</strong> where required by applicable law.
                  </li>
                </ul>
              </Section>

              <Section title="6. Data Retention">
                <p>
                  We retain personal information only for as long as needed to fulfil the purposes
                  outlined in this policy, to comply with our legal obligations, resolve disputes, and
                  enforce our agreements.
                </p>
              </Section>

              <Section title="7. Data Security">
                <p>
                  We take reasonable technical and organisational measures to protect the information we
                  hold against loss, misuse, and unauthorised access. However, no method of transmission
                  over the internet or method of electronic storage is fully secure, and we cannot
                  guarantee absolute security.
                </p>
              </Section>

              <Section title="8. Your Rights">
                <p>
                  Subject to applicable law, you have the right to access, correct, or request deletion
                  of the personal information we hold about you, and to withdraw any consent you have
                  previously given. To exercise these rights, contact us using the details below.
                </p>
              </Section>

              <Section title="9. Cookies">
                <p>
                  Our website may use cookies and similar technologies to enable basic functionality and
                  to understand how visitors use the site. You can control cookies through your browser
                  settings.
                </p>
              </Section>

              <Section title="10. Third-Party Links">
                <p>
                  Our website and messages may contain links to third-party sites (for example, creator
                  profiles on Instagram). We are not responsible for the privacy practices of those
                  sites and encourage you to read their policies.
                </p>
              </Section>

              <Section title="11. Children's Privacy">
                <p>
                  Our services are not directed to individuals under 18. We do not knowingly collect
                  personal information from children.
                </p>
              </Section>

              <Section title="12. Changes to This Policy">
                <p>
                  We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date
                  at the top of this page reflects the latest revision. Continued use of our website or
                  services after an update constitutes acceptance of the revised policy.
                </p>
              </Section>

              <Section title="13. Contact Us">
                <p>
                  If you have any questions about this Privacy Policy or how we handle your information,
                  reach out to us:
                </p>
                <div className="flex flex-col gap-3 mt-2">
                  <a
                    href="mailto:hello@creatorbaymedia.net"
                    className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-white group"
                    style={{ color: "rgba(255,255,255,0.65)" }}
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
                    href="https://wa.me/9967562434"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-white group"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                      style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)" }}
                    >
                      <MessageCircle size={14} color="#25d366" />
                    </div>
                    Chat on WhatsApp
                  </a>
                </div>
              </Section>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-10 text-center">
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                Also see our{" "}
                <Link
                  href="/terms-and-conditions"
                  className="underline transition-colors duration-200 hover:text-white"
                  style={{ color: "#a78bfa" }}
                >
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white">{title}</h2>
      <div
        className="text-sm md:text-[15px] leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-white"
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        {children}
      </div>
    </div>
  );
}

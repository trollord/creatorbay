"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Mail, MessageCircle } from "lucide-react";

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

export default function TermsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-40 pb-12 md:pb-16 px-5 md:px-6 overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
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
              background: "rgba(236,72,153,0.1)",
              border: "1px solid rgba(236,72,153,0.2)",
              color: "#f472b6",
            }}
          >
            <FileText size={14} />
            Terms &amp; Conditions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Terms of <span style={{ color: "#ec4899" }}>Service</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            The rules that govern your use of CreatorBay&apos;s website and services.
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
              <Section title="1. Acceptance of Terms">
                <p>
                  These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of
                  the CreatorBay website and the services we provide. By using our website, contacting
                  us, or engaging us for any service, you agree to be bound by these Terms.
                </p>
                <p>
                  If you do not agree with any part of these Terms, please do not use our website or
                  services.
                </p>
              </Section>

              <Section title="2. About CreatorBay">
                <p>
                  CreatorBay is an influencer marketing agency that connects brands, events, and
                  restaurants with creators and provides related services including campaign strategy,
                  creative production, reel creation, and consultation.
                </p>
              </Section>

              <Section title="3. Services">
                <p>
                  The specific services we provide to a client are defined in a separate written
                  agreement, proposal, statement of work, or email confirmation. These Terms apply in
                  addition to any such agreement; in case of conflict, the terms of the signed
                  engagement document will prevail.
                </p>
                <ul>
                  <li>Influencer marketing campaigns for events, brands, and restaurants.</li>
                  <li>Brand collaborations and creator outreach.</li>
                  <li>Creative production and reel creation.</li>
                  <li>Strategy and consultation.</li>
                </ul>
              </Section>

              <Section title="4. Client Responsibilities">
                <p>By engaging CreatorBay, the client agrees to:</p>
                <ul>
                  <li>
                    Provide accurate, complete, and timely information, brand assets, and approvals
                    needed to deliver the agreed services.
                  </li>
                  <li>
                    Hold all necessary rights, licenses, and permissions for any materials, logos,
                    trademarks, or content supplied to us.
                  </li>
                  <li>Pay agreed fees in accordance with the engagement document.</li>
                  <li>Comply with all applicable laws and platform policies.</li>
                </ul>
              </Section>

              <Section title="5. Payments">
                <p>
                  Unless agreed otherwise in writing, fees are invoiced as set out in the engagement
                  document and are payable within the timeframe stated on the invoice. Late payments
                  may delay deliverables and may attract interest as permitted by law. Fees once paid
                  are non-refundable, except where required by law or expressly stated in the
                  engagement document.
                </p>
              </Section>

              <Section title="6. Creator Deliverables">
                <p>
                  Where we coordinate creators on your behalf, the content produced by those creators
                  is subject to the individual creator&apos;s style, judgment, and platform guidelines.
                  We will make commercially reasonable efforts to align deliverables with the agreed
                  brief, but we do not guarantee specific reach, engagement, conversion, or business
                  outcomes.
                </p>
              </Section>

              <Section title="7. Intellectual Property">
                <p>
                  All trademarks, logos, copy, designs, and other content on the CreatorBay website are
                  owned by CreatorBay or its licensors and are protected by applicable laws. You may
                  not copy, reproduce, or use them without our prior written consent.
                </p>
                <p>
                  Ownership of content produced under a specific engagement will be governed by the
                  applicable engagement document.
                </p>
              </Section>

              <Section title="8. Communications & WhatsApp">
                <p>
                  By providing your phone number or initiating contact through WhatsApp, you consent to
                  receive service-related messages from CreatorBay over WhatsApp, email, or phone in
                  relation to your inquiry or active engagement. You may opt out at any time by
                  replying &quot;STOP&quot; to a WhatsApp message or emailing us.
                </p>
                <p>
                  Use of WhatsApp is also subject to WhatsApp&apos;s own terms and policies.
                </p>
              </Section>

              <Section title="9. Confidentiality">
                <p>
                  Each party will keep confidential any non-public information shared by the other in
                  connection with our work together and use it only for the purpose of performing the
                  engaged services.
                </p>
              </Section>

              <Section title="10. Disclaimers">
                <p>
                  Our website and services are provided on an &quot;as is&quot; and &quot;as
                  available&quot; basis. To the maximum extent permitted by law, we make no warranties,
                  express or implied, regarding the website or services, including their accuracy,
                  reliability, or fitness for a particular purpose.
                </p>
              </Section>

              <Section title="11. Limitation of Liability">
                <p>
                  To the maximum extent permitted by law, CreatorBay&apos;s aggregate liability arising
                  out of or in connection with the services will not exceed the fees paid by the client
                  to CreatorBay for the specific engagement giving rise to the claim. CreatorBay will
                  not be liable for indirect, incidental, special, or consequential damages, including
                  loss of profits, revenue, data, or goodwill.
                </p>
              </Section>

              <Section title="12. Termination">
                <p>
                  Either party may terminate an engagement in accordance with the terms of the
                  applicable engagement document. We may suspend or terminate access to our website or
                  services at our discretion if we reasonably believe these Terms have been breached.
                </p>
              </Section>

              <Section title="13. Third-Party Platforms">
                <p>
                  Our work often relies on third-party platforms (e.g., Instagram, WhatsApp, payment
                  providers). We are not responsible for outages, policy changes, or actions taken by
                  these platforms that may affect campaign delivery or communication.
                </p>
              </Section>

              <Section title="14. Governing Law">
                <p>
                  These Terms are governed by the laws of India, without regard to its conflict of laws
                  rules. Any disputes will be subject to the exclusive jurisdiction of the courts of
                  Mumbai, Maharashtra.
                </p>
              </Section>

              <Section title="15. Changes to These Terms">
                <p>
                  We may update these Terms from time to time. The &quot;Last updated&quot; date at the
                  top reflects the latest revision. Continued use of our website or services after an
                  update constitutes acceptance of the revised Terms.
                </p>
              </Section>

              <Section title="16. Contact">
                <p>For any questions about these Terms, reach out to us:</p>
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
                  href="/privacy-policy"
                  className="underline transition-colors duration-200 hover:text-white"
                  style={{ color: "#a78bfa" }}
                >
                  Privacy Policy
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

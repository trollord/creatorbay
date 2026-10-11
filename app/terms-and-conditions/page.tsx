import type { Metadata } from "next";
import LegalLayout, { Section, LegalContact } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of service | Creator Bay",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of service"
      intro="The rules that govern your use of Creator Bay's website and services."
      related={{ href: "/privacy-policy", label: "Privacy Policy" }}
    >
      <Section title="1. Acceptance of Terms">
                <p>
                  These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of
                  the Creator Bay website and the services we provide. By using our website, contacting
                  us, or engaging us for any service, you agree to be bound by these Terms.
                </p>
                <p>
                  If you do not agree with any part of these Terms, please do not use our website or
                  services.
                </p>
              </Section>

              <Section title="2. About Creator Bay">
                <p>
                  Creator Bay is an influencer marketing agency that connects brands and events
                  with creators and provides related services including campaign strategy,
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
                  <li>Influencer marketing campaigns for events and brands.</li>
                  <li>Brand collaborations and creator outreach.</li>
                  <li>Creative production and reel creation.</li>
                  <li>Strategy and consultation.</li>
                </ul>
              </Section>

              <Section title="4. Client Responsibilities">
                <p>By engaging Creator Bay, the client agrees to:</p>
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
                  All trademarks, logos, copy, designs, and other content on the Creator Bay website are
                  owned by Creator Bay or its licensors and are protected by applicable laws. You may
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
                  receive service-related messages from Creator Bay over WhatsApp, email, or phone in
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
                  To the maximum extent permitted by law, Creator Bay&apos;s aggregate liability arising
                  out of or in connection with the services will not exceed the fees paid by the client
                  to Creator Bay for the specific engagement giving rise to the claim. Creator Bay will
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
                <LegalContact />
              </Section>
    </LegalLayout>
  );
}

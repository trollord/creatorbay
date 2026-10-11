import type { Metadata } from "next";
import LegalLayout, { Section, LegalContact } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy policy | CreatorBay",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy policy"
      intro="How CreatorBay collects, uses, and protects your information."
      updated="May 15, 2026"
      related={{ href: "/terms-and-conditions", label: "Terms & Conditions" }}
    >
      <Section title="1. Introduction">
                <p>
                  CreatorBay (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is an influencer marketing
                  agency that connects brands, events, and restaurants with creators. This Privacy Policy
                  explains how we collect, use, store, and share information when you visit our website,
                  contact us, or engage with our services, including communications over WhatsApp,
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
                    directly, including your name, brand name, email address, and phone number.
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
                    Send campaign updates, proposals, invoices, and other transactional messages,
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
                    <strong>Service providers</strong> we rely on, such as email, hosting, analytics,
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
                <LegalContact />
              </Section>
    </LegalLayout>
  );
}

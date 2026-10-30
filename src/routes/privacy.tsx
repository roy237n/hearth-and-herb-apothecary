import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — GL Biochem Peptide" },
      { name: "description", content: "How GL Biochem Peptide collects, uses and protects personal information submitted through this website." },
      { property: "og:title", content: "Privacy Policy — GL Biochem Peptide" },
      { property: "og:description", content: "How GL Biochem Peptide collects, uses and protects personal information submitted through this website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what personal information {name} collects through this website, why, and how it is protected."
      sections={[
        {
          heading: "What we collect",
          body: (
            <>
              <p>
                When you send an enquiry or use the customer chat, we collect the name, email address and message content you
                provide. Please do not include sensitive medical information in these messages.
              </p>
              <p>
                Staff accounts are limited to authorised administrators; this website does not offer public customer
                registration.
              </p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              We use your details only to respond to your enquiry, manage ongoing conversations, and operate and secure the
              website. We do not sell your personal information or use it for unrelated marketing.
            </p>
          ),
        },
        {
          heading: "How it is stored",
          body: (
            <p>
              Messages are stored in our secured database with access restricted to authorised administrators. Conversation
              access links use random credentials stored only as hashes. We retain messages for as long as needed to handle
              your enquiry and maintain business records, after which they may be deleted.
            </p>
          ),
        },
        {
          heading: "Sharing",
          body: (
            <p>
              We do not share your personal information with third parties except the service providers that operate this
              website's hosting, database and email infrastructure, or where required by law.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              You may request a copy, correction or deletion of the personal information we hold about you by contacting us
              through the <Link to="/services-contact" className="underline">contact page</Link>. We will respond within a
              reasonable time and in line with applicable data-protection law.
            </p>
          ),
        },
        {
          heading: "Changes",
          body: <p>We may update this policy from time to time. The current version is always published on this page.</p>,
        },
      ]}
    />
  );
}

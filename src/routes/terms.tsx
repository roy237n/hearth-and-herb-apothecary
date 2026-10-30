import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — GL Biochem Peptide" },
      { name: "description", content: "Terms and conditions for using the GL Biochem Peptide website and making product enquiries." },
      { property: "og:title", content: "Terms & Conditions — GL Biochem Peptide" },
      { property: "og:description", content: "Terms and conditions for using the GL Biochem Peptide website and making product enquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="These terms govern your use of the {name} website and any enquiries you make through it. By using this website you accept these terms."
      sections={[
        {
          heading: "About this website",
          body: (
            <p>
              This website presents peptide product information, specifications and supporting documentation, and provides
              contact channels for product enquiries. Product listings describe items and their stated intended use; they are
              not an offer to sell in every jurisdiction, and availability depends on destination-specific requirements.
            </p>
          ),
        },
        {
          heading: "Enquiries and orders",
          body: (
            <>
              <p>
                This website does not process online payments. Submitting an enquiry or starting a conversation does not create
                a contract of sale. Any purchase is agreed directly with our team, subject to confirmation of availability,
                destination eligibility and applicable legal requirements.
              </p>
              <p>
                You are responsible for confirming that a product may lawfully be obtained, imported and used in your
                destination for its stated intended use before placing an order.
              </p>
            </>
          ),
        },
        {
          heading: "Product information",
          body: (
            <p>
              Specifications, documentation and batch references are provided for the items they describe and should be matched
              to the relevant product and lot. Information on this website is provided in good faith but may be updated,
              corrected or withdrawn at any time without notice.
            </p>
          ),
        },
        {
          heading: "Acceptable use",
          body: (
            <p>
              You must not misuse this website, attempt to gain unauthorised access to it, submit false or misleading
              information through its forms, or use its content for unlawful purposes. We may restrict access where misuse is
              detected.
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              The content, design and branding of this website belong to {"{name}"} or its licensors and may not be reproduced
              without permission, except for personal, non-commercial reference.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              The website is provided "as is". To the extent permitted by law, we are not liable for losses arising from use of
              this website or reliance on its content. Nothing in these terms excludes liability that cannot be excluded by law.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms can be raised through our <Link to="/services-contact" className="underline">contact page</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}

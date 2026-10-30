import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Product & Medical Disclaimer — GL Biochem Peptide" },
      { name: "description", content: "Important information about the intended use of peptide products listed by GL Biochem Peptide." },
      { property: "og:title", content: "Product & Medical Disclaimer — GL Biochem Peptide" },
      { property: "og:description", content: "Important information about the intended use of peptide products listed by GL Biochem Peptide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <LegalPage
      title="Product & Medical Disclaimer"
      intro="Please read this page carefully before enquiring about any product listed by {name}."
      sections={[
        {
          heading: "Intended use",
          body: (
            <p>
              Each product is listed with its stated intended use. Products supplied for research purposes are not intended
              for human or veterinary consumption, diagnosis, treatment or any other use outside their stated purpose. It is
              the buyer's responsibility to use products only for their stated intended use and in compliance with applicable
              law.
            </p>
          ),
        },
        {
          heading: "No medical advice",
          body: (
            <p>
              Content on this website is provided for product information only. It is not medical advice, and nothing on this
              website should be used to diagnose, treat, cure or prevent any disease or condition. Always consult a qualified
              healthcare professional about medical matters.
            </p>
          ),
        },
        {
          heading: "Product documentation",
          body: (
            <p>
              Specifications and certificates of analysis describe the item and batch they were issued for. Purity, identity
              and content results should be read together with the analytical methods and scope of testing stated in each
              report. Documentation for a specific product or batch can be requested from our team.
            </p>
          ),
        },
        {
          heading: "Regulatory status",
          body: (
            <p>
              Regulatory status varies by compound and by country. We do not claim regulatory approval for any product beyond
              what is stated in its documentation, and we do not represent that any product is approved for sale or use in
              every jurisdiction. Confirm the rules that apply in your destination before ordering.
            </p>
          ),
        },
        {
          heading: "Accuracy",
          body: (
            <p>
              We work to keep product information accurate and current, but listings may be updated, corrected or withdrawn.
              Where details matter to your decision, confirm them with our team through the{" "}
              <Link to="/services-contact" className="underline">contact page</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}

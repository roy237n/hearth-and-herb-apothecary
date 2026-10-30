import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — GL Biochem Peptide" },
      { name: "description", content: "Shipping, delivery and returns information for GL Biochem Peptide product orders." },
      { property: "og:title", content: "Shipping & Returns — GL Biochem Peptide" },
      { property: "og:description", content: "Shipping, delivery and returns information for GL Biochem Peptide product orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ShippingReturns,
});

function ShippingReturns() {
  return (
    <LegalPage
      title="Shipping & Returns"
      intro="How {name} handles delivery arrangements and returns for product orders agreed with our team."
      sections={[
        {
          heading: "Availability and destinations",
          body: (
            <p>
              We welcome enquiries from customers worldwide. Shipping availability, methods, costs and delivery times depend on
              the destination and the specific product, and are confirmed individually when your order is agreed. Listing a
              product on this website is not a guarantee that it can be supplied to every destination.
            </p>
          ),
        },
        {
          heading: "Import requirements",
          body: (
            <p>
              International orders may be subject to import controls, customs inspection, duties or taxes in the destination
              country. These are the responsibility of the recipient. We recommend confirming local requirements before
              ordering; our team can provide product documentation to support legitimate import processes where applicable.
            </p>
          ),
        },
        {
          heading: "Dispatch and tracking",
          body: (
            <p>
              Dispatch times and tracking arrangements are confirmed with each order. Peptide products may require
              temperature-conscious handling; packaging is chosen to protect the item in transit according to its stated
              storage requirements.
            </p>
          ),
        },
        {
          heading: "Returns",
          body: (
            <>
              <p>
                Because of the nature of peptide products, returns can only be accepted where the item arrives damaged,
                incorrect or not as described, and the sealed packaging is intact. Contact us promptly with your order
                reference and photographs of any issue so it can be assessed.
              </p>
              <p>
                Approved issues are resolved by replacement or refund of the affected item, as agreed with our team.
              </p>
            </>
          ),
        },
        {
          heading: "Questions",
          body: (
            <p>
              For destination-specific shipping questions, contact our team through the{" "}
              <Link to="/services-contact" className="underline">contact page</Link> before ordering.
            </p>
          ),
        },
      ]}
    />
  );
}

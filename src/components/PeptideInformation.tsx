import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { FileCheck2, FileText, MessageCircle, Truck } from 'lucide-react';
import { homepageImages } from '@/lib/homepage-images';
const pipette = homepageImages.analysis;
const workbench = homepageImages.vial;
const packaging = homepageImages.packaging;

const topics = [
  { icon: FileCheck2, title: 'Batch-specific COAs', text: 'Request available COAs for the relevant product and lot. Review reported results and testing methods before proceeding.' },
  { icon: FileText, title: 'Product Documentation', text: 'Review listed specifications and linked documents. Ask our team to confirm which supporting records are available for your selected product.' },
  { icon: MessageCircle, title: 'Responsive Customer Support', text: 'Reach our team through WhatsApp, the enquiry form or customer chat. Check live chat status and return to the same browser to read replies.' },
  { icon: Truck, title: 'International Shipping Support', text: 'Enquire from anywhere. Our China and UK team reviews destination-specific availability and shipping requirements; confirm options before ordering.' },
];

export function ResearcherBenefits() {
  return <section id="services" className="border-y bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <p className="text-xs font-semibold uppercase text-accent">Specifications · Documentation · Direct support</p>
        <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">Why Researchers Choose Us</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map(({ icon: Icon, title, text }) => <article key={title} className="min-w-0 rounded-md border bg-card p-5"><Icon className="h-6 w-6 text-accent" strokeWidth={1.5} /><h3 className="mt-3 font-display text-base font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}
        </div>
      </div>
    </section>;
}

export function PeptideInformation() {
  return <>
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid items-start gap-10 md:grid-cols-2">
        <figure><img src={pipette} alt="Gloved laboratory worker holding a sample beside analytical equipment" loading="lazy" width={768} height={513} className="aspect-[3/2] w-full object-cover"/><figcaption className="mt-2 text-xs text-muted-foreground">Illustrative laboratory photography.</figcaption></figure>
        <div><p className="text-xs font-semibold uppercase text-accent">Batch documentation</p><h2 className="mt-2 font-display text-2xl font-semibold">Evaluate the evidence for your product</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Verify the product name and lot against the available COA. Review the laboratory details, report date, methods and results; confirm that the report covers the batch you need.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Purity, identity and measured content are separate results. Testing does not automatically establish sterility or medical suitability. Ask our team about the documentation available for your selected product.</p><Button asChild variant="link" className="mt-4 px-0"><Link to="/services-contact">Request a batch COA</Link></Button></div>
      </div>
    </section>
    <section className="border-y bg-muted">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 md:grid-cols-2">
        <div><p className="text-xs font-semibold uppercase text-accent">Product support</p><h2 className="mt-2 font-display text-2xl font-semibold">Confirm the details before you order</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Send the product name, quantity, batch reference and destination country. Our team can address availability, document requests and destination-specific shipping enquiries.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Follow the product-specific storage instructions and safety data sheet where supplied. Confirm intended use and legal eligibility; research-use-only products are not for human or veterinary administration.</p><Button asChild variant="link" className="mt-4 px-0"><Link to="/services-contact">Contact product support</Link></Button></div>
        <figure><img src={workbench} alt="Gloved laboratory worker preparing a vial beside analytical equipment" loading="lazy" width={768} height={514} className="aspect-[3/2] w-full object-cover"/><figcaption className="mt-2 text-xs text-muted-foreground">Illustrative laboratory photography.</figcaption></figure>
      </div>
    </section>
    <section className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 sm:grid-cols-[240px_1fr]">
      <figure><img src={packaging} alt="White GL Biochem Peptide packaging and vial labelled Retatrutide, 10 mg, research use only" loading="lazy" width={768} height={514} className="aspect-square w-full object-contain"/><figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">Packaging illustration. Refer to catalogue details for availability and specifications.</figcaption></figure>
      <div><h2 className="font-display text-2xl font-semibold">Find the right product specification</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Match the stated compound, quantity and intended use to your requirements. Confirm availability and batch documentation with our team; packaging alone is not evidence of quality or medical approval.</p><Button asChild className="mt-5"><Link to="/services-contact">Send a product enquiry</Link></Button></div>
    </section>
  </>;
}

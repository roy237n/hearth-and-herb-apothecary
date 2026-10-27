import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import pipette from '@/assets/laboratory-pipette.jpg.asset.json';
import workbench from '@/assets/laboratory-workbench.jpg.asset.json';
import packaging from '@/assets/supplied-peptide-packaging.jpeg.asset.json';

const topics = [
  { title: 'Identity & composition', text: 'A peptide is a chain of amino acids joined by peptide bonds. Its amino-acid sequence and any chemical modifications help define its identity. Similar names do not mean that two compounds have the same composition or intended use.' },
  { title: 'Form & stated quantity', text: 'Products may be described as a powder, solution or another formulation. A stated mass, such as milligrams, is not the same as a concentration, such as milligrams per millilitre. Check the actual specification, formulation and package contents for the item.' },
  { title: 'Batch-specific documentation', text: 'A certificate of analysis reports results for a particular sample or batch. Match its product name and lot identifier to the item, then review the report date, test methods and laboratory details. A report for a different batch does not establish the results for yours.' },
  { title: 'Intended use & eligibility', text: 'Research materials, medicines and other product types have different requirements. A “research use only” label is not medical approval and does not establish that a product is safe for human or veterinary use. Product and destination eligibility need individual confirmation.' },
];

export function PeptideInformation() {
  return <>
    <section className="border-y bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-xs font-semibold uppercase text-accent">Understanding the catalogue</p>
        <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">What to know about peptide products</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Clear product information starts with the identity of the compound, its formulation and the evidence that accompanies it. These are the details to review before making an enquiry.</p>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {topics.map((topic, i) => <article key={topic.title} className="border-t pt-5"><p className="text-xs font-semibold text-accent">0{i + 1}</p><h3 className="mt-2 font-display text-lg font-semibold">{topic.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{topic.text}</p></article>)}
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid items-start gap-10 md:grid-cols-2">
        <figure><img src={pipette.url} alt="Scientist using a pipette to prepare a laboratory sample" loading="lazy" width={612} height={409} className="aspect-[3/2] w-full object-cover"/><figcaption className="mt-2 text-xs text-muted-foreground">Illustrative laboratory photography, not our premises or staff.</figcaption></figure>
        <div><p className="text-xs font-semibold uppercase text-accent">Reading the evidence</p><h2 className="mt-2 font-display text-2xl font-semibold">Purity is only part of the picture</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">High-performance liquid chromatography (HPLC) separates sample components and can help assess purity under a stated method. Liquid chromatography–mass spectrometry (LC-MS) can support identification. Results should be read alongside the method, sample identity and scope of the report.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">A high purity figure alone does not establish sterility, absence of endotoxins or other contaminants, or suitability for a particular application. Those questions require relevant testing and documentation; no catalogue-wide testing or certification claim is implied.</p><Button asChild variant="link" className="mt-4 px-0"><Link to="/services-contact">Ask about a product report</Link></Button></div>
      </div>
    </section>
    <section className="border-y bg-muted">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 md:grid-cols-2">
        <div><p className="text-xs font-semibold uppercase text-accent">Storage & handling</p><h2 className="mt-2 font-display text-2xl font-semibold">Follow the instructions for the specific item</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Formulation, packaging and stability information determine appropriate storage conditions. Lyophilisation is a drying process; it does not, by itself, establish a product’s shelf life, shipping temperature or sterility.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Check the supplier’s label and safety data sheet where provided. Request any missing storage, handling or disposal instructions before handling a material. This website does not provide dosing, reconstitution or administration guidance.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">For an enquiry, include the product name, any batch identifier, the information you need and your destination country. Shipping arrangements, import requirements and availability must be confirmed separately.</p></div>
        <figure><img src={workbench.url} alt="Laboratory worker handling samples at a workbench" loading="lazy" width={612} height={409} className="aspect-[3/2] w-full object-cover"/><figcaption className="mt-2 text-xs text-muted-foreground">Illustrative laboratory photography.</figcaption></figure>
      </div>
    </section>
    <section className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 sm:grid-cols-[240px_1fr]">
      <figure><img src={packaging.url} alt="User-supplied packaging image labelled Retatrutide, 10 mg, research use only" loading="lazy" width={768} height={768} className="aspect-square w-full object-contain"/><figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">Supplied packaging illustration. Label claims, contents and availability are not independently verified.</figcaption></figure>
      <div><h2 className="font-display text-2xl font-semibold">Read beyond the label</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">A packaging image is not a product specification or a certificate of analysis. Confirm the actual identity, contents, documentation and intended use with the supplier. Statements about health or performance on packaging are not evidence of safety, approval or clinical benefit.</p><p className="mt-3 text-sm text-muted-foreground">The image shown is not an offer for sale or confirmation that this item is stocked.</p><Button asChild className="mt-5"><Link to="/services-contact">Send a product enquiry</Link></Button></div>
    </section>
  </>;
}

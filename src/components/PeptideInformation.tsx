import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import pipette from '@/assets/polished-enhanced-laboratory-pipette.jpg.asset.json';
import workbench from '@/assets/polished-enhanced-laboratory-workbench.jpg.asset.json';
import packaging from '@/assets/polished-enhanced-supplied-peptide-packaging.jpeg.asset.json';

const topics = [
  { title: 'Identity & composition', text: 'Peptides consist of amino acids linked by peptide bonds. Sequence, chain length and chemical modifications distinguish one compound from another. Specifications may include a molecular formula, molecular weight or CAS identifier; these describe identity rather than proving the quality of a particular batch.' },
  { title: 'Form & stated quantity', text: 'A product’s formulation and stated contents are essential parts of its specification. Milligrams describe mass; milligrams per millilitre describe concentration. For blends, review the identity and quantity of each component rather than treating the total blend quantity as the amount of every ingredient.' },
  { title: 'Batch-specific documentation', text: 'A certificate of analysis links analytical results to a defined sample or production batch. Match the product name and lot identifier, then review the method, report date, laboratory details and reported results. Documents should be assessed for the batch concerned.' },
  { title: 'Intended use & eligibility', text: 'Product classifications determine the requirements for supply and use. Research-use-only materials are intended for research, not human or veterinary administration. A research label does not confer medical approval. Review the stated intended use and applicable destination requirements for each product.' },
];

export function PeptideInformation() {
  return <>
    <section className="border-y bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-xs font-semibold uppercase text-accent">Understanding the catalogue</p>
        <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">Peptide science & product specifications</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Understanding a peptide product starts with its composition, formulation and intended use. Product specifications and analytical documentation bring these details together and support an informed enquiry.</p>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {topics.map((topic, i) => <article key={topic.title} className="border-t pt-5"><p className="text-xs font-semibold text-accent">0{i + 1}</p><h3 className="mt-2 font-display text-lg font-semibold">{topic.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{topic.text}</p></article>)}
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid items-start gap-10 md:grid-cols-2">
        <figure><img src={pipette.url} alt="Scientist using a pipette to prepare a laboratory sample" loading="lazy" width={612} height={409} className="aspect-[3/2] w-full object-cover"/><figcaption className="mt-2 text-xs text-muted-foreground">Illustrative laboratory photography.</figcaption></figure>
        <div><p className="text-xs font-semibold uppercase text-accent">Analytical documentation</p><h2 className="mt-2 font-display text-2xl font-semibold">Understanding purity, identity & content</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">High-performance liquid chromatography (HPLC) separates sample components and can assess purity under a defined method. Liquid chromatography–mass spectrometry (LC-MS) can support identification. Measured peptide content is a separate result: a purity percentage alone does not establish the quantity present in a vial.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Chemical purity, identity, content and microbiological quality answer different questions. Sterility, endotoxins and other contaminants require appropriate testing. Review the scope of the report and the methods used; analytical results do not, by themselves, establish suitability for medical use.</p><Button asChild variant="link" className="mt-4 px-0"><Link to="/services-contact">Request product documentation</Link></Button></div>
      </div>
    </section>
    <section className="border-y bg-muted">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 md:grid-cols-2">
        <div><p className="text-xs font-semibold uppercase text-accent">Storage & handling</p><h2 className="mt-2 font-display text-2xl font-semibold">Product-specific care & handling</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Storage conditions depend on formulation, packaging and stability data. Lyophilisation removes water through a drying process; shelf life and transport conditions still depend on the individual product specification. Review the label and accompanying documentation before handling.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Safety data sheets, where supplied, provide information on hazards, handling and disposal. Contact our team for clarification of product-specific instructions. General catalogue information is not a substitute for professional medical advice and does not provide dosing or administration guidance.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">For documentation or availability requests, include the product name, batch reference and destination country. This helps our team address the relevant product and any destination-specific requirements.</p></div>
        <figure><img src={workbench.url} alt="Laboratory worker handling samples at a workbench" loading="lazy" width={612} height={409} className="aspect-[3/2] w-full object-cover"/><figcaption className="mt-2 text-xs text-muted-foreground">Illustrative laboratory photography.</figcaption></figure>
      </div>
    </section>
    <section className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 sm:grid-cols-[240px_1fr]">
      <figure><img src={packaging.url} alt="Supplied packaging photograph labelled Retatrutide, 10 mg, research use only" loading="lazy" width={768} height={768} className="aspect-square w-full object-contain"/><figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">Packaging illustration. Refer to catalogue details for availability and specifications.</figcaption></figure>
      <div><h2 className="font-display text-2xl font-semibold">Packaging & product identification</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Product labels identify the stated compound, quantity and intended use. Read these details alongside the individual specification and batch documentation. A photograph or packaging statement alone does not establish contents, analytical quality or medical approval.</p><p className="mt-3 text-sm text-muted-foreground">Contact our team for product availability, specifications and supporting documents.</p><Button asChild className="mt-5"><Link to="/services-contact">Send a product enquiry</Link></Button></div>
    </section>
  </>;
}

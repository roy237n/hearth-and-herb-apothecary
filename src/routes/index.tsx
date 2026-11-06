import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { homepageImages } from '@/lib/homepage-images';
const laboratoryTeam = homepageImages.team;
const laboratorySample = homepageImages.sample;
const laboratoryPipette = homepageImages.pipette;
const laboratoryWorkbench = homepageImages.workbench;
import { PeptideInformation, ResearcherBenefits } from "@/components/PeptideInformation";
import { storefrontQuery, pageHead, overview, documentationOverview } from "@/lib/storefront";
import { Button } from "@/components/ui/button";
import { FAQ, ProductGrid } from "@/components/StoreExtras";
import { Benzene } from "@/components/ChemArt";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(storefrontQuery),
  head: ({ loaderData }) => pageHead("home", loaderData?.settings),
  component: Index,
});

const slides = [
  { img: laboratoryTeam, alt: "Scientists preparing samples in an illustrative laboratory photograph", kicker: "Peptide products & information" },
  { img: laboratorySample, alt: "Scientist transferring a sample with a pipette in an illustrative laboratory photograph", kicker: "Product enquiries & documentation" },
  { img: laboratoryPipette, alt: "Scientist using a pipette beside laboratory sample tubes in an illustrative photograph", kicker: "Peptide products & information" },
  { img: laboratoryWorkbench, alt: "Scientists working with samples at a laboratory workbench in an illustrative photograph", kicker: "Product enquiries & documentation" },
  { img: homepageImages.analysis, alt: "Gloved laboratory worker holding a sample beside analytical equipment", kicker: "Product enquiries & documentation" },
  { img: homepageImages.vial, alt: "Gloved laboratory worker preparing a vial beside analytical equipment", kicker: "Peptide products & information" },
];

function Index() {
  const { data } = useSuspenseQuery(storefrontQuery);
  const products = data.products;
  const s = data.settings;
  const [slide, setSlide] = useState(0);
  const cur = s?.currency ?? "$";
  const name = s?.pharmacy_name ?? "GL Biochem Peptide";
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setSlide((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const list = products.filter(p => p.featured).slice(0, 8);
  const sl = slides[slide] ?? slides[0];
  if (!sl) return null;
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />

      {/* Hero: slider + side banners */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[78%] bg-primary" />
        <div className="relative mx-auto grid max-w-7xl gap-5 px-4 pb-6 lg:grid-cols-[1fr_380px]">
          <div className="relative min-h-[360px] overflow-hidden bg-muted md:min-h-[420px]">
            <img src={sl.img} alt={sl.alt} className="absolute inset-0 h-full w-full object-cover" width={612} height={409} fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/60 to-transparent" />
            <div className="relative z-10 flex min-h-[360px] max-w-lg flex-col justify-center px-10 py-12 text-primary-foreground md:min-h-[420px] md:px-12">
              <p className="text-xs font-semibold uppercase">{sl.kicker}</p>
              <h1 className="mt-4 break-words font-display text-3xl font-semibold leading-tight md:text-4xl">{name}</h1>
              <p className="mt-4 max-w-sm text-sm leading-relaxed">Peptide sourcing with product specifications, available batch documentation and direct customer support.</p>
              <p className="mt-3 text-xs leading-relaxed">China & UK · International enquiries<br />Request COA availability for your selected product.</p>
              <div className="mt-5 flex flex-wrap items-center gap-3"><Button asChild variant="secondary"><Link to="/shop">Browse products</Link></Button><Button asChild variant="link" className="h-auto whitespace-normal px-0 text-primary-foreground"><Link to="/services-contact">Request documentation</Link></Button></div>
            </div>
            <p className="absolute bottom-3 left-10 z-10 text-[10px] text-primary-foreground">Illustrative laboratory photography</p>
            <Button variant="ghost" size="icon" onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} aria-label="Previous photo" className="absolute left-1 top-1/2 z-20 -translate-y-1/2 text-primary-foreground"><ChevronLeft /></Button>
            <Button variant="ghost" size="icon" onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Next photo" className="absolute right-1 top-1/2 z-20 -translate-y-1/2 text-primary-foreground"><ChevronRight /></Button>
          </div>
          <div className="grid gap-5">
            <div className="relative min-h-[200px] overflow-hidden bg-card p-7 pr-28 shadow-sm">
              <h2 className="relative z-10 font-display text-2xl font-semibold text-foreground">{name} Online Shop</h2>
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-muted-foreground">Product specifications<br />Batch documentation enquiries<br />China & UK · International service enquiries</p>
              <Benzene className="absolute -bottom-10 -right-4 w-36 text-foreground/70" />
            </div>
            <div className="relative min-h-[200px] overflow-hidden">
              <img src={laboratorySample} alt="Scientist preparing a laboratory sample" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/60 to-transparent" />
              <div className="relative p-7 text-primary-foreground">
                <p className="font-display text-lg font-semibold">Customer support</p>
                <p className="mt-2 text-sm opacity-90">WhatsApp · Enquiry form · Live chat</p>
                <Button asChild variant="secondary" className="mt-4"><Link to="/services-contact">Contact us</Link></Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ResearcherBenefits />

      {/* Welcome text */}
      <section className="mx-auto max-w-5xl px-4 py-10 text-center">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Peptide sourcing. Clear specifications. Direct support.</h2>
        <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {s?.home_intro || s?.business_description || overview}
        </p>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3"><h2 className="font-display text-2xl font-semibold">Featured peptide products</h2><Button asChild variant="link"><Link to="/shop">View catalogue</Link></Button></div>
        <p className="mt-3 text-sm text-muted-foreground">Review individual specifications and confirm product availability, intended use and supporting documents.</p>
        <ProductGrid products={list} currency={cur} />
      </section>
      <section className="border-y bg-muted"><div className="mx-auto max-w-5xl px-4 py-10"><h2 className="font-display text-2xl font-semibold">Product verification starts with documentation</h2><p className="mt-4 whitespace-pre-wrap leading-relaxed text-muted-foreground">{s?.quality_text || documentationOverview}</p><Button asChild variant="link" className="mt-3 h-auto whitespace-normal px-0 text-left"><Link to="/shop">Browse product specifications & available documents</Link></Button></div></section>
      <PeptideInformation />
      <FAQ />
      <SiteFooter />
    </div>
  );
}

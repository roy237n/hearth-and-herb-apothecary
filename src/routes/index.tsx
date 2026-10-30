import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, FlaskConical, Stethoscope } from "lucide-react";
import laboratoryTeam from "@/assets/polished-enhanced-laboratory-team.jpg.asset.json";
import laboratorySample from "@/assets/polished-enhanced-laboratory-sample.jpg.asset.json";
import laboratoryPipette from "@/assets/polished-enhanced-laboratory-pipette.jpg.asset.json";
import laboratoryWorkbench from "@/assets/polished-enhanced-laboratory-workbench.jpg.asset.json";
import { PeptideInformation } from "@/components/PeptideInformation";
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
  { img: laboratoryTeam.url, alt: "Scientists preparing samples in an illustrative laboratory photograph", kicker: "Peptide products & information" },
  { img: laboratorySample.url, alt: "Scientist transferring a sample with a pipette in an illustrative laboratory photograph", kicker: "Product enquiries & documentation" },
  { img: laboratoryPipette.url, alt: "Scientist using a pipette beside laboratory sample tubes in an illustrative photograph", kicker: "Peptide products & information" },
  { img: laboratoryWorkbench.url, alt: "Scientists working with samples at a laboratory workbench in an illustrative photograph", kicker: "Product enquiries & documentation" },
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
              <p className="mt-4 max-w-sm text-sm leading-relaxed">Peptide products, clear specifications and product support. Browse our catalogue or contact our team.</p>
              <Button asChild variant="secondary" className="mt-6 w-fit"><Link to="/shop">Browse products</Link></Button>
            </div>
            <p className="absolute bottom-3 left-10 z-10 text-[10px] text-primary-foreground">Illustrative laboratory photography</p>
            <Button variant="ghost" size="icon" onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} aria-label="Previous photo" className="absolute left-1 top-1/2 z-20 -translate-y-1/2 text-primary-foreground"><ChevronLeft /></Button>
            <Button variant="ghost" size="icon" onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Next photo" className="absolute right-1 top-1/2 z-20 -translate-y-1/2 text-primary-foreground"><ChevronRight /></Button>
          </div>
          <div className="grid gap-5">
            <div className="relative min-h-[200px] overflow-hidden bg-card p-7 pr-28 shadow-sm">
              <h2 className="relative z-10 font-display text-2xl font-semibold text-foreground">{name} Online Shop</h2>
              <p className="relative z-10 mt-1 text-sm text-muted-foreground">Peptides · Specifications · Support</p>
              <Benzene className="absolute -bottom-10 -right-4 w-36 text-foreground/70" />
            </div>
            <div className="relative min-h-[200px] overflow-hidden">
              <img src={laboratorySample.url} alt="Scientist preparing a laboratory sample" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/60 to-transparent" />
              <div className="relative p-7 text-primary-foreground">
                <p className="font-display text-lg font-semibold">Customer support</p>
                <p className="text-sm opacity-90">Availability & documentation</p>
                <Button asChild variant="secondary" className="mt-4"><Link to="/services-contact">Contact us</Link></Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome text */}
      <section className="mx-auto max-w-5xl px-4 py-14 text-center">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Peptide products at {name}</h2>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          {s?.home_intro || s?.business_description || overview}
        </p>
      </section>

      {/* Trust bar */}
      <section id="services" className="border-y bg-muted">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
          {[
            [ShieldCheck, "Product information", "Item-specific details"],
            [FlaskConical, "Documentation", "Batch-specific reports"],
            [Truck, "International enquiries", "Destination checks apply"],
            [Stethoscope, "Contact our team", "Product enquiries"],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof ShieldCheck;
            return (
              <div key={t as string} className="flex items-center gap-3">
                <I className="h-9 w-9 shrink-0 text-accent" strokeWidth={1.5} />
                <div>
                  <p className="font-display text-sm font-semibold">{t as string}</p>
                  <p className="text-xs text-muted-foreground">{d as string}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between gap-4 border-b pb-3"><h2 className="font-display text-2xl font-semibold">Featured products</h2><Button asChild variant="link"><Link to="/shop">View catalogue</Link></Button></div>
        <ProductGrid products={list} currency={cur} />
      </section>
      <section className="border-y bg-muted"><div className="mx-auto max-w-5xl px-4 py-10"><h2 className="font-display text-2xl font-semibold">Product information & documentation</h2><p className="mt-4 whitespace-pre-wrap leading-relaxed text-muted-foreground">{s?.quality_text || documentationOverview}</p><p className="mt-3 text-sm text-muted-foreground">Match each report to the relevant product and batch. Purity, identity and measured content describe different properties; review the methods and scope of testing together.</p><Button asChild variant="link" className="mt-3 px-0"><Link to="/services-contact">Enquire about product documentation</Link></Button></div></section>
      <PeptideInformation />
      <FAQ />
      <SiteFooter />
    </div>
  );
}

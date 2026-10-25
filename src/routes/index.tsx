import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, FlaskConical, Stethoscope } from "lucide-react";
import hero from "@/assets/hero.jpg";
import vitamins from "@/assets/promo-vitamins.jpg";
import formula from "@/assets/promo-formula.jpg";
import { storefrontQuery, pageHead, overview } from "@/lib/storefront";
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
  { img: hero, kicker: "Peptide product information", title: "Phycadelics Verdant", cta: "/shop" },
  { img: formula, kicker: "Product enquiries & documentation", title: "Phycadelics Verdant", cta: "/shop" },
];

function Index() {
  const { data } = useSuspenseQuery(storefrontQuery);
  const products = data.products;
  const s = data.settings;
  const [slide, setSlide] = useState(0);
  const cur = s?.currency ?? "$";
  const name = s?.pharmacy_name ?? "Phycadelics Verdant";
  useEffect(() => {
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
          <div className="relative grid min-h-[420px] overflow-hidden bg-muted md:grid-cols-2">
            <div className="z-10 flex flex-col justify-center p-8 md:p-12">
              <p className="text-sm text-muted-foreground">{sl.kicker}</p>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-5xl">{name}</h1>
              <a href={sl.cta} className="mt-8 w-fit bg-primary px-7 py-3 font-display text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90">
                Shop now
              </a>
            </div>
            <img src={sl.img} alt="Illustrative scientist preparing a laboratory sample; not a photograph of our facilities" className="h-64 w-full object-cover md:h-full" width={1280} height={960} />
            <Button variant="ghost" size="icon" onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-foreground/60 hover:text-foreground"><ChevronLeft /></Button>
            <Button variant="ghost" size="icon" onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-primary-foreground/80 hover:text-primary-foreground"><ChevronRight /></Button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => <span key={i} className={`h-2 w-2 rounded-full ${i === slide ? "bg-accent" : "bg-foreground/25"}`} />)}
            </div>
          </div>
          <div className="grid gap-5">
            <div className="relative min-h-[200px] overflow-hidden bg-card p-7 pr-28 shadow-sm">
              <h2 className="relative z-10 font-display text-2xl font-semibold text-foreground">{name} Online Shop</h2>
              <p className="relative z-10 mt-1 text-sm text-muted-foreground">Products · Information · Enquiries</p>
              <Benzene className="absolute -bottom-10 -right-4 w-36 text-foreground/70" />
            </div>
            <div className="relative min-h-[200px] overflow-hidden">
              <img src={formula} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/60 to-transparent" />
              <div className="relative p-7 text-primary-foreground">
                <p className="font-display text-lg font-semibold">Product enquiries</p>
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
            [FlaskConical, "Documentation", "Where supplied"],
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
      <section className="border-y bg-muted"><div className="mx-auto max-w-5xl px-4 py-10"><h2 className="font-display text-2xl font-semibold">Product information & documentation</h2><p className="mt-4 whitespace-pre-wrap text-muted-foreground">{s?.quality_text || "Product-specific specifications and supporting documents are displayed when supplied. No independent testing, purity or certification claims are made without supporting information."}</p></div></section>
      <FAQ />
      <SiteFooter />
    </div>
  );
}

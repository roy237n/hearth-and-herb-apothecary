import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, FlaskConical, Stethoscope } from "lucide-react";
import hero from "@/assets/hero.jpg";
import vitamins from "@/assets/promo-vitamins.jpg";
import formula from "@/assets/promo-formula.jpg";
import { productsQuery, settingsQuery, useCart } from "@/lib/store";
import { Benzene } from "@/components/ChemArt";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { q?: string | undefined; cat?: string | undefined } => ({
    q: typeof s["q"] === "string" ? (s["q"] as string) : undefined,
    cat: typeof s["cat"] === "string" ? (s["cat"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Phycadelics Verdant — Pharmacy & Laboratory Online Shop" },
      { name: "description", content: "Licensed pharmacy and laboratory: medicines, vitamins, skincare and expert pharmacist advice with home delivery." },
      { property: "og:title", content: "Phycadelics Verdant — Pharmacy & Laboratory" },
      { property: "og:description", content: "Quality-tested medicines and wellness products, delivered to your door." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const slides = [
  { img: hero, kicker: "From our laboratory", title: "Quality-Tested Medicines You Can Trust", cta: "#shop" },
  { img: vitamins, kicker: "Daily wellness", title: "Vitamins & Supplements For The Whole Family", cta: "#shop" },
];

function Index() {
  const search = Route.useSearch();
  const { data: products = [], isLoading } = useQuery(productsQuery);
  const { data: s } = useQuery(settingsQuery);
  const cart = useCart();
  const [cat, setCat] = useState(search.cat ?? "All");
  const [slide, setSlide] = useState(0);
  const q = search.q ?? "";
  const cur = s?.currency ?? "$";
  const name = s?.pharmacy_name ?? "Phycadelics Verdant";

  useEffect(() => { if (search.cat) setCat(search.cat); }, [search.cat]);
  useEffect(() => {
    const t = setInterval(() => setSlide((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const list = products.filter((p) => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()));
  const sl = slides[slide]!;

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
              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-5xl">{sl.title}</h1>
              <a href={sl.cta} className="mt-8 w-fit bg-primary px-7 py-3 font-display text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90">
                Shop now
              </a>
            </div>
            <img src={sl.img} alt="" className="h-64 w-full object-cover md:h-full" width={1280} height={960} />
            <button onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-foreground/60 hover:text-foreground"><ChevronLeft /></button>
            <button onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-primary-foreground/80 hover:text-primary-foreground"><ChevronRight /></button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => <span key={i} className={`h-2 w-2 rounded-full ${i === slide ? "bg-accent" : "bg-foreground/25"}`} />)}
            </div>
          </div>
          <div className="grid gap-5">
            <div className="relative min-h-[200px] overflow-hidden bg-card p-7 pr-28 shadow-sm">
              <h2 className="relative z-10 font-display text-2xl font-semibold text-foreground">{name} Online Shop</h2>
              <p className="relative z-10 mt-1 text-sm text-muted-foreground">Pharmacy · Laboratory · Wellness</p>
              <Benzene className="absolute -bottom-10 -right-4 w-36 text-foreground/70" />
            </div>
            <div className="relative min-h-[200px] overflow-hidden">
              <img src={formula} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/60 to-transparent" />
              <div className="relative p-7 text-primary-foreground">
                <p className="font-display text-lg font-semibold">Ask our pharmacists</p>
                <p className="text-sm opacity-90">Free advice on every order</p>
                <a href={`tel:${s?.phone ?? ""}`} className="mt-4 inline-block bg-background px-5 py-2 font-display text-xs font-semibold uppercase text-foreground">Call now</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome text */}
      <section className="mx-auto max-w-5xl px-4 py-14 text-center">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Welcome to {name} – Your Trusted Pharmacy Online Shop</h2>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Looking to <strong className="text-foreground">buy medicines online</strong>? At {name}, we offer a carefully selected range of{" "}
          <strong className="text-foreground">pharmacy products</strong> delivered discreetly and safely. Whether you need{" "}
          <strong className="text-foreground">pain relief</strong>, <strong className="text-foreground">vitamins and supplements</strong>,{" "}
          <strong className="text-foreground">cold & flu remedies</strong> or <strong className="text-foreground">skincare</strong>, every item is
          checked by our licensed pharmacists before it leaves our shelves.
        </p>
      </section>

      {/* Trust bar */}
      <section id="services" className="border-y bg-muted">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
          {[
            [ShieldCheck, "Licensed pharmacy", "Registered & regulated"],
            [FlaskConical, "Lab tested", "Quality-controlled stock"],
            [Truck, "Fast delivery", "Discreet packaging"],
            [Stethoscope, "Free advice", "Talk to a pharmacist"],
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

      {/* Shop */}
      <section id="shop" className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-3">
          <h2 className="font-display text-2xl font-semibold">{q ? `Results for “${q}”` : "Our Products"}</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`pb-1 font-display ${cat === c ? "border-b-2 border-accent font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        {isLoading && <p className="mt-8 text-muted-foreground">Loading products…</p>}
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => {
            const out = p.stock <= 0;
            return (
              <div key={p.id} className="group flex flex-col text-center">
                <div className="relative grid aspect-square place-items-center overflow-hidden border bg-card">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                  ) : (
                    <span className="font-display text-5xl font-semibold text-primary/30">{p.name[0]}</span>
                  )}
                  {p.tag && <span className="absolute left-2 top-2 bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">{p.tag}</span>}
                  {out && <span className="absolute right-2 top-2 bg-foreground px-2 py-0.5 text-[11px] font-semibold text-background">Sold out</span>}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{p.category}</p>
                <h3 className="font-display text-sm font-semibold">{p.name}</h3>
                {p.requires_prescription && <p className="text-[11px] text-primary">Prescription required</p>}
                <p className="mt-1 font-semibold text-accent">{cur}{Number(p.price).toFixed(2)}</p>
                <button
                  disabled={out}
                  onClick={() => { cart.add(p); toast.success(`${p.name} added to cart`); }}
                  className="mx-auto mt-3 bg-primary px-5 py-2 font-display text-xs font-semibold uppercase text-primary-foreground hover:opacity-90 disabled:opacity-40"
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
        {!isLoading && list.length === 0 && <p className="mt-8 text-muted-foreground">No products found.</p>}
      </section>

      <SiteFooter />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import hero from "@/assets/hero.jpg";
import { productsQuery, settingsQuery, useCart } from "@/lib/store";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Phycadelics Verdant — Licensed Care, Delivered" },
      { name: "description", content: "Licensed community pharmacy: prescriptions, vitamins, skincare and expert advice with fast home delivery." },
      { property: "og:title", content: "Phycadelics Verdant — Licensed Care, Delivered" },
      { property: "og:description", content: "Prescriptions, wellness and expert pharmacist advice, delivered to your door." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: products = [], isLoading } = useQuery(productsQuery);
  const { data: s } = useQuery(settingsQuery);
  const cart = useCart();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const cur = s?.currency ?? "$";
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const list = products.filter(
    (p) => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-block rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-accent-foreground">
            Licensed & regulated pharmacy
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
            Care you can trust, <span className="text-primary">delivered</span> to your door.
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Order everyday health essentials online and talk to a real pharmacist — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#shop" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:opacity-90">
              Shop now
            </a>
            <a href={`tel:${s?.phone ?? ""}`} className="rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary transition hover:bg-secondary">
              Call a pharmacist
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rotate-2 rounded-[2rem] bg-accent/40" />
          <img src={hero} alt="Pharmacist at the counter" width={1280} height={960} className="relative rounded-[2rem] object-cover shadow-2xl" />
        </div>
      </section>

      <section id="services" className="bg-deep py-16 text-deep-foreground">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-4">
          {[
            ["Prescription service", "Bring or send your prescription and we prepare it the same day."],
            ["Free consultations", "Private advice from licensed pharmacists."],
            ["Home delivery", "Discreet packaging, delivered to your door."],
            ["Health checks", "Blood pressure, glucose and vaccinations in store."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-deep-foreground/15 p-6">
              <h3 className="font-display text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm opacity-80">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Shop essentials</h2>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-full border bg-card px-4 py-2 text-sm md:w-64"
          />
        </div>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary"}`}
            >
              {c}
            </button>
          ))}
        </div>
        {isLoading && <p className="mt-8 text-muted-foreground">Loading products…</p>}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {list.map((p) => {
            const out = p.stock <= 0;
            return (
              <div key={p.id} className="flex flex-col rounded-2xl border bg-card p-4 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-secondary">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-display text-4xl text-primary">{p.name[0]}</span>
                  )}
                  {p.tag && (
                    <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">{p.tag}</span>
                  )}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{p.category}</p>
                <h3 className="font-semibold">{p.name}</h3>
                {p.description && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>}
                {p.requires_prescription && <p className="mt-1 text-[11px] font-semibold text-primary">Prescription required</p>}
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="font-display text-lg font-bold">{cur}{Number(p.price).toFixed(2)}</span>
                  <button
                    disabled={out}
                    onClick={() => {
                      cart.add(p);
                      toast.success(`${p.name} added to cart`);
                    }}
                    className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-40"
                  >
                    {out ? "Sold out" : "Add"}
                  </button>
                </div>
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

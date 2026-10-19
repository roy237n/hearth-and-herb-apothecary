import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Verdant Pharmacy — Licensed Care, Delivered" },
      { name: "description", content: "Licensed community pharmacy: prescriptions, vitamins, skincare and expert advice with fast home delivery." },
      { property: "og:title", content: "Verdant Pharmacy — Licensed Care, Delivered" },
      { property: "og:description", content: "Prescriptions, wellness and expert pharmacist advice, delivered to your door." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categories = ["All", "Pain Relief", "Vitamins", "Cold & Flu", "Skincare", "Baby Care"];
const products = [
  { name: "Paracetamol 500mg", cat: "Pain Relief", price: 4.5, tag: "Best seller" },
  { name: "Ibuprofen 200mg", cat: "Pain Relief", price: 5.2 },
  { name: "Vitamin D3 1000 IU", cat: "Vitamins", price: 9.9, tag: "New" },
  { name: "Multivitamin Daily", cat: "Vitamins", price: 14.0 },
  { name: "Cough Syrup 150ml", cat: "Cold & Flu", price: 7.8 },
  { name: "Nasal Spray", cat: "Cold & Flu", price: 6.4 },
  { name: "SPF 50 Sunscreen", cat: "Skincare", price: 12.5, tag: "Derm pick" },
  { name: "Gentle Baby Lotion", cat: "Baby Care", price: 8.3 },
];

function Index() {
  const [cat, setCat] = useState("All");
  const [cart, setCart] = useState(0);
  const list = products.filter((p) => cat === "All" || p.cat === cat);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="bg-deep px-4 py-2 text-center text-xs text-deep-foreground">
        Free delivery on orders over $40 · Pharmacist on call 8am–10pm
      </div>

      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-lg text-primary-foreground">V</span>
            <span className="font-display text-xl font-bold">Verdant</span>
          </a>
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#shop" className="hover:text-primary">Shop</a>
            <a href="#services" className="hover:text-primary">Services</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </nav>
          <span className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">Cart · {cart}</span>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-block rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-accent-foreground">Licensed & regulated pharmacy</span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
            Care you can trust, <span className="text-primary">delivered</span> to your door.
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Refill prescriptions, shop everyday health essentials and talk to a real pharmacist — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#shop" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition hover:opacity-90">Shop now</a>
            <a href="#services" className="rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary transition hover:bg-secondary">Upload prescription</a>
          </div>
          <div className="mt-10 flex gap-8 text-sm">
            <div><p className="font-display text-2xl font-bold">15k+</p><p className="text-muted-foreground">Happy patients</p></div>
            <div><p className="font-display text-2xl font-bold">24h</p><p className="text-muted-foreground">Delivery</p></div>
            <div><p className="font-display text-2xl font-bold">4.9★</p><p className="text-muted-foreground">Rating</p></div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rotate-2 rounded-[2rem] bg-accent/40" />
          <img src={hero} alt="Pharmacist at Verdant Pharmacy counter" width={1280} height={960} className="relative rounded-[2rem] object-cover shadow-2xl" />
        </div>
      </section>

      <section id="services" className="bg-deep py-16 text-deep-foreground">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-4">
          {[
            ["Prescription refills", "Send your prescription and we prepare it same day."],
            ["Free consultations", "Private advice from licensed pharmacists."],
            ["Fast delivery", "Discreet packaging, delivered within 24 hours."],
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
        <h2 className="font-display text-3xl font-bold md:text-4xl">Shop essentials</h2>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {list.map((p) => (
            <div key={p.name} className="group flex flex-col rounded-2xl border bg-card p-4 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative grid aspect-square place-items-center rounded-xl bg-secondary">
                <span className="font-display text-4xl text-primary">{p.name[0]}</span>
                {p.tag && <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">{p.tag}</span>}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{p.cat}</p>
              <h3 className="font-semibold">{p.name}</h3>
              <div className="mt-auto flex items-center justify-between pt-3">
                <span className="font-display text-lg font-bold">${p.price.toFixed(2)}</span>
                <button onClick={() => setCart(cart + 1)} className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Add</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["“Quick delivery and the pharmacist called to explain my dosage. Brilliant.”", "Amina K."],
            ["“My go-to for vitamins and baby care. Always in stock.”", "Daniel M."],
            ["“Uploading my prescription took a minute. So easy.”", "Grace T."],
          ].map(([q, n]) => (
            <blockquote key={n} className="rounded-2xl bg-muted p-6">
              <p className="font-display text-lg">{q}</p>
              <footer className="mt-4 text-sm font-semibold text-primary">{n}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <footer id="contact" className="bg-deep text-deep-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-bold">Verdant Pharmacy</p>
            <p className="mt-2 text-sm opacity-80">Licensed community pharmacy. Prescription medicines are dispensed only with a valid prescription.</p>
          </div>
          <div className="text-sm opacity-90">
            <p className="font-semibold">Visit us</p>
            <p className="mt-2">123 Health Avenue, Your City</p>
            <p>Mon–Sat · 8am–10pm</p>
          </div>
          <div className="text-sm opacity-90">
            <p className="font-semibold">Contact</p>
            <p className="mt-2">+000 000 000</p>
            <p>hello@verdantpharmacy.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

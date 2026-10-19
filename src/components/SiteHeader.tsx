import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Clock, MapPin, Phone, Search, ShoppingCart, User, ChevronDown, MessageCircle } from "lucide-react";
import { productsQuery, settingsQuery, useCart } from "@/lib/store";

export function SiteHeader() {
  const { data: s } = useQuery(settingsQuery);
  const { data: products = [] } = useQuery(productsQuery);
  const { count } = useCart();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const name = s?.pharmacy_name ?? "Phycadelics Verdant";
  const cats = Array.from(new Set(products.map((p) => p.category)));

  return (
    <>
      <div className="border-b bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-3 px-4 py-3 md:grid-cols-3">
          <div className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{s?.address?.split(",").pop()?.trim() || "Find us"}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{s?.hours}</span>
          </div>
          <Link to="/" className="flex flex-col items-center leading-none">
            <span className="font-display text-2xl font-bold tracking-tight text-primary">{name}</span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Pharmacy & Laboratory</span>
          </Link>
          <div className="hidden items-center justify-end gap-4 text-sm md:flex">
            <a href={`tel:${s?.phone ?? ""}`} className="flex items-center gap-1 font-semibold"><Phone className="h-4 w-4" />Tel: {s?.phone}</a>
            <Link to="/admin" aria-label="Staff login" className="text-muted-foreground hover:text-foreground"><User className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-30 bg-primary text-primary-foreground shadow">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2">
          <div className="relative hidden md:block">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-1 py-2 font-display text-sm font-semibold">
              All Categories <ChevronDown className="h-4 w-4" />
            </button>
            {open && (
              <div className="absolute left-0 top-full z-40 mt-2 w-56 rounded-md border bg-card py-2 text-card-foreground shadow-lg">
                {cats.map((c) => (
                  <a key={c} href={`/?cat=${encodeURIComponent(c)}#shop`} className="block px-4 py-2 text-sm hover:bg-muted">{c}</a>
                ))}
              </div>
            )}
          </div>
          <nav className="hidden gap-6 border-l border-primary-foreground/20 pl-6 font-display text-sm font-medium md:flex">
            <Link to="/" className="opacity-90 hover:opacity-100">Home</Link>
            <a href="/#shop" className="opacity-90 hover:opacity-100">Shop</a>
            <a href="/#services" className="opacity-90 hover:opacity-100">Services</a>
            <a href="/#contact" className="opacity-90 hover:opacity-100">Contact Us</a>
          </nav>
          <form
            onSubmit={(e) => { e.preventDefault(); nav({ to: "/", search: { q } as never, hash: "shop" }); }}
            className="ml-auto flex flex-1 items-center rounded-sm bg-background md:max-w-xs"
          >
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for products" className="w-full bg-transparent px-3 py-2 text-sm text-foreground outline-none" />
            <button className="px-3 text-muted-foreground"><Search className="h-4 w-4" /></button>
          </form>
          <Link to="/checkout" className="relative grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/30">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">{count}</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export function SiteFooter() {
  const { data: s } = useQuery(settingsQuery);
  const wa = (s?.phone ?? "").replace(/[^0-9]/g, "");
  return (
    <>
      <footer id="contact" className="bg-deep text-deep-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-xl font-bold">{s?.pharmacy_name}</p>
            <p className="mt-2 max-w-sm text-sm opacity-80">
              Licensed pharmacy and laboratory. Prescription medicines are dispensed only with a valid prescription from a registered doctor.
            </p>
          </div>
          <div className="text-sm opacity-90">
            <p className="font-display font-semibold">Visit us</p>
            <p className="mt-2">{s?.address}</p>
            <p>{s?.hours}</p>
          </div>
          <div className="text-sm opacity-90">
            <p className="font-display font-semibold">Contact</p>
            <p className="mt-2">{s?.phone}</p>
            <p>{s?.email}</p>
            <Link to="/admin" className="mt-4 inline-block text-xs underline opacity-70">Staff login</Link>
          </div>
        </div>
        <p className="border-t border-deep-foreground/10 py-4 text-center text-xs opacity-60">© {new Date().getFullYear()} {s?.pharmacy_name}. All rights reserved.</p>
      </footer>
      {wa && (
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
          className="fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-lg">
          <MessageCircle className="h-7 w-7" />
        </a>
      )}
    </>
  );
}

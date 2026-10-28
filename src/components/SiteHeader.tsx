import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Clock, MapPin, Phone, Search, ShoppingCart, User, ChevronDown, MessageCircle } from "lucide-react";
import { storefrontQuery, overview } from "@/lib/storefront";
import { Button } from "@/components/ui/button";
import { LiveChat } from "@/components/LiveChat";

export function SiteHeader() {
  const { data } = useQuery(storefrontQuery);
  const s = data?.settings;
  const products = data?.products ?? [];
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
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />US & UK</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{s?.public_contact_verified ? s.hours : "Worldwide enquiries"}</span>
          </div>
          <Link to="/" className="flex flex-col items-center leading-none">
            <span className="font-display text-2xl font-bold tracking-tight text-foreground">{name}</span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Peptide Products</span>
          </Link>
          <div className="hidden items-center justify-end gap-4 text-sm md:flex">
            {s?.public_contact_verified && s.phone && <a href={`tel:${s.phone}`} className="flex items-center gap-1 font-semibold"><Phone className="h-4 w-4" />{s.phone}</a>}
            <Link to="/admin" aria-label="Staff login" className="text-muted-foreground hover:text-foreground"><User className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-30 bg-primary text-primary-foreground shadow">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-2">
          <div className="relative hidden md:block">
            <Button variant="ghost" onClick={() => setOpen(!open)} className="flex items-center gap-1 py-2 font-display text-sm font-semibold">
              All Categories <ChevronDown className="h-4 w-4" />
            </Button>
            {open && (
              <div className="absolute left-0 top-full z-40 mt-2 w-56 rounded-md border bg-card py-2 text-card-foreground shadow-lg">
                {cats.map((c) => (
                  <Link key={c} to="/shop" search={{cat:c}} onClick={()=>setOpen(false)} className="block px-4 py-2 text-sm hover:bg-muted">{c}</Link>
                ))}
              </div>
            )}
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 font-display text-sm font-medium md:border-l md:border-primary-foreground/20 md:pl-6">
            <Link to="/" className="opacity-90 hover:opacity-100">Home</Link>
            <Link to="/shop" className="opacity-90 hover:opacity-100">Shop</Link>
            <Link to="/services-contact" className="opacity-90 hover:opacity-100">Services & Contact</Link>
          </nav>
          <form
            onSubmit={(e) => { e.preventDefault(); nav({ to: "/shop", search: { q } }); }}
            className="ml-auto flex min-w-40 flex-1 items-center rounded-sm bg-background md:max-w-xs"
          >
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for products" className="w-full bg-transparent px-3 py-2 text-sm text-foreground outline-none" />
            <Button type="submit" variant="ghost" size="icon" aria-label="Search products" className="text-muted-foreground"><Search className="h-4 w-4" /></Button>
          </form>

        </div>
      </div>
    </>
  );
}

export function SiteFooter() {
  const { data } = useQuery(storefrontQuery);
  const s = data?.settings;

  return (
    <>
      <footer id="contact" className="bg-deep text-deep-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-xl font-bold">{s?.pharmacy_name}</p>
            <p className="mt-2 max-w-sm text-sm opacity-80">
              {s?.business_description || overview}
            </p>
          </div>
          <div className="text-sm opacity-90">
            <p className="font-display font-semibold">Our business</p>
            <p className="mt-2">US & UK · Worldwide enquiries</p>
            {s?.public_contact_verified && s.address && <p>{s.address}</p>}
            {s?.public_contact_verified && s.hours && <p>{s.hours}</p>}
          </div>
          <div className="text-sm opacity-90">
            <p className="font-display font-semibold">Contact</p>
            {s?.public_contact_verified && <><p className="mt-2">{s.phone}</p><p>{s.email}</p></>}
            <Link to="/services-contact" className="mt-2 block underline">Send an enquiry</Link>
            <Link to="/admin" className="mt-4 inline-block text-xs underline opacity-70">Staff login</Link>
          </div>
        </div>
        <p className="border-t border-deep-foreground/10 py-4 text-center text-xs opacity-60">© {new Date().getFullYear()} {s?.pharmacy_name}. All rights reserved.</p>
      </footer>
      <LiveChat />
    </>
  );
}

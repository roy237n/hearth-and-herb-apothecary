import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { settingsQuery, useCart } from "@/lib/store";

export function SiteHeader() {
  const { data: s } = useQuery(settingsQuery);
  const { count } = useCart();
  const name = s?.pharmacy_name ?? "Phycadelics Verdant";
  return (
    <>
      <div className="bg-deep px-4 py-2 text-center text-xs text-deep-foreground">{s?.announcement ?? "\u00a0"}</div>
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-lg text-primary-foreground">
              {name[0]}
            </span>
            <span className="font-display text-xl font-bold">{name}</span>
          </Link>
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="/#shop" className="hover:text-primary">Shop</a>
            <a href="/#services" className="hover:text-primary">Services</a>
            <a href="/#contact" className="hover:text-primary">Contact</a>
          </nav>
          <Link to="/checkout" className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
            Cart · {count}
          </Link>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  const { data: s } = useQuery(settingsQuery);
  return (
    <footer id="contact" className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold">{s?.pharmacy_name}</p>
          <p className="mt-2 text-sm opacity-80">
            Licensed community pharmacy. Prescription medicines are dispensed only with a valid prescription.
          </p>
        </div>
        <div className="text-sm opacity-90">
          <p className="font-semibold">Visit us</p>
          <p className="mt-2">{s?.address}</p>
          <p>{s?.hours}</p>
        </div>
        <div className="text-sm opacity-90">
          <p className="font-semibold">Contact</p>
          <p className="mt-2">{s?.phone}</p>
          <p>{s?.email}</p>
          <Link to="/admin" className="mt-4 inline-block text-xs underline opacity-70">Staff login</Link>
        </div>
      </div>
    </footer>
  );
}

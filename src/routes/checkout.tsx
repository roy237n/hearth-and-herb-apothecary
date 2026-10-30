import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { settingsQuery, useCart } from "@/lib/store";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

const PAYMENT_METHODS = [
  "Bank transfer",
  "PayPal",
  "Venmo",
  "Cash App",
  "Zelle",
  "Bitcoin / cryptocurrency",
  "Other (discuss on WhatsApp)",
];

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Place an Order — GL Biochem Peptide" },
      { name: "description", content: "Select your products and preferred payment method, then send your order to GL Biochem Peptide on WhatsApp for confirmation." },
      { property: "og:title", content: "Place an Order — GL Biochem Peptide" },
      { property: "og:description", content: "Send your order and preferred payment method to GL Biochem Peptide on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { data: settings } = useQuery(settingsQuery);
  const cart = useCart();
  const currency = settings?.currency ?? "$";
  const [form, setForm] = useState({ name: "", email: "", country: "", payment: PAYMENT_METHODS[0], notes: "" });

  const phone = (settings?.phone ?? "").replace(/\D/g, "");

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      `New order enquiry — ${settings?.pharmacy_name ?? "GL Biochem Peptide"}`,
      "",
      ...cart.items.map((i) => `• ${i.name} x${i.qty} — ${currency}${(i.price * i.qty).toFixed(2)}`),
      cart.items.length > 0 ? `Subtotal: ${currency}${cart.subtotal.toFixed(2)}` : "",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Destination country: ${form.country}`,
      `Preferred payment method: ${form.payment}`,
      form.notes ? `Notes: ${form.notes}` : "",
      "",
      "Please confirm availability, total cost and payment details.",
    ].filter((l) => l !== "");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="font-display text-3xl font-semibold">Place an order</h1>
        <p className="mt-3 text-muted-foreground">
          Review your items, choose your preferred payment method and send your order to our team on WhatsApp.
          We confirm availability, total cost and payment details before any payment is made.
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="font-display text-xl font-semibold">Your items</h2>
            {cart.items.length === 0 ? (
              <div className="mt-4 border-y py-8 text-center">
                <p className="text-muted-foreground">Your cart is empty. Add products from the shop, or send us a general enquiry.</p>
                <div className="mt-4 flex justify-center gap-3">
                  <Button asChild><Link to="/shop">Browse the shop</Link></Button>
                  <Button asChild variant="outline"><Link to="/services-contact">Send an enquiry</Link></Button>
                </div>
              </div>
            ) : (
              <ul className="mt-4 divide-y border-y">
                {cart.items.map((i) => (
                  <li key={i.id} className="flex items-center gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm font-semibold">{i.name}</p>
                      <p className="text-sm text-accent">{currency}{i.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon" aria-label="Decrease quantity" onClick={() => cart.setQty(i.id, i.qty - 1)}><Minus className="h-4 w-4" /></Button>
                      <span className="w-8 text-center text-sm">{i.qty}</span>
                      <Button variant="outline" size="icon" aria-label="Increase quantity" onClick={() => cart.setQty(i.id, i.qty + 1)}><Plus className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" aria-label="Remove item" onClick={() => cart.setQty(i.id, 0)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {cart.items.length > 0 && (
              <p className="mt-4 text-right font-semibold">Subtotal: {currency}{cart.subtotal.toFixed(2)}</p>
            )}
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">Order details</h2>
            <form onSubmit={placeOrder} className="mt-4 space-y-4">
              <label className="block text-sm">Full name
                <input required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2" />
              </label>
              <label className="block text-sm">Email
                <input required type="email" maxLength={254} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2" />
              </label>
              <label className="block text-sm">Destination country
                <input required maxLength={100} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2" />
              </label>
              <label className="block text-sm">Preferred payment method
                <select value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2">
                  {PAYMENT_METHODS.map((m) => <option key={m}>{m}</option>)}
                </select>
              </label>
              <label className="block text-sm">Notes (optional)
                <textarea rows={3} maxLength={1000} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2" />
              </label>
              <Button type="submit" className="w-full" disabled={!phone}>Place order via WhatsApp</Button>
              <p className="text-xs text-muted-foreground">
                This opens WhatsApp with your order details pre-filled. No payment is taken on this website;
                our team confirms eligibility, availability and payment details with you directly.
              </p>
            </form>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

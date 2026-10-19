import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { deliveryFee, settingsQuery, useCart } from "@/lib/store";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Your Cart & Checkout — Verdant Pharmacy" },
      { name: "description", content: "Review your cart and place your pharmacy order for delivery." },
      { property: "og:title", content: "Checkout — Verdant Pharmacy" },
      { property: "og:description", content: "Place your pharmacy order for home delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const cart = useCart();
  const { data: s } = useQuery(settingsQuery);
  const cur = s?.currency ?? "$";
  const fee = deliveryFee(cart.subtotal, s);
  const total = cart.subtotal + fee;
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!cart.items.length) return;
    setBusy(true);
    const { error } = await supabase.from("orders").insert({
      customer_name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      notes: form.notes.trim() || null,
      items: cart.items,
      total,
    });
    setBusy(false);
    if (error) return toast.error("Could not place order. Please try again.");
    cart.clear();
    setDone(true);
  }

  const field = "w-full rounded-xl border bg-card px-4 py-3 text-sm";
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12">
        {done ? (
          <div className="rounded-2xl bg-secondary p-10 text-center">
            <h1 className="font-display text-3xl font-bold">Thank you! Your order is placed.</h1>
            <p className="mt-3 text-muted-foreground">We'll call you on your phone number to confirm delivery. Payment is on delivery.</p>
            <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Continue shopping</Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h1 className="font-display text-3xl font-bold">Your cart</h1>
              {cart.items.length === 0 && <p className="mt-4 text-muted-foreground">Your cart is empty.</p>}
              <ul className="mt-6 space-y-3">
                {cart.items.map((i) => (
                  <li key={i.id} className="flex items-center justify-between rounded-xl border bg-card p-4">
                    <div>
                      <p className="font-semibold">{i.name}</p>
                      <p className="text-sm text-muted-foreground">{cur}{i.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => cart.setQty(i.id, i.qty - 1)} className="h-8 w-8 rounded-full bg-muted">−</button>
                      <span className="w-6 text-center">{i.qty}</span>
                      <button onClick={() => cart.setQty(i.id, i.qty + 1)} className="h-8 w-8 rounded-full bg-muted">+</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-1 text-sm">
                <p className="flex justify-between"><span>Subtotal</span><span>{cur}{cart.subtotal.toFixed(2)}</span></p>
                <p className="flex justify-between"><span>Delivery</span><span>{fee === 0 ? "Free" : `${cur}${fee.toFixed(2)}`}</span></p>
                <p className="flex justify-between font-display text-lg font-bold"><span>Total</span><span>{cur}{total.toFixed(2)}</span></p>
              </div>
            </div>
            <form onSubmit={submit} className="space-y-3 rounded-2xl bg-muted p-6">
              <h2 className="font-display text-2xl font-bold">Delivery details</h2>
              <input required maxLength={100} placeholder="Full name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required maxLength={30} placeholder="Phone number" className={field} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <textarea required maxLength={300} placeholder="Delivery address" className={field} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              <textarea maxLength={500} placeholder="Notes (optional)" className={field} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              <p className="text-xs text-muted-foreground">Payment on delivery. Prescription items require a valid prescription at delivery.</p>
              <button disabled={busy || !cart.items.length} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-50">
                {busy ? "Placing order…" : "Place order"}
              </button>
            </form>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

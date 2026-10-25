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
      { title: "Your Cart & Checkout — Phycadelics Verdant" },
      { name: "description", content: "Purchases are not currently available. Contact Phycadelics Verdant with a product enquiry." },
      { property: "og:title", content: "Checkout — Phycadelics Verdant" },
      { property: "og:description", content: "Contact Phycadelics Verdant with a product enquiry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <div className="min-h-screen bg-background font-sans text-foreground"><SiteHeader /><main className="mx-auto max-w-5xl px-4 py-12"><h1 className="font-display text-3xl font-semibold">Product enquiries</h1><p className="mt-4 text-muted-foreground">Purchases are not currently available. Product and destination eligibility must be confirmed.</p><Link to="/services-contact" className="mt-6 inline-block underline">Contact Phycadelics Verdant</Link></main><SiteFooter /></div>,
});

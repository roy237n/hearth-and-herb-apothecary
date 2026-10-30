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
      { title: "Your Cart & Checkout — GL Biochem Peptide" },
      { name: "description", content: "Contact GL Biochem Peptide for product availability, documentation and destination-specific supply enquiries." },
      { property: "og:title", content: "Checkout — GL Biochem Peptide" },
      { property: "og:description", content: "Contact GL Biochem Peptide with a product enquiry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <div className="min-h-screen bg-background font-sans text-foreground"><SiteHeader /><main className="mx-auto max-w-5xl px-4 py-12"><h1 className="font-display text-3xl font-semibold">Product enquiries</h1><p className="mt-4 text-muted-foreground">Contact our team to discuss product availability, specifications and destination requirements. This catalogue accepts enquiries; any sale is subject to confirmation of eligibility.</p><Link to="/services-contact" className="mt-6 inline-block underline">Contact GL Biochem Peptide</Link></main><SiteFooter /></div>,
});

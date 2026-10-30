import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { storefrontQuery } from "@/lib/storefront";

export type LegalSection = { heading: string; body: ReactNode };

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  const { data } = useQuery(storefrontQuery);
  const s = data?.settings;
  const name = s?.pharmacy_name ?? "GL Biochem Peptide";
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-3xl font-semibold">{title}</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">{intro.replaceAll("{name}", name)}</p>
        <div className="mt-8 space-y-8">
          {sections.map((sec) => (
            <section key={sec.heading}>
              <h2 className="font-display text-xl font-semibold">{sec.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{sec.body}</div>
            </section>
          ))}
        </div>
        <p className="mt-10 border-t pt-6 text-xs text-muted-foreground">
          Last reviewed: October 2026. Questions about this page can be sent through our contact form
          {s?.public_contact_verified && s.email ? <> or by email to <a className="underline" href={`mailto:${s.email}`}>{s.email}</a></> : null}.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

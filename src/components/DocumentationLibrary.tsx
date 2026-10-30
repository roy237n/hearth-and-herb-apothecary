import { useState } from 'react';
import { FileText, Search } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { documentationProducts } from '@/lib/documentation';
import { safeHttps } from '@/lib/messaging-schema';
import type { Product } from '@/lib/store';

export function DocumentationLibrary({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const reports = documentationProducts(products, query);
  return <section id="documentation" className="mt-12 border-t pt-8">
    <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="font-display text-2xl font-semibold">Product documentation</h2><label className="flex w-full items-center gap-2 rounded-md border px-3 sm:w-80"><Search className="h-4 w-4 shrink-0 text-muted-foreground"/><input aria-label="Search documentation" placeholder="Product, category or batch reference" value={query} onChange={e => setQuery(e.target.value)} className="min-w-0 w-full bg-transparent py-3 text-sm outline-none"/></label></div>
    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Review the documents associated with each product. Match the name and lot identifier to the report, and check its date, analytical methods and scope of testing. Batch references can be searched when included in the product specifications.</p>
    <div className="mt-6 divide-y">{reports.map(product => <article key={product.id} className="flex flex-wrap items-center gap-4 py-5"><FileText className="h-5 w-5 text-accent"/><div className="min-w-0 flex-1"><h3 className="break-words font-semibold">{product.name}</h3><p className="text-xs text-muted-foreground">{product.category}</p></div><Button asChild variant="outline" size="sm"><a href={safeHttps(product.documentation_url)} target="_blank" rel="noopener noreferrer">View document</a></Button><Button asChild variant="link" size="sm"><Link to="/services-contact" search={{product:product.name}}>Request details</Link></Button></article>)}</div>
    {reports.length === 0 && <div className="border-b py-8"><p className="text-sm text-muted-foreground">No linked documents match this search. For a specific product or batch, request the relevant report from our team.</p><Button asChild variant="link" className="mt-2 px-0"><Link to="/services-contact">Request documentation</Link></Button></div>}
  </section>;
}
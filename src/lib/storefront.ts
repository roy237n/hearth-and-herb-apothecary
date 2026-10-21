import { queryOptions } from '@tanstack/react-query';
import { getStorefront } from './catalogue.functions';
import { safeHttps } from './messaging-schema';
import type { Settings, Product } from './store';
export const storefrontQuery=queryOptions({queryKey:['storefront'],queryFn:()=>getStorefront(),staleTime:30000});
export const overview='Peptides are short chains of amino acids. Browse product-specific information, availability and supporting documentation, or contact Phycadelics Verdant with a catalogue enquiry.';
export function canonicalOrigin(value?: string) { const href=safeHttps(value ?? ''); if(!href)return undefined; const u=new URL(href); return u.pathname==='/' && !u.search && !u.hash ? u.origin : undefined; }
export function pageHead(page:'home'|'shop'|'contact',settings?:Settings|null) {
 const name=settings?.pharmacy_name || 'Phycadelics Verdant';
 const titles={home:`${name} — Peptide Products`,shop:`Peptide Shop — ${name}`,contact:`Services & Contact — ${name}`};
 const descriptions={home:'Explore peptide product information, availability and supporting documentation at Phycadelics Verdant.',shop:'Browse the Phycadelics Verdant peptide catalogue by category, name and price. Enquire about availability and product documentation.',contact:'Contact Phycadelics Verdant with product, documentation and availability enquiries. Send a message or start a private conversation.'};
 const title=settings?.[`${page}_seo_title`] || titles[page]; const description=settings?.[`${page}_seo_description`] || descriptions[page]; const origin=canonicalOrigin(settings?.canonical_origin); const path=page==='home'?'':page==='shop'?'/shop':'/services-contact';
 return {meta:[{title},{name:'description',content:description},{property:'og:title',content:title},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}],links:origin?[{rel:'canonical',href:origin+path}]:[],...(page==='home'?{scripts:[{type:'application/ld+json',children:JSON.stringify({'@context':'https://schema.org','@type':'Organization',name,...(origin?{url:origin}:{}),...(settings?.public_contact_verified && settings.email?{email:settings.email}:{})})}]}:{})};
}
export function filterProducts(products:Product[],q:string,category:string,sort:string) {return products.filter(p=>p.active && p.catalogue_visible && (category==='All' || p.category===category) && p.name.toLowerCase().includes(q.trim().toLowerCase())).sort((a,b)=>sort==='price-asc'?Number(a.price)-Number(b.price):sort==='price-desc'?Number(b.price)-Number(a.price):sort==='name'?a.name.localeCompare(b.name):0);}

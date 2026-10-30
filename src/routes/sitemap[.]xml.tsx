import { createFileRoute } from '@tanstack/react-router';
import { canonicalOrigin } from '@/lib/storefront';
export const Route = createFileRoute('/sitemap.xml')({
  server: { handlers: {
    GET: async () => {
      const { loadStorefront } = await import('@/lib/catalogue.server');
      const data = await loadStorefront();
      const origin = canonicalOrigin(data.settings?.canonical_origin);
      if (!origin) return new Response('Production domain not configured', { status: 503, headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' } });
      const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['', '/shop', '/services-contact', '/terms', '/privacy', '/shipping-returns', '/disclaimer'].map(p => `<url><loc>${escape(origin + p)}</loc></url>`).join('')}</urlset>`;
      return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
    }
  } }
});

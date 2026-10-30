import type { Product } from './store';
import { safeHttps } from './messaging-schema';

export function documentationProducts(products: Product[], query: string) {
  const term = query.trim().toLowerCase();
  return products.filter(product => product.active && product.catalogue_visible && safeHttps(product.documentation_url) && `${product.name} ${product.category} ${product.specifications}`.toLowerCase().includes(term));
}
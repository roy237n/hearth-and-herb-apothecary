import { describe, it, expect } from 'vitest';
import { documentationProducts } from '@/lib/documentation';
import type { Product } from '@/lib/store';
const product = { id:'1', name:'Alpha', category:'Peptide', active:true, catalogue_visible:true, specifications:'Lot B-102', documentation_url:'https://example.com/report.pdf' } as Product;
describe('Documentation library', () => {
  it('matches the batch reference supplied in specifications', () => expect(documentationProducts([product], 'b-102')).toEqual([product]));
  it('does not expose unapproved products', () => expect(documentationProducts([{...product, catalogue_visible:false}], '')).toEqual([]));
  it('does not expose executable links', () => expect(documentationProducts([{...product, documentation_url:'javascript:alert(1)'}], '')).toEqual([]));
});
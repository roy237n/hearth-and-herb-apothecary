import {describe,it,expect} from 'vitest';
import {filterProducts,canonicalOrigin} from '@/lib/storefront';
import {contactSchema,capabilitySchema,chatSendSchema,safeHttps} from '@/lib/messaging-schema';
import type {Product} from '@/lib/store';
const product=(name:string,category:string,price:number,approved=true):Product=>({id:name,name,category,price,catalogue_visible:approved,active:true,created_at:'2026-10-21',description:'',image_url:null,stock:1,tag:null,requires_prescription:false,specifications:'',documentation_url:'',intended_use:'',featured:false});
describe('Peptide catalogue rules',()=>{
 it('does not publish existing unapproved pharmacy inventory',()=>expect(filterProducts([product('Legacy','Pharmacy',2,false)],'','All','name')).toEqual([]));
 it('uses admin categories with product-name search',()=>expect(filterProducts([product('Alpha','Admin category',5),product('Beta','Other',1)],'alp','Admin category','name').map(p=>p.name)).toEqual(['Alpha']));
 it('sorts prices numerically',()=>expect(filterProducts([product('Alpha','X',10),product('Beta','X',2)],'','All','price-asc').map(p=>p.price)).toEqual([2,10]));
 it('rejects fabricated or relative production domains',()=>{expect(canonicalOrigin('')).toBeUndefined();expect(canonicalOrigin('http://example.com')).toBeUndefined();expect(canonicalOrigin('https://example.com/path')).toBeUndefined();expect(canonicalOrigin('https://example.com')).toBe('https://example.com');});
});
describe('Private messaging validation',()=>{
 it('rejects invalid contact email and empty message',()=>expect(contactSchema.safeParse({name:'Test',email:'invalid',subject:'Test',message:''}).success).toBe(false));
 it('rejects unsolicited form honeypot content',()=>expect(contactSchema.safeParse({name:'Test',email:'test@example.com',subject:'Test',message:'Hello',website:'spam'}).success).toBe(false));
 it('requires a cryptographic capability for private conversations',()=>expect(capabilitySchema.safeParse({id:'0e23b415-c36d-4f25-95a8-b4f3d6931b58',token:'short'}).success).toBe(false));
 it('rejects oversized chat messages',()=>expect(chatSendSchema.safeParse({id:'0e23b415-c36d-4f25-95a8-b4f3d6931b58',token:'a'.repeat(64),body:'x'.repeat(2001)}).success).toBe(false));
 it('rejects executable documentation links',()=>expect(safeHttps('javascript:alert(1)')).toBeUndefined());
});

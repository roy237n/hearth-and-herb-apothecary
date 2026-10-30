import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
export async function loadStorefront(){
 // External hosts (e.g. Netlify) may only provide the build-time VITE_* values; both are public.
 const key=process.env['SUPABASE_PUBLISHABLE_KEY'] || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY; const url=process.env['SUPABASE_URL'] || import.meta.env.VITE_SUPABASE_URL; if(!key || !url) throw new Error('Store configuration unavailable');
 const db=createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const h=new Headers(init?.headers); if(key.startsWith('sb_') && h.get('Authorization')===`Bearer ${key}`)h.delete('Authorization'); h.set('apikey',key); return fetch(input,{...init,headers:h});}}});
 const [products,settings]=await Promise.all([db.from('products').select('*').eq('active',true).eq('catalogue_visible',true).order('created_at'),db.from('site_settings').select('*').eq('id',1).single()]); if(products.error || settings.error) throw new Error('Store information could not be loaded'); return {products:products.data ?? [],settings:settings.data};
}

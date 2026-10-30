import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { productsQuery, settingsQuery, type Product, type Settings } from "@/lib/store";
import { AdminInbox } from "@/components/AdminInbox";
import { Button } from "@/components/ui/button";
import { safeHttps } from "@/lib/messaging-schema";
import { canonicalOrigin } from "@/lib/storefront";
import { enhanceProductImage } from "@/lib/images.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — GL Biochem Peptide" },
      { name: "description", content: "Manage products, prices, orders and pharmacy details." },
      { property: "og:title", content: "Admin Dashboard — GL Biochem Peptide" },
      { property: "og:description", content: "Manage products, prices, orders and pharmacy details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const field = "w-full rounded-lg border bg-card px-3 py-2 text-sm";

function Admin() {
  const { user } = Route.useRouteContext();
  const nav = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"products" | "orders" | "settings" | "inbox">("products");
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
      return !!data;
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  }

  if (isLoading) return <p className="p-8">Loading…</p>;
  if (!isAdmin)
    return (
      <div className="p-8 font-sans">
        <p>This account doesn't have admin access.</p>
        <Button onClick={signOut} className="mt-4 underline">Sign out</Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="bg-deep text-deep-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <p className="font-display text-xl font-bold">Admin dashboard</p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="underline">View site</Link>
            <Button onClick={signOut} className="rounded-full bg-deep-foreground/15 px-3 py-1">Sign out</Button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 px-4 pb-3">
          {(["products", "orders", "settings", "inbox"] as const).map((t) => (
            <Button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-sm capitalize ${tab === t ? "bg-accent text-accent-foreground" : "bg-deep-foreground/10"}`}>
              {t}
            </Button>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        {tab === "products" && <ProductsTab />}
        {tab === "orders" && <OrdersTab />}
        {tab === "settings" && <SettingsTab />}
        {tab === "inbox" && <AdminInbox />}
      </main>
    </div>
  );
}

const empty = { name: "", category: "", description: "", price: "0", stock: "0", tag: "", requires_prescription: false, active: true, catalogue_visible: true, specifications: "", documentation_url: "", intended_use: "", featured: false, image_url: null as string | null };

function ProductsTab() {
  const qc = useQueryClient();
  const { data: products = [] } = useQuery(productsQuery);
  const [editing, setEditing] = useState<Product | "new" | null>(null);

  async function remove(p: Product) {
    if (!confirm(`Delete ${p.name}?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ["products"] });
    qc.invalidateQueries({ queryKey: ["storefront"] });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Products ({products.length})</h2>
        <Button onClick={() => setEditing("new")} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">+ Add product</Button>
      </div>
      {editing && <ProductForm product={editing === "new" ? null : editing} onClose={() => setEditing(null)} />}
      <div className="mt-6 space-y-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-xl border bg-card p-3">
            <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-lg bg-secondary">
              {p.image_url ? <img src={p.image_url} alt="" className="h-full w-full object-cover" /> : <span className="font-display text-xl text-primary">{p.name[0]}</span>}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{p.name} {!p.active && <span className="text-xs text-muted-foreground">(hidden)</span>}</p>
              <p className="text-xs text-muted-foreground">{p.category} · {Number(p.price).toFixed(2)} · stock {p.stock}</p>
            </div>
            <Button onClick={() => setEditing(p)} className="rounded-full bg-secondary px-3 py-1 text-sm">Edit</Button>
            <Button onClick={() => remove(p)} className="text-sm text-destructive">Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductForm({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const qc = useQueryClient();
  const enhance = useServerFn(enhanceProductImage);
  const { data: all = [] } = useQuery(productsQuery);
  const categories = Array.from(new Set(all.map((p) => p.category)));
  const [f, setF] = useState(() =>
    product
      ? { ...product, price: String(product.price), stock: String(product.stock), tag: product.tag ?? "" }
      : empty,
  );
  const [file, setFile] = useState<File | null>(null);
  const [hq, setHq] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (f.documentation_url && !safeHttps(f.documentation_url)) { toast.error("Documentation must use a valid HTTPS URL"); return; }
    let image_url = f.image_url;
    try {
      if (file) {
        setBusy("Uploading photo…");
        const path = `originals/${crypto.randomUUID()}-${file.name.replace(/[^a-z0-9.]/gi, "_")}`;
        const up = await supabase.storage.from("product-images").upload(path, file, { contentType: file.type });
        if (up.error) throw up.error;
        setBusy(hq ? "Making it high quality (can take up to a minute)…" : "Saving photo…");
        const r = await enhance({ data: { path, enhance: hq } });
        image_url = r.url;
        if (r.warning) toast.warning(r.warning);
        else if (r.enhanced) toast.success("Photo upgraded to high quality");
      }
      setBusy("Saving…");
      const row = {
        name: f.name.trim(),
        category: f.category.trim() || "General",
        description: f.description.trim(),
        price: Number(f.price) || 0,
        stock: parseInt(f.stock) || 0,
        tag: f.tag.trim() || null,
        requires_prescription: f.requires_prescription,
        active: f.active,
        catalogue_visible: f.catalogue_visible,
        specifications: f.specifications.trim(),
        documentation_url: f.documentation_url.trim(),
        intended_use: f.intended_use.trim(),
        featured: f.featured,
        image_url,
      };
      const { error } = product
        ? await supabase.from("products").update(row).eq("id", product.id)
        : await supabase.from("products").insert(row);
      if (error) throw error;
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["products"] });
    qc.invalidateQueries({ queryKey: ["storefront"] });
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(null);
    }
  }

  return (
    <form onSubmit={save} className="mt-6 grid gap-3 rounded-2xl border bg-muted p-5 md:grid-cols-2">
      <h3 className="font-display text-lg font-bold md:col-span-2">{product ? "Edit product" : "New product"}</h3>
      <label className="text-sm">Name<input required className={field} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
      <label className="text-sm">Category (pick one or type a new one)<input required list="cat-list" className={field} value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} />
        <datalist id="cat-list">{categories.map((c) => <option key={c} value={c} />)}</datalist></label>
      <label className="text-sm">Price<input type="number" step="0.01" min="0" required className={field} value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} /></label>
      <label className="text-sm">Stock<input type="number" min="0" required className={field} value={f.stock} onChange={(e) => setF({ ...f, stock: e.target.value })} /></label>
      <label className="text-sm">Badge (optional)<input className={field} placeholder="e.g. New, Best seller" value={f.tag} onChange={(e) => setF({ ...f, tag: e.target.value })} /></label>
      <label className="text-sm">Photo<input type="file" accept="image/*" className={field} onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></label>
      <label className="text-sm md:col-span-2">Description<textarea className={field} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></label>
      <label className="text-sm md:col-span-2">Verified specifications<textarea className={field} value={f.specifications} onChange={e=>setF({...f,specifications:e.target.value})} /></label>
      <label className="text-sm">Documentation URL<input type="url" className={field} value={f.documentation_url} onChange={e=>setF({...f,documentation_url:e.target.value})} /></label>
      <label className="text-sm">Intended use<input className={field} value={f.intended_use} onChange={e=>setF({...f,intended_use:e.target.value})} /></label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.catalogue_visible} onChange={e=>setF({...f,catalogue_visible:e.target.checked})} />Approved for peptide catalogue</label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.featured} onChange={e=>setF({...f,featured:e.target.checked})} />Featured on home page</label>
      <div className="flex flex-wrap gap-4 text-sm md:col-span-2">
        <label className="flex items-center gap-2"><input type="checkbox" checked={hq} onChange={(e) => setHq(e.target.checked)} /> Upgrade photo to high quality with AI</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={f.requires_prescription} onChange={(e) => setF({ ...f, requires_prescription: e.target.checked })} /> Prescription required</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={f.active} onChange={(e) => setF({ ...f, active: e.target.checked })} /> Visible on site</label>
      </div>
      <div className="flex items-center gap-3 md:col-span-2">
        <Button disabled={!!busy} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50">Save</Button>
        <Button type="button" onClick={onClose} className="text-sm underline">Cancel</Button>
        {busy && <span className="text-sm text-muted-foreground">{busy}</span>}
      </div>
    </form>
  );
}

function OrdersTab() {
  const qc = useQueryClient();
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ["orders"] });
  }
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Orders ({orders.length})</h2>
      {orders.length === 0 && <p className="mt-4 text-muted-foreground">No orders yet.</p>}
      <div className="mt-6 space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="rounded-xl border bg-card p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{o.customer_name} · {o.phone}</p>
              <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)} className="rounded-lg border bg-card px-2 py-1">
                {["pending", "confirmed", "out for delivery", "delivered", "cancelled"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <p className="text-muted-foreground">{o.address}</p>
            {o.notes && <p className="italic text-muted-foreground">“{o.notes}”</p>}
            <ul className="mt-2">
              {(o.items as { name: string; qty: number; price: number }[]).map((i, k) => <li key={k}>{i.qty} × {i.name}</li>)}
            </ul>
            <p className="mt-2 font-semibold">Total {Number(o.total).toFixed(2)} · {new Date(o.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  const qc = useQueryClient();
  const { data } = useQuery(settingsQuery);
  const [s, setS] = useState<Settings | null>(null);
  useEffect(() => { if (data) setS(data); }, [data]);
  if (!s) return <p>Loading…</p>;
  const keys: [keyof Settings, string][] = [
    ["pharmacy_name", "Business name"], ["announcement", "Top banner text"], ["phone", "Phone"], ["email", "Email"],
    ["address", "Address"], ["hours", "Opening hours"], ["currency", "Currency symbol"],
    ["delivery_fee", "Delivery fee"], ["free_delivery_over", "Free delivery over"],
    ["business_description", "Business description"], ["home_intro", "Homepage introduction"], ["services_text", "Services overview"], ["quality_text", "Documentation practices"],
    ["canonical_origin", "Production domain (HTTPS, no path)"],
    ["home_seo_title", "Home page title"], ["home_seo_description", "Home page description"],
    ["shop_seo_title", "Shop page title"], ["shop_seo_description", "Shop page description"],
    ["contact_seo_title", "Contact page title"], ["contact_seo_description", "Contact page description"],
  ];
  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!s) return;
    if (s.canonical_origin && !canonicalOrigin(s.canonical_origin)) { toast.error("Enter an HTTPS domain without a path, query or fragment."); return; }
    const { id: _id, ...rest } = s;
    const { error } = await supabase.from("site_settings").update({ ...rest, delivery_fee: Number(rest.delivery_fee), free_delivery_over: Number(rest.free_delivery_over) }).eq("id", 1);
    if (error) { toast.error(error.message); return; }
    toast.success("Settings saved");
    qc.invalidateQueries({ queryKey: ["settings"] });
    qc.invalidateQueries({ queryKey: ["storefront"] });
  }
  return (
    <form onSubmit={save} className="grid max-w-2xl gap-3">
      <h2 className="font-display text-2xl font-bold">Business details</h2>
      <label className="flex gap-2 text-sm"><input type="checkbox" checked={s.public_contact_verified} onChange={e=>setS({...s,public_contact_verified:e.target.checked})} />Publish verified contact details</label>
      {keys.map(([k, label]) => (
        <label key={k} className="text-sm">{label}
          <input className={field} value={String(s[k] ?? "")} onChange={(e) => setS({ ...s, [k]: e.target.value } as Settings)} />
        </label>
      ))}
      <Button className="w-fit rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Save settings</Button>
    </form>
  );
}

import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

// Takes an uploaded original photo, asks AI to produce a clean high-quality
// product shot, stores it, and returns a long-lived URL for the product.
export const enhanceProductImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { path: string; enhance: boolean }) => input)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (!isAdmin) throw new Error("Only admins can upload images");

    const bucket = supabase.storage.from("product-images");
    let finalPath = data.path;
    let enhanced = false;
    let warning: string | null = null;

    if (data.enhance) {
      const { data: file, error } = await bucket.download(data.path);
      if (error || !file) throw new Error("Could not read uploaded image");
      const form = new FormData();
      form.append("model", "openai/gpt-image-2.5-sunburst");
      form.append(
        "prompt",
        "Enhance this pharmacy product photo into a sharp, high-resolution, professional e-commerce product shot. Keep the exact same product, packaging, label text, colors and branding unchanged. Clean soft studio lighting, plain light neutral background, centered, crisp details, no added text.",
      );
      form.append("quality", "high");
      form.append("image", new File([file], "product.png", { type: file.type || "image/png" }));
      const res = await fetch("https://ai.gateway.lovable.dev/v1/images/edits", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env['LOVABLE_API_KEY']}`, "X-Lovable-AIG-SDK": "fetch" },
        body: form,
      });
      if (res.ok) {
        const json = (await res.json()) as { data?: { b64_json?: string }[] };
        const b64 = json.data?.[0]?.b64_json;
        if (b64) {
          const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
          const outPath = `enhanced/${crypto.randomUUID()}.png`;
          const up = await bucket.upload(outPath, bytes, { contentType: "image/png" });
          if (!up.error) {
            finalPath = outPath;
            enhanced = true;
          }
        }
      } else {
        const body = await res.text();
        console.error("enhance failed", res.status, body);
        warning =
          res.status === 402
            ? "AI credits are used up, so the original photo was kept."
            : "Enhancement failed, so the original photo was kept.";
      }
    }

    const { data: signed, error: sErr } = await bucket.createSignedUrl(finalPath, TEN_YEARS);
    if (sErr || !signed) throw new Error("Could not create image link");
    return { url: signed.signedUrl, enhanced, warning };
  });

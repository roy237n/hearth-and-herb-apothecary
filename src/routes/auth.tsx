import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff Login — Verdant Pharmacy" },
      { name: "description", content: "Staff sign-in for the pharmacy admin dashboard." },
      { property: "og:title", content: "Staff Login — Verdant Pharmacy" },
      { property: "og:description", content: "Staff sign-in for the pharmacy admin dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return toast.error(error.message);
      nav({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Check your email to confirm your account, then sign in.");
      setMode("in");
    }
  }

  const field = "w-full rounded-xl border bg-card px-4 py-3 text-sm";
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 font-sans">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border bg-card p-8 shadow-xl">
        <h1 className="font-display text-2xl font-bold">{mode === "in" ? "Staff sign in" : "Create staff account"}</h1>
        <input type="email" required placeholder="Email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" required minLength={8} placeholder="Password" className={field} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={busy} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-50">
          {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
        </button>
        <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-sm text-muted-foreground underline">
          {mode === "in" ? "No account yet? Create one" : "Already have an account? Sign in"}
        </button>
        <p className="text-xs text-muted-foreground">The first account created becomes the pharmacy admin.</p>
      </form>
    </div>
  );
}

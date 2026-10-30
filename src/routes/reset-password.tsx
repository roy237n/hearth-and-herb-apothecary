import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — GL Biochem Peptide" },
      { name: "description", content: "Set a new staff account password." },
      { property: "og:title", content: "Reset Password — GL Biochem Peptide" },
      { property: "og:description", content: "Set a new staff account password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  // Supabase opens this page from the recovery email with a recovery session.
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { toast.error("Passwords do not match"); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated. You can sign in now.");
    nav({ to: "/auth" });
  }

  const field = "w-full rounded-xl border bg-card px-4 py-3 text-sm";
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 font-sans">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border bg-card p-8 shadow-xl">
        <h1 className="font-display text-2xl font-bold">Set a new password</h1>
        {ready ? (
          <>
            <input type="password" required minLength={8} placeholder="New password (8+ characters)" className={field} value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" required minLength={8} placeholder="Confirm new password" className={field} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            <button disabled={busy} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-50">
              {busy ? "Please wait…" : "Update password"}
            </button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            This page must be opened from the password-reset link in your email. Request a new link from the sign-in page if
            it has expired.
          </p>
        )}
      </form>
    </div>
  );
}

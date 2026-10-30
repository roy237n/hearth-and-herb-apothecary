import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Certificate = Database["public"]["Tables"]["certificates"]["Row"];

export const certificatesQuery = queryOptions({
  queryKey: ["certificates"],
  queryFn: async () => {
    const { data, error } = await supabase.from("certificates").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
});

// Public pages only ever show certificates the administrator marked visible.
export function visibleCertificates(certs: Certificate[]) {
  return certs.filter((c) => c.publicly_visible);
}

export function formatCertDates(c: Pick<Certificate, "issue_date" | "expiry_date">) {
  const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString(undefined, { year: "numeric", month: "long" });
  const parts: string[] = [];
  if (c.issue_date) parts.push(`Issued ${fmt(c.issue_date)}`);
  if (c.expiry_date) parts.push(`Valid until ${fmt(c.expiry_date)}`);
  return parts.join(" · ");
}

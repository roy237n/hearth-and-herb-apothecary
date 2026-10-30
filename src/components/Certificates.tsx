import { useQuery } from "@tanstack/react-query";
import { Award, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { certificatesQuery, visibleCertificates, formatCertDates } from "@/lib/certificates";

// Public certificates & accreditations section. Renders nothing until the
// administrator uploads and approves genuine documents for display.
export function CertificatesSection() {
  const { data } = useQuery(certificatesQuery);
  const certs = visibleCertificates(data ?? []);
  if (certs.length === 0) return null;
  return (
    <section className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-display text-2xl font-semibold">Certificates & accreditations</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Documents below are supplied and approved for publication by the business. Match each document to its issuing
          organisation and validity dates.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((c) => (
            <article key={c.id} className="flex flex-col rounded-xl border bg-card p-5">
              <Award className="h-6 w-6 text-accent" />
              <h3 className="mt-3 font-semibold">{c.name}</h3>
              {c.issuing_organisation && <p className="mt-1 text-sm text-muted-foreground">{c.issuing_organisation}</p>}
              {formatCertDates(c) && <p className="mt-1 text-xs text-muted-foreground">{formatCertDates(c)}</p>}
              {c.description && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.description}</p>}
              <Button asChild variant="outline" size="sm" className="mt-4 w-fit">
                <a href={c.file_url} target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-1 h-4 w-4" />View document
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

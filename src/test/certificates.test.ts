import { describe, expect, it } from "vitest";
import { visibleCertificates, formatCertDates, type Certificate } from "@/lib/certificates";

const cert = (over: Partial<Certificate>): Certificate => ({
  id: crypto.randomUUID(),
  name: "ISO 9001 Certificate",
  description: "",
  issuing_organisation: "Example Body",
  issue_date: "2026-01-15",
  expiry_date: null,
  file_path: "docs/x.pdf",
  file_url: "https://example.com/x.pdf",
  file_type: "application/pdf",
  publicly_visible: false,
  created_at: new Date().toISOString(),
  ...over,
});

describe("certificate visibility rule", () => {
  it("public pages only show administrator-approved certificates", () => {
    const list = [cert({ name: "Hidden draft" }), cert({ name: "Published", publicly_visible: true })];
    const shown = visibleCertificates(list);
    expect(shown.map((c) => c.name)).toEqual(["Published"]);
  });

  it("hides everything when nothing is approved", () => {
    expect(visibleCertificates([cert({}), cert({})])).toEqual([]);
  });
});

describe("certificate date formatting", () => {
  it("formats issue and expiry dates", () => {
    const text = formatCertDates(cert({ issue_date: "2026-01-15", expiry_date: "2028-01-15" }));
    expect(text).toContain("Issued");
    expect(text).toContain("Valid until");
  });

  it("returns empty text when no dates are set", () => {
    expect(formatCertDates(cert({ issue_date: null, expiry_date: null }))).toBe("");
  });
});

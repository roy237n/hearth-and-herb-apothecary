CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  issuing_organisation text NOT NULL DEFAULT '',
  issue_date date,
  expiry_date date,
  file_path text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL DEFAULT '',
  publicly_visible boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.certificates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads visible certificates" ON public.certificates FOR SELECT TO anon, authenticated USING (publicly_visible OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage certificates" ON public.certificates FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read certificate files" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins upload certificate files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update certificate files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete certificate files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'certificates' AND public.has_role(auth.uid(), 'admin'));
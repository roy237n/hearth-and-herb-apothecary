<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Preserve existing product/order records; separate administrator-approved catalogue visibility from legacy pharmacy inventory so unrelated items are not republished.
- Use three public content routes with shared storefront components; keep administration under the managed authenticated layout.
- Visitor messaging uses server-validated random conversation capabilities stored only as hashes; private tables expose ordinary administrative reads/writes through role-scoped RLS.
- Public page data is loaded through server publishable-client reads and route query loaders; SEO derives from editable settings and a validated production origin.
- Keep homepage supplier benefits and concise supporting content in a dedicated browser-safe component; centralize homepage photo references in a browser-safe module, using absolute hosted CDN pointer URLs for uploads and bundled imports for generated enhancements so external hosts can display them; homepage photos do not create catalogue records.
- Keep the searchable documentation library on Shop; derive entries only from approved products with safe linked documents, and match batch searches against administrator-supplied specifications to avoid fabricated certificate data.

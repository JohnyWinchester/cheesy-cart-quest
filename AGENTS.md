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

## Project coding rules (from the user)

- Functional components and hooks only, never class components — the user's stated MVP convention.
- No inline `style={{}}`; all styling through Tailwind utility classes — keeps theming and dark mode working.
- When creating or changing a file, output the complete file, never abbreviated with comments like "// остальной код".
- Write new components as TypeScript `.tsx` even when the request names `.jsx`, and keep the page entry in `src/routes/index.tsx` — the project is TanStack Start, which has no `App.jsx`.
- Product data stays in `src/data/mockData.ts`. Cart state lives in one shared context provider exported from the cart hook and mounted once in the root route, so any component may call `useCart()` and stay in sync — two independent calls to a local-state hook would show two different carts. Presentational components (catalog, product cards, cart rows) still take data and callbacks as props.


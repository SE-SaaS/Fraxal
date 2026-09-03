# Websites

Monorepo holding two unrelated brands that share one component layer.

| App              | Port | What it is                        |
| ---------------- | ---- | --------------------------------- |
| `apps/fraxal`    | 3000 | Fraxal — AI and software services |
| `apps/portfolio` | 3001 | Marketing practice + portfolio    |

## Commands

```bash
npm install          # once, from the repo root
npm run dev:fraxal   # http://localhost:3000
npm run dev:portfolio # http://localhost:3001

npm run lint         # every workspace
npm run typecheck    # every workspace
npm run build        # every workspace
npm run format       # prettier, with Tailwind class sorting
```

## How the two brands share code

`packages/ui` styles itself **only** with the token names declared in
`packages/ui/src/styles/base.css`. There is no hex and no `bg-blue-500` anywhere
in that package. Each app imports that stylesheet and re-declares `@theme` with
its own values, so the same `<Button />` renders as two different companies.

Adding a raw colour to `packages/ui` is the one change that breaks this. If a
component needs a colour that isn't a token, add the token — don't inline it.

Components used by one site live in that app's `src/components/`. The moment a
second site needs one, it moves to `packages/ui/blocks/` and loses its colours.

## Layout

```
apps/fraxal        company site     → its own Vercel project
apps/portfolio     portfolio site   → its own Vercel project
packages/ui        @repo/ui      — token-driven components, raw source
packages/config    @repo/config  — tsconfig, eslint, prettier
```

`packages/ui` ships raw `.tsx`; the apps list it in `transpilePackages`. There
is deliberately no build step — Next already runs a compiler, and a second one
only buys stale `dist/` output and broken `"use client"` directives.

## Toolchain notes

- **TypeScript is pinned to 6.x, not 7.** `typescript-eslint` declares
  `typescript: <6.1.0`; TS 7 would silently cost every typed lint rule.
- **ESLint is pinned to 9.x, not 10.** `eslint-plugin-react`, `-jsx-a11y` and
  `-import` (all pulled in by `eslint-config-next`) cap at `^9`. npm marks the
  tree invalid on ESLint 10.
- **`baseUrl` is not set anywhere.** TS 6 deprecates it; `paths` resolve
  relative to the tsconfig that declares them, which is why each app declares
  its own `@/*` rather than inheriting one from `@repo/config`.
- **Linting is untyped on purpose.** `eslint-config-next` installs its own
  parser and doesn't forward `parserOptions.project`. `verbatimModuleSyntax`
  in the base tsconfig covers the rule that mattered.

## Environment

Copy `.env.example` to `.env.local` in whichever app you're running.

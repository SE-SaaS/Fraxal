# Conventions

Monorepo: npm workspaces over `apps/*` and `packages/*`. Run everything from
the repo root.

## The one rule that matters

`packages/ui` styles itself only with tokens from
`packages/ui/src/styles/base.css`. No hex, no `bg-blue-500`, no `text-gray-400`
in that package — ever. Apps override `@theme` to rebrand. If a component needs
a colour that has no token, add the token rather than inlining the value.

## Structure

- App-only components → `apps/<app>/src/components/`
- Used by both sites → `packages/ui/src/blocks/`, with colours removed
- Shared config → `packages/config` (`@repo/config`)
- Positioning, nav and site metadata → `apps/<app>/src/lib/site.ts`

## Pinned on purpose — do not "upgrade" these

- `typescript` 6.x — `typescript-eslint` caps at `<6.1.0`; TS 7 breaks typed lint
- `eslint` 9.x — the `eslint-config-next` plugin set caps at `^9`
- Never add `baseUrl` — deprecated in TS 6; `paths` work without it

## Before saying a change works

`npm run lint && npm run typecheck && npm run build`

A green build does not prove Tailwind emitted your classes — it drops unknown
utilities silently. When adding tokens, grep the built CSS in
`.next/static/chunks/*.css` for the utility.

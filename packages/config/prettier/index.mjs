/**
 * Shared Prettier config.
 *
 * `prettier-plugin-tailwindcss` (class sorting) is intentionally absent for now:
 * under Tailwind v4 it needs a `tailwindStylesheet` path pointing at the CSS
 * entry that declares `@theme`, and that file lands with packages/ui. It gets
 * wired at the repo root once that stylesheet exists.
 *
 * @type {import("prettier").Config}
 */
export default {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  arrowParens: "always",
  endOfLine: "lf",
};

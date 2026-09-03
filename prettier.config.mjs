import base from "@repo/config/prettier";

/**
 * Root config = shared base + the Tailwind class sorter.
 *
 * The plugin lives here rather than in packages/config because under Tailwind
 * v4 it needs a path to the stylesheet that declares `@theme`, and only the
 * repo root knows where that is.
 *
 * @type {import("prettier").Config}
 */
export default {
  ...base,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./packages/ui/src/styles/base.css",
};

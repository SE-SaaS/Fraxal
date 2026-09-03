import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

/**
 * Framework-agnostic base. Anything that is true for every TS file in the repo
 * belongs here; anything Next-specific belongs in ./next.mjs.
 *
 * Deliberately untyped linting (`configs.recommended`, not
 * `recommendedTypeChecked`). eslint-config-next installs its own parser and
 * does not forward `parserOptions.project`, so type-aware rules would need two
 * parsers configured in parallel. The rules worth having here don't need types:
 * `verbatimModuleSyntax` in the base tsconfig already forces type-only imports
 * to be marked, and the compiler is a better place to enforce that than lint.
 */
export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/dist/**",
      "**/.vercel/**",
      "**/next-env.d.ts",
    ],
  },

  js.configs.recommended,
  tseslint.configs.recommended,

  {
    rules: {
      // `_foo` is the escape hatch for a deliberately unused binding.
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "smart"],
    },
  },

  // Must stay last: switches off every rule Prettier already owns.
  prettier,
);

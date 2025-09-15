import { config } from "@repo/eslint-config/base";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**", 
      "build/**",
      "dist/**",
      ".turbo/**",
      "apps/*/eslint.config.mjs",
      "packages/*/eslint.config.mjs",
    ],
  },
];

import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";
import svelte from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";

export default defineConfig(
  ...eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...svelte.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    // Svelte runes files (.svelte.ts) must use the TS parser, not the Svelte parser
    files: ["**/*.svelte.ts"],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    ignores: ["dist/", ".astro/", "node_modules/"],
  },
);

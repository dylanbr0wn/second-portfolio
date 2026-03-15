# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start dev server at localhost:4321
pnpm build    # Build to ./dist/
pnpm preview  # Preview production build locally
pnpm lint     # ESLint (Astro + Svelte)
pnpm format   # Prettier (Astro + Svelte + TS)
pnpm astro    # Run Astro CLI commands
```

No test runner is configured. Requires `GITHUB_TOKEN` in `.env` (see `.env.example`).

## Architecture

**Astro 6.x** portfolio site with **Svelte** islands for interactivity. Astro handles routing, content, and SSR; Svelte handles stateful UI.

- `src/pages/` — File-based routes (`index.astro` → `/`)
- `src/layouts/Layout.astro` — Root HTML shell; accepts `title` and `description` props passed through to `BaseHead.astro`
- `src/components/` — Mix of `.astro` (static) and `.svelte` (interactive) components
- `src/assets/imgs/` — Photo collection images, optimized by Astro at build time
- `src/content/photos/` — Content collection entries for photos (one `.md` per image)
- `src/lib/` — Shared utilities: `github.ts` (GitHub API), `store.svelte.ts` (Svelte global state)
- `public/` — Static files served as-is (favicons, OG image, video)

## Key patterns

**Content collection (`src/content.config.ts`):** The `photos` collection uses `image()` for Astro image optimization. Each entry has `title`, `img`, and optional camera metadata: `iso` (number), `shutter`, `aperture`, `device` (strings).

**Photo components:** `Photography.astro` fetches the collection and renders `Photo.svelte` islands. Each `Photo.svelte` manages its own lightbox open/close state, portals the lightbox to `document.body`, and uses Svelte crossfade transitions. Images are rendered via `ImageWithFallback.astro` which shows an animated skeleton until the image loads — uses a `MutationObserver` to handle lightbox images added dynamically.

**Svelte global state:** `store.svelte.ts` exports a `$state` object tracking which photo is open (`store.selected`). Only one lightbox is open at a time.

**GitHub projects:** `src/lib/github.ts` fetches a hardcoded list of repos (`projs` array) from the GitHub API using `GITHUB_TOKEN` from `astro:env/server`. Add new repos to that array to include them on the site.

**SEO:** `BaseHead.astro` uses `astro-seo` with Open Graph configured. The OG image is `/twitter-og-image.jpg`. Site URL is `https://dylanbrown.xyz`.

## Adding photos

1. Add image to `src/assets/imgs/`
2. Create `src/content/photos/<name>.md` with frontmatter: `title`, `img` (relative path), and optionally `shutter`, `aperture`, `device`, `iso`

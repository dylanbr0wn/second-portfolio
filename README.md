# dylanbrown.space

Personal portfolio site at [dylanbrown.space](https://dylanbrown.space). Built with Astro 6 and Svelte.

## Stack

- **Astro 6** — routing, content collections, SSR
- **Svelte** — interactive islands (photo lightbox, state)
- **Tailwind CSS** — styling
- **GitHub API** — fetches project data at build time

## Setup

Requires a GitHub token:

```sh
cp .env.example .env
# add your GITHUB_TOKEN to .env
```

```sh
pnpm install
pnpm dev       # localhost:4321
```

## Commands

| Command        | Action                              |
| :------------- | :---------------------------------- |
| `pnpm dev`     | Start dev server at localhost:4321  |
| `pnpm build`   | Build to `./dist/`                  |
| `pnpm preview` | Preview production build locally    |
| `pnpm lint`    | ESLint (Astro + Svelte)             |
| `pnpm format`  | Prettier (Astro + Svelte + TS)      |

## Adding photos

1. Add image to `src/assets/imgs/`
2. Create `src/content/photos/<name>.md`:

```md
---
title: Photo title
img: ../../assets/imgs/your-photo.jpg
shutter: 1/250
aperture: f/2.8
iso: 400
device: Canon R6
---
```

## Adding projects

Edit the `projs` array in `src/lib/github.ts` to include additional GitHub repos.

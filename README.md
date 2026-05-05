# Ahmad Hassaan Ullah — Portfolio

Personal portfolio for Ahmad Hassaan Ullah, senior software engineer. Built as a
zero-CMS, MDX-driven Next.js site so the content can be edited end-to-end in the
repo without touching React.

## Stack

- **Next.js 16** (App Router, Server Components by default)
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first config, design tokens in `app/globals.css`)
- **Biome** (lint + format, single tool)
- **Motion** (animation), **Lenis** (smooth scroll) — added in later phases
- **MDX** via `@next/mdx` for all content — added in later phases

## Development

```bash
npm install
npm run dev         # start dev server on http://localhost:3000
npm run build       # production build
npm run start       # run the production build locally
npm run lint        # biome check (lint + format check)
npm run lint:fix    # auto-fix lint and import organization
npm run format      # biome format --write
npm run typecheck   # tsc --noEmit
```

Node 22+ recommended (`.nvmrc` pins LTS).

## Self-edit guide

Coming at the end of v1. The promise: a new project will be one MDX file in
`content/projects/` with no code edits.

## Architecture decisions

See [DECISIONS.md](./DECISIONS.md) for one-paragraph notes on each non-trivial choice.

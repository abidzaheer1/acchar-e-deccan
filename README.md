# Acchar-e-Deccan

A small-batch pickle storefront for the kitchens of the Deccan plateau, built
with [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript, and
Tailwind CSS 4.

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to browse the pantry, add
jars to the cart, and adjust quantities in the cart drawer.

## Scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start the development server (Turbopack).    |
| `npm run build` | Create an optimized production build.        |
| `npm run start` | Serve the production build.                  |
| `npm run lint`  | Run ESLint.                                  |

## Project layout

- `src/app/page.tsx` — home route rendering the storefront.
- `src/app/Storefront.tsx` — interactive client component (product grid + cart).
- `src/app/products.ts` — pickle catalog data.

## Cloud Agent environment

`.cursor/environment.json` configures the Cursor Cloud Agent environment:
`install` refreshes dependencies with `npm install`, and a `dev` terminal runs
the Next.js dev server on port 3000.

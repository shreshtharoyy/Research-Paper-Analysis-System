# Papermind — frontendv1

The product face of the Research Paper Analysis System. A Next.js app that lets
anyone drop in a research paper and get back a summary, its research domain,
keywords, and related papers — powered by the FastAPI backend in this repo.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with a custom Papermind design system (light + dark)
- Hand-rolled shadcn-style UI primitives (no Radix dependency)
- **framer-motion** for subtle motion, **lucide-react** for icons
- **next-themes** for the light/dark toggle

## How it connects to the backend

The browser never calls the Python backend directly. Instead it posts the PDF to
a Next.js route handler at [`/api/analyze`](src/app/api/analyze/route.ts), which
forwards the upload to the FastAPI `/analyze` endpoint. This keeps the backend
URL server-side and avoids CORS entirely.

Configure the backend address with an env var (defaults to
`http://127.0.0.1:8000`):

```bash
cp .env.local.example .env.local
# edit BACKEND_URL if your backend runs elsewhere
```

## Run it

From the repo root, start the backend first:

```bash
uvicorn app.main:app --reload      # http://127.0.0.1:8000
```

Then, in `frontendv1/`:

```bash
npm install
npm run dev                         # http://localhost:3000
```

Open http://localhost:3000, go to **Open app**, and upload a PDF.

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the dev server                 |
| `npm run build`    | Production build                     |
| `npm run start`    | Serve the production build           |
| `npm run lint`     | Lint with `eslint-config-next`       |
| `npm run typecheck`| Type-check with `tsc --noEmit`       |

## Structure

```
src/
  app/
    page.tsx              Landing page (the "face")
    analyze/page.tsx      The analysis workspace
    api/analyze/route.ts  Proxy to the FastAPI backend
    layout.tsx            Fonts, theme provider, metadata
    globals.css           Design tokens (light + dark)
  components/
    landing/             Hero, how-it-works, capabilities, CTA
    analysis/            Dropzone, analyzer state machine, result cards
    brand/               Papermind logo
    ui/                  shadcn-style primitives
  lib/                   cn() util + API client
  types/                 Shared types (mirror the backend models)
```

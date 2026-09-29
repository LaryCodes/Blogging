# BLOGGING

**Technology Insights for Modern Businesses**

BLOGGING is a professional knowledge platform for a regional IT consultancy. It publishes
industry insights, technology news, and practical guidance across artificial intelligence,
cybersecurity, cloud computing, software development, and digital transformation. The site
serves both as a public knowledge hub and as a lead-generation channel for consultancy
services.

---

## Project Overview

This is a portfolio-grade blog/news platform built with Next.js 15 (App Router), TypeScript,
and Tailwind CSS. It simulates a **Headless CMS architecture** using structured JSON content
rather than an external CMS, while keeping the data model and access layer clean enough to
migrate to a real CMS later with minimal changes.

The design is clean, modern, and business-oriented, prioritizing readability, content
organization, and professionalism over flashy animation.

---

## Features

- **Home page** with hero, featured article, latest articles, category grid, consultancy
  services, and a newsletter signup.
- **Blog listing** (`/blog`) with instant client-side search and category filtering that work
  together, featured badges, read time, and publication dates.
- **Article detail** (`/blog/[slug]`) with hero image, full content, author, category, meta,
  and a Related Articles section (3 posts from the same category, excluding the current one).
- **Category pages** (`/category/[slug]`) listing all articles within a topic.
- **Authors** listing (`/authors`) and author detail (`/authors/[slug]`) with bio, role,
  social links, and articles written.
- **Services** (`/services`) with descriptions, benefits, and calls to action.
- **About** (`/about`) covering mission, why guidance matters, and the consultancy approach.
- **Contact** (`/contact`) with a validated frontend-only form and a success state.
- **Reading time** displayed on every article ("5 min read").
- **SEO metadata** generated for every route, including dynamic titles and descriptions for
  articles and categories, plus a dynamic `sitemap.xml` and `robots.txt`.
- **Accessibility**: semantic HTML, proper heading hierarchy, form labels, visible focus
  states, a skip-to-content link, and keyboard-friendly navigation.
- **Responsive** layout that works across mobile, tablet, laptop, and desktop with no
  horizontal scrolling.
- **Fallback states** for empty search results, invalid article/author/category slugs
  (404 via `not-found`), and unexpected runtime errors (error boundary).

---

## Technologies Used

| Area          | Choice                          |
| ------------- | ------------------------------- |
| Framework     | Next.js 15 (App Router)         |
| Language      | TypeScript                      |
| Styling       | Tailwind CSS                    |
| UI            | React 19 Server & Client Components |
| Content       | Local JSON (headless-CMS style) |
| Icons         | Inline SVG (no icon dependency) |

No external CMS or backend service is used. Content is sourced entirely from local JSON files.

---

## Folder Structure

```text
blogging/
├── src/
│   ├── app/                      # App Router routes
│   │   ├── layout.tsx            # Root layout (nav, footer, metadata, fonts)
│   │   ├── page.tsx              # Home
│   │   ├── globals.css           # Tailwind + base styles
│   │   ├── not-found.tsx         # 404 fallback
│   │   ├── error.tsx             # Runtime error boundary
│   │   ├── sitemap.ts            # Dynamic sitemap
│   │   ├── robots.ts             # Robots rules
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog listing (search + filter)
│   │   │   └── [slug]/page.tsx   # Article detail + related posts
│   │   ├── category/[slug]/page.tsx
│   │   ├── authors/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── services/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── components/               # Reusable UI components
│   ├── content/                  # JSON content (posts, categories, authors)
│   │   ├── posts.json
│   │   ├── categories.json
│   │   └── authors.json
│   ├── lib/                      # Data-access layer + services data
│   │   ├── content.ts            # All content reads go through here
│   │   └── services.ts
│   ├── types/                    # TypeScript content models
│   └── utils/                    # Formatting + content helpers
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

---

## Content Architecture

The project uses a structured JSON-based content architecture that simulates a Headless CMS
workflow and can be migrated to Sanity, Strapi, or Contentful in the future.

- **Content models** (`src/types`) define `Post`, `Category`, `Author`, and a `ResolvedPost`
  (a post with its category and author references resolved to full objects). This mirrors the
  reference-based structure a real CMS exposes.
- **Content data** lives in `src/content/*.json`. Posts reference categories and authors by
  slug, just as CMS documents reference other documents.
- **Data-access layer** (`src/lib/content.ts`) is the single boundary between the app and the
  content source. Every read (posts, categories, authors, related posts, counts) flows through
  its async functions. Migrating to a real CMS means reimplementing only this file, leaving
  pages and components untouched.

---

## Testing Performed

Verification was run against the production build:

- `npm run build` — production build completes successfully; all 29 routes are generated
  (home, blog listing, 9 articles, 5 categories, authors listing, 4 authors, services, about,
  contact, sitemap, robots).
- `npm run type-check` (`tsc --noEmit`) — passes with no TypeScript errors.
- `npm run lint` (`next lint`) — no ESLint warnings or errors.

Edge cases handled and checked:

- **Empty search results** — the blog explorer shows a professional "no articles found"
  fallback with a clear-filters action.
- **Invalid article slug** — `/blog/[slug]` calls `notFound()` and renders the 404 page.
- **Invalid category slug** — `/category/[slug]` calls `notFound()`.
- **Invalid author slug** — `/authors/[slug]` calls `notFound()`.
- **Category with no posts** — renders an empty-state message instead of breaking.
- **Form validation** — the contact form validates name, email format, subject, and message
  length, showing inline errors and a success confirmation.

---

## Challenges Solved

- **CMS-like data modeling in JSON.** Posts hold slug references to categories and authors
  rather than embedding them. A `resolvePost` helper joins these into a `ResolvedPost`,
  including graceful fallbacks when a reference is missing, so a bad slug never crashes a page.
- **Search and filter working together.** The blog explorer composes a category filter and a
  free-text search in a single memoized pass, keeping results instant and consistent.
- **Server/Client boundary.** Data fetching and SEO run in Server Components, while only the
  interactive pieces (navbar menu, search/filter, forms, newsletter) are Client Components,
  keeping the JavaScript payload small.
- **Migration-ready architecture.** Concentrating every content read behind
  `src/lib/content.ts` means the swap to a real CMS touches one file, not the whole app.

---

## Future Improvements

- Migrate the content layer to a real Headless CMS (Sanity, Contentful, or Strapi) by
  reimplementing `src/lib/content.ts`.
- Add pagination or infinite scroll to the blog listing as the archive grows.
- Wire the contact and newsletter forms to a backend or serverless function.
- Add MDX support for richer article content (embeds, code blocks, callouts).
- Introduce automated tests (unit tests for the data layer, end-to-end tests for key routes).
- Add tag-based browsing and an author-follow feature.

---

## Getting Started

```bash
npm install
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint
npm run type-check
```

---

_The project uses a structured JSON-based content architecture that simulates a Headless CMS
workflow and can be migrated to Sanity, Strapi, or Contentful in the future._

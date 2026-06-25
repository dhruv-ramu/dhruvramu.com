# Dhruv Ramu — Personal Portfolio & Blog

An editorial, serif-heavy personal website built with Next.js, TypeScript, Tailwind CSS, MDX, and Framer Motion.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **MDX** via `next-mdx-remote` + `gray-matter`
- **Framer Motion** for animations
- **KaTeX** for math rendering

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Content

### Projects

Create a new file in `content/projects/your-project-slug.mdx`:

```mdx
---
title: "Project Title"
subtitle: "Optional subtitle"
date: "2025-06-01"
category: "Computational Biology"
tags: ["tag1", "tag2"]
featured: true
summary: "One-line summary for cards and metadata."
status: "Completed"
tools: ["Python", "R"]
links:
  - label: "GitHub"
    url: "https://github.com/..."
role: "Lead Researcher"
---

## Context

Your project content here...
```

The page will be available at `/projects/your-project-slug`.

### Writing

Create a new file in `content/writing/your-post-slug.mdx`:

```mdx
---
title: "Post Title"
subtitle: "Optional subtitle"
date: "2025-06-01"
category: "Essays"
tags: ["tag1", "tag2"]
featured: false
summary: "One-line summary."
status: "Published"
---

Your essay content here...
```

The page will be available at `/writing/your-post-slug`.

### Books

Create a new file in `content/books/book-slug.mdx`:

```mdx
---
title: "Book Title"
author: "Author Name"
status: "reading"
rating: 4
note: "Short reading note."
reviewSlug: "writing-slug-if-reviewed"
theme: "Theme category"
---
```

### MDX Components

Available in MDX content:

- `<Callout type="note|warning|insight">...</Callout>`
- `<PullQuote quote="..." attribution="..." />`
- `<Footnote>...</Footnote>`
- Standard markdown with styled headings, blockquotes, code blocks, and tables
- Math via `$inline$` and `$$block$$` syntax (KaTeX)

## Project Structure

```
content/
  projects/     # Project MDX files
  writing/      # Blog/essay MDX files
  books/        # Library entries
src/
  app/          # Next.js pages
  components/   # Reusable UI components
  lib/          # Content parsing, fonts, utilities
```

## Deployment

Deploy to Vercel or any platform supporting Next.js:

```bash
npm run build
npm start
```

## The Atlas of Recurring Questions

The interactive knowledge graph lives at `/atlas` and on the homepage. Node data is in `src/data/atlas.ts`.

To add a node:

```typescript
{
  id: "my-question",
  label: "Why does X happen?",
  type: "question", // domain | concept | question | artifact | method | book | unresolved
  parent: "biomarkers",
  description: "Optional longer description for the side panel.",
  quote: "Optional hover marginalia.",
  links: [
    { label: "Essay: My Essay", href: "/writing/my-essay", kind: "essay" },
  ],
  related: ["other-node-id"],
}
```

- **Colors**: Edit CSS variables in `src/app/globals.css`
- **Fonts**: Configured in `src/lib/fonts.ts` (Cormorant Garamond, Newsreader, IBM Plex Mono)
- **Navigation**: Edit `src/components/SiteHeader.tsx`
- **Contact info**: Edit `src/app/contact/page.tsx`
- **CV content**: Edit `src/app/resume/page.tsx`

## License

Personal site — all rights reserved.

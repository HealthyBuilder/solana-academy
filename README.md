**English** | [简体中文](./README.zh-CN.md)

# Solana Academy

A learning platform for building on Solana: structured courses, video lessons with written tutorials, syntax-highlighted code, and local progress tracking. Bilingual interface (Chinese / English) with light and dark themes.

Built by Solana Foundation.

## Content

All courses live under **Technical Courses**, grouped into four tracks:

| Track | Source | What's inside |
|---|---|---|
| Blockchain Fundamentals | Bootcamp Season 1 | 11 lectures: blockchain basics, accounts, native programs, Anchor, SPL / Token-2022, Pinocchio, testing, program security, the SVM |
| Solana App Development | Bootcamp Season 2 | 16 hands-on parts: environment setup, Hello World, voting, escrow, private transfers, stablecoin + swap, prediction market, x402, RWA, Solana Mobile, production deployment |
| Solana for Enterprise | Bootcamp Season 3 | Institutional practice sessions (in progress, still being updated) |
| Workshops from Ecosystem | Seasons 1 and 2 | 15 workshops from ecosystem teams: trading bots, internet capital markets, AI vibe coding, arbitrage, session keys, Titan, 0x, OKX DEX and more |

## Features

- **Video lessons** from YouTube (muted autoplay with an unmute button), Bilibili or Google Drive. Videos that can't be embedded show a card that opens the source in a new tab.
- **Written tutorials** in MDX, with GitHub-flavored tables and Shiki syntax highlighting that follows the current theme.
- **Bilingual interface**: Chinese / English toggle in the header. Course titles, descriptions and tags are translated; lesson bodies are currently in Chinese.
- **Light and dark themes**, matching the look of the Solana Docs. The choice is remembered; first-time visitors follow their system setting.
- **Progress tracking** in `localStorage`, with no login required.

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4 with CSS-variable design tokens for both themes
- MDX via `next-mdx-remote`, `remark-gfm`, `rehype-pretty-code` / Shiki
- Geist Sans / Geist Mono (bundled locally via the `geist` package)

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm start    # serve the production build
```

## Project structure

```
content/courses/<slug>/      one folder per course
  course.json                course metadata
  NN-*.mdx                   lessons, ordered by the NN- prefix
public/covers/               course card covers
public/s2/                   images used by Season 2 lessons
src/
  app/                       routes: home, category, course, lesson
  components/                ui, layout, course, lesson, mdx, i18n
  config/                    taxonomy, interface strings, tag translations, site
  lib/                       content loading, locale, theme
```

## Adding a course

1. Create `content/courses/<slug>/course.json`:

   ```json
   {
     "title": "第一讲 · 区块链基础",
     "titleEn": "Lecture 1 · Blockchain Fundamentals",
     "description": "…",
     "descriptionEn": "…",
     "category": "tech",
     "subcategory": "blockchain-basics",
     "difficulty": "beginner",
     "tags": ["区块链基础", "共识"],
     "estimatedHours": 3,
     "coverImage": "/covers/<slug>.jpg"
   }
   ```

   `titleEn`, `descriptionEn` and `coverImage` are optional. Without a cover image, the card uses the thumbnail of the course's first YouTube video.

2. Add lessons as `NN-<name>.mdx`. Supported frontmatter:

   | Field | Meaning |
   |---|---|
   | `title`, `description`, `duration` | lesson title, summary, length in minutes |
   | `videoId` | YouTube video ID |
   | `bilibiliId` | Bilibili BV ID |
   | `driveId` | Google Drive file ID (the file must be shared as "anyone with the link") |
   | `externalUrl`, `externalLabel` | link-out card for videos that can't be embedded |

New courses are picked up automatically. Courses within a track are ordered by folder name.

## Configuration

- **Tracks** are defined in `src/config/taxonomy.ts`. Set `enabled: false` on a track to hide it, or `ongoing: true` to show an "In progress" badge.
- **Interface text** lives in `src/config/strings.ts`; tag translations live in `src/config/tags.ts`.
- **Theme colors** are CSS variables in `src/app/globals.css` (`:root` for light, `.dark` for dark).

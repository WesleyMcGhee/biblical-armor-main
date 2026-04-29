# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
npm run db:push      # Push schema changes to Neon DB (no migration files)
npm run db:studio    # Open Drizzle Studio (DB browser)
```

No test suite is configured yet.

## Environment

Requires a `.env.local` file with:
```
DATABASE_URL=postgresql://...neon...
AUTH_SECRET=<random secret>   # generate: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
```

After signing up, promote a user to admin manually in Neon:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@here.com';
```

## Architecture

**Biblical Armor** is a Christian apologetics CMS built with Next.js App Router.

### Authentication

NextAuth v5 (`lib/auth.ts`) uses a Credentials provider (email/password with bcrypt). JWT strategy — the token carries `id`, `email`, `name`, `role`. Custom callbacks propagate role into the session. The combined sign-in/sign-up UI lives at `/auth`.

Admin-only routes (`/admin/*`) are protected in `middleware.ts`, which redirects unauthenticated users to `/login` and non-admins to `/`.

### Database

PostgreSQL via Neon serverless (`@neondatabase/serverless`), accessed through Drizzle ORM. Schema is defined in `lib/db/schema.ts`:

- **users** — UUID PK, email (unique), hashed password, `role` ("user" | "admin")
- **articles** — UUID PK, `slug` (unique), `content` stored as **JSONB** (TipTap format), `published` boolean, FK to `users`
- **comments** — FK to both `articles` and `users`

Use `npm run db:push` to apply schema changes directly (no migration files — this project uses Drizzle's push workflow).

### API Routes (`app/api/`)

| Route | Notes |
|---|---|
| `POST /api/auth/signup` | Creates user with hashed password |
| `/api/auth/[...nextauth]` | NextAuth handler |
| `GET/POST /api/articles` | Public sees published only; admin sees all |
| `GET/PUT/DELETE /api/articles/[id]` | Mutations require admin role |
| `GET /api/articles/slug/[slug]` | Joins author name for public article page |
| `GET/POST /api/comments/[articleId]` | POST requires authenticated session |

### Rich Text Editor

TipTap v3 (`lib/components/RichTextEditor.component.tsx`) with StarterKit, Link, Image, and Placeholder extensions. Article `content` is stored as TipTap's JSONB output and rendered via `generateHTML` on the article detail page.

### Path Alias

`@/` maps to the project root. Use it for all internal imports (e.g. `@/lib/db/schema`, `@/lib/auth`).

## Planned Work (from project backlog)

**High priority:**
- Google OAuth provider
- Email verification on signup
- Password reset / forgot password flow
- Article categories/tags
- Pagination for articles list

**Medium priority:**
- User profile page
- Article view counter
- Search functionality
- Social sharing buttons
- Newsletter signup

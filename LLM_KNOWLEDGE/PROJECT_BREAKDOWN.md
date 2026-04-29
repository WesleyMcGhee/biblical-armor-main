# Biblical Armor Apologetics - Project Knowledge Base

## Purpose

**Biblical Armor Apologetics** is a ministry website dedicated to equipping students and student pastors with the knowledge and tools to defend the Christian faith. The mission is to strengthen the church by providing robust apologetic training, articles, and teaching resources.

**Vision:** To see students and student pastors clothed in the full armor of God, boldly advancing the Gospel in a skeptical world and discipling the next generation to stand for Christ with conviction and compassion.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Database | Neon PostgreSQL |
| ORM | Drizzle |
| Authentication | NextAuth.js v5 (Credentials) |
| Styling | Tailwind CSS v4 |
| Rich Text Editor | Tiptap |
| Icons | Lucide React |

---

## Database Schema

### users
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| email | text | Unique |
| name | text | Display name |
| password | text | Bcrypt hashed |
| role | text | `user` or `admin` |
| image | text | Optional avatar URL |
| created_at | timestamp | Auto-generated |

### articles
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| title | text | Article title |
| slug | text | URL-friendly, unique |
| excerpt | text | Brief description |
| content | jsonb | Tiptap JSON content |
| author_id | uuid | FK to users |
| published | boolean | Draft/published |
| created_at | timestamp | Auto-generated |
| updated_at | timestamp | Auto-updated |

### comments
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| content | text | Comment text |
| article_id | uuid | FK to articles |
| author_id | uuid | FK to users |
| created_at | timestamp | Auto-generated |

---

## Routes & Pages

### Public Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/articles` | Articles listing page |
| `/articles/[slug]` | Single article with comments |
| `/about` | About page with tabs (Mission & Vision, Statement of Faith, Team) |
| `/media` | Videos, podcasts, and resources |

### Auth
| Route | Description |
|-------|-------------|
| `/auth` | Combined login/signup with tab switching |

### Admin (Protected)
| Route | Description |
|-------|-------------|
| `/admin` | Article management dashboard with Tiptap editor |

---

## API Routes

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handlers |
| POST | `/api/auth/signup` | User registration |

### Articles
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/articles` | - | List published articles |
| GET | `/api/articles` | Admin | List all articles |
| POST | `/api/articles` | Admin | Create article |
| GET | `/api/articles/[id]` | Admin | Get by ID |
| PUT | `/api/articles/[id]` | Admin | Update article |
| DELETE | `/api/articles/[id]` | Admin | Delete article |
| GET | `/api/articles/slug/[slug]` | - | Get by slug |

### Comments
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/comments/[articleId]` | - | List comments |
| POST | `/api/comments/[articleId]` | Required | Create comment |

---

## Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `Header` | `lib/components/Header.component.tsx` | Navigation with auth dropdown |
| `RichTextEditor` | `lib/components/RichTextEditor.component.tsx` | Tiptap editor for articles |
| `Providers` | `lib/components/Providers.tsx` | SessionProvider wrapper |

---

## Key Features

1. **Authentication System**
   - Email/password signup and login
   - Role-based access control (user/admin)
   - Protected admin routes via middleware

2. **Article Management**
   - Rich text editing with Tiptap
   - Draft/publish workflow
   - Auto-generated slugs

3. **Comments System**
   - Authenticated users can comment on articles
   - Comments linked to user profiles

4. **Team Profiles**
   - About page with team tab for Collin Brickhouse and Wesley McGhee
   - Placeholder for photos (initials shown as fallback)

5. **Statement of Faith**
   - BFM 2000-style placeholder content
   - Expandable for future edits

---

## TODO

### High Priority
- [ ] Set up Google OAuth provider for easier sign-in
- [ ] Add email verification on signup
- [ ] Implement password reset functionality
- [ ] Add image upload for team member photos
- [ ] Add article categories/tags
- [ ] Implement pagination for articles list

### Medium Priority
- [ ] Add "forgot password" flow
- [ ] Add user profile page
- [ ] Add article views counter
- [ ] Implement search functionality
- [ ] Add social sharing buttons
- [ ] Add newsletter signup

### Low Priority
- [ ] Add dark mode toggle
- [ ] Add loading skeletons for better UX
- [ ] Add animations/transitions
- [ ] Add SEO meta tags per article
- [ ] Create sitemap.xml
- [ ] Add robots.txt

### Future Ideas
- [ ] Video content section with embedded players
- [ ] Podcast feed integration
- [ ] Email newsletter integration
- [ ] Admin analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app version

---

## Environment Variables

```env
DATABASE_URL=          # Neon PostgreSQL connection string
AUTH_SECRET=           # NextAuth secret (openssl rand -base64 32)
NEXTAUTH_URL=          # App URL (http://localhost:3000 for dev)
```

---

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

---

## Database Setup

1. Create Neon project at neon.tech
2. Copy connection string to `.env`
3. Generate AUTH_SECRET
4. Run migrations (stored in `drizzle/` folder)
5. Sign up and manually set admin role:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@here.com';
   ```

---

## File Structure

```
main-site/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   └── signup/
│   │   ├── articles/
│   │   │   ├── [id]/
│   │   │   └── slug/[slug]/
│   │   └── comments/
│   │       └── [articleId]/
│   ├── articles/
│   │   ├── page.tsx
│   │   └── [slug]/
│   ├── admin/
│   ├── auth/
│   ├── about/
│   ├── media/
│   ├── page.tsx (home)
│   └── layout.tsx
├── lib/
│   ├── auth.ts
│   ├── db/
│   │   ├── index.ts
│   │   └── schema.ts
│   └── components/
│       ├── Header.component.tsx
│       ├── RichTextEditor.component.tsx
│       └── Providers.tsx
├── middleware.ts
├── drizzle.config.ts
└── .env
```

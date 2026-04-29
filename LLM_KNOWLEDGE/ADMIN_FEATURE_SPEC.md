# ADMIN_FEATURE_SPEC.md

This specification outlines the implementation of a modular, role-protected Admin Dashboard for **Biblical Armor Apologetics**.

---

## 1. Core Architecture & Security
### Role-Based Access Control (RBAC)
* **Access Level**: Restrict all routes under `/admin/*` to users where `role === 'admin'`.
* **Implementation**:
    * Use **NextAuth.js v5** `auth()` to verify sessions server-side.
    * Configure `middleware.ts` to redirect non-admin users to the login page or a "403 Unauthorized" view.
* **Expandability**: The layout must support adding new modules (Analytics, Media, Users) without refactoring the core sidebar logic.

### Admin Layout (`app/admin/layout.tsx`)
* **Sidebar**: A persistent navigation bar using **Lucide React** icons.
* **Navigation Links**:
    * **Dashboard**: Overview of site activity.
    * **Articles**: CRUD management for blog posts.
    * **Analytics**: Placeholder link for future integration.
    * **Settings**: Global site configurations.

---

## 2. Article Management Module
### Article Creator Form (`app/admin/articles/new/page.tsx`)
This page handles the creation of new content and must integrate with the existing `articles` table schema.

| Field | Input Type | Description |
| :--- | :--- | :--- |
| **Title** | Text | The display title of the article. |
| **Slug** | Text | URL-friendly identifier; auto-generated from title but manually editable. |
| **Excerpt** | Textarea | A brief summary for the articles listing page. |
| **Content** | Rich Text | Integrated **Tiptap** editor instance. |
| **Status** | Toggle | Switch between `Draft` and `Published`. |

### Advanced Feature: .docx Import
* **Functionality**: Allow admins to upload a Word document (`.docx`) to automatically populate the editor.
* **Tooling**: Use the **Mammoth.js** library to convert `.docx` files into clean, semantic HTML.
* **Workflow**:
    1.  User clicks "Import from Word."
    2.  The file is processed on the client or via a server action.
    3.  The converted HTML is injected into the **Tiptap** `RichTextEditor` component.

---

## 3. Data & API Requirements
### API Routes
* **POST `/api/articles`**:
    * Validates the `admin` session.
    * Uses **Drizzle ORM** to insert the article data into the **Neon PostgreSQL** database.
    * Automatically assigns the `author_id` based on the authenticated session.
* **Validation**: Ensure slugs are unique before insertion; return a 400 error if the slug is already in use.

### Database Integration
* **Schema**: Ensure all inserts align with the defined `articles` table columns (`id`, `title`, `slug`, `excerpt`, `content`, `author_id`, `published`).

---

## 4. UI/UX Guidelines
* **Styling**: Use **Tailwind CSS v4** for all components.
* **Feedback**: Implement "Saving..." states and toast notifications for successful publishing or errors.
* **Responsive**: The sidebar should collapse on mobile devices to maintain a clean workspace.

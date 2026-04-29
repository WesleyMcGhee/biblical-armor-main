import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { articles, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    const publishedArticles = await db.query.articles.findMany({
      where: eq(articles.published, true),
      orderBy: (articles, { desc }) => [desc(articles.createdAt)],
    });

    const articlesWithAuthors = await Promise.all(
      publishedArticles.map(async (article) => {
        const author = await db.query.users.findFirst({
          where: eq(users.id, article.authorId),
        });
        return { ...article, authorName: author?.name || "Unknown" };
      })
    );

    return NextResponse.json(articlesWithAuthors);
  }

  const allArticles = await db.query.articles.findMany({
    orderBy: (articles, { desc }) => [desc(articles.createdAt)],
  });

  const articlesWithAuthors = await Promise.all(
    allArticles.map(async (article) => {
      const author = await db.query.users.findFirst({
        where: eq(users.id, article.authorId),
      });
      return { ...article, authorName: author?.name || "Unknown" };
    })
  );

  return NextResponse.json(articlesWithAuthors);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, slug: rawSlug, excerpt, content, published } = await request.json();

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: "Title, excerpt, and content are required" },
        { status: 400 }
      );
    }

    const slug = rawSlug?.trim() ? rawSlug.trim() : slugify(title);

    const existing = await db.query.articles.findFirst({
      where: eq(articles.slug, slug),
    });
    if (existing) {
      return NextResponse.json({ error: "Slug is already in use" }, { status: 400 });
    }

    const [newArticle] = await db
      .insert(articles)
      .values({
        title,
        slug,
        excerpt,
        content,
        authorId: session.user.id,
        published: published || false,
      })
      .returning();

    return NextResponse.json(newArticle);
  } catch (error) {
    console.error("Create article error:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { articles, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  });

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  const author = await db.query.users.findFirst({
    where: eq(users.id, article.authorId),
  });

  return NextResponse.json({
    ...article,
    authorName: author?.name || "Unknown",
  });
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { comments, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  const { articleId } = await params;
  
  const articleComments = await db.query.comments.findMany({
    where: eq(comments.articleId, articleId),
    orderBy: (comments, { desc }) => [desc(comments.createdAt)],
  });

  const commentsWithAuthors = await Promise.all(
    articleComments.map(async (comment) => {
      const author = await db.query.users.findFirst({
        where: eq(users.id, comment.authorId),
      });
      return {
        ...comment,
        authorName: author?.name || "Unknown",
      };
    })
  );

  return NextResponse.json(commentsWithAuthors);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { articleId } = await params;

  try {
    const { content } = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    const [newComment] = await db
      .insert(comments)
      .values({
        content: content.trim(),
        articleId,
        authorId: session.user.id,
      })
      .returning();

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

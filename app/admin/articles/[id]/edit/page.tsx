import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ArticleForm } from "@/lib/components/admin/ArticleForm.component";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await db.query.articles.findFirst({
    where: eq(articles.id, id),
  });

  if (!article) notFound();

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-8">Edit Article</h1>
      <ArticleForm
        mode="edit"
        initialData={{
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          published: article.published,
        }}
      />
    </div>
  );
}

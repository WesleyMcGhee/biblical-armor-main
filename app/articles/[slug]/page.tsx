import { db } from "@/lib/db";
import { articles, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/lib/components/Header.component";
import { ArticleComments } from "@/lib/components/ArticleComments.component";
import { ArrowLeft, Calendar } from "lucide-react";
import { ArticleContent } from "@/lib/components/ArticleContent.component";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  });

  if (!article || !article.published) notFound();

  const author = await db.query.users.findFirst({
    where: eq(users.id, article.authorId),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-primary-foreground/80 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <span>by {author?.name ?? "Unknown"}</span>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <article className="max-w-3xl mx-auto">
              <ArticleContent content={article.content} />
            </article>

            <ArticleComments articleId={article.id} />
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Biblical Armor Apologetics. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/articles"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Articles
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/media"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Media
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

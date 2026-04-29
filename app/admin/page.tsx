import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { FileText, BookOpen, PenLine } from "lucide-react";

export default async function AdminDashboardPage() {
  const allArticles = await db.query.articles.findMany({
    orderBy: (articles, { desc }) => [desc(articles.createdAt)],
  });

  const published = allArticles.filter((a) => a.published);
  const drafts = allArticles.filter((a) => !a.published);
  const recent = allArticles.slice(0, 5);

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-background border border-border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Articles</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{allArticles.length}</p>
        </div>
        <div className="bg-background border border-border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            <span className="text-sm text-muted-foreground">Published</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{published.length}</p>
        </div>
        <div className="bg-background border border-border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <PenLine className="h-5 w-5 text-amber-500" />
            <span className="text-sm text-muted-foreground">Drafts</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{drafts.length}</p>
        </div>
      </div>

      {/* Recent articles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Articles</h2>
          <Link
            href="/admin/articles"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg border border-border">
            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">No articles yet</p>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              Create your first article
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {recent.map((article) => (
              <Link
                key={article.id}
                href={`/admin/articles/${article.id}/edit`}
                className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:bg-muted/40 transition-colors"
              >
                <span className="font-medium text-foreground">{article.title}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    article.published
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {article.published ? "Published" : "Draft"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

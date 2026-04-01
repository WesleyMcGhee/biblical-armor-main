import Link from "next/link";
import { Header } from "@/lib/components/Header.component";
import { ArrowLeft, Calendar } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Why Apologetics Matters in Modern Christianity",
    excerpt: "Exploring the importance of defending our faith in an age of skepticism and doubt.",
    date: "March 15, 2026",
    category: "Foundations",
  },
  {
    id: 2,
    title: "The Historical Evidence for the Resurrection",
    excerpt: "A look at the historical facts that support the resurrection of Jesus Christ.",
    date: "March 10, 2026",
    category: "Evidence",
  },
  {
    id: 3,
    title: "Answering Common Objections to Scripture",
    excerpt: "Practical responses to frequently asked questions about biblical reliability.",
    date: "March 5, 2026",
    category: "FAQ",
  },
  {
    id: 4,
    title: "The Fine-Tuning Argument Explained",
    excerpt: "Understanding the cosmological argument and what it reveals about creation.",
    date: "February 28, 2026",
    category: "Science & Faith",
  },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Articles
            </h1>
            <p className="text-primary-foreground/90 text-lg max-w-2xl">
              Articles, studies, and reflections on Christian apologetics and theology.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((post) => (
                <article
                  key={post.id}
                  className="bg-background border border-border rounded-lg overflow-hidden hover:border-accent transition-colors group"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 bg-accent/20 text-foreground rounded">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/articles/${post.id}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors"
                    >
                      Read more
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
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
              <Link href="/articles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Articles
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/media" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Media
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

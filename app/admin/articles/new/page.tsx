import { ArticleForm } from "@/lib/components/admin/ArticleForm.component";

export default function NewArticlePage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-8">New Article</h1>
      <ArticleForm mode="create" />
    </div>
  );
}

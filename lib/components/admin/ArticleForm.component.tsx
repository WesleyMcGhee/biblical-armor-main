"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "@/lib/components/RichTextEditor.component";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import type { Editor } from "@tiptap/react";

interface ArticleFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: any;
    published: boolean;
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ArticleForm({ mode, initialData }: ArticleFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === "edit");

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [content, setContent] = useState<any>(
    initialData?.content ?? { type: "doc", content: [] }
  );
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [isSaving, setIsSaving] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugManuallyEdited) {
      setSlug(slugify(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);
    setSlugManuallyEdited(true);
  };

  const handleDocxImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editorInstance) return;

    setIsImporting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const mammoth = (await import("mammoth")).default;
      const result = await mammoth.convertToHtml({ arrayBuffer });
      editorInstance.commands.setContent(result.value);
      toast.success("Document imported");
    } catch {
      toast.error("Failed to import document");
    } finally {
      setIsImporting(false);
      e.target.value = "";
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !excerpt.trim() || !slug.trim()) {
      toast.error("Title, slug, and excerpt are required");
      return;
    }

    setIsSaving(true);
    const toastId = toast.loading(
      mode === "create" ? "Creating article..." : "Saving changes..."
    );

    try {
      const url =
        mode === "create"
          ? "/api/articles"
          : `/api/articles/${initialData!.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, excerpt, content, published }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to save article", { id: toastId });
        return;
      }

      toast.success(mode === "create" ? "Article created" : "Changes saved", {
        id: toastId,
      });
      router.push("/admin/articles");
      router.refresh();
    } catch {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Article title"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Slug
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => handleSlugChange(e.target.value)}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
          placeholder="url-friendly-slug"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Auto-generated from title. Edit to customize the URL path.
        </p>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Excerpt
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Brief description of the article"
        />
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-foreground">
            Content
          </label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
          >
            {isImporting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            Import from Word
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx"
            className="hidden"
            onChange={handleDocxImport}
          />
        </div>
        <RichTextEditor
          content={content}
          onChange={setContent}
          onEditorReady={setEditorInstance}
        />
      </div>

      {/* Published toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={published}
          onClick={() => setPublished(!published)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            published ? "bg-primary" : "bg-muted"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              published ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-sm text-foreground">
          {published ? "Published" : "Draft"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !title.trim() || !excerpt.trim() || !slug.trim()}
          className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "create" ? "Create Article" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState, useEffect } from "react";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export function ArticleContent({ content }: { content: any }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const html = useMemo(() => {
    if (!mounted) return "";
    try {
      return generateHTML(content, [
        StarterKit,
        LinkExtension.configure({ openOnClick: false }),
        Image,
      ]);
    } catch (e) {
      console.error("generateHTML failed:", e);
      return "";
    }
  }, [content, mounted]);

  if (!mounted || !html) return null;

  return (
    <div
      className="prose prose-neutral max-w-none
        prose-headings:font-bold prose-headings:text-foreground
        prose-p:text-foreground prose-p:leading-relaxed
        prose-a:text-primary prose-a:underline
        prose-strong:text-foreground
        prose-blockquote:border-primary prose-blockquote:text-muted-foreground
        prose-img:rounded-lg
        prose-ul:text-foreground prose-ol:text-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { siteConfig } from "../../../../../content/site-config";
import type { Metadata } from "next";

const POLICIES_DIR = path.join(process.cwd(), "content", "policies", "v1");

const validSlugs = ["privacy", "terms", "refund", "code-of-conduct"];

interface PolicyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(POLICIES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return { title: "Not Found" };
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(source);

  return {
    title: `${data.title} - ${siteConfig.shortName}`,
    description: `${data.title} for ${siteConfig.name}`,
  };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params;

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const filePath = path.join(POLICIES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  const htmlContent = mdxToHtml(content);

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <article className="prose prose-neutral max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>
        <div className="mt-8 border-t pt-4 text-sm text-muted-foreground">
          <p>
            Version {data.version} - Effective{" "}
            {data.effectiveDate}
          </p>
        </div>
      </div>
    </div>
  );
}

function mdxToHtml(markdown: string): string {
  let html = markdown;

  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  html = html.replace(
    /\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" class="text-primary underline">$1</a>'
  );

  // Tables
  html = html.replace(
    /^\|(.+)\|\s*\n\|[-|\s]+\|\s*\n((?:\|.+\|\s*\n?)*)/gm,
    (_match, headerRow: string, bodyRows: string) => {
      const headers = headerRow
        .split("|")
        .map((h: string) => h.trim())
        .filter(Boolean);
      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row: string) =>
          row
            .split("|")
            .map((c: string) => c.trim())
            .filter(Boolean)
        );

      let table =
        '<table class="w-full border-collapse border border-border text-sm">';
      table += "<thead><tr>";
      for (const h of headers) {
        table += `<th class="border border-border bg-muted px-4 py-2 text-left font-semibold">${h}</th>`;
      }
      table += "</tr></thead><tbody>";
      for (const row of rows) {
        table += "<tr>";
        for (const cell of row) {
          table += `<td class="border border-border px-4 py-2">${cell}</td>`;
        }
        table += "</tr>";
      }
      table += "</tbody></table>";
      return table;
    }
  );

  // Lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(
    /(<li>.+<\/li>\n?)+/g,
    (match) => `<ul class="list-disc pl-6 space-y-1">${match}</ul>`
  );

  // Paragraphs
  const lines = html.split("\n\n");
  html = lines
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<table") ||
        trimmed.startsWith("<li")
      ) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    })
    .join("\n");

  return html;
}

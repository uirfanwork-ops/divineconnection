import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { siteConfig } from "../../../../../content/site-config";
import { mdxToHtml } from "@/lib/mdx-to-html";
import type { Metadata } from "next";

const POLICIES_DIR = path.join(process.cwd(), "content", "policies", "v1");
const validSlugs = ["privacy", "terms", "refund", "code-of-conduct", "waiver", "consent"];

interface PolicyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(POLICIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return { title: "Not Found" };
  const source = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(source);
  return {
    title: `${data.title} - ${siteConfig.shortName}`,
    description: `${data.title} for ${siteConfig.name}`,
  };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params;
  if (!validSlugs.includes(slug)) notFound();
  const filePath = path.join(POLICIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  const htmlContent = mdxToHtml(content);

  return (
    <div className="bg-dark bg-topo">
      <div className="container py-16">
        <div className="mx-auto max-w-3xl">
          <div className="border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-8 md:p-12">
            <article className="policy-article">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </article>
            <div className="mt-10 border-t border-[var(--border-subtle)] pt-4 text-sm text-[var(--text-muted)]">
              <p>Version {data.version} - Effective {data.effectiveDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

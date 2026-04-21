import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { mdxToHtml } from "@/lib/mdx-to-html";

const POLICIES_DIR = path.join(process.cwd(), "content", "policies", "v1");
const validSlugs = ["privacy", "terms", "refund", "code-of-conduct", "waiver", "consent"];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!validSlugs.includes(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = path.join(POLICIES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(source);
  const html = mdxToHtml(content);

  return NextResponse.json({ html });
}

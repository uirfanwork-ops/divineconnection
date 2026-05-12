import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "content", "projects");

export type ProjectFrontmatter = {
  slug: string;
  number: string;
  title: string;
  category: "Commercial" | "Industrial" | "Residential" | "Restaurants";
  year: number;
  location: string;
  scope: string;
  size: string;
  value: string;
  featured?: boolean;
  arched?: boolean;
  cover: { src: string; alt: string };
  lede: string;
};

export async function loadProjectFrontmatter(): Promise<ProjectFrontmatter[]> {
  let entries: string[] = [];
  try {
    entries = await fs.readdir(projectsDir);
  } catch {
    return [];
  }
  const files = entries.filter((f) => f.endsWith(".mdx"));
  const out: ProjectFrontmatter[] = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(projectsDir, file), "utf8");
    const { data } = matter(raw);
    out.push(data as ProjectFrontmatter);
  }
  return out;
}

export async function loadProjectBody(slug: string): Promise<string | null> {
  try {
    const raw = await fs.readFile(
      path.join(projectsDir, `${slug}.mdx`),
      "utf8",
    );
    const { content } = matter(raw);
    return content;
  } catch {
    return null;
  }
}

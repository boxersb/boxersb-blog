import { T as TSS_SERVER_FUNCTION } from "../server.js";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const POSTS_DIR = path.join(process.cwd(), "posts");
function parseMdxFile(slug) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const meta = {
    slug,
    title: data.title ?? "",
    date: data.date instanceof Date ? data.date.toISOString() : String(data.date ?? ""),
    category: data.category ?? "dev",
    description: data.description ?? "",
    coverImage: data.coverImage,
    tags: data.tags,
    draft: data.draft,
    readingTime: stats.text
  };
  return { meta, content };
}
function getAllPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const parsed = parseMdxFile(slug);
    return parsed?.meta ?? null;
  }).filter((meta) => meta !== null && meta.draft !== true);
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
function getPostMeta(slug) {
  return parseMdxFile(slug)?.meta ?? null;
}
function getPostContent(slug) {
  return parseMdxFile(slug)?.content ?? null;
}
export {
  getPostContent as a,
  getAllPosts as b,
  createServerRpc as c,
  getPostMeta as g
};

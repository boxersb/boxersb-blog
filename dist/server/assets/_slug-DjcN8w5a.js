import { c as createServerRpc, g as getPostMeta, a as getPostContent } from "./posts-DgseekR_.js";
import { compile } from "@mdx-js/mdx";
import { notFound } from "@tanstack/react-router";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { c as createServerFn } from "../server.js";
import "node:fs";
import "node:path";
import "gray-matter";
import "reading-time";
import "node:async_hooks";
import "node:stream";
import "react";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const fetchPost_createServerFn_handler = createServerRpc({
  id: "346a45929b7a178e868d51206fd9871265026c72ee1cbdd993baef040425cb31",
  name: "fetchPost",
  filename: "src/routes/posts/$slug.tsx"
}, (opts) => fetchPost.__executeServer(opts));
const fetchPost = createServerFn({
  method: "GET"
}).inputValidator((slug) => slug).handler(fetchPost_createServerFn_handler, async ({
  data: slug
}) => {
  const meta = getPostMeta(slug);
  const content = getPostContent(slug);
  if (!meta || !content) {
    throw notFound();
  }
  const compiled = await compile(content, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug]
  });
  return {
    meta,
    code: String(compiled)
  };
});
export {
  fetchPost_createServerFn_handler
};

import { c as createServerRpc, b as getAllPosts } from "./posts-DgseekR_.js";
import { c as createServerFn } from "../server.js";
import "node:fs";
import "node:path";
import "gray-matter";
import "reading-time";
import "node:async_hooks";
import "node:stream";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const fetchPosts_createServerFn_handler = createServerRpc({
  id: "7f7fbea3aa6f4b38df11d6cf117e18005f1f3c788e3df3683b74e2e43b05dee9",
  name: "fetchPosts",
  filename: "src/routes/index.tsx"
}, (opts) => fetchPosts.__executeServer(opts));
const fetchPosts = createServerFn({
  method: "GET"
}).handler(fetchPosts_createServerFn_handler, () => {
  return getAllPosts();
});
export {
  fetchPosts_createServerFn_handler
};

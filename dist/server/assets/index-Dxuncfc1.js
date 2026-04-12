import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { R as Route } from "./router-CSGZyQWN.js";
import "../server.js";
import "node:async_hooks";
import "node:stream";
import "@tanstack/react-router/ssr/server";
const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "dev", label: "개발" },
  { value: "essay", label: "에세이" },
  { value: "life", label: "일상" }
];
function CategoryTabs({ selected, onSelect }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "tablist",
      "aria-label": "카테고리 필터",
      className: "flex gap-6 border-b border-[var(--color-border)]",
      children: CATEGORIES.map(({ value, label }) => {
        const isActive = selected === value;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            role: "tab",
            "aria-selected": isActive,
            onClick: () => onSelect(value),
            className: "relative pb-3 text-[15px] transition-colors duration-[--duration-fast] cursor-pointer",
            style: {
              color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
              fontWeight: isActive ? 500 : 400
            },
            children: [
              label,
              isActive && /* @__PURE__ */ jsx(
                "span",
                {
                  "aria-hidden": "true",
                  className: "absolute bottom-0 left-0 right-0 h-0.5",
                  style: { backgroundColor: "var(--color-text)" }
                }
              )
            ]
          },
          value
        );
      })
    }
  );
}
const CATEGORY_LABELS = {
  dev: "개발",
  essay: "에세이",
  life: "일상"
};
function PostCard({ post }) {
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: "/posts/$slug",
      params: { slug: post.slug },
      className: "group block border-b py-6 transition-colors duration-[--duration-fast]",
      style: { borderColor: "var(--color-border)" },
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-[15px] mb-2", style: { color: "var(--color-text-muted)" }, children: [
            post.date.slice(0, 10),
            " · ",
            categoryLabel,
            " · ",
            post.readingTime
          ] }),
          /* @__PURE__ */ jsx(
            "h2",
            {
              className: "text-[22px] font-semibold leading-snug mb-2 group-hover:opacity-80 transition-opacity duration-[--duration-fast]",
              style: { color: "var(--color-text)" },
              children: post.title
            }
          ),
          post.description && /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-base leading-relaxed line-clamp-2",
              style: { color: "var(--color-text-secondary)" },
              children: post.description
            }
          )
        ] }),
        post.coverImage && /* @__PURE__ */ jsx("div", { className: "hidden sm:block shrink-0", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: post.coverImage,
            alt: "",
            width: 160,
            height: 100,
            className: "rounded-lg object-cover w-[160px] h-[100px] group-hover:scale-[1.02] transition-transform duration-[--duration-fast]"
          }
        ) })
      ] })
    }
  );
}
function PostList({ posts }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredPosts = selectedCategory === "all" ? posts : posts.filter((post) => post.category === selectedCategory);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(CategoryTabs, { selected: selectedCategory, onSelect: setSelectedCategory }),
    /* @__PURE__ */ jsx("div", { children: filteredPosts.length === 0 ? /* @__PURE__ */ jsx(
      "p",
      {
        className: "py-12 text-center text-base",
        style: { color: "var(--color-text-muted)" },
        children: "이 카테고리에 아직 포스트가 없습니다."
      }
    ) : filteredPosts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.slug)) })
  ] });
}
function HomePage() {
  const posts = Route.useLoaderData();
  return /* @__PURE__ */ jsx("main", { className: "max-w-[1080px] mx-auto px-4 py-8", children: /* @__PURE__ */ jsx(PostList, { posts }) });
}
export {
  HomePage as component
};

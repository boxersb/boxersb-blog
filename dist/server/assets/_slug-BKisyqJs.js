import * as runtime from "react/jsx-runtime";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { runSync } from "@mdx-js/mdx";
import { a as Route } from "./router-CSGZyQWN.js";
import "@tanstack/react-router";
import "../server.js";
import "node:async_hooks";
import "node:stream";
import "@tanstack/react-router/ssr/server";
function H1(properties) {
  return /* @__PURE__ */ jsx("h1", { className: "mt-10 mb-4 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]", ...properties });
}
function H2(properties) {
  return /* @__PURE__ */ jsx("h2", { className: "mt-8 mb-3 text-[28px] font-semibold leading-[1.3]", ...properties });
}
function H3(properties) {
  return /* @__PURE__ */ jsx("h3", { className: "mt-6 mb-2 text-[22px] font-semibold leading-[1.4]", ...properties });
}
function P(properties) {
  return /* @__PURE__ */ jsx("p", { className: "mb-6 text-lg leading-[1.8]", style: { color: "var(--color-text)" }, ...properties });
}
function A({ href, children, ...rest }) {
  const isExternal = href?.startsWith("http");
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      className: "underline underline-offset-2",
      style: { color: "var(--color-accent)" },
      ...isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {},
      ...rest,
      children
    }
  );
}
function Ul(properties) {
  return /* @__PURE__ */ jsx("ul", { className: "mb-6 list-disc pl-6 text-lg leading-[1.8]", ...properties });
}
function Ol(properties) {
  return /* @__PURE__ */ jsx("ol", { className: "mb-6 list-decimal pl-6 text-lg leading-[1.8]", ...properties });
}
function Li(properties) {
  return /* @__PURE__ */ jsx("li", { className: "mb-1", ...properties });
}
function Blockquote(properties) {
  return /* @__PURE__ */ jsx(
    "blockquote",
    {
      className: "mb-6 border-l-3 pl-4 italic",
      style: {
        borderColor: "var(--color-accent)",
        color: "var(--color-text-secondary)"
      },
      ...properties
    }
  );
}
function Code(properties) {
  return /* @__PURE__ */ jsx(
    "code",
    {
      className: "rounded px-1.5 py-0.5 font-mono text-[15px]",
      style: { backgroundColor: "var(--color-code-bg)" },
      ...properties
    }
  );
}
function Pre(properties) {
  return /* @__PURE__ */ jsx(
    "pre",
    {
      className: "mb-6 overflow-x-auto rounded-lg p-4 font-mono text-[15px] leading-[1.6]",
      style: { backgroundColor: "var(--color-code-bg)" },
      ...properties
    }
  );
}
function Img(properties) {
  return /* @__PURE__ */ jsx("img", { className: "my-6 rounded-lg", loading: "lazy", ...properties });
}
function Hr(properties) {
  return /* @__PURE__ */ jsx("hr", { className: "my-8", style: { borderColor: "var(--color-border)" }, ...properties });
}
const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  a: A,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: Blockquote,
  code: Code,
  pre: Pre,
  img: Img,
  hr: Hr
};
const CATEGORY_LABELS = {
  dev: "개발",
  essay: "에세이",
  life: "일상"
};
function PostPage() {
  const {
    meta,
    code
  } = Route.useLoaderData();
  const MdxContent = useMemo(() => {
    const {
      default: Component
    } = runSync(code, {
      ...runtime,
      baseUrl: import.meta.url
    });
    return Component;
  }, [code]);
  const categoryLabel = CATEGORY_LABELS[meta.category] ?? meta.category;
  return /* @__PURE__ */ jsxs("main", { children: [
    meta.coverImage && /* @__PURE__ */ jsx("div", { className: "h-[300px] w-full bg-cover bg-center md:h-[400px]", style: {
      backgroundImage: `url(${meta.coverImage})`
    } }),
    /* @__PURE__ */ jsxs("article", { className: "mx-auto max-w-[680px] px-4 py-10", children: [
      /* @__PURE__ */ jsxs("p", { className: "mb-3 text-[15px]", style: {
        color: "var(--color-text-muted)"
      }, children: [
        meta.date.slice(0, 10),
        " · ",
        categoryLabel,
        " · ",
        meta.readingTime
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mb-8 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]", children: meta.title }),
      /* @__PURE__ */ jsx("div", { className: "prose", children: /* @__PURE__ */ jsx(MdxContent, { components: mdxComponents }) })
    ] })
  ] });
}
export {
  PostPage as component
};

import { Link, createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx(
    "footer",
    {
      className: "border-t py-8",
      style: { borderColor: "var(--color-border)" },
      children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-[1080px] px-4", children: /* @__PURE__ */ jsxs(
        "p",
        {
          className: "text-sm",
          style: { color: "var(--color-text-muted)" },
          children: [
            "© ",
            year,
            " boxersb. All rights reserved."
          ]
        }
      ) })
    }
  );
}
function MobileMenu({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((previous) => !previous);
  return /* @__PURE__ */ jsxs("div", { className: "md:hidden", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: toggle,
        "aria-label": isOpen ? "메뉴 닫기" : "메뉴 열기",
        "aria-expanded": isOpen,
        className: "w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-[--duration-fast] hover:bg-[var(--color-surface-alt)]",
        children: isOpen ? /* @__PURE__ */ jsxs(
          "svg",
          {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
              /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
            ]
          }
        ) : /* @__PURE__ */ jsxs(
          "svg",
          {
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
              /* @__PURE__ */ jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
              /* @__PURE__ */ jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
            ]
          }
        )
      }
    ),
    isOpen && /* @__PURE__ */ jsx(
      "nav",
      {
        "aria-label": "모바일 내비게이션",
        className: "absolute top-14 left-0 right-0 border-b p-4",
        style: {
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)"
        },
        children: /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-1", children: items.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            to: item.to,
            onClick: close,
            className: "block px-3 py-2 text-sm rounded-md transition-colors duration-[--duration-fast] hover:bg-[var(--color-surface-alt)]",
            style: { color: "var(--color-text-muted)" },
            activeProps: {
              style: {
                color: "var(--color-text)",
                fontWeight: 500
              }
            },
            ...item.to === "/" ? { activeOptions: { exact: true } } : {},
            children: item.label
          }
        ) }, item.to)) })
      }
    )
  ] });
}
const STORAGE_KEY = "boxersb-theme";
function getInitialTheme() {
  if (typeof globalThis === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return globalThis.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
}
function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}
function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);
  const handleToggle = useCallback(() => {
    const next = toggleTheme();
    setTheme(next);
  }, []);
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: handleToggle,
      "aria-label": theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환",
      className: "w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-[--duration-fast] hover:bg-[var(--color-surface-alt)]",
      children: theme === "dark" ? /* @__PURE__ */ jsxs(
        "svg",
        {
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "5" }),
            /* @__PURE__ */ jsx("line", { x1: "12", y1: "1", x2: "12", y2: "3" }),
            /* @__PURE__ */ jsx("line", { x1: "12", y1: "21", x2: "12", y2: "23" }),
            /* @__PURE__ */ jsx("line", { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }),
            /* @__PURE__ */ jsx("line", { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" }),
            /* @__PURE__ */ jsx("line", { x1: "1", y1: "12", x2: "3", y2: "12" }),
            /* @__PURE__ */ jsx("line", { x1: "21", y1: "12", x2: "23", y2: "12" }),
            /* @__PURE__ */ jsx("line", { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" }),
            /* @__PURE__ */ jsx("line", { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" })
          ]
        }
      ) : /* @__PURE__ */ jsx(
        "svg",
        {
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /* @__PURE__ */ jsx("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
        }
      )
    }
  );
}
const NAV_ITEMS = [
  { to: "/", label: "Blog" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" }
];
function Header() {
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: "sticky top-0 z-50 border-b",
      style: {
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1080px] h-14 px-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/",
              className: "text-lg font-bold",
              style: { color: "var(--color-text)" },
              children: "boxersb"
            }
          ),
          /* @__PURE__ */ jsx("nav", { "aria-label": "메인 내비게이션", className: "hidden md:flex items-center gap-1", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsx(
            Link,
            {
              to: item.to,
              className: "px-3 py-1.5 text-sm rounded-md transition-colors duration-[--duration-fast] hover:bg-[var(--color-surface-alt)]",
              style: { color: "var(--color-text-muted)" },
              activeProps: {
                style: {
                  color: "var(--color-text)",
                  fontWeight: 500
                }
              },
              ...item.to === "/" ? { activeOptions: { exact: true } } : {},
              children: item.label
            },
            item.to
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(ThemeToggle, {}),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://github.com/boxersb",
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": "GitHub 프로필",
              className: "w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-[--duration-fast] hover:bg-[var(--color-surface-alt)]",
              style: { color: "var(--color-text-muted)" },
              children: /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }) })
            }
          ),
          /* @__PURE__ */ jsx(MobileMenu, { items: NAV_ITEMS })
        ] })
      ] })
    }
  );
}
const appCss = "/assets/app-CpWEjlet.css";
const Route$5 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "boxersb blog" },
      { name: "description", content: "Frontend 개발, 기술 에세이, 일상 기록" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preload",
        href: "/fonts/PretendardVariable.subset.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous"
      }
    ]
  }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsxs(RootDocument, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "ko", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$4 = () => import("./resume-BzVwvqYP.js");
const Route$4 = createFileRoute("/resume")({
  head: () => ({
    meta: [{
      title: "Resume — boxersb blog"
    }, {
      name: "description",
      content: "boxersb 이력서"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./projects-ChriMSCL.js");
const Route$3 = createFileRoute("/projects")({
  head: () => ({
    meta: [{
      title: "Projects — boxersb blog"
    }, {
      name: "description",
      content: "boxersb의 프로젝트 포트폴리오"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./about-BZHoTcAm.js");
const Route$2 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — boxersb blog"
    }, {
      name: "description",
      content: "boxersb에 대해"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const $$splitComponentImporter$1 = () => import("./index-Dxuncfc1.js");
const fetchPosts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("7f7fbea3aa6f4b38df11d6cf117e18005f1f3c788e3df3683b74e2e43b05dee9"));
const Route$1 = createFileRoute("/")({
  loader: () => fetchPosts(),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./_slug-BKisyqJs.js");
const fetchPost = createServerFn({
  method: "GET"
}).inputValidator((slug) => slug).handler(createSsrRpc("346a45929b7a178e868d51206fd9871265026c72ee1cbdd993baef040425cb31"));
const Route = createFileRoute("/posts/$slug")({
  loader: ({
    params
  }) => fetchPost({
    data: params.slug
  }),
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: `${loaderData?.meta.title} — boxersb blog`
    }, {
      name: "description",
      content: loaderData?.meta.description ?? ""
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ResumeRoute = Route$4.update({
  id: "/resume",
  path: "/resume",
  getParentRoute: () => Route$5
});
const ProjectsRoute = Route$3.update({
  id: "/projects",
  path: "/projects",
  getParentRoute: () => Route$5
});
const AboutRoute = Route$2.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$5
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const PostsSlugRoute = Route.update({
  id: "/posts/$slug",
  path: "/posts/$slug",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ProjectsRoute,
  ResumeRoute,
  PostsSlugRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  Route as a,
  router as r
};

import { jsxs, jsx } from "react/jsx-runtime";
function ProjectsPage() {
  return /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[1080px] px-4 py-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]", children: "Projects" }),
    /* @__PURE__ */ jsx("p", { style: {
      color: "var(--color-text-muted)"
    }, children: "프로젝트가 준비 중입니다." })
  ] });
}
export {
  ProjectsPage as component
};

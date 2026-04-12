import { jsxs, jsx } from "react/jsx-runtime";
function ResumePage() {
  return /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[680px] px-4 py-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]", children: "Resume" }),
    /* @__PURE__ */ jsx("p", { style: {
      color: "var(--color-text-muted)"
    }, children: "이력서가 준비 중입니다." })
  ] });
}
export {
  ResumePage as component
};

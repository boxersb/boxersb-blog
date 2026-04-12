import { jsxs, jsx } from "react/jsx-runtime";
function AboutPage() {
  return /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[680px] px-4 py-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]", children: "About" }),
    /* @__PURE__ */ jsxs("div", { className: "text-lg leading-[1.8]", style: {
      color: "var(--color-text)"
    }, children: [
      /* @__PURE__ */ jsxs("p", { className: "mb-6", children: [
        "안녕하세요. Frontend 개발자 ",
        /* @__PURE__ */ jsx("strong", { children: "boxersb" }),
        "입니다."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-6", style: {
        color: "var(--color-text-secondary)"
      }, children: "이 블로그에서는 개발 경험, 기술 에세이, 그리고 일상을 기록합니다." })
    ] })
  ] });
}
export {
  AboutPage as component
};

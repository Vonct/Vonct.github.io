export const projects = [
  {
    slug: "mylabagent",
    name: "myLabAgent",
    year: "2026",
    status: "Active",
    type: "Shared Agent Runtime / Lab Workflow",
    summary:
      "面向实验室日常工作与开发提效搭建的共享 Agent runtime，基于 Responses API，统一承接 Web、CLI、RAG、工具调用、会话持久化与本地 skill 按需加载能力。",
    tags: ["Responses API", "Shared Runtime", "CLI", "Web"],
    repo: "https://github.com/Vonct/myLabAgent",
    demo: "",
    role: "独立设计与实现",
    duration: "Ongoing",
    stack: [
      "Python",
      "Streamlit",
      "Rich",
      "Chroma",
      "OpenAI-compatible Responses API",
      "JSON Session Store",
    ],
    highlights: [
      "支持 Web 与 CLI 双入口，共享同一套 Agent runtime",
      "统一封装 RAG 检索、工具调用、会话持久化和本地 skill 按需加载能力",
      "通用能力覆盖文档检索、文件处理、命令执行等实验室日常场景",
      "围绕垂直需求继续开发 DDS-IDL 生成、TC4-PPU 代码生成与集成功能",
    ],
    detailMd: "./content/projects/mylabagent.md",
  },
  {
    slug: "next-project",
    name: "Next Project",
    year: "TBD",
    status: "Coming Soon",
    type: "Future Work",
    summary:
      "待更新开发过的项目（TinyUiverse.ai[小程序回忆录], AI-Applications on TC4xx-PPU）",
    tags: ["Placeholder"],
    repo: "",
    demo: "",
    role: "待填写",
    duration: "TBD",
    stack: ["To be updated"],
    highlights: [
    ],
    detailMd: "./content/projects/next-project.md",
  },
];

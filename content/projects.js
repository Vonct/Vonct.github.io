export const projects = [
  {
    slug: "mylabagent",
    name: "myLabAgent",
    year: "2026",
    status: "Active",
    type: "Shared Agent Runtime / Lab Workflow",
    summary:
      "面向实验室工作效率提升与自动化工具链建设的共享 Agent runtime，支持 Web / CLI 双入口，统一承接检索、工具调用、会话与记忆管理，以及垂直功能自动化流程。",
    tags: ["Memory", "Shared Runtime", "Automation", "CLI", "Web"],
    repo: "https://github.com/Vonct/myLabAgent",
    demo: "",
    role: "独立设计与实现",
    duration: "Ongoing",
    stack: [
      "Python",
      "Streamlit",
      "Rich",
      "Chroma",
      "Multi-model Adapter",
      "JSON Session Store",
    ],
    highlights: [
      "支持 Web 与 CLI 双入口，共享同一套 Agent runtime 与工具能力",
      "设计 transcript / task / memory 分层机制，按相关性注入记忆以支撑多轮任务",
      "统一封装 RAG 检索、工具调用、本地 skill 挂载与 sub-agent 能力",
      "落地 DDS-IDL等垂直自动化流程，面向实验室真实开发场景",
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

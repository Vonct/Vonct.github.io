export const projects = [
  {
    slug: "mylabagent",
    name: "myLabAgent",
    year: "2026",
    status: "Active",
    type: "AI Agent / Runtime Engineering",
    summary:
      "一个面向实验室工作流的 agent 系统，支持 Web 与 CLI 双入口，共享 runtime、tooling、session persistence 和 memory injection 机制。",
    tags: ["Agent", "Responses API", "CLI", "Web"],
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
      "将 Web 与 CLI 统一到一套共享 runtime，避免能力分叉",
      "主链路迁移到 Responses API，并实现单轮 tool-calling 闭环",
      "引入 session memories，把长对话压缩为可检索的 memory cards",
      "持续迭代 CLI 输入、模型切换和事件流体验，而不仅仅是功能可用",
    ],
    sections: [
      {
        title: "项目背景",
        body:
          "这个项目不是为了展示几个零散能力，而是为了做出一个真正可维护的 agent runtime。它一开始就要求 Web 与 CLI 共存，所以我把重点放在共享运行时、工具边界、会话结构和长期演进能力上。",
      },
      {
        title: "我做的核心设计",
        body:
          "我把系统拆成 client layer、shared runtime、knowledge & tool layer 和 persistence layer。这样后续新增模型、工具、skill 或 memory 策略时，不需要推翻入口层逻辑，也不会把 UI 状态污染到 runtime 内部。",
      },
      {
        title: "内存与 loop 机制",
        body:
          "当前实现里，tool result 原文只在单轮 loop 内以 function_call_output 继续回传，不跨轮整包回放。跨轮连续性依赖 session messages、tasks 和记忆卡摘要；进入新一轮时，再按相关性从 memories 里选取少量信息注入上下文。",
      },
      {
        title: "为什么它对我重要",
        body:
          "它代表了我做项目的一种方法：不把工程化当作后补，而是从一开始就把边界、状态、持久化、扩展性和交互体验一起设计进去。这个站点后续也会继续记录它的演进过程。",
      },
    ],
  },
  {
    slug: "next-project",
    name: "Next Project",
    year: "TBD",
    status: "Coming Soon",
    type: "Future Work",
    summary:
      "这里预留给你下一个项目。只要复制这个对象并修改字段，首页和详情页都会自动出现对应内容。",
    tags: ["Placeholder"],
    repo: "",
    demo: "",
    role: "待填写",
    duration: "TBD",
    stack: ["To be updated"],
    highlights: [
      "保留统一的项目内容格式",
      "首页卡片和详情页自动渲染",
      "适合继续扩展成完整作品集",
    ],
    sections: [
      {
        title: "如何添加新项目",
        body:
          "复制当前对象，修改 slug、name、summary、highlights、sections 等字段即可。详情页链接会自动根据 slug 生成，不需要再写新页面模板。",
      },
    ],
  },
];

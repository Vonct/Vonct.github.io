# 项目背景

`myLabAgent` 是围绕实验室开发提效持续搭建的一套共享 Agent runtime，底层基于 `Responses API`。期望在 Web、CLI 和后续垂直功能里长期复用。

## 通用能力开发

- 支持 `Web` 与 `CLI` 双入口
- 统一封装 `RAG` 检索、工具调用(如 bash,subagent)、会话持久化和本地 `skill` 按需加载能力
- 用于承接文档检索、文件处理、命令执行等实验室场景任务

![myLabAgent Web 端界面](./imgs/agent_web_weathewrquery.png)

上图展示的是 Web 端交互入口。知识库、模型配置和聊天能力在同一套运行时上，避免 Web 端单独长出一套逻辑。

![myLabAgent CLI / TUI 端界面](./imgs/agent_cli_interface.png)

CLI 端则更强调效率和工程化工作流，适合直接围绕代码、文档和脚本执行做连续任务。

## 垂直功能开发

- `DDS-IDL` 生成
- `TC4-PPU` 代码生成与集成

![myLabAgent CLI / TUI 使用 skills](./imgs/agent_cli_idlprompt.png)
作为 Skills 接入。

## Agent相关设计

### 共享运行时设计

Web 和 CLI 两个入口统一到同一套 Agent runtime 里，尽量避免一边修好了另一边又分叉。这样后续加模型、加工具、加记忆层或者扩展垂直功能时，不需要重写两套逻辑。

### 会话与上下文管理

session、task 和 memory 拆成不同层次处理：

- 当前单轮内的工具结果只在本轮 loop 中继续传递
- 跨轮不回放整段工具原文
- 轮末把关键内容压缩成 memory card，供后续按相关性注入

这样可以让上下文更干净，也让系统更适合长时间演进。

### 面向实际使用的打磨

除了功能本身，也在持续优化 CLI 交互体验、模型切换、输入反馈、事件流展示这些细节。使得所设计 Agent 不仅仅是“能回答”，而是整个使用路径都足够顺手。

## TODO
- 接入不同垂直领域功能
- 优化交互体验
- 做更多 Harness Eingeering
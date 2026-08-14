# 从模型画廊到实验结论

电机温度估计研究里，真正难以管理的往往不只是 checkpoint 数量，而是每个结果背后的**模型拓扑、节点定义、训练链路、初始化方式、数据 split 与评估范围**。Thermal Atlas 把这些差异从文件夹和命令行参数中提取出来，组织成可阅读、可筛选、可引用的实验档案。

Gallery 目前覆盖 `LPTN / TNN / STNN / DSTNN` 四类方法。每一种具体拓扑与实验链路被表示为 stamp；同一 method 的 Profile/TBPTT、Slide Window、真值初态、入油口初态与热点温度版本则作为独立 edition 呈现。

## Agent 不是旁边的聊天框

Result Agent 被直接嵌入 Model Gallery 和 Compare 页面。用户可以把一个或多个具体 stamp 拖入 Evidence Tray，也可以从 edition 或模型卡片使用“引用到 Agent”。发送问题时，系统会冻结该轮的 evidence 顺序：

- `S1-S8` 对应本轮实际引用的模型实验
- 浏览器只发送 stamp ID，服务端从可信 evidence manifest 读取结果
- 定量结论必须携带可点击引用，并能回查到指标与源报告
- 下一轮增删 stamp 不会改变上一轮已经冻结的证据

这让对话从“根据模型名字猜结果”变成“围绕明确实验记录进行分析”。

## 先判断能不能比，再讨论谁更好

不同报告中的 RMSE 并不天然可横向比较。Agent 在生成排名前会检查：

- dataset 与测试 profile
- train / validation / test split
- 平均温度、最高温度或混合目标语义
- metric scope 与采样周期
- 真值初态、入油口初态等初始化方式
- online、slide-window 或 profile/TBPTT 推理链路

只要关键口径不一致或缺失，比较工具就返回 `comparable=false`。Agent 仍可描述各自报告值和差异，但不能把它们包装成严格的优劣排名。

## 同一套 Gallery，两种运行形态

前端使用 React、TypeScript 与 Vite，实现模型筛选、NPZ 解析、Canvas 散点图和 Profile Gallery。Tauri 2 提供桌面端形态；Node 服务端负责 Agent API、工具调用、SSE 流式输出与 SQLite 会话持久化。

本地研究时可以分别运行 Vite 与 Node，以获得热更新；正常使用时由一个 Node 进程同时提供编译后的 Gallery 与 `/api/*`。Docker Compose 是可选部署方式，并不是运行前提。

## Provider 与安全边界

第一版通过 OpenAI-compatible Chat Completions 接入 Kimi，模型、base URL 与 API key 均由服务端环境变量配置。API key 不进入 Vite 构建产物，Agent 也没有 shell、训练、文件修改或任意仓库读取能力。

目前的重点不是让 Agent 拥有更多权限，而是让每一个实验结论都有清晰的证据边界。

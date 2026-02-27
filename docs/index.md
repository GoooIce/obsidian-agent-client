---
layout: home

hero:
  name: "Agent Client"
  text: "Obsidian 中的 AI Agent"
  tagline: 与 Claude Code、Codex、Gemini CLI 等对话 — 就在你的库中
  actions:
    - theme: brand
      text: 开始使用
      link: /getting-started/
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/RAIT-09/obsidian-agent-client

features:
  - icon: 🤖
    title: 直接集成 Agent
    details: 在专用的右侧面板中与 AI 编码 agent 对话
  - icon: 📝
    title: 笔记提及
    details: 使用 @笔记名 提及任何笔记，将其内容包含在你的提示中
  - icon: ⚡
    title: 斜杠命令
    details: 使用 / 命令快速触发 agent 操作
  - icon: 🔄
    title: 多 Agent 支持
    details: 在 Claude Code、Codex、Gemini CLI 和自定义 agent 之间切换
  - icon: 🎛️
    title: 模式和模型选择
    details: 直接从聊天中更改 AI 模型和 agent 模式
  - icon: 💻
    title: 终端集成
    details: 让你的 agent 执行命令并在聊天中返回结果
---

<div style="max-width: 800px; margin: 2rem auto;">
  <video controls autoplay loop muted playsinline style="width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
    <source src="/demo.mp4" type="video/mp4">
  </video>
</div>

## 什么是 Agent Client？

Agent Client 是一个 Obsidian 插件，可以将 AI 编码 agent 直接带入你的库。基于 [Agent Client Protocol (ACP)](https://github.com/agentclientprotocol/agent-client-protocol) 构建，它可以与各种 AI agent 无缝通信。

### 支持的 Agent

| Agent | 提供商 | 集成方式 |
|-------|--------|----------|
| **[Claude Code](https://github.com/anthropics/claude-code)** | Anthropic | 通过 [Zed 的 SDK 适配器](https://github.com/zed-industries/claude-agent-acp) |
| **[Codex](https://github.com/openai/codex)** | OpenAI | 通过 [Zed 的适配器](https://github.com/zed-industries/codex-acp) |
| **[Gemini CLI](https://github.com/google-gemini/gemini-cli)** | Google | 使用 `--experimental-acp` 选项 |
| **自定义** | 多种 | [任何兼容 ACP 的 agent](https://agentclientprotocol.com/overview/agents)（如 OpenCode、Qwen Code、Kiro） |

### 主要功能

- **笔记提及**：使用 `@笔记名` 在对话中引用你的 Obsidian 笔记
- **文件编辑**：让 agent 在权限控制下读取和修改文件
- **聊天导出**：保存对话以供将来参考
- **终端集成**：Agent 可以执行 shell 命令并内联显示结果

准备好了吗？查看 [安装指南](/getting-started/)。

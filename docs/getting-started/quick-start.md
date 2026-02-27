# 快速开始

本指南将在几分钟内帮助你开始与 AI agent 对话。

## 第一步：选择你的 Agent

Agent Client 支持多种 AI agent。选择一个开始：

| Agent | 提供商 | 集成方式 |
|-------|--------|----------|
| **[Claude Code](/agent-setup/claude-code)** | Anthropic | 通过 [Zed 的 SDK 适配器](https://github.com/zed-industries/claude-agent-acp) |
| **[Codex](/agent-setup/codex)** | OpenAI | 通过 [Zed 的适配器](https://github.com/zed-industries/codex-acp) |
| **[Gemini CLI](/agent-setup/gemini-cli)** | Google | 使用 `--experimental-acp` 选项 |
| **[自定义](/agent-setup/custom-agents)** | 多种 | [任何兼容 ACP 的 agent](https://agentclientprotocol.com/overview/agents)（如 OpenCode、Qwen Code、Kiro） |

## 第二步：安装并配置 Agent

按照你选择的 agent 设置指南操作：

- [Claude Code 设置](/agent-setup/claude-code)
- [Codex 设置](/agent-setup/codex)
- [Gemini CLI 设置](/agent-setup/gemini-cli)
- [自定义 Agent](/agent-setup/custom-agents)

每个指南都涵盖安装、路径配置和身份验证。

## 第三步：开始聊天

1. 点击左侧功能区的 **机器人图标**，或
2. 打开命令面板（`Cmd/Ctrl + P`）并搜索 **"打开 agent 聊天"**

聊天面板会在右侧边栏打开。输入消息并按 Enter！

## 接下来做什么？

- 了解 [笔记提及](/usage/mentions) 在对话中引用你的笔记
- 探索 [斜杠命令](/usage/slash-commands) 进行快速操作
- 在 [Agent 设置](/agent-setup/) 中设置其他 agent

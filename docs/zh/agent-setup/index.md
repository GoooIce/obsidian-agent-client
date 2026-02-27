# Agent 设置概览

Agent Client 通过 [Agent Client Protocol (ACP)](https://github.com/zed-industries/agent-client-protocol) 支持多种 AI agent。本节介绍如何设置每个支持的 agent。

## 支持的 Agent

| Agent | 提供商 | 包名 |
|-------|--------|------|
| [Claude Code](./claude-code) | Anthropic | `@zed-industries/claude-agent-acp` |
| [Codex](./codex) | OpenAI | `@zed-industries/codex-acp` |
| [Gemini CLI](./gemini-cli) | Google | `@google/gemini-cli` |
| [自定义 Agent](./custom-agents) | 多种 | 任何兼容 ACP 的 agent |

## 通用设置步骤

所有 agent 遵循类似的设置模式：

1. **通过 npm 安装** agent 包
2. **查找安装路径**，使用 `which`（macOS/Linux）或 `where.exe`（Windows）
3. **配置路径**在 设置 → Agent Client
4. **设置身份验证**（API 密钥或账户登录）

## WSL 模式（Windows）

对于 Windows 用户，我们建议使用 **WSL 模式**以获得更好的兼容性：

1. 安装 [WSL](https://docs.microsoft.com/zh-cn/windows/wsl/install)
2. 在 WSL 内安装 Node.js 和 agent
3. 在 设置 → Agent Client 中启用 **WSL 模式**
4. 使用 Linux 风格的路径（如 `/usr/local/bin/node`）

## 切换 Agent

配置多个 agent 后，你可以使用聊天标题中的 **⋮** 菜单在它们之间切换。要更改新聊天视图的默认 agent，请前往 **设置 → Agent Client → 默认 agent**。

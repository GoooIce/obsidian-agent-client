# ACP 协议支持

本文档记录此插件支持哪些 Agent Client Protocol (ACP) 功能。

## 什么是 ACP？

[Agent Client Protocol (ACP)](https://agentclientprotocol.com/) 是 AI agent 与客户端应用程序之间通信的开放标准。它定义了客户端如何发送提示、接收响应、处理权限和管理会话。

Agent Client 作为 **客户端** 实现 ACP，与兼容 ACP 的 agent（如 Claude Code、Codex 和 Gemini CLI）通信。

## 方法

### 客户端 → Agent

插件可以在 agent 上调用的方法。

| 方法 | 状态 | 备注 |
|------|------|------|
| `initialize` | ✅ 支持 | |
| `authenticate` | ✅ 支持 | |
| `session/new` | ✅ 支持 | |
| `session/prompt` | ✅ 支持 | |
| `session/cancel` | ✅ 支持 | |
| `session/set_mode` | ✅ 支持 | |
| `session/load` | ✅ 支持 | |
| `session/set_model` | ✅ 支持 | 不稳定 API |
| `session/list` | ✅ 支持 | 不稳定 API |
| `session/resume` | ✅ 支持 | 不稳定 API |
| `session/fork` | ✅ 支持 | 不稳定 API |

::: tip
标记为"不稳定 API"的方法可能会在未来的 ACP 版本中更改。它们在 SDK 中以 `unstable_` 为前缀。
:::

### Agent → 客户端（通知）

插件可以通过 `session/update` 从 agent 接收的会话更新。

| 更新类型 | 状态 | 备注 |
|----------|------|------|
| `agent_message_chunk` | ✅ 支持 | 仅文本 |
| `agent_thought_chunk` | ✅ 支持 | 仅文本 |
| `user_message_chunk` | ✅ 支持 | 仅文本；用于会话历史回放 |
| `tool_call` | ✅ 支持 | |
| `tool_call_update` | ✅ 支持 | |
| `plan` | ✅ 支持 | |
| `available_commands_update` | ✅ 支持 | |
| `current_mode_update` | ✅ 支持 | |

### Agent → 客户端（请求）

agent 可以向插件发出的请求。

| 方法 | 状态 | 备注 |
|------|------|------|
| `session/request_permission` | ✅ 支持 | |
| `terminal/create` | ✅ 支持 | |
| `terminal/output` | ✅ 支持 | |
| `terminal/wait_for_exit` | ✅ 支持 | |
| `terminal/kill` | ✅ 支持 | |
| `terminal/release` | ✅ 支持 | |
| `fs/read_text_file` | — | agent 使用自己的读取工具 |
| `fs/write_text_file` | — | agent 使用自己的写入工具 |

## 内容类型

### 提示内容（客户端 → Agent）

插件可以在 `session/prompt` 中发送的内容类型。

| 类型 | 状态 | 备注 |
|------|------|------|
| `text` | ✅ 支持 | |
| `image` | ✅ 支持 | 需要 agent 支持 |
| `audio` | ❌ 不支持 | |
| `resource_link` | ❌ 不支持 | |
| `resource` | ✅ 支持 | 嵌入上下文；需要 agent 支持 |

### 工具调用内容（Agent → 客户端）

插件可以在工具调用中显示的内容类型。

| 类型 | 状态 | 备注 |
|------|------|------|
| `diff` | ✅ 支持 | |
| `terminal` | ✅ 支持 | |
| `content` | ❌ 不支持 | |

## 客户端能力

在初始化期间向 agent 广告的能力。

| 能力 | 值 |
|------|-----|
| `fs.readTextFile` | `false` |
| `fs.writeTextFile` | `false` |
| `terminal` | `true` |

::: info
插件不实现文件系统操作（`fs/read_text_file`、`fs/write_text_file`）。agent 通过自己的工具处理文件操作。
:::

## 另请参阅

- [Agent Client Protocol 规范](https://agentclientprotocol.com/)
- [ACP Schema 参考](https://agentclientprotocol.com/protocol/schema)

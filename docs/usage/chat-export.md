# 聊天导出

保存与 AI agent 的对话以供将来参考。

## 手动导出

点击聊天标题中的 **导出按钮** 以导出当前对话。

<p align="center">
  <img src="/images/export.webp" alt="聊天标题中的导出按钮" width="400" />
</p>

## 导出设置

在 **设置 → Agent Client → 导出** 中配置导出选项：

| 设置 | 描述 |
|------|------|
| **导出文件夹** | 聊天导出保存的文件夹（默认：`Agent Client`） |
| **文件名** | 文件名模板。使用 `{date}` 和 `{time}` 作为占位符 |
| **Frontmatter 标签** | 添加到导出笔记的标签（默认：`agent-client`）。支持嵌套标签如 `projects/agent-client` |
| **新聊天时自动导出** | 开始新聊天时自动导出 |
| **关闭聊天时自动导出** | 关闭聊天视图时自动导出 |
| **导出后打开笔记** | 自动打开导出的笔记 |
| **包含图片** | 保存消息中附加的图片（默认：启用） |
| **图片位置** | 图片保存位置：Obsidian 的附件文件夹、自定义文件夹或嵌入为 Base64 |
| **自定义图片文件夹** | 使用自定义位置时的图片文件夹路径 |

## 导出格式

聊天导出为带有 YAML frontmatter 的 Markdown 文件：

```markdown
---
created: 2025-12-13T00:31:12
agentDisplayName: Claude Code
agentId: claude-agent-acp
session_id: f95b4847-cb9c-441a-9f0b-08eb243ff5dd
tags: [agent-client]  # 可在设置中自定义
---

# Claude Code

## 0:31:12 - 用户

@[[Agent Client Plugin]]
请总结一下。


---

## 0:31:16 - 助手

### 🔧 读取文件

**位置**：`/Users/rait09/Documents/dev_vault/Agent Client Plugin.md:0`

**状态**：已完成

## 摘要：Obsidian 的 Agent Client 插件

这是一个 Obsidian 插件，直接在你的库中集成 AI 编码 agent（Claude Code、Codex、Gemini CLI）。
...
```

## 导出内容

- **消息**：带时间戳的完整对话历史
- **图片**：附加的图片（根据设置保存为文件或嵌入）
- **工具调用**：工具名称、位置、状态和差异
- **思考**：Agent 的推理（作为可折叠的标注）
- **计划**：带状态指示器的任务计划
- **笔记提及**：`@[[笔记]]` 格式的自动提及和手动提及

## 使用场景

- **文档记录**：保留对话和决策记录
- **学习**：稍后回顾 agent 的解释
- **分享**：与他人分享解决方案
- **调试**：参考 agent 所做的工作以进行故障排除

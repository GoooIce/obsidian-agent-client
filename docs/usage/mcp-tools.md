# MCP 工具

AI agent 可以使用 Model Context Protocol (MCP) 工具与外部服务交互并执行专门任务。

## 什么是 MCP？

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) 是一个开放标准，允许 AI agent 连接到外部工具和数据源。

::: tip
MCP 支持和配置取决于 agent。有关详情请参阅 agent 的文档。
:::

## MCP 的工作原理

当 agent 使用 MCP 工具时：

1. Agent 决定使用哪个工具
2. 工具调用出现在聊天中
3. 工具执行并返回结果
4. Agent 使用结果继续

## 查看工具调用

工具调用在聊天中显示：

- **工具名称**：使用了什么工具
- **状态**：运行中、已完成或失败

## 权限

某些 MCP 工具调用在执行前可能需要你的权限。当权限请求出现时，选择 agent 提供的可用选项之一。

详见 [编辑](/usage/editing#权限控制) 了解权限设置。

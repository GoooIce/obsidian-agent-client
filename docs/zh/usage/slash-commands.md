# 斜杠命令

使用斜杠命令触发当前 agent 提供的操作。

## Agent 支持

斜杠命令是 agent 特定的。并非所有 agent 都支持斜杠命令。

::: tip
如果输入框占位符显示 `/ 输入命令`，则当前 agent 支持斜杠命令。如果没有，则 agent 不支持此功能。
:::

## 使用斜杠命令

1. 在输入框中输入 `/`
2. 会出现一个下拉菜单显示可用命令
3. 选择一个命令或继续输入以筛选
4. 按 `Enter` 执行命令

<p align="center">
  <img src="/images/slash-commands-1.webp" alt="斜杠命令下拉菜单" width="400" />
</p>

<p align="center">
  <img src="/images/slash-commands-2.webp" alt="筛选斜杠命令" width="400" />
</p>

## 可用命令

可用命令完全由 agent 决定 — 不是由本插件决定。每个 agent 提供自己的命令集。

例如，Claude Code 提供如 `/compact`、`/init` 和 `/review` 等命令，而其他 agent 可能有完全不同的命令或根本没有。

请参阅 agent 的文档以获取支持命令的完整列表。

## 命令参数

某些命令接受参数：

```
/command 关键词
```

输入命令后跟一个空格和你的参数。

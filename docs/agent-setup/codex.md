# Codex 设置

Codex 是 OpenAI 的 AI 编码助手。你可以使用 **API 密钥**或通过 **登录 OpenAI 账户**来使用它。

## 安装和配置

打开终端（macOS/Linux 上是 Terminal，Windows 上是 PowerShell）并运行以下命令。

1. 安装 codex-acp：

```bash
npm install -g @zed-industries/codex-acp
```

2. 查找安装路径：

::: code-group

```bash [macOS/Linux]
which codex-acp
# 示例输出：/usr/local/bin/codex-acp
```

```cmd [Windows]
where.exe codex-acp
# 示例输出：C:\Users\Username\AppData\Roaming\npm\codex-acp.cmd
```

:::

3. 打开 **设置 → Agent Client** 并将 **Codex 路径**设置为上面找到的路径。

## 身份验证

选择以下方法之一：

### 选项 A：API 密钥

1. 从 [OpenAI Platform](https://platform.openai.com/api-keys) 获取你的 API 密钥
2. 在 **设置 → Agent Client → Codex → API 密钥** 中输入 API 密钥

### 选项 B：账户登录

如果你有 ChatGPT 订阅且不想使用 API 密钥，可以使用 OpenAI 账户登录。

::: warning 重要
这需要单独安装 **Codex CLI**。CLI 创建插件使用的登录会话。
:::

1. 在终端中运行以下命令安装 Codex CLI：

```bash
npm install -g @openai/codex
```

2. 通过运行以下命令登录 CLI：

```bash
codex
```

按照提示使用 OpenAI 账户进行身份验证。

3. 在 **设置 → Agent Client** 中，**将 API 密钥字段留空**。

::: tip
ChatGPT 应用使用不同的身份验证系统。运行 ChatGPT 并**不能**验证插件 — 你必须通过 CLI 登录。
:::

## 验证设置

1. 点击功能区中的机器人图标或使用命令面板：**"打开 agent 聊天"**
2. 从聊天标题中的 agent 下拉菜单切换到 Codex
3. 尝试发送消息以验证连接

遇到问题？请参阅 [故障排除](/help/troubleshooting)。

# Gemini CLI 设置

Gemini CLI 是 Google 的 AI 助手。你可以使用 **Google 账户**、**API 密钥**或 **Vertex AI** 进行身份验证。

## 安装和配置

打开终端（macOS/Linux 上是 Terminal，Windows 上是 PowerShell）并运行以下命令。

1. 安装 Gemini CLI：

```bash
npm install -g @google/gemini-cli
```

2. 查找安装路径：

::: code-group

```bash [macOS/Linux]
which gemini
# 示例输出：/usr/local/bin/gemini
```

```cmd [Windows]
where.exe gemini
# 示例输出：C:\Users\Username\AppData\Roaming\npm\gemini.cmd
```

:::

3. 打开 **设置 → Agent Client** 并将 **Gemini CLI 路径**设置为上面找到的路径。

4. 确保 **参数**包含 `--experimental-acp`（默认已设置）。

## 身份验证

选择以下方法之一：

### 选项 A：Google 账户登录（OAuth）

如果你有 Google 账户且不想使用 API 密钥，可以直接登录。

1. 在终端中运行 Gemini CLI 并选择"使用 Google 登录"：

```bash
gemini
```

2. 按照浏览器身份验证流程操作。

3. 在 **设置 → Agent Client** 中，**将 API 密钥字段留空**。

::: tip
如果你的组织提供了 Gemini Code Assist 许可证，请在 **环境变量**字段中添加 `GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID`。
:::

### 选项 B：Gemini API 密钥

如果你更喜欢使用 API 密钥进行身份验证：

1. 从 [Google AI Studio](https://aistudio.google.com/apikey) 获取你的 API 密钥
2. 在 **设置 → Agent Client → Gemini CLI → API 密钥** 中输入 API 密钥

### 选项 C：Vertex AI

如果你使用 Vertex AI 进行企业工作负载：

1. 在 **设置 → Agent Client → Gemini CLI → 环境变量** 中添加：

```
GOOGLE_API_KEY=YOUR_API_KEY
GOOGLE_GENAI_USE_VERTEXAI=true
```

2. **将 API 密钥字段留空**（改用环境变量）。

::: tip
Gemini CLI 原生支持 ACP，因此不需要额外的适配器。
:::

## 验证设置

1. 点击功能区中的机器人图标或使用命令面板：**"打开 agent 聊天"**
2. 从聊天标题中的 agent 下拉菜单切换到 Gemini CLI
3. 尝试发送消息以验证连接

遇到问题？请参阅 [故障排除](/help/troubleshooting)。

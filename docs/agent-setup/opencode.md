# OpenCode 设置

⌨️ **OpenCode** 是 [SST](https://sst.so/) 开发的开源 AI 编码助手。它是本插件的默认内置 agent，支持多种 LLM 提供商，**无需 API 密钥**即可使用。

## 特点

- **开源免费**：完全开源，可自托管
- **多模型支持**：支持 OpenAI、Anthropic、Google、Azure、AWS Bedrock 等
- **无需 API 密钥**：可使用免费层或通过环境变量配置
- **默认内置**：本插件的默认 agent，开箱即用

## 安装和配置

打开终端（macOS/Linux 上是 Terminal，Windows 上是 PowerShell）并运行以下命令。

1. 安装 OpenCode：

::: code-group

```bash [macOS/Linux]
curl -fsSL https://opencode.ai/install.sh | bash
```

```powershell [Windows]
irm https://opencode.ai/install.ps1 | iex
```

:::

或者使用 npm：

```bash
npm install -g opencode
```

2. 查找安装路径：

::: code-group

```bash [macOS/Linux]
which opencode
# 示例输出：/usr/local/bin/opencode
```

```cmd [Windows]
where.exe opencode
# 示例输出：C:\Users\Username\AppData\Roaming\npm\opencode.cmd
```

:::

3. 打开 **设置 → Agent Client** 并在 **OpenCode** 部分设置路径。

## 配置选项

### 参数

默认参数 `acp` 已配置好 ACP 协议支持，通常无需修改。

| 参数 | 说明 |
|------|------|
| `acp` | 启用 ACP 协议（默认已配置） |

### 环境变量

OpenCode 支持通过环境变量配置 LLM 提供商：

| 变量 | 说明 |
|------|------|
| `OPENAI_API_KEY` | OpenAI API 密钥 |
| `ANTHROPIC_API_KEY` | Anthropic API 密钥 |
| `GOOGLE_API_KEY` | Google API 密钥 |
| `AZURE_OPENAI_KEY` | Azure OpenAI 密钥 |
| `AWS_ACCESS_KEY_ID` | AWS 访问密钥 ID |
| `AWS_SECRET_ACCESS_KEY` | AWS 秘密访问密钥 |

::: tip
不设置任何 API 密钥时，OpenCode 会尝试使用免费层或本地模型。
:::

## 模型选择

OpenCode 支持多种模型。你可以在聊天界面中通过模型选择器切换模型。支持的模型包括：

- **OpenAI**: GPT-4o, GPT-4-turbo, GPT-3.5-turbo
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus
- **Google**: Gemini Pro, Gemini Flash
- **本地模型**: Ollama 支持的模型

## 验证设置

1. 点击功能区中的机器人图标或使用命令面板：**"打开 agent 聊天"**
2. 你应该看到聊天面板打开并连接到 OpenCode
3. 尝试发送消息以验证连接

## 常见问题

### 找不到 opencode 命令

确保 OpenCode 已正确安装并添加到系统 PATH 中。你可以尝试重新打开终端或重启 Obsidian。

### 连接失败

1. 检查 **设置 → Agent Client → Node.js path** 是否正确配置
2. 确保 OpenCode 路径设置正确
3. 尝试在终端中运行 `opencode acp` 看是否有错误信息

### 模型不可用

某些模型可能需要配置相应的 API 密钥。请在环境变量中添加所需的密钥。

## 更多资源

- [OpenCode 官网](https://opencode.ai/)
- [OpenCode GitHub](https://github.com/sst/opencode)
- [OpenCode 文档](https://opencode.ai/docs)

遇到问题？请参阅 [故障排除](/help/troubleshooting)。

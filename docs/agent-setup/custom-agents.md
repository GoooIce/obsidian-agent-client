# 自定义 Agent 设置

你可以使用任何实现 [Agent Client Protocol (ACP)](https://agentclientprotocol.com/overview/agents) 的 agent。

## 安装和配置

1. 安装你的 ACP 兼容 agent（如 [OpenCode](https://github.com/sst/opencode)、[Qwen Code](https://github.com/QwenLM/qwen-code)、[Kiro](https://kiro.dev/)）。

2. 在终端中运行以下命令查找安装路径（macOS/Linux 上是 Terminal，Windows 上是 PowerShell）：

::: code-group

```bash [macOS/Linux]
which your-agent
# 示例输出：/usr/local/bin/your-agent
```

```cmd [Windows]
where.exe your-agent
# 示例输出：C:\Users\Username\AppData\Roaming\npm\your-agent.cmd
```

:::

3. 打开 **设置 → Agent Client** 并滚动到 **自定义 Agent** 部分。

4. 点击 **添加自定义 agent**。

5. 配置 agent：
   - **Agent ID**：唯一标识符（如 `my-agent`）
   - **显示名称**：菜单中显示的名称（如 `我的 Agent`）
   - **路径**：agent 可执行文件的绝对路径
   - **参数**：命令行参数，每行一个（如需要）
   - **环境变量**：`KEY=VALUE` 格式，每行一个（如需要）

## 配置示例

### OpenCode

| 字段 | 值 |
|------|-----|
| **Agent ID** | `opencode` |
| **显示名称** | `OpenCode` |
| **路径** | `/usr/local/bin/opencode` |
| **参数** | `acp` |
| **环境变量** | （可选） |

### Qwen Code

| 字段 | 值 |
|------|-----|
| **Agent ID** | `qwen-code` |
| **显示名称** | `Qwen Code` |
| **路径** | `/usr/local/bin/qwen` |
| **参数** | `--experimental-acp` |
| **环境变量** | （可选） |

### Kiro

| 字段 | 值 |
|------|-----|
| **Agent ID** | `kiro-cli` |
| **显示名称** | `Kiro` |
| **路径** | `/path/to/home/.local/bin/kiro-cli` |
| **参数** | `acp` |
| **环境变量** | （可选） |

::: tip
将 `/path/to/home` 替换为你的主目录（如 macOS 上的 `/Users/john`，Linux 上的 `/home/john`）。可能不支持 `$HOME` 和 `~`。
:::

## 身份验证

身份验证取决于具体的 agent。常见模式：

- **API 密钥**：添加到 **环境变量**（如 `MY_API_KEY=xxx`）
- **账户登录**：运行 agent 的 CLI 进行身份验证，然后留空环境变量

请参阅 agent 的文档以获取特定的身份验证说明。

## 验证设置

1. 点击功能区中的机器人图标或使用命令面板：**"打开 agent 聊天"**
2. 从聊天标题中的 agent 下拉菜单选择你的自定义 agent
3. 尝试发送消息以验证连接

遇到问题？请参阅 [故障排除](/help/troubleshooting)。

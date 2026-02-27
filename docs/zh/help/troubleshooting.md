# 故障排除

本指南涵盖 Agent Client 的常见问题和解决方案。

## 连接问题

### "正在连接 [Agent]..." 没有完成

插件正在尝试启动 agent 进程但没有收到响应。

**常见原因：**
- agent 路径不正确
- 缺少 Node.js
- agent 未安装

**解决方案：**

1. 在 **设置 → Agent Client → [Agent 名称] → 路径** 中**验证 agent 路径**
   - 在 macOS/Linux 上，使用以下命令查找路径：`which claude-agent-acp`
   - 在 Windows 上，使用以下命令查找路径：`where claude-agent-acp`

2. 在 **设置 → Agent Client → Node.js 路径** 中**验证 Node.js 路径**
   - 许多 agent 需要 Node.js
   - 使用以下命令查找：`which node`（macOS/Linux）或 `where node`（Windows）

3. 更改路径设置后**重新加载插件**（在 设置 → 社区插件 中禁用然后重新启用）

### "Command Not Found" 错误

在指定路径找不到 agent 可执行文件。

**解决方案：**

1. 使用完整的绝对路径（如 `/usr/local/bin/claude-agent-acp` 而不是只用 `claude-agent-acp`）
2. 通过直接在终端中运行来验证 agent 已安装
3. 在 Windows 上，如需要请包含 `.cmd` 扩展名

## 身份验证问题

### "Authentication Required" 错误

agent 在处理请求之前需要身份验证。

**对于 Claude Code：**
- **API 密钥**：在 **设置 → Agent Client → Claude Code (ACP) → API 密钥** 中设置
- **账户登录**：先在终端中运行 `claude` 并完成登录流程

**对于 Codex：**
- 在 **设置 → Agent Client → Codex → API 密钥** 中设置你的 OpenAI API 密钥

**对于 Gemini CLI：**
- 在 **设置 → Agent Client → Gemini CLI → API 密钥** 中设置你的 Google API 密钥
- 或先在终端中运行 `gemini` 以使用 Google 账户进行身份验证

### "No Authentication Methods" 错误

agent 没有提供身份验证选项。

**解决方案：** 检查你的 agent 配置。agent 可能没有正确初始化 — 尝试重新加载插件。

## 速率限制

### "Rate Limit Exceeded" 错误

你发送了太多请求。

**解决方案：**

1. 在发送另一条消息之前等待
2. 在提供商的控制台检查你的使用限制：
   - Anthropic: [console.anthropic.com](https://console.anthropic.com/)
   - OpenAI: [platform.openai.com](https://platform.openai.com/)
   - Google: [console.cloud.google.com](https://console.cloud.google.com/)

## 会话问题

### "Session Creation Failed" 错误

agent 已连接但无法创建会话。

**解决方案：**

1. 点击 **新聊天**（标题中的 + 按钮）创建新会话
2. 检查你的库路径是否包含可能导致问题的特殊字符
3. 重新加载插件

### "Agent Not Found" 错误

设置中不存在选定的 agent ID。

**解决方案：** 前往 **设置 → Agent Client** 并从 **活动 agent** 下拉菜单中选择一个有效的 agent。

## 消息发送问题

### "Cannot Send Message" 错误

没有可用的活动会话。

**解决方案：**

1. 等待连接完成（状态显示 agent 名称，而不是"正在连接..."）
2. 点击 **新聊天** 创建新会话

### "Send Message Failed" 错误

消息已发送但 agent 返回了错误。

**解决方案：**

1. 查看错误消息了解详情
2. 验证你的 API 密钥或登录状态
3. 尝试发送更简单的消息以测试连接

## 导出问题

### "Failed to export chat" 通知

无法保存对话。

**解决方案：**

1. 检查导出文件夹是否存在（**设置 → Agent Client → 导出 → 导出文件夹**）
2. 验证文件夹名称有效（没有不允许在文件夹名称中使用的特殊字符）
3. 检查文件名模板是否有无效字符（**设置 → Agent Client → 导出 → 文件名**）

## Windows 特定问题

### WSL 模式不工作

**前置条件：**
- 必须安装 WSL：在命令提示符中运行 `wsl --status`
- 必须安装 Linux 发行版：运行 `wsl --list`

**设置：**
- 启用 **设置 → Agent Client → Windows Subsystem for Linux → 启用 WSL 模式**
- 可选地在 **WSL 发行版** 中指定你的发行版

### Agent 在终端中工作但在 Obsidian 中不工作

终端和 Obsidian 之间的 PATH 环境可能不同。

**解决方案：**

1. 对 agent 和 Node.js 都使用完整的绝对路径
2. 启用 WSL 模式以获得更好的兼容性
3. 将 agent 的目录添加到系统 PATH（不只是用户 PATH）

## macOS 特定问题

### 通过 Homebrew 安装的 agent 找不到

Homebrew 二进制文件可能不在 Obsidian 的 PATH 中。

**解决方案：** 使用完整路径。在终端中使用 `which <agent-name>` 查找它。

## Linux 特定问题

### 使用 Flatpak 版 Obsidian 时找不到 agent

Flatpak 版 Obsidian 在沙箱中运行，无法访问 `/usr/local/bin` 等路径。

**解决方案：** 使用 AppImage 或 .deb 版的 Obsidian 而不是 Flatpak。

### Agent 在终端中工作但在 Obsidian 中不工作

Linux 上的桌面应用程序可能不会从 `.bashrc` 继承 PATH 设置。

**解决方案：**

1. 使用完整的绝对路径（如 `/usr/local/bin/gemini` 而不是 `gemini`）
2. 确保 agent 安装在标准位置（`/usr/bin` 或 `/usr/local/bin`）

## 调试模式

如果你需要更详细的问题信息，启用调试模式：

1. 前往 **设置 → Agent Client → 开发者 → 调试模式**
2. 启用开关
3. 打开 DevTools：
   - macOS: `Cmd + Option + I`
   - Windows/Linux: `Ctrl + Shift + I`
4. 前往 **Console** 标签页
5. 按这些前缀筛选：
   - `[AcpAdapter]` - Agent 通信
   - `[useChat]` - 消息处理
   - `[useAgentSession]` - 会话管理

## 常见错误消息

| 错误 | 含义 | 快速修复 |
|------|------|----------|
| Command Not Found | agent 可执行文件不在指定路径 | 检查路径设置 |
| Authentication Required | 缺少 API 密钥或需要登录 | 添加 API 密钥或先在终端中运行 agent |
| No Authentication Methods | agent 配置问题 | 重新加载插件 |
| Rate Limit Exceeded | API 请求过多 | 等待并重试 |
| Session Creation Failed | agent 无法启动会话 | 点击新聊天 |
| Agent Not Found | 设置中的 agent ID 无效 | 选择有效的 agent |
| Cannot Send Message | 没有活动会话 | 等待连接或点击新聊天 |
| Send Message Failed | agent 返回了错误 | 检查错误详情 |

## 获取帮助

如果你仍然遇到问题：

1. 启用 **调试模式** 并检查控制台日志
2. 搜索 [GitHub Issues](https://github.com/RAIT-09/obsidian-agent-client/issues)
3. 开启新 issue，包含：
   - 你的操作系统和 Obsidian 版本
   - 你使用的 agent
   - 重现步骤
   - 调试模式中的错误消息

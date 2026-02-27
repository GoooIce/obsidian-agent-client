<h1 align="center">Agent Client Plugin for Obsidian</h1>

<p align="center">
  <img src="https://img.shields.io/github/downloads/RAIT-09/obsidian-agent-client/total" alt="GitHub Downloads">
  <img src="https://img.shields.io/github/license/RAIT-09/obsidian-agent-client" alt="License">
  <img src="https://img.shields.io/github/v/release/RAIT-09/obsidian-agent-client" alt="GitHub release">
  <img src="https://img.shields.io/github/last-commit/RAIT-09/obsidian-agent-client" alt="GitHub last commit">
</p>

<p align="center">
  <a href="README_en.md">English</a> | <a href="README.ja.md">日本語</a>
</p>

> ⚠️ **个人实验版**
>
> 这是一个个人实验版本，用于测试和探索功能。如需稳定版本，请使用[上游官方仓库](https://github.com/RAIT-09/obsidian-agent-client)。

将 AI 智能体（Claude Code、Codex、Gemini CLI）直接集成到 Obsidian 中。在您的 Vault 内与 AI 助手聊天。

基于 Zed 的 [Agent Client Protocol (ACP)](https://github.com/zed-industries/agent-client-protocol) 构建。

https://github.com/user-attachments/assets/1c538349-b3fb-44dd-a163-7331cbca7824

## 功能特性

- **笔记提及**：使用 `@笔记名` 语法引用您的笔记
- **图片附件**：粘贴或拖放图片到聊天中
- **斜杠命令**：使用智能体提供的 `/` 命令
- **多智能体支持**：在 Claude Code、Codex、Gemini CLI 和自定义智能体之间切换
- **多会话**：在独立的视图中同时运行多个智能体
- **浮动聊天**：持久、可折叠的聊天窗口，便于快速访问
- **模式与模型切换**：从聊天中更改 AI 模型和智能体模式
- **会话历史**：恢复或分支之前的对话
- **聊天导出**：将对话保存为 Markdown 笔记
- **终端集成**：让智能体执行命令并返回结果

## 安装

### 通过 BRAT 安装（推荐）

1. 安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件
2. 进入 **设置 → BRAT → Add Beta Plugin**
3. 粘贴：`https://github.com/RAIT-09/obsidian-agent-client`
4. 在插件列表中启用 **Agent Client**

### 手动安装

1. 从 [Releases](https://github.com/RAIT-09/obsidian-agent-client/releases) 下载 `main.js`、`manifest.json`、`styles.css`
2. 将它们放入 `VaultFolder/.obsidian/plugins/agent-client/`
3. 在 **设置 → 社区插件** 中启用该插件

## 快速开始

打开终端（macOS/Linux 使用 Terminal，Windows 使用 PowerShell）并运行以下命令。

1. **安装智能体及其 ACP 适配器**（例如 Claude Code）：
   ```bash
   curl -fsSL https://claude.ai/install.sh | bash   # 安装 Claude Code
   npm install -g @zed-industries/claude-agent-acp   # 安装 ACP 适配器
   ```

2. **登录**（使用 API 密钥可跳过）：
   ```bash
   claude
   ```
   按照提示使用您的 Anthropic 账户进行身份验证。

3. **查找路径**：
   ```bash
   which node   # macOS/Linux
   which claude-agent-acp

   where.exe node   # Windows
   where.exe claude-agent-acp
   ```

4. **在 设置 → Agent Client 中配置**：
   - **Node.js path**：例如 `/usr/local/bin/node`
   - **Built-in agents → Claude Code → Path**：例如 `/usr/local/bin/claude-agent-acp`（不是 `claude`）
   - **API key**：添加您的密钥，或如果已通过 CLI 登录则留空

5. **开始聊天**：点击侧边栏的机器人图标

### 设置指南

- [Claude Code](https://goooice.github.io/obsidian-agent-client/agent-setup/claude-code.html)
- [Codex](https://goooice.github.io/obsidian-agent-client/agent-setup/codex.html)
- [Gemini CLI](https://goooice.github.io/obsidian-agent-client/agent-setup/gemini-cli.html)
- [自定义智能体](https://goooice.github.io/obsidian-agent-client/agent-setup/custom-agents.html)（OpenCode、Qwen Code、Kiro、Mistral Vibe 等）

**[完整文档](https://goooice.github.io/obsidian-agent-client/)**

## 开发

```bash
npm install
npm run dev
```

生产构建：
```bash
npm run build
```

## 致谢

本项目 Fork 自 [RAIT-09/obsidian-agent-client](https://github.com/RAIT-09/obsidian-agent-client)，感谢原作者的出色工作！

同时也感谢以下项目：
- [Zed Industries](https://github.com/zed-industries) - 提供 [Agent Client Protocol (ACP)](https://github.com/zed-industries/agent-client-protocol)
- [Obsidian](https://obsidian.md) - 优秀的知识管理工具

## 许可证

Apache License 2.0 - 详见 [LICENSE](LICENSE)。

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=RAIT-09/obsidian-agent-client&type=Date)](https://www.star-history.com/#RAIT-09/obsidian-agent-client&Date)

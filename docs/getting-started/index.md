# 安装

::: info 🚧 审核中
此插件正在等待 **Obsidian 社区插件**审核。目前请使用 **BRAT**（推荐）或手动安装。
:::

## 安装插件

### 通过 BRAT（推荐）

1. 从社区插件浏览器安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat) 插件
2. 在 Obsidian 设置中，前往 **社区插件 → BRAT → 添加 Beta 插件**
3. 粘贴此仓库 URL：
   ```
   https://github.com/GoooIce/obsidian-agent-client
   ```
4. BRAT 将下载最新版本并保持自动更新
5. 从插件列表中启用 **Agent Client**

### 手动安装

1. 从 [GitHub Releases](https://github.com/GoooIce/obsidian-agent-client/releases) 下载最新版本文件：
   - `main.js`
   - `manifest.json`
   - `styles.css`
2. 创建插件文件夹：`VaultFolder/.obsidian/plugins/agent-client/`
3. 将下载的文件放入此文件夹
4. 在 **Obsidian 设置 → 社区插件** 中启用插件

## 前置条件

### Node.js

::: tip 并非总是必需
Node.js 是 npm 类 agent（如 Claude Code、Codex 和 Gemini CLI）所必需的。如果你的 agent 是独立的可执行文件，可以跳过此步骤。
:::

如果你需要 Node.js：

1. 从 [nodejs.org](https://nodejs.org/) 下载
2. 安装 LTS 版本（推荐）

### 查找 Node.js 路径

打开终端（macOS/Linux 上是 Terminal，Windows 上是 PowerShell）并运行：

::: code-group

```bash [macOS/Linux]
which node
# 示例输出：/usr/local/bin/node
```

```cmd [Windows]
where.exe node
# 示例输出：C:\Program Files\nodejs\node.exe
```

:::

### 配置 Node.js 路径

1. 打开 **设置 → Agent Client**
2. 在 **Node.js 路径** 字段中输入 Node.js 路径

## 下一步

继续阅读 [快速开始](./quick-start) 来设置你的第一个 agent 并开始聊天！

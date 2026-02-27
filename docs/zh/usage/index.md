# 基本使用

## 打开聊天面板

你可以通过两种方式打开 Agent Client 聊天面板：

- **功能区图标**：点击左侧功能区的机器人图标

<p align="center">
  <img src="/images/ribbon-icon.webp" alt="功能区图标" />
</p>

- **命令面板**：打开命令面板（`Cmd/Ctrl + P`）并搜索 **"打开 agent 聊天"**

聊天面板会在右侧边栏打开。

## 发送消息

1. 在底部的输入框中输入消息
2. 按 `Enter` 或点击发送按钮
3. 等待 agent 的响应

<p align="center">
  <img src="/images/sending-messages.webp" alt="发送消息" />
</p>

## 发送图片

你可以通过粘贴或拖放将图片附加到消息中。

1. **粘贴**：将图片复制到剪贴板，然后在输入框中粘贴（`Cmd/Ctrl + V`）
2. **拖放**：将图片文件直接拖到输入区域

附加的图片会显示在文本区域下方的小缩略图中。点击缩略图上的 **×** 可移除图片。

<p align="center">
  <img src="/images/sending-images.webp" alt="发送图片" width="400" />
</p>

::: tip
图片附件需要 agent 支持。如果 agent 不支持图片，当你尝试附加时会显示通知。
:::

详见 [发送图片](/zh/usage/sending-images)。

## 切换 Agent

为当前视图切换 agent：

1. 点击聊天标题中的 **⋮**（省略号）菜单
2. 选择 **"切换 agent"**
3. Agent 会立即切换

这仅对该视图进行一次性更改。

<p align="center">
  <img src="/images/switch-agent.webp" alt="切换 agent 菜单" width="400" />
</p>

::: tip
要更改新聊天视图的默认 agent，请前往 **设置 → Agent Client → 默认 agent**。

<img src="/images/switch-default-agent.webp" alt="默认 agent 设置" />
:::

## 多个聊天视图

你可以打开多个聊天视图同时运行独立的对话。每个视图都有自己的 agent 进程和会话。

详见 [多会话聊天](/zh/usage/multi-session) 了解：
- 打开多个视图
- 广播命令
- 焦点导航

## 浮动聊天

一个可拖动、可调整大小的聊天窗口，浮动在工作区上方。在 **设置 → Agent Client → 浮动聊天** 中启用。

详见 [浮动聊天](/zh/usage/floating-chat)。

## 更改模型和模式

在输入框下方，你会发现下拉菜单可以：

- **更改模型**：在不同的 AI 模型之间切换（如 Claude 的 Sonnet、Haiku）
- **更改模式**：切换 agent 模式（如计划模式）

::: tip
可用的模型和模式取决于当前活动的 agent。
:::

## 开始新聊天

点击标题中的 **新聊天** 按钮开始新的对话。之前的聊天可以选择导出（见设置）。

## 停止生成

如果 agent 正在生成响应且你想停止它，点击生成期间出现的 **停止** 按钮。

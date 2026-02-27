# 发送图片

将图片附加到消息中，为 AI agent 提供视觉上下文。

## Agent 支持

图片附件是 agent 特定的。并非所有 agent 都支持图片附件。

::: tip
如果你的 agent 不支持图片，尝试附加时会看到通知：

`[Agent Client] 此 agent 不支持图片附件`
:::

## 附加图片

### 从剪贴板粘贴

1. 将图片复制到剪贴板（截图、复制的图片等）
2. 聚焦输入框
3. 使用 `Cmd/Ctrl + V` 粘贴

### 拖放

1. 从 Finder/资源管理器拖动图片文件
2. 将它们放到输入区域
3. 当你拖动到输入区域时会高亮显示

<p align="center">
  <img src="/images/sending-images.webp" alt="发送图片" width="400" />
</p>

## 管理附件

附加的图片显示为文本区域下方的小缩略图。

- **移除图片**：将鼠标悬停在缩略图上并点击 **×** 按钮
- **图片随消息发送**：发送时，所有附加的图片都会被包含

<p align="center">
  <img src="/images/remove-image.webp" alt="移除图片按钮" width="400" />
</p>

## 支持的格式

| 格式 | MIME 类型 |
|------|-----------|
| PNG | `image/png` |
| JPEG | `image/jpeg` |
| GIF | `image/gif` |
| WebP | `image/webp` |

## 限制

| 限制 | 值 |
|------|-----|
| 最大文件大小 | 每张图片 5 MB |
| 最大图片数量 | 每条消息 10 张 |

::: info
如果超过这些限制，通知会告知你：
- `[Agent Client] 图片太大（最大 5MB）`
- `[Agent Client] 最多允许 10 张图片`
:::

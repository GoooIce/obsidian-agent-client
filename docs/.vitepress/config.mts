import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Agent Client",
  description:
    "Obsidian AI agent 插件 - 与 Claude Code、Codex、Gemini CLI 等对话",

  // GitHub Pages base path
  base: "/obsidian-agent-client/",

  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "/obsidian-agent-client/favicon.ico" }],
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/obsidian-agent-client/favicon-32x32.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/obsidian-agent-client/favicon-16x16.png" }],
    ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/obsidian-agent-client/apple-touch-icon.png" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:title", content: "Agent Client for Obsidian" }],
    [
      "meta",
      {
        name: "og:description",
        content: "在 Obsidian 中直接与 AI agent 对话",
      },
    ],
    [
      "meta",
      {
        name: "og:url",
        content: "https://goooice.github.io/obsidian-agent-client/",
      },
    ],
  ],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: "首页", link: "/" },
          { text: "入门指南", link: "/getting-started/" },
          { text: "Agent 设置", link: "/agent-setup/" },
          { text: "使用方法", link: "/usage/" },
          { text: "GitHub", link: "https://github.com/GoooIce/obsidian-agent-client" },
        ],
        sidebar: [
          {
            text: "简介",
            items: [{ text: "什么是 Agent Client？", link: "/" }],
          },
          {
            text: "入门指南",
            items: [
              { text: "安装", link: "/getting-started/" },
              { text: "快速开始", link: "/getting-started/quick-start" },
            ],
          },
          {
            text: "Agent 设置",
            items: [
              { text: "概览", link: "/agent-setup/" },
              { text: "Claude Code", link: "/agent-setup/claude-code" },
              { text: "Codex", link: "/agent-setup/codex" },
              { text: "Gemini CLI", link: "/agent-setup/gemini-cli" },
              { text: "自定义 Agent", link: "/agent-setup/custom-agents" },
            ],
          },
          {
            text: "使用方法",
            items: [
              { text: "基本使用", link: "/usage/" },
              { text: "笔记提及", link: "/usage/mentions" },
              { text: "发送图片", link: "/usage/sending-images" },
              { text: "斜杠命令", link: "/usage/slash-commands" },
              { text: "模式选择", link: "/usage/mode-selection" },
              { text: "模型选择", link: "/usage/model-selection" },
              { text: "会话历史", link: "/usage/session-history" },
              { text: "多会话聊天", link: "/usage/multi-session" },
              { text: "浮动聊天", link: "/usage/floating-chat" },
              { text: "编辑功能", link: "/usage/editing" },
              { text: "聊天导出", link: "/usage/chat-export" },
              { text: "命令和快捷键", link: "/usage/commands" },
              { text: "上下文文件", link: "/usage/context-files" },
              { text: "MCP 工具", link: "/usage/mcp-tools" },
            ],
          },
          {
            text: "帮助",
            items: [
              { text: "常见问题", link: "/help/faq" },
              { text: "故障排除", link: "/help/troubleshooting" },
            ],
          },
          {
            text: "参考",
            items: [
              { text: "ACP 协议支持", link: "/reference/acp-support" },
            ],
          },
        ],
        footer: {
          message: "基于 Apache 2.0 许可证发布",
          copyright: "版权所有 © 2025-present RAIT-09",
        },
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
        outline: {
          label: '页面导航',
        },
        lastUpdated: {
          text: '最后更新于',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium',
          },
        },
        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          { text: "Getting Started", link: "/en/getting-started/" },
          { text: "Agent Setup", link: "/en/agent-setup/" },
          { text: "Usage", link: "/en/usage/" },
          { text: "GitHub", link: "https://github.com/GoooIce/obsidian-agent-client" },
        ],
        sidebar: [
          {
            text: "Introduction",
            items: [{ text: "What is Agent Client?", link: "/en/" }],
          },
          {
            text: "Getting Started",
            items: [
              { text: "Installation", link: "/en/getting-started/" },
              { text: "Quick Start", link: "/en/getting-started/quick-start" },
            ],
          },
          {
            text: "Agent Setup",
            items: [
              { text: "Overview", link: "/en/agent-setup/" },
              { text: "Claude Code", link: "/en/agent-setup/claude-code" },
              { text: "Codex", link: "/en/agent-setup/codex" },
              { text: "Gemini CLI", link: "/en/agent-setup/gemini-cli" },
              { text: "Custom Agents", link: "/en/agent-setup/custom-agents" },
            ],
          },
          {
            text: "Usage",
            items: [
              { text: "Basic Usage", link: "/en/usage/" },
              { text: "Note Mentions", link: "/en/usage/mentions" },
              { text: "Sending Images", link: "/en/usage/sending-images" },
              { text: "Slash Commands", link: "/en/usage/slash-commands" },
              { text: "Mode Selection", link: "/en/usage/mode-selection" },
              { text: "Model Selection", link: "/en/usage/model-selection" },
              { text: "Session History", link: "/en/usage/session-history" },
              { text: "Multi-Session Chat", link: "/en/usage/multi-session" },
              { text: "Floating Chat", link: "/en/usage/floating-chat" },
              { text: "Editing", link: "/en/usage/editing" },
              { text: "Chat Export", link: "/en/usage/chat-export" },
              { text: "Commands & Hotkeys", link: "/en/usage/commands" },
              { text: "Context Files", link: "/en/usage/context-files" },
              { text: "MCP Tools", link: "/en/usage/mcp-tools" },
            ],
          },
          {
            text: "Help",
            items: [
              { text: "FAQ", link: "/en/help/faq" },
              { text: "Troubleshooting", link: "/en/help/troubleshooting" },
            ],
          },
          {
            text: "Reference",
            items: [
              { text: "ACP Protocol Support", link: "/en/reference/acp-support" },
            ],
          },
        ],
        footer: {
          message: "Released under the Apache 2.0 License.",
          copyright: "Copyright © 2025-present RAIT-09",
        },
      },
    },
  },

  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/GoooIce/obsidian-agent-client",
      },
    ],

    search: {
      provider: "local",
    },
  },
});

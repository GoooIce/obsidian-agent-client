import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Agent Client",
  description:
    "Obsidian plugin for AI agent integration - Chat with Claude Code, Codex, Gemini CLI and more",

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
        content: "Chat with AI agents directly in Obsidian",
      },
    ],
    [
      "meta",
      {
        name: "og:url",
        content: "https://rait-09.github.io/obsidian-agent-client/",
      },
    ],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: "Home", link: "/" },
          { text: "Getting Started", link: "/getting-started/" },
          { text: "Agent Setup", link: "/agent-setup/" },
          { text: "Usage", link: "/usage/" },
          { text: "GitHub", link: "https://github.com/RAIT-09/obsidian-agent-client" },
        ],
        sidebar: [
          {
            text: "Introduction",
            items: [{ text: "What is Agent Client?", link: "/" }],
          },
          {
            text: "Getting Started",
            items: [
              { text: "Installation", link: "/getting-started/" },
              { text: "Quick Start", link: "/getting-started/quick-start" },
            ],
          },
          {
            text: "Agent Setup",
            items: [
              { text: "Overview", link: "/agent-setup/" },
              { text: "Claude Code", link: "/agent-setup/claude-code" },
              { text: "Codex", link: "/agent-setup/codex" },
              { text: "Gemini CLI", link: "/agent-setup/gemini-cli" },
              { text: "Custom Agents", link: "/agent-setup/custom-agents" },
            ],
          },
          {
            text: "Usage",
            items: [
              { text: "Basic Usage", link: "/usage/" },
              { text: "Note Mentions", link: "/usage/mentions" },
              { text: "Sending Images", link: "/usage/sending-images" },
              { text: "Slash Commands", link: "/usage/slash-commands" },
              { text: "Mode Selection", link: "/usage/mode-selection" },
              { text: "Model Selection", link: "/usage/model-selection" },
              { text: "Session History", link: "/usage/session-history" },
              { text: "Multi-Session Chat", link: "/usage/multi-session" },
              { text: "Floating Chat", link: "/usage/floating-chat" },
              { text: "Editing", link: "/usage/editing" },
              { text: "Chat Export", link: "/usage/chat-export" },
              { text: "Commands & Hotkeys", link: "/usage/commands" },
              { text: "Context Files", link: "/usage/context-files" },
              { text: "MCP Tools", link: "/usage/mcp-tools" },
            ],
          },
          {
            text: "Help",
            items: [
              { text: "FAQ", link: "/help/faq" },
              { text: "Troubleshooting", link: "/help/troubleshooting" },
            ],
          },
          {
            text: "Reference",
            items: [
              { text: "ACP Protocol Support", link: "/reference/acp-support" },
            ],
          },
        ],
        footer: {
          message: "Released under the Apache 2.0 License.",
          copyright: "Copyright © 2025-present RAIT-09",
        },
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: "首页", link: "/zh/" },
          { text: "入门指南", link: "/zh/getting-started/" },
          { text: "Agent 设置", link: "/zh/agent-setup/" },
          { text: "使用方法", link: "/zh/usage/" },
          { text: "GitHub", link: "https://github.com/RAIT-09/obsidian-agent-client" },
        ],
        sidebar: [
          {
            text: "简介",
            items: [{ text: "什么是 Agent Client？", link: "/zh/" }],
          },
          {
            text: "入门指南",
            items: [
              { text: "安装", link: "/zh/getting-started/" },
              { text: "快速开始", link: "/zh/getting-started/quick-start" },
            ],
          },
          {
            text: "Agent 设置",
            items: [
              { text: "概览", link: "/zh/agent-setup/" },
              { text: "Claude Code", link: "/zh/agent-setup/claude-code" },
              { text: "Codex", link: "/zh/agent-setup/codex" },
              { text: "Gemini CLI", link: "/zh/agent-setup/gemini-cli" },
              { text: "自定义 Agent", link: "/zh/agent-setup/custom-agents" },
            ],
          },
          {
            text: "使用方法",
            items: [
              { text: "基本使用", link: "/zh/usage/" },
              { text: "笔记提及", link: "/zh/usage/mentions" },
              { text: "发送图片", link: "/zh/usage/sending-images" },
              { text: "斜杠命令", link: "/zh/usage/slash-commands" },
              { text: "模式选择", link: "/zh/usage/mode-selection" },
              { text: "模型选择", link: "/zh/usage/model-selection" },
              { text: "会话历史", link: "/zh/usage/session-history" },
              { text: "多会话聊天", link: "/zh/usage/multi-session" },
              { text: "浮动聊天", link: "/zh/usage/floating-chat" },
              { text: "编辑功能", link: "/zh/usage/editing" },
              { text: "聊天导出", link: "/zh/usage/chat-export" },
              { text: "命令和快捷键", link: "/zh/usage/commands" },
              { text: "上下文文件", link: "/zh/usage/context-files" },
              { text: "MCP 工具", link: "/zh/usage/mcp-tools" },
            ],
          },
          {
            text: "帮助",
            items: [
              { text: "常见问题", link: "/zh/help/faq" },
              { text: "故障排除", link: "/zh/help/troubleshooting" },
            ],
          },
          {
            text: "参考",
            items: [
              { text: "ACP 协议支持", link: "/zh/reference/acp-support" },
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
  },

  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/RAIT-09/obsidian-agent-client",
      },
    ],

    search: {
      provider: "local",
    },
  },
});

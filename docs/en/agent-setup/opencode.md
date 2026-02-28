# OpenCode Setup

⌨️ **OpenCode** is an open-source AI coding assistant developed by [SST](https://sst.so/). It's the default built-in agent for this plugin, supporting multiple LLM providers with **no API key required** to get started.

## Features

- **Open Source & Free**: Fully open source, self-hostable
- **Multi-model Support**: Supports OpenAI, Anthropic, Google, Azure, AWS Bedrock, and more
- **No API Key Required**: Works with free tiers or configurable via environment variables
- **Built-in Default**: The default agent for this plugin, ready to use out of the box

## Install and Configure

Open a terminal (Terminal on macOS/Linux, PowerShell on Windows) and run the following commands.

1. Install OpenCode:

::: code-group

```bash [macOS/Linux]
curl -fsSL https://opencode.ai/install.sh | bash
```

```powershell [Windows]
irm https://opencode.ai/install.ps1 | iex
```

:::

Or using npm:

```bash
npm install -g opencode
```

2. Find the installation path:

::: code-group

```bash [macOS/Linux]
which opencode
# Example output: /usr/local/bin/opencode
```

```cmd [Windows]
where.exe opencode
# Example output: C:\Users\Username\AppData\Roaming\npm\opencode.cmd
```

:::

3. Open **Settings → Agent Client** and set the path in the **OpenCode** section.

## Configuration Options

### Arguments

The default `acp` argument is configured for ACP protocol support. Usually no changes needed.

| Argument | Description |
|----------|-------------|
| `acp` | Enable ACP protocol (configured by default) |

### Environment Variables

OpenCode supports configuring LLM providers via environment variables:

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key |
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `GOOGLE_API_KEY` | Google API key |
| `AZURE_OPENAI_KEY` | Azure OpenAI key |
| `AWS_ACCESS_KEY_ID` | AWS access key ID |
| `AWS_SECRET_ACCESS_KEY` | AWS secret access key |

::: tip
When no API key is set, OpenCode will attempt to use free tiers or local models.
:::

## Model Selection

OpenCode supports multiple models. You can switch models through the model selector in the chat interface. Supported models include:

- **OpenAI**: GPT-4o, GPT-4-turbo, GPT-3.5-turbo
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus
- **Google**: Gemini Pro, Gemini Flash
- **Local Models**: Models supported by Ollama

## Verify Setup

1. Click the robot icon in the ribbon or use the command palette: **"Open agent chat"**
2. You should see the chat panel open and connect to OpenCode
3. Try sending a message to verify the connection

## Common Issues

### opencode command not found

Make sure OpenCode is properly installed and added to your system PATH. Try reopening your terminal or restarting Obsidian.

### Connection Failed

1. Check if **Settings → Agent Client → Node.js path** is configured correctly
2. Ensure the OpenCode path is set correctly
3. Try running `opencode acp` in your terminal to check for error messages

### Model Unavailable

Some models may require configuring the corresponding API key. Add the required keys in environment variables.

## More Resources

- [OpenCode Website](https://opencode.ai/)
- [OpenCode GitHub](https://github.com/sst/opencode)
- [OpenCode Documentation](https://opencode.ai/docs)

Having issues? See [Troubleshooting](/en/help/troubleshooting).

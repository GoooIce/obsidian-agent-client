import {
	App,
	PluginSettingTab,
	Setting,
	DropdownComponent,
	Platform,
	Notice,
} from "obsidian";
import type AgentClientPlugin from "../../plugin";
import type {
	CustomAgentSettings,
	AgentEnvVar,
	ChatViewLocation,
} from "../../plugin";
import { normalizeEnvVars } from "../../shared/settings-utils";
import {
	CHAT_FONT_SIZE_MAX,
	CHAT_FONT_SIZE_MIN,
	parseChatFontSize,
} from "../../shared/display-settings";
import { CollapsibleSection } from "./CollapsibleSection";
import { t } from "../../shared/i18n";

export class AgentClientSettingTab extends PluginSettingTab {
	plugin: AgentClientPlugin;
	private agentSelector: DropdownComponent | null = null;
	private unsubscribe: (() => void) | null = null;

	constructor(app: App, plugin: AgentClientPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		this.agentSelector = null;

		// Cleanup previous subscription if exists
		if (this.unsubscribe) {
			this.unsubscribe();
			this.unsubscribe = null;
		}

		// Documentation link
		const docContainer = containerEl.createDiv({
			cls: "agent-client-doc-link",
		});
		docContainer.createSpan({ text: t("settings.needHelp", { link: "" }).replace("{}", "") });
		docContainer.createEl("a", {
			text: t("settings.documentation"),
			href: "https://goooice.github.io/obsidian-agent-client/",
		});
		docContainer.createSpan({ text: "." });

		// ─────────────────────────────────────────────────────────────────────
		// Top-level: Agent Selector + Quick Start
		// ─────────────────────────────────────────────────────────────────────

		this.renderAgentSelectorCompact(containerEl);

		// Subscribe to settings changes to update agent dropdown
		this.unsubscribe = this.plugin.settingsStore.subscribe(() => {
			this.updateAgentDropdown();
		});

		// Also update immediately on display to sync with current settings
		this.updateAgentDropdown();

		// ─────────────────────────────────────────────────────────────────────
		// Agent Configs (Collapsible)
		// ─────────────────────────────────────────────────────────────────────

		this.renderAgentConfigs(containerEl);

		// ─────────────────────────────────────────────────────────────────────
		// Settings Groups (Collapsible)
		// ─────────────────────────────────────────────────────────────────────

		this.renderSettingsGroups(containerEl);
	}

	/**
	 * Render compact agent selector with detect button
	 */
	private renderAgentSelectorCompact(containerEl: HTMLElement) {
		this.plugin.ensureDefaultAgentId();

		const selectorContainer = containerEl.createDiv({
			cls: "agent-client-agent-selector-compact",
		});

		// Row 1: Default agent
		new Setting(selectorContainer)
			.setName(t("settings.defaultAgent.name"))
			.setDesc(t("settings.defaultAgent.desc"))
			.addDropdown((dropdown) => {
				this.agentSelector = dropdown;
				this.populateAgentDropdown(dropdown);
				dropdown.setValue(this.plugin.settings.defaultAgentId);
				dropdown.onChange(async (value) => {
					const nextSettings = {
						...this.plugin.settings,
						defaultAgentId: value,
					};
					this.plugin.ensureDefaultAgentId();
					await this.plugin.saveSettingsAndNotify(nextSettings);
				});
			});

		// Row 2: Language
		new Setting(selectorContainer)
			.setName(t("settings.display.language.name"))
			.setDesc(t("settings.display.language.desc"))
			.addDropdown((dropdown) =>
				dropdown
					.addOption("en", "English")
					.addOption("zh", "中文")
					.addOption("ja", "日本語")
					.setValue(this.plugin.settings.language)
					.onChange(async (value) => {
						this.plugin.settings.language = value as
							| "en"
							| "zh"
							| "ja";
						// Update i18n language immediately
						const { setLanguage } = await import("../../shared/i18n");
						setLanguage(this.plugin.settings.language);
						await this.plugin.saveSettings();
						// Refresh settings page to apply new language
						this.display();
					}),
			);

		// Row 3: Detect all button
		new Setting(selectorContainer)
			.addButton((button) =>
				button
					.setButtonText(t("settings.detectAll"))
					.setTooltip(t("settings.detectAllTooltip"))
					.onClick(async () => {
						button.setButtonText(t("common.detecting"));
						button.setDisabled(true);

						try {
							const results =
								await this.plugin.detectAllAgents();
							let updatedCount = 0;

							for (const result of results) {
								if (result.path && result.path.length > 0) {
									if (
										result.agentId ===
											this.plugin.settings.claude.id &&
										!this.plugin.settings.claude.command
									) {
										this.plugin.settings.claude.command =
											result.path;
										updatedCount++;
									} else if (
										result.agentId ===
											this.plugin.settings.codex.id &&
										!this.plugin.settings.codex.command
									) {
										this.plugin.settings.codex.command =
											result.path;
										updatedCount++;
									} else if (
										result.agentId ===
											this.plugin.settings.gemini.id &&
										!this.plugin.settings.gemini.command
									) {
										this.plugin.settings.gemini.command =
											result.path;
										updatedCount++;
									} else if (
										result.agentId ===
											this.plugin.settings.opencode.id &&
										!this.plugin.settings.opencode.command
									) {
										this.plugin.settings.opencode.command =
											result.path;
										updatedCount++;
									}
								}
							}

							if (updatedCount > 0) {
								await this.plugin.saveSettings();
								this.display(); // Refresh UI
								new Notice(
									t("settings.detectionComplete", { count: updatedCount }),
								);
							} else {
								new Notice(
									t("settings.noAgentsDetected"),
								);
							}
						} catch (error) {
							console.error(
								"[AgentClient] Detection failed:",
								error,
							);
							new Notice(
								t("settings.detectionFailed"),
							);
						} finally {
							button.setButtonText(t("settings.detectAll"));
							button.setDisabled(false);
						}
					}),
			);
	}

	/**
	 * Render all agent configs as collapsible sections
	 */
	private renderAgentConfigs(containerEl: HTMLElement) {
		const defaultAgentId = this.plugin.settings.defaultAgentId;

		// Built-in agents
		const builtInAgents = [
			{
				id: this.plugin.settings.claude.id,
				title: this.plugin.settings.claude.displayName || "Claude Code (ACP)",
				render: (el: HTMLElement) => this.renderClaudeConfig(el),
			},
			{
				id: this.plugin.settings.codex.id,
				title: this.plugin.settings.codex.displayName || "Codex (ACP)",
				render: (el: HTMLElement) => this.renderCodexConfig(el),
			},
			{
				id: this.plugin.settings.gemini.id,
				title: this.plugin.settings.gemini.displayName || "Gemini CLI",
				render: (el: HTMLElement) => this.renderGeminiConfig(el),
			},
			{
				id: this.plugin.settings.opencode.id,
				title: (this.plugin.settings.opencode.displayName || "OpenCode"),
				description: t("settings.agent.noApiKeyRequired"),
				render: (el: HTMLElement) => this.renderOpenCodeConfig(el),
			},
		];

		for (const agent of builtInAgents) {
			const isDefault = agent.id === defaultAgentId;
			new CollapsibleSection(
				containerEl,
				{
					id: `agent-${agent.id}`,
					title: agent.title,
					description: agent.description,
					badge: isDefault ? t("common.default") : undefined,
					defaultCollapsed: !isDefault,
					containerClass: "agent-client-agent-config-section",
					onToggle: (collapsed) => {
						// When expanding, update badge visibility
						if (!collapsed) {
							this.display();
						}
					},
				},
				agent.render,
			);
		}

		// Custom agents section
		new CollapsibleSection(
			containerEl,
			{
				id: "custom-agents",
				title: t("settings.sections.customAgents"),
				defaultCollapsed: true,
			},
			(el) => this.renderCustomAgents(el),
		);
	}

	/**
	 * Render settings groups as collapsible sections
	 */
	private renderSettingsGroups(containerEl: HTMLElement) {
		// Display settings
		new CollapsibleSection(
			containerEl,
			{
				id: "display-settings",
				title: t("settings.sections.display"),
				defaultCollapsed: true,
			},
			(el) => this.renderDisplaySettings(el),
		);

		// Mentions settings
		new CollapsibleSection(
			containerEl,
			{
				id: "mentions-settings",
				title: t("settings.sections.mentions"),
				defaultCollapsed: true,
			},
			(el) => this.renderMentionsSettings(el),
		);

		// Floating chat settings
		new CollapsibleSection(
			containerEl,
			{
				id: "floating-chat-settings",
				title: t("settings.sections.floatingChat"),
				defaultCollapsed: true,
			},
			(el) => this.renderFloatingChatSettings(el),
		);

		// Export settings
		new CollapsibleSection(
			containerEl,
			{
				id: "export-settings",
				title: t("settings.sections.export"),
				defaultCollapsed: true,
			},
			(el) => this.renderExportSettings(el),
		);

		// Permissions settings
		new CollapsibleSection(
			containerEl,
			{
				id: "permissions-settings",
				title: t("settings.sections.permissions"),
				defaultCollapsed: true,
			},
			(el) => this.renderPermissionsSettings(el),
		);

		// Advanced settings (includes WSL for Windows, Developer settings)
		new CollapsibleSection(
			containerEl,
			{
				id: "advanced-settings",
				title: t("settings.sections.advanced"),
				defaultCollapsed: true,
			},
			(el) => this.renderAdvancedSettings(el),
		);
	}

	// ─────────────────────────────────────────────────────────────────────
	// Individual Settings Renderers
	// ─────────────────────────────────────────────────────────────────────

	private renderDisplaySettings(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName(t("settings.display.chatViewLocation.name"))
			.setDesc(t("settings.display.chatViewLocation.desc"))
			.addDropdown((dropdown) =>
				dropdown
					.addOption("right-tab", t("settings.display.locationOptions.rightTab"))
					.addOption("right-split", t("settings.display.locationOptions.rightSplit"))
					.addOption("editor-tab", t("settings.display.locationOptions.editorTab"))
					.addOption("editor-split", t("settings.display.locationOptions.editorSplit"))
					.setValue(this.plugin.settings.chatViewLocation)
					.onChange(async (value) => {
						this.plugin.settings.chatViewLocation =
							value as ChatViewLocation;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.display.fontSize.name"))
			.setDesc(t("settings.display.fontSize.desc"))
			.addText((text) => {
				const getCurrentDisplayValue = (): string => {
					const currentFontSize =
						this.plugin.settings.displaySettings.fontSize;
					return currentFontSize === null
						? ""
						: String(currentFontSize);
				};

				const persistChatFontSize = async (
					fontSize: number | null,
				): Promise<void> => {
					if (
						this.plugin.settings.displaySettings.fontSize ===
						fontSize
					) {
						return;
					}

					const nextSettings = {
						...this.plugin.settings,
						displaySettings: {
							...this.plugin.settings.displaySettings,
							fontSize,
						},
					};
					await this.plugin.saveSettingsAndNotify(nextSettings);
				};

				text.setPlaceholder(
					`${CHAT_FONT_SIZE_MIN}-${CHAT_FONT_SIZE_MAX}`,
				)
					.setValue(getCurrentDisplayValue())
					.onChange(async (value) => {
						if (value.trim().length === 0) {
							await persistChatFontSize(null);
							return;
						}

						const trimmedValue = value.trim();
						if (!/^-?\d+$/.test(trimmedValue)) {
							return;
						}

						const numericValue = Number.parseInt(trimmedValue, 10);
						if (
							numericValue < CHAT_FONT_SIZE_MIN ||
							numericValue > CHAT_FONT_SIZE_MAX
						) {
							return;
						}

						const parsedFontSize = parseChatFontSize(numericValue);
						if (parsedFontSize === null) {
							return;
						}

						const hasChanged =
							this.plugin.settings.displaySettings.fontSize !==
							parsedFontSize;
						if (hasChanged) {
							await persistChatFontSize(parsedFontSize);
						}
					});

				text.inputEl.addEventListener("blur", () => {
					const currentInputValue = text.getValue();
					const parsedFontSize = parseChatFontSize(currentInputValue);

					if (
						currentInputValue.trim().length > 0 &&
						parsedFontSize === null
					) {
						text.setValue(getCurrentDisplayValue());
						return;
					}

					if (parsedFontSize !== null) {
						text.setValue(String(parsedFontSize));
						const hasChanged =
							this.plugin.settings.displaySettings.fontSize !==
							parsedFontSize;
						if (hasChanged) {
							void persistChatFontSize(parsedFontSize);
						}
						return;
					}

					text.setValue("");
				});
			});

		new Setting(containerEl)
			.setName(t("settings.display.showEmojis.name"))
			.setDesc(t("settings.display.showEmojis.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.displaySettings.showEmojis)
					.onChange(async (value) => {
						this.plugin.settings.displaySettings.showEmojis = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.display.autoCollapseDiffs.name"))
			.setDesc(t("settings.display.autoCollapseDiffs.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(
						this.plugin.settings.displaySettings.autoCollapseDiffs,
					)
					.onChange(async (value) => {
						this.plugin.settings.displaySettings.autoCollapseDiffs =
							value;
						await this.plugin.saveSettings();
						this.display();
					}),
			);

		if (this.plugin.settings.displaySettings.autoCollapseDiffs) {
			new Setting(containerEl)
				.setName(t("settings.display.collapseThreshold.name"))
				.setDesc(t("settings.display.collapseThreshold.desc"))
				.addText((text) =>
					text
						.setPlaceholder("10")
						.setValue(
							String(
								this.plugin.settings.displaySettings
									.diffCollapseThreshold,
							),
						)
						.onChange(async (value) => {
							const num = parseInt(value, 10);
							if (!isNaN(num) && num > 0) {
								this.plugin.settings.displaySettings.diffCollapseThreshold =
									num;
								await this.plugin.saveSettings();
							}
						}),
				);
		}

		// Message shortcut
		new Setting(containerEl)
			.setName(t("settings.display.sendMessageShortcut.name"))
			.setDesc(t("settings.display.sendMessageShortcut.desc"))
			.addDropdown((dropdown) =>
				dropdown
					.addOption(
						"enter",
						t("settings.display.shortcutOptions.enter"),
					)
					.addOption(
						"cmd-enter",
						t("settings.display.shortcutOptions.cmdEnter"),
					)
					.setValue(this.plugin.settings.sendMessageShortcut)
					.onChange(async (value) => {
						this.plugin.settings.sendMessageShortcut = value as
							| "enter"
							| "cmd-enter";
						await this.plugin.saveSettings();
					}),
			);
	}

	private renderMentionsSettings(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName(t("settings.mentions.autoMentionActiveNote.name"))
			.setDesc(t("settings.mentions.autoMentionActiveNote.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.autoMentionActiveNote)
					.onChange(async (value) => {
						this.plugin.settings.autoMentionActiveNote = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.mentions.maxNoteLength.name"))
			.setDesc(t("settings.mentions.maxNoteLength.desc"))
			.addText((text) =>
				text
					.setPlaceholder("10000")
					.setValue(
						String(
							this.plugin.settings.displaySettings.maxNoteLength,
						),
					)
					.onChange(async (value) => {
						const num = parseInt(value, 10);
						if (!isNaN(num) && num >= 1) {
							this.plugin.settings.displaySettings.maxNoteLength =
								num;
							await this.plugin.saveSettings();
						}
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.mentions.maxSelectionLength.name"))
			.setDesc(t("settings.mentions.maxSelectionLength.desc"))
			.addText((text) =>
				text
					.setPlaceholder("10000")
					.setValue(
						String(
							this.plugin.settings.displaySettings
								.maxSelectionLength,
						),
					)
					.onChange(async (value) => {
						const num = parseInt(value, 10);
						if (!isNaN(num) && num >= 1) {
							this.plugin.settings.displaySettings.maxSelectionLength =
								num;
							await this.plugin.saveSettings();
						}
					}),
			);
	}

	private renderFloatingChatSettings(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName(t("settings.floatingChat.showButton.name"))
			.setDesc(t("settings.floatingChat.showButton.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.showFloatingButton)
					.onChange(async (value) => {
						const wasEnabled =
							this.plugin.settings.showFloatingButton;
						this.plugin.settings.showFloatingButton = value;
						await this.plugin.saveSettings();

						// Handle dynamic toggle of floating chat
						if (value && !wasEnabled) {
							// Turning ON: create floating chat instance
							this.plugin.openNewFloatingChat();
						} else if (!value && wasEnabled) {
							// Turning OFF: close all floating chat instances
							const instances =
								this.plugin.getFloatingChatInstances();
							for (const instanceId of instances) {
								this.plugin.closeFloatingChat(instanceId);
							}
						}
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.floatingChat.buttonImage.name"))
			.setDesc(t("settings.floatingChat.buttonImage.desc"))
			.addText((text) =>
				text
					.setPlaceholder("https://example.com/avatar.png")
					.setValue(this.plugin.settings.floatingButtonImage)
					.onChange(async (value) => {
						this.plugin.settings.floatingButtonImage = value.trim();
						await this.plugin.saveSettings();
					}),
			);
	}

	private renderExportSettings(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName(t("settings.export.folder.name"))
			.setDesc(t("settings.export.folder.desc"))
			.addText((text) =>
				text
					.setPlaceholder("Agent Client")
					.setValue(this.plugin.settings.exportSettings.defaultFolder)
					.onChange(async (value) => {
						this.plugin.settings.exportSettings.defaultFolder =
							value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.export.filename.name"))
			.setDesc(t("settings.export.filename.desc"))
			.addText((text) =>
				text
					.setPlaceholder("agent_client_{date}_{time}")
					.setValue(
						this.plugin.settings.exportSettings.filenameTemplate,
					)
					.onChange(async (value) => {
						this.plugin.settings.exportSettings.filenameTemplate =
							value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.export.frontmatterTag.name"))
			.setDesc(t("settings.export.frontmatterTag.desc"))
			.addText((text) =>
				text
					.setPlaceholder("agent-client")
					.setValue(
						this.plugin.settings.exportSettings.frontmatterTag,
					)
					.onChange(async (value) => {
						this.plugin.settings.exportSettings.frontmatterTag =
							value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.export.includeImages.name"))
			.setDesc(t("settings.export.includeImages.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.exportSettings.includeImages)
					.onChange(async (value) => {
						this.plugin.settings.exportSettings.includeImages =
							value;
						await this.plugin.saveSettings();
						this.display();
					}),
			);

		if (this.plugin.settings.exportSettings.includeImages) {
			new Setting(containerEl)
				.setName(t("settings.export.imageLocation.name"))
				.setDesc(t("settings.export.imageLocation.desc"))
				.addDropdown((dropdown) =>
					dropdown
						.addOption(
							"obsidian",
							t("settings.export.imageLocationOptions.obsidian"),
						)
						.addOption("custom", t("settings.export.imageLocationOptions.custom"))
						.addOption(
							"base64",
							t("settings.export.imageLocationOptions.base64"),
						)
						.setValue(
							this.plugin.settings.exportSettings.imageLocation,
						)
						.onChange(async (value) => {
							this.plugin.settings.exportSettings.imageLocation =
								value as "obsidian" | "custom" | "base64";
							await this.plugin.saveSettings();
							this.display();
						}),
				);

			if (
				this.plugin.settings.exportSettings.imageLocation === "custom"
			) {
				new Setting(containerEl)
					.setName(t("settings.export.customImageFolder.name"))
					.setDesc(t("settings.export.customImageFolder.desc"))
					.addText((text) =>
						text
							.setPlaceholder("Agent Client")
							.setValue(
								this.plugin.settings.exportSettings
									.imageCustomFolder,
							)
							.onChange(async (value) => {
								this.plugin.settings.exportSettings.imageCustomFolder =
									value;
								await this.plugin.saveSettings();
							}),
					);
			}
		}

		new Setting(containerEl)
			.setName(t("settings.export.autoExportNewChat.name"))
			.setDesc(t("settings.export.autoExportNewChat.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(
						this.plugin.settings.exportSettings.autoExportOnNewChat,
					)
					.onChange(async (value) => {
						this.plugin.settings.exportSettings.autoExportOnNewChat =
							value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.export.autoExportCloseChat.name"))
			.setDesc(t("settings.export.autoExportCloseChat.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(
						this.plugin.settings.exportSettings
							.autoExportOnCloseChat,
					)
					.onChange(async (value) => {
						this.plugin.settings.exportSettings.autoExportOnCloseChat =
							value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.export.openAfterExport.name"))
			.setDesc(t("settings.export.openAfterExport.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(
						this.plugin.settings.exportSettings.openFileAfterExport,
					)
					.onChange(async (value) => {
						this.plugin.settings.exportSettings.openFileAfterExport =
							value;
						await this.plugin.saveSettings();
					}),
			);
	}

	private renderPermissionsSettings(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName(t("settings.permissions.autoAllow.name"))
			.setDesc(t("settings.permissions.autoAllow.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.autoAllowPermissions)
					.onChange(async (value) => {
						this.plugin.settings.autoAllowPermissions = value;
						await this.plugin.saveSettings();
					}),
			);
	}

	private renderAdvancedSettings(containerEl: HTMLElement) {
		// Node.js path
		new Setting(containerEl)
			.setName(t("settings.advanced.nodePath.name"))
			.setDesc(t("settings.advanced.nodePath.desc"))
			.addText((text) => {
				text.setPlaceholder("Absolute path to node")
					.setValue(this.plugin.settings.nodePath)
					.onChange(async (value) => {
						this.plugin.settings.nodePath = value.trim();
						await this.plugin.saveSettings();
					});
			});

		// WSL settings (Windows only)
		if (Platform.isWin) {
			new Setting(containerEl)
				.setName(t("settings.advanced.wsl.name"))
				.setDesc(t("settings.advanced.wsl.desc"))
				.addToggle((toggle) =>
					toggle
						.setValue(this.plugin.settings.windowsWslMode)
						.onChange(async (value) => {
							this.plugin.settings.windowsWslMode = value;
							await this.plugin.saveSettings();
							this.display(); // Refresh to show/hide distribution setting
						}),
				);

			if (this.plugin.settings.windowsWslMode) {
				new Setting(containerEl)
					.setName(t("settings.advanced.wslDistribution.name"))
					.setDesc(t("settings.advanced.wslDistribution.desc"))
					.addText((text) =>
						text
							.setPlaceholder("Leave empty for default")
							.setValue(
								this.plugin.settings.windowsWslDistribution ||
									"",
							)
							.onChange(async (value) => {
								this.plugin.settings.windowsWslDistribution =
									value.trim() || undefined;
								await this.plugin.saveSettings();
							}),
					);
			}
		}

		// Debug mode
		new Setting(containerEl)
			.setName(t("settings.advanced.debugMode.name"))
			.setDesc(t("settings.advanced.debugMode.desc"))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.debugMode)
					.onChange(async (value) => {
						this.plugin.settings.debugMode = value;
						await this.plugin.saveSettings();
					}),
			);
	}

	// ─────────────────────────────────────────────────────────────────────
	// Agent Config Renderers
	// ─────────────────────────────────────────────────────────────────────

	private renderClaudeConfig(containerEl: HTMLElement) {
		const claude = this.plugin.settings.claude;

		new Setting(containerEl)
			.setName(t("settings.agent.apiKey.name"))
			.setDesc(t("settings.agent.apiKey.desc"))
			.addText((text) => {
				text.setPlaceholder("Enter your Anthropic API key")
					.setValue(claude.apiKey)
					.onChange(async (value) => {
						this.plugin.settings.claude.apiKey = value.trim();
						await this.plugin.saveSettings();
					});
				text.inputEl.type = "password";
			});

		new Setting(containerEl)
			.setName(t("settings.agent.path.name"))
			.setDesc(
				'Absolute path to the claude-agent-acp. On macOS/Linux, use "which claude-agent-acp", and on Windows, use "where claude-agent-acp" to find it.',
			)
			.addText((text) => {
				text.setPlaceholder("Absolute path to claude-agent-acp")
					.setValue(claude.command)
					.onChange(async (value) => {
						this.plugin.settings.claude.command = value.trim();
						await this.plugin.saveSettings();
					});
			})
			.addButton((button) =>
				button
					.setIcon("search")
					.setTooltip("Auto-detect")
					.onClick(async () => {
						button.setDisabled(true);
						try {
							const path =
								await this.plugin.detectAgentCommand(
									this.plugin.settings.claude.id,
								);
							if (path) {
								this.plugin.settings.claude.command = path;
								await this.plugin.saveSettings();
								this.display();
								new Notice(
									`[Agent Client] Detected: ${path}`,
								);
							} else {
								new Notice(
									"[Agent Client] Claude Code not found",
								);
							}
						} catch (error) {
							console.error(
								"[AgentClient] Detection failed:",
								error,
							);
							new Notice(
								"[Agent Client] Detection failed",
							);
						} finally {
							button.setDisabled(false);
						}
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.agent.arguments.name"))
			.setDesc(
				"Enter one argument per line. Leave empty to run without arguments.",
			)
			.addTextArea((text) => {
				text.setPlaceholder("")
					.setValue(this.formatArgs(claude.args))
					.onChange(async (value) => {
						this.plugin.settings.claude.args =
							this.parseArgs(value);
						await this.plugin.saveSettings();
					});
				text.inputEl.rows = 3;
			});

		new Setting(containerEl)
			.setName(t("settings.agent.envVars.name"))
			.setDesc(
				"Enter KEY=VALUE pairs, one per line. ANTHROPIC_API_KEY is derived from the field above.",
			)
			.addTextArea((text) => {
				text.setPlaceholder("")
					.setValue(this.formatEnv(claude.env))
					.onChange(async (value) => {
						this.plugin.settings.claude.env = this.parseEnv(value);
						await this.plugin.saveSettings();
					});
				text.inputEl.rows = 3;
			});
	}

	private renderCodexConfig(containerEl: HTMLElement) {
		const codex = this.plugin.settings.codex;

		new Setting(containerEl)
			.setName(t("settings.agent.apiKey.name"))
			.setDesc(
				"OpenAI API key. Required if not logging in with an OpenAI account. (Stored as plain text)",
			)
			.addText((text) => {
				text.setPlaceholder("Enter your OpenAI API key")
					.setValue(codex.apiKey)
					.onChange(async (value) => {
						this.plugin.settings.codex.apiKey = value.trim();
						await this.plugin.saveSettings();
					});
				text.inputEl.type = "password";
			});

		new Setting(containerEl)
			.setName(t("settings.agent.path.name"))
			.setDesc(
				'Absolute path to the codex-acp. On macOS/Linux, use "which codex-acp", and on Windows, use "where codex-acp" to find it.',
			)
			.addText((text) => {
				text.setPlaceholder("Absolute path to codex-acp")
					.setValue(codex.command)
					.onChange(async (value) => {
						this.plugin.settings.codex.command = value.trim();
						await this.plugin.saveSettings();
					});
			})
			.addButton((button) =>
				button
					.setIcon("search")
					.setTooltip("Auto-detect")
					.onClick(async () => {
						button.setDisabled(true);
						try {
							const path =
								await this.plugin.detectAgentCommand(
									this.plugin.settings.codex.id,
								);
							if (path) {
								this.plugin.settings.codex.command = path;
								await this.plugin.saveSettings();
								this.display();
								new Notice(
									`[Agent Client] Detected: ${path}`,
								);
							} else {
								new Notice("[Agent Client] Codex not found");
							}
						} catch (error) {
							console.error(
								"[AgentClient] Detection failed:",
								error,
							);
							new Notice(
								"[Agent Client] Detection failed",
							);
						} finally {
							button.setDisabled(false);
						}
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.agent.arguments.name"))
			.setDesc(
				"Enter one argument per line. Leave empty to run without arguments.",
			)
			.addTextArea((text) => {
				text.setPlaceholder("")
					.setValue(this.formatArgs(codex.args))
					.onChange(async (value) => {
						this.plugin.settings.codex.args = this.parseArgs(value);
						await this.plugin.saveSettings();
					});
				text.inputEl.rows = 3;
			});

		new Setting(containerEl)
			.setName(t("settings.agent.envVars.name"))
			.setDesc(
				"Enter KEY=VALUE pairs, one per line. OPENAI_API_KEY is derived from the field above.",
			)
			.addTextArea((text) => {
				text.setPlaceholder("")
					.setValue(this.formatEnv(codex.env))
					.onChange(async (value) => {
						this.plugin.settings.codex.env = this.parseEnv(value);
						await this.plugin.saveSettings();
					});
				text.inputEl.rows = 3;
			});
	}

	private renderGeminiConfig(containerEl: HTMLElement) {
		const gemini = this.plugin.settings.gemini;

		new Setting(containerEl)
			.setName(t("settings.agent.apiKey.name"))
			.setDesc(
				"Gemini API key. Required if not logging in with a Google account. (Stored as plain text)",
			)
			.addText((text) => {
				text.setPlaceholder("Enter your Gemini API key")
					.setValue(gemini.apiKey)
					.onChange(async (value) => {
						this.plugin.settings.gemini.apiKey = value.trim();
						await this.plugin.saveSettings();
					});
				text.inputEl.type = "password";
			});

		new Setting(containerEl)
			.setName(t("settings.agent.path.name"))
			.setDesc(
				'Absolute path to the Gemini CLI. On macOS/Linux, use "which gemini", and on Windows, use "where gemini" to find it.',
			)
			.addText((text) => {
				text.setPlaceholder("Absolute path to gemini")
					.setValue(gemini.command)
					.onChange(async (value) => {
						this.plugin.settings.gemini.command = value.trim();
						await this.plugin.saveSettings();
					});
			})
			.addButton((button) =>
				button
					.setIcon("search")
					.setTooltip("Auto-detect")
					.onClick(async () => {
						button.setDisabled(true);
						try {
							const path =
								await this.plugin.detectAgentCommand(
									this.plugin.settings.gemini.id,
								);
							if (path) {
								this.plugin.settings.gemini.command = path;
								await this.plugin.saveSettings();
								this.display();
								new Notice(
									`[Agent Client] Detected: ${path}`,
								);
							} else {
								new Notice(
									"[Agent Client] Gemini CLI not found",
								);
							}
						} catch (error) {
							console.error(
								"[AgentClient] Detection failed:",
								error,
							);
							new Notice(
								"[Agent Client] Detection failed",
							);
						} finally {
							button.setDisabled(false);
						}
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.agent.arguments.name"))
			.setDesc(
				'Enter one argument per line. Leave empty to run without arguments.(Currently, the Gemini CLI requires the "--experimental-acp" option.)',
			)
			.addTextArea((text) => {
				text.setPlaceholder("")
					.setValue(this.formatArgs(gemini.args))
					.onChange(async (value) => {
						this.plugin.settings.gemini.args =
							this.parseArgs(value);
						await this.plugin.saveSettings();
					});
				text.inputEl.rows = 3;
			});

		new Setting(containerEl)
			.setName(t("settings.agent.envVars.name"))
			.setDesc(
				"Enter KEY=VALUE pairs, one per line. Required to authenticate with Vertex AI. GEMINI_API_KEY is derived from the field above.(Stored as plain text)",
			)
			.addTextArea((text) => {
				text.setPlaceholder("GOOGLE_CLOUD_PROJECT=...")
					.setValue(this.formatEnv(gemini.env))
					.onChange(async (value) => {
						this.plugin.settings.gemini.env = this.parseEnv(value);
						await this.plugin.saveSettings();
					});
				text.inputEl.rows = 3;
			});
	}

	private renderOpenCodeConfig(containerEl: HTMLElement) {
		const opencode = this.plugin.settings.opencode;

		new Setting(containerEl)
			.setName(t("settings.agent.path.name"))
			.setDesc(
				'Absolute path to the opencode executable. On macOS/Linux, use "which opencode", and on Windows, use "where opencode" to find it.',
			)
			.addText((text) => {
				text.setPlaceholder("Absolute path to opencode")
					.setValue(opencode.command)
					.onChange(async (value) => {
						this.plugin.settings.opencode.command = value.trim();
						await this.plugin.saveSettings();
					});
			})
			.addButton((button) =>
				button
					.setIcon("search")
					.setTooltip("Auto-detect")
					.onClick(async () => {
						button.setDisabled(true);
						try {
							const path =
								await this.plugin.detectAgentCommand(
									this.plugin.settings.opencode.id,
								);
							if (path) {
								this.plugin.settings.opencode.command = path;
								await this.plugin.saveSettings();
								this.display();
								new Notice(
									`[Agent Client] Detected: ${path}`,
								);
							} else {
								new Notice(
									"[Agent Client] OpenCode not found",
								);
							}
						} catch (error) {
							console.error(
								"[AgentClient] Detection failed:",
								error,
							);
							new Notice(
								"[Agent Client] Detection failed",
							);
						} finally {
							button.setDisabled(false);
						}
					}),
			);

		new Setting(containerEl)
			.setName(t("settings.agent.arguments.name"))
			.setDesc(
				"Enter one argument per line. The default 'acp' argument enables ACP protocol support. Usually no changes needed.",
			)
			.addTextArea((text) => {
				text.setPlaceholder("")
					.setValue(this.formatArgs(opencode.args))
					.onChange(async (value) => {
						this.plugin.settings.opencode.args = this.parseArgs(value);
						await this.plugin.saveSettings();
					});
				text.inputEl.rows = 3;
			});

		new Setting(containerEl)
			.setName(t("settings.agent.envVars.name"))
			.setDesc(t("settings.agent.envVars.desc"))
			.addTextArea((text) => {
				text.setPlaceholder("")
					.setValue(this.formatEnv(opencode.env))
					.onChange(async (value) => {
						this.plugin.settings.opencode.env = this.parseEnv(value);
						await this.plugin.saveSettings();
					});
				text.inputEl.rows = 3;
			});
	}

	private renderCustomAgents(containerEl: HTMLElement) {
		if (this.plugin.settings.customAgents.length === 0) {
			containerEl.createEl("p", {
				text: "No custom agents configured yet.",
			});
		} else {
			this.plugin.settings.customAgents.forEach((agent, index) => {
				this.renderCustomAgent(containerEl, agent, index);
			});
		}

		new Setting(containerEl).addButton((button) => {
			button
				.setButtonText("Add custom agent")
				.setCta()
				.onClick(async () => {
					const newId = this.generateCustomAgentId();
					const newDisplayName =
						this.generateCustomAgentDisplayName();
					this.plugin.settings.customAgents.push({
						id: newId,
						displayName: newDisplayName,
						command: "",
						args: [],
						env: [],
					});
					this.plugin.ensureDefaultAgentId();
					await this.plugin.saveSettings();
					this.display();
				});
		});
	}

	private renderCustomAgent(
		containerEl: HTMLElement,
		agent: CustomAgentSettings,
		index: number,
	) {
		const blockEl = containerEl.createDiv({
			cls: "agent-client-custom-agent",
		});

		const idSetting = new Setting(blockEl)
			.setName(t("settings.agent.agentId.name"))
			.setDesc(t("settings.agent.agentId.desc"))
			.addText((text) => {
				text.setPlaceholder("custom-agent")
					.setValue(agent.id)
					.onChange(async (value) => {
						const previousId =
							this.plugin.settings.customAgents[index].id;
						const trimmed = value.trim();
						let nextId = trimmed;
						if (nextId.length === 0) {
							nextId = this.generateCustomAgentId();
							text.setValue(nextId);
						}
						this.plugin.settings.customAgents[index].id = nextId;
						if (
							this.plugin.settings.defaultAgentId === previousId
						) {
							this.plugin.settings.defaultAgentId = nextId;
						}
						this.plugin.ensureDefaultAgentId();
						await this.plugin.saveSettings();
						this.refreshAgentDropdown();
					});
			});

		idSetting.addExtraButton((button) => {
			button
				.setIcon("trash")
				.setTooltip("Delete this agent")
				.onClick(async () => {
					this.plugin.settings.customAgents.splice(index, 1);
					this.plugin.ensureDefaultAgentId();
					await this.plugin.saveSettings();
					this.display();
				});
		});

		new Setting(blockEl)
			.setName(t("settings.agent.displayName.name"))
			.setDesc(t("settings.agent.displayName.desc"))
			.addText((text) => {
				text.setPlaceholder("Custom agent")
					.setValue(agent.displayName || agent.id)
					.onChange(async (value) => {
						const trimmed = value.trim();
						this.plugin.settings.customAgents[index].displayName =
							trimmed.length > 0
								? trimmed
								: this.plugin.settings.customAgents[index].id;
						await this.plugin.saveSettings();
						this.refreshAgentDropdown();
					});
			});

		new Setting(blockEl)
			.setName(t("settings.agent.path.name"))
			.setDesc(t("settings.agent.path.desc"))
			.addText((text) => {
				text.setPlaceholder("Absolute path to custom agent")
					.setValue(agent.command)
					.onChange(async (value) => {
						this.plugin.settings.customAgents[index].command =
							value.trim();
						await this.plugin.saveSettings();
					});
			});

		new Setting(blockEl)
			.setName(t("settings.agent.arguments.name"))
			.setDesc(
				"Enter one argument per line. Leave empty to run without arguments.",
			)
			.addTextArea((text) => {
				text.setPlaceholder("--flag\n--another=value")
					.setValue(this.formatArgs(agent.args))
					.onChange(async (value) => {
						this.plugin.settings.customAgents[index].args =
							this.parseArgs(value);
						await this.plugin.saveSettings();
					});
				text.inputEl.rows = 3;
			});

		new Setting(blockEl)
			.setName(t("settings.agent.envVars.name"))
			.setDesc(
				"Enter KEY=VALUE pairs, one per line. (Stored as plain text)",
			)
			.addTextArea((text) => {
				text.setPlaceholder("TOKEN=...")
					.setValue(this.formatEnv(agent.env))
					.onChange(async (value) => {
						this.plugin.settings.customAgents[index].env =
							this.parseEnv(value);
						await this.plugin.saveSettings();
					});
				text.inputEl.rows = 3;
			});
	}

	// ─────────────────────────────────────────────────────────────────────
	// Helper Methods
	// ─────────────────────────────────────────────────────────────────────

	/**
	 * Update the agent dropdown when settings change.
	 * Only updates if the value is different to avoid infinite loops.
	 */
	private updateAgentDropdown(): void {
		if (!this.agentSelector) {
			return;
		}

		// Get latest settings from store snapshot
		const settings = this.plugin.settingsStore.getSnapshot();
		const currentValue = this.agentSelector.getValue();

		// Only update if different to avoid triggering onChange
		if (settings.defaultAgentId !== currentValue) {
			this.agentSelector.setValue(settings.defaultAgentId);
		}
	}

	/**
	 * Called when the settings tab is hidden.
	 * Clean up subscriptions to prevent memory leaks.
	 */
	hide(): void {
		if (this.unsubscribe) {
			this.unsubscribe();
			this.unsubscribe = null;
		}
	}

	private populateAgentDropdown(dropdown: DropdownComponent) {
		dropdown.selectEl.empty();
		for (const option of this.getAgentOptions()) {
			dropdown.addOption(option.id, option.label);
		}
	}

	private refreshAgentDropdown() {
		if (!this.agentSelector) {
			return;
		}
		this.populateAgentDropdown(this.agentSelector);
		this.agentSelector.setValue(this.plugin.settings.defaultAgentId);
	}

	private getAgentOptions(): { id: string; label: string }[] {
		const toOption = (id: string, displayName: string) => ({
			id,
			label: `${displayName} (${id})`,
		});
		const options: { id: string; label: string }[] = [
			toOption(
				this.plugin.settings.claude.id,
				this.plugin.settings.claude.displayName ||
					this.plugin.settings.claude.id,
			),
			toOption(
				this.plugin.settings.codex.id,
				this.plugin.settings.codex.displayName ||
					this.plugin.settings.codex.id,
			),
			toOption(
				this.plugin.settings.gemini.id,
				this.plugin.settings.gemini.displayName ||
					this.plugin.settings.gemini.id,
			),
			toOption(
				this.plugin.settings.opencode.id,
				this.plugin.settings.opencode.displayName ||
					this.plugin.settings.opencode.id,
			),
		];
		for (const agent of this.plugin.settings.customAgents) {
			if (agent.id && agent.id.length > 0) {
				const labelSource =
					agent.displayName && agent.displayName.length > 0
						? agent.displayName
						: agent.id;
				options.push(toOption(agent.id, labelSource));
			}
		}
		const seen = new Set<string>();
		return options.filter(({ id }) => {
			if (seen.has(id)) {
				return false;
			}
			seen.add(id);
			return true;
		});
	}

	private generateCustomAgentDisplayName(): string {
		const base = "Custom agent";
		const existing = new Set<string>();
		existing.add(
			this.plugin.settings.claude.displayName ||
				this.plugin.settings.claude.id,
		);
		existing.add(
			this.plugin.settings.codex.displayName ||
				this.plugin.settings.codex.id,
		);
		existing.add(
			this.plugin.settings.gemini.displayName ||
				this.plugin.settings.gemini.id,
		);
		for (const item of this.plugin.settings.customAgents) {
			existing.add(item.displayName || item.id);
		}
		if (!existing.has(base)) {
			return base;
		}
		let counter = 2;
		let candidate = `${base} ${counter}`;
		while (existing.has(candidate)) {
			counter += 1;
			candidate = `${base} ${counter}`;
		}
		return candidate;
	}

	// Create a readable ID for new custom agents and avoid collisions
	private generateCustomAgentId(): string {
		const base = "custom-agent";
		const existing = new Set(
			this.plugin.settings.customAgents.map((item) => item.id),
		);
		if (!existing.has(base)) {
			return base;
		}
		let counter = 2;
		let candidate = `${base}-${counter}`;
		while (existing.has(candidate)) {
			counter += 1;
			candidate = `${base}-${counter}`;
		}
		return candidate;
	}

	private formatArgs(args: string[]): string {
		return args.join("\n");
	}

	private parseArgs(value: string): string[] {
		return value
			.split(/\r?\n/)
			.map((line) => line.trim())
			.filter((line) => line.length > 0);
	}

	private formatEnv(env: AgentEnvVar[]): string {
		return env
			.map((entry) => `${entry.key}=${entry.value ?? ""}`)
			.join("\n");
	}

	private parseEnv(value: string): AgentEnvVar[] {
		const envVars: AgentEnvVar[] = [];

		for (const line of value.split(/\r?\n/)) {
			const trimmed = line.trim();
			if (!trimmed) {
				continue;
			}
			const delimiter = trimmed.indexOf("=");
			if (delimiter === -1) {
				continue;
			}
			const key = trimmed.slice(0, delimiter).trim();
			const envValue = trimmed.slice(delimiter + 1).trim();
			if (!key) {
				continue;
			}
			envVars.push({ key, value: envValue });
		}

		return normalizeEnvVars(envVars);
	}
}

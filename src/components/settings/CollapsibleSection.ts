import { Setting } from "obsidian";

const COLLAPSED_STATE_KEY = "agent-client-settings-collapsed";

type CollapsedState = Record<string, boolean>;

function loadCollapsedState(): CollapsedState {
	try {
		const saved = localStorage.getItem(COLLAPSED_STATE_KEY);
		if (saved) {
			return JSON.parse(saved) as CollapsedState;
		}
	} catch (e) {
		console.warn("[CollapsibleSection] Failed to load collapsed state:", e);
	}
	return {};
}

function saveCollapsedState(state: CollapsedState): void {
	try {
		localStorage.setItem(COLLAPSED_STATE_KEY, JSON.stringify(state));
	} catch (e) {
		console.warn("[CollapsibleSection] Failed to save collapsed state:", e);
	}
}

export interface CollapsibleSectionOptions {
	/** Unique identifier for persisting collapsed state */
	id: string;
	/** Display title for the section header */
	title: string;
	/** Optional description shown next to the title */
	description?: string;
	/** Initial collapsed state (overridden by saved state if exists) */
	defaultCollapsed?: boolean;
	/** Icon to show in the header (e.g., "chevron-down", "settings") */
	icon?: string;
	/** Badge text to show next to title (e.g., "当前默认", "Built-in") */
	badge?: string;
	/** CSS class for the container */
	containerClass?: string;
	/** Callback when collapse state changes */
	onToggle?: (collapsed: boolean) => void;
}

/**
 * Creates a collapsible section with a header that can be clicked to
 * show/hide content.
 *
 * Usage:
 * ```typescript
 * const section = new CollapsibleSection(container, {
 *   id: "display-settings",
 *   title: "Display",
 *   defaultCollapsed: false,
 * }, (contentEl) => {
 *   // Render settings inside contentEl
 *   new Setting(contentEl).setName("Font size")...
 * });
 * ```
 */
export class CollapsibleSection {
	private containerEl: HTMLElement;
	private headerEl: HTMLElement;
	private contentEl: HTMLElement;
	private chevronEl: HTMLElement;
	private options: CollapsibleSectionOptions;
	private collapsed: boolean;
	private renderContent: (container: HTMLElement) => void;
	private globalState: CollapsedState;

	constructor(
		container: HTMLElement,
		options: CollapsibleSectionOptions,
		renderContent: (container: HTMLElement) => void,
	) {
		this.options = options;
		this.renderContent = renderContent;
		this.globalState = loadCollapsedState();

		// Use saved state if exists, otherwise use default
		if (options.id in this.globalState) {
			this.collapsed = this.globalState[options.id];
		} else {
			this.collapsed = options.defaultCollapsed ?? false;
		}

		this.containerEl = container.createDiv({
			cls: `agent-client-collapsible-section ${options.containerClass ?? ""}`.trim(),
		});
		this.containerEl.dataset.sectionId = options.id;

		this.chevronEl = this.containerEl.createDiv({
			cls: "agent-client-collapsible-chevron",
			text: this.collapsed ? "▸" : "▾",
		});
		this.headerEl = this.createHeader();
		this.contentEl = this.createContent();

		this.applyCollapsedState();
	}

	private createHeader(): HTMLElement {
		const header = this.containerEl.createDiv({
			cls: "agent-client-collapsible-header",
		});

		const headerSetting = new Setting(header);

		// Set title without chevron (chevron is separate element)
		headerSetting.setName(this.options.title);

		// Add optional description
		if (this.options.description) {
			headerSetting.setDesc(this.options.description);
		}

		// Add optional badge
		if (this.options.badge) {
			headerSetting.descEl.createSpan({
				cls: "agent-client-badge",
				text: ` ${this.options.badge}`,
			});
		}

		// Make header clickable
		headerSetting.setClass("agent-client-collapsible-header-setting");

		header.addEventListener("click", (e) => {
			// Prevent toggle if clicking on input elements
			const target = e.target as HTMLElement;
			if (
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.tagName === "SELECT" ||
				target.closest("button")
			) {
				return;
			}
			this.toggle();
		});

		return header;
	}

	private createContent(): HTMLElement {
		const content = this.containerEl.createDiv({
			cls: "agent-client-collapsible-content",
		});

		// Render content immediately (will be hidden if collapsed)
		this.renderContent(content);

		return content;
	}

	private toggle(): void {
		this.collapsed = !this.collapsed;

		// Update global state
		this.globalState[this.options.id] = this.collapsed;
		saveCollapsedState(this.globalState);

		// Update chevron icon
		this.chevronEl.textContent = this.collapsed ? "▸" : "▾";

		this.applyCollapsedState();

		// Callback
		this.options.onToggle?.(this.collapsed);
	}

	private applyCollapsedState(): void {
		if (this.collapsed) {
			this.contentEl.addClass("agent-client-collapsed");
			this.containerEl.addClass("agent-client-section-collapsed");
		} else {
			this.contentEl.removeClass("agent-client-collapsed");
			this.containerEl.removeClass("agent-client-section-collapsed");
		}
	}

	/**
	 * Programmatically expand the section
	 */
	expand(): void {
		if (this.collapsed) {
			this.toggle();
		}
	}

	/**
	 * Programmatically collapse the section
	 */
	collapse(): void {
		if (!this.collapsed) {
			this.toggle();
		}
	}

	/**
	 * Get the content element for adding additional content
	 */
	getContentElement(): HTMLElement {
		return this.contentEl;
	}

	/**
	 * Check if the section is collapsed
	 */
	isCollapsed(): boolean {
		return this.collapsed;
	}
}

/**
 * Creates a collapsible section specifically for agent configuration.
 * Shows agent name with optional badge and provides helper methods.
 */
export class AgentConfigSection extends CollapsibleSection {
	constructor(
		container: HTMLElement,
		options: {
			id: string;
			title: string;
			description?: string;
			badge?: string;
			defaultCollapsed?: boolean;
			onToggle?: (collapsed: boolean) => void;
		},
		renderContent: (container: HTMLElement) => void,
	) {
		super(
			container,
			{
				...options,
				containerClass: "agent-client-agent-config-section",
			},
			renderContent,
		);
	}
}

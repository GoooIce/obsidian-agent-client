/**
 * Simple i18n (internationalization) module for Obsidian Agent Client plugin.
 * Supports dynamic language switching and nested translation keys.
 */

import type AgentClientPlugin from "../plugin";

// Import all locale files statically for synchronous access
import enLocale from "../locales/en.json";
import zhLocale from "../locales/zh.json";
import jaLocale from "../locales/ja.json";

export type SupportedLanguage = "en" | "zh" | "ja";

// Translation data structure (nested object)
type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = { [key: string]: TranslationValue };

// All locales loaded statically
const LOCALES: Record<SupportedLanguage, Translations> = {
	en: enLocale as Translations,
	zh: zhLocale as Translations,
	ja: jaLocale as Translations,
};

// Current language
let currentLanguage: SupportedLanguage = "en";

/**
 * Initialize i18n module with plugin instance
 */
export function initI18n(pluginInstance: AgentClientPlugin): void {
	currentLanguage = (pluginInstance.settings.language as SupportedLanguage) || "en";
}

/**
 * Get current language
 */
export function getCurrentLanguage(): SupportedLanguage {
	return currentLanguage;
}

/**
 * Set language
 */
export function setLanguage(lang: SupportedLanguage): void {
	currentLanguage = lang;
}

/**
 * Get nested value from object using dot notation path
 */
function getNestedValue(obj: Translations, path: string): string | undefined {
	const keys = path.split(".");
	let current: TranslationValue = obj;

	for (const key of keys) {
		if (typeof current === "string") {
			return undefined;
		}
		current = (current as { [key: string]: TranslationValue })[key];
		if (current === undefined) {
			return undefined;
		}
	}

	return typeof current === "string" ? current : undefined;
}

/**
 * Replace template variables in translation string
 * Example: "Hello {name}" with { name: "World" } => "Hello World"
 */
function replaceVariables(str: string, variables?: Record<string, string | number>): string {
	if (!variables) {
		return str;
	}

	return str.replace(/\{(\w+)\}/g, (match, key) => {
		return variables[key]?.toString() ?? match;
	});
}

/**
 * Translate a key to current language (synchronous)
 * @param key - Dot notation key (e.g., "settings.display.title")
 * @param variables - Optional variables for template replacement
 * @returns Translated string or key if not found
 */
export function t(key: string, variables?: Record<string, string | number>): string {
	const translations = LOCALES[currentLanguage];
	const value = getNestedValue(translations, key);

	if (value === undefined) {
		// Fall back to English
		const fallback = getNestedValue(LOCALES.en, key);
		if (fallback !== undefined) {
			return replaceVariables(fallback, variables);
		}
		console.warn(`[i18n] Missing translation key: ${key}`);
		return key;
	}

	return replaceVariables(value, variables);
}

/**
 * Async version of translate (for compatibility)
 */
export async function tAsync(key: string, variables?: Record<string, string | number>): Promise<string> {
	return t(key, variables);
}

/**
 * Preload translations (no-op now, kept for compatibility)
 */
export async function preloadTranslations(): Promise<void> {
	// No-op: translations are loaded statically
}

/**
 * Get all available languages with their display names
 */
export function getAvailableLanguages(): { code: SupportedLanguage; name: string }[] {
	return [
		{ code: "en", name: "English" },
		{ code: "zh", name: "中文" },
		{ code: "ja", name: "日本語" },
	];
}

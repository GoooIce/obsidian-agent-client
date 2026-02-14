export const CHAT_FONT_SIZE_MIN = 10;
export const CHAT_FONT_SIZE_MAX = 24;
export const CHAT_FONT_SIZE_DEFAULT = 12;

export const normalizeChatFontSize = (value: unknown): number => {
	const numericValue =
		typeof value === "number"
			? value
			: typeof value === "string"
				? Number.parseInt(value, 10)
				: Number.NaN;

	if (!Number.isFinite(numericValue)) {
		return CHAT_FONT_SIZE_DEFAULT;
	}

	return Math.min(
		CHAT_FONT_SIZE_MAX,
		Math.max(CHAT_FONT_SIZE_MIN, Math.round(numericValue)),
	);
};

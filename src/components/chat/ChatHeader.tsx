import * as React from "react";
import { HeaderButton } from "./HeaderButton";
import { t } from "../../shared/i18n";

/**
 * Props for ChatHeader component
 */
export interface ChatHeaderProps {
	/** Display name of the active agent */
	agentLabel: string;
	/** Whether a plugin update is available */
	isUpdateAvailable: boolean;
	/** Whether session history is supported (show History button) */
	hasHistoryCapability?: boolean;
	/** Callback to create a new chat session */
	onNewChat: () => void;
	/** Callback to export the chat */
	onExportChat: () => void;
	/** Callback to show the header menu at the click position */
	onShowMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
	/** Callback to open session history */
	onOpenHistory?: () => void;
}

/**
 * Header component for the chat view.
 *
 * Displays:
 * - Agent name
 * - Update notification (if available)
 * - Action buttons (new chat, history, export, settings)
 */
export function ChatHeader({
	agentLabel,
	isUpdateAvailable,
	hasHistoryCapability = false,
	onNewChat,
	onExportChat,
	onShowMenu,
	onOpenHistory,
}: ChatHeaderProps) {
	return (
		<div className="agent-client-chat-view-header">
			<div className="agent-client-chat-view-header-main">
				<h3 className="agent-client-chat-view-header-title">
					{agentLabel}
				</h3>
			</div>
			{isUpdateAvailable && (
				<p className="agent-client-chat-view-header-update">
					{t("chat.header.updateAvailable")}
				</p>
			)}
			<div className="agent-client-chat-view-header-actions">
				<HeaderButton
					iconName="plus"
					tooltip={t("chat.header.newChat")}
					onClick={onNewChat}
				/>
				{onOpenHistory && (
					<HeaderButton
						iconName="history"
						tooltip={t("chat.header.sessionHistory")}
						onClick={onOpenHistory}
					/>
				)}
				<HeaderButton
					iconName="save"
					tooltip={t("chat.header.export")}
					onClick={onExportChat}
				/>
				<HeaderButton
					iconName="more-vertical"
					tooltip={t("chat.header.more")}
					onClick={onShowMenu}
				/>
			</div>
		</div>
	);
}

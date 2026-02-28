import { spawn } from "child_process";
import * as os from "os";
import { Platform } from "obsidian";
import { wrapCommandForWsl } from "./wsl-utils";

/**
 * Detection configuration for a single agent.
 */
export interface DetectionConfig {
	/** Agent ID (e.g., "claude-code-acp") */
	agentId: string;
	/** Command name to detect (e.g., "claude-agent-acp") */
	commandName: string;
}

/**
 * Result of agent detection.
 */
export interface AgentDetectionResult {
	agentId: string;
	commandName: string;
	path: string | null;
}

/** Detection timeout in milliseconds */
const DETECTION_TIMEOUT_MS = 5000;

/**
 * Common user bin directories to add to PATH for detection.
 * These are typical locations where CLI tools are installed.
 */
const USER_BIN_PATHS = [
	"~/.opencode/bin",
	"~/.local/bin",
	"~/.npm-global/bin",
	"~/.cargo/bin",
	"~/.bun/bin",
	"~/.yarn/bin",
	"/usr/local/bin",
];

/**
 * Build an expanded PATH string for command detection.
 * Adds common user bin directories to the existing PATH.
 */
function buildExpandedPath(): string {
	const homeDir = os.homedir();
	const currentPath = process.env.PATH ?? "";
	const expandedPaths = USER_BIN_PATHS.map((p) =>
		p.startsWith("~") ? p.replace("~", homeDir) : p,
	);
	return [...expandedPaths, currentPath].join(":");
}

/**
 * Built-in agent detection configurations.
 * Maps agent IDs to their command names for detection.
 */
export const BUILTIN_AGENT_CONFIGS: DetectionConfig[] = [
	{ agentId: "claude-code-acp", commandName: "claude-agent-acp" },
	{ agentId: "codex-acp", commandName: "codex-acp" },
	{ agentId: "gemini-cli", commandName: "gemini" },
	{ agentId: "opencode", commandName: "opencode" },
];

/**
 * Detect the path of a command on the system.
 *
 * - macOS/Linux: Uses `which <command>` via /bin/sh
 * - Windows: Uses `cmd.exe /c where <command>`
 * - WSL: Uses WSL to execute `which <command>`
 *
 * @param commandName - The command name to detect (e.g., "claude-agent-acp")
 * @param options - Detection options
 * @returns The absolute path to the command, or null if not found
 */
export async function detectCommand(
	commandName: string,
	options?: { wslMode?: boolean; wslDistribution?: string },
): Promise<string | null> {
	const { wslMode = false, wslDistribution } = options ?? {};

	try {
		if (Platform.isWin && !wslMode) {
			// Windows native: use `where` command
			return await detectCommandWindows(commandName);
		} else if (Platform.isWin && wslMode) {
			// WSL mode: use `which` inside WSL
			return await detectCommandWsl(
				commandName,
				"/",
				wslDistribution,
			);
		} else {
			// macOS/Linux: use `which` command
			return await detectCommandUnix(commandName);
		}
	} catch (error) {
		console.warn(
			`[AgentDetector] Failed to detect command "${commandName}":`,
			error,
		);
		return null;
	}
}

/**
 * Detect a command using Windows `where` command.
 */
async function detectCommandWindows(commandName: string): Promise<string | null> {
	return new Promise((resolve) => {
		const process = spawn("cmd.exe", ["/c", `where ${commandName}`], {
			windowsHide: true,
		});

		let stdout = "";
		let stderr = "";
		let settled = false;

		const timeout = setTimeout(() => {
			if (!settled) {
				settled = true;
				process.kill();
				resolve(null);
			}
		}, DETECTION_TIMEOUT_MS);

		process.stdout.on("data", (data) => {
			stdout += data.toString();
		});

		process.stderr.on("data", (data) => {
			stderr += data.toString();
		});

		process.on("close", (code) => {
			if (!settled) {
				clearTimeout(timeout);
				settled = true;
				if (code === 0 && stdout.trim().length > 0) {
					// `where` may return multiple paths (one per line), take the first
					const path = stdout.trim().split(/\r?\n/)[0].trim();
					resolve(path || null);
				} else {
					resolve(null);
				}
			}
		});

		process.on("error", () => {
			if (!settled) {
				clearTimeout(timeout);
				settled = true;
				resolve(null);
			}
		});
	});
}

/**
 * Detect a command using Unix `which` command.
 * Uses /bin/sh with expanded PATH (no login shell needed).
 */
async function detectCommandUnix(commandName: string): Promise<string | null> {
	return new Promise((resolve) => {
		const expandedPath = buildExpandedPath();
		const childProcess = spawn("/bin/sh", ["-c", `which ${commandName}`], {
			windowsHide: true,
			env: { ...process.env, PATH: expandedPath },
		});

		let stdout = "";
		let settled = false;

		const timeout = setTimeout(() => {
			if (!settled) {
				settled = true;
				childProcess.kill();
				resolve(null);
			}
		}, DETECTION_TIMEOUT_MS);

		childProcess.stdout.on("data", (data) => {
			stdout += data.toString();
		});

		childProcess.on("close", (code) => {
			if (!settled) {
				clearTimeout(timeout);
				settled = true;
				if (code === 0 && stdout.trim().length > 0) {
					resolve(stdout.trim());
				} else {
					resolve(null);
				}
			}
		});

		childProcess.on("error", () => {
			if (!settled) {
				clearTimeout(timeout);
				settled = true;
				resolve(null);
			}
		});
	});
}

/**
 * Detect a command inside WSL using `which`.
 */
async function detectCommandWsl(
	commandName: string,
	cwd: string,
	distribution?: string,
): Promise<string | null> {
	return new Promise((resolve) => {
		try {
			const { command, args } = wrapCommandForWsl(
				"which",
				[commandName],
				cwd,
				distribution,
			);

			const process = spawn(command, args, {
				windowsHide: true,
			});

			let stdout = "";
			let settled = false;

			const timeout = setTimeout(() => {
				if (!settled) {
					settled = true;
					process.kill();
					resolve(null);
				}
			}, DETECTION_TIMEOUT_MS);

			process.stdout.on("data", (data) => {
				stdout += data.toString();
			});

			process.on("close", (code) => {
				if (!settled) {
					clearTimeout(timeout);
					settled = true;
					if (code === 0 && stdout.trim().length > 0) {
						resolve(stdout.trim());
					} else {
						resolve(null);
					}
				}
			});

			process.on("error", () => {
				if (!settled) {
					clearTimeout(timeout);
					settled = true;
					resolve(null);
				}
			});
		} catch {
			resolve(null);
		}
	});
}

/**
 * Detect multiple agents in parallel.
 *
 * @param configs - Detection configurations (defaults to BUILTIN_AGENT_CONFIGS)
 * @param options - Detection options
 * @returns Array of detection results
 */
export async function detectAgents(
	configs?: DetectionConfig[],
	options?: { wslMode?: boolean; wslDistribution?: string },
): Promise<AgentDetectionResult[]> {
	const detectionConfigs = configs ?? BUILTIN_AGENT_CONFIGS;

	const results = await Promise.all(
		detectionConfigs.map(async (config) => {
			const path = await detectCommand(config.commandName, options);
			return {
				agentId: config.agentId,
				commandName: config.commandName,
				path,
			};
		}),
	);

	return results;
}

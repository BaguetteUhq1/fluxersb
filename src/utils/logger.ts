const COLORS = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
	white: "\x1b[37m",
	gray: "\x1b[90m",
};

export class Logger {
	private module: string;

	constructor(module: string) {
		this.module = module;
	}

	private format(message: string, color: string): string {
		const timestamp = new Date().toLocaleTimeString();
		return `${COLORS.gray}[${timestamp}]${COLORS.reset} ${color}${COLORS.bright}[${this.module}]${COLORS.reset} ${message}`;
	}

	public info(message: string): void {
		console.log(this.format(message, COLORS.blue));
	}

	public success(message: string): void {
		console.log(this.format(message, COLORS.green));
	}

	public warn(message: string): void {
		console.log(this.format(message, COLORS.yellow));
	}

	public error(message: string, error?: unknown): void {
		console.error(this.format(message, COLORS.red));
		if (error) {
			if (error instanceof Error) {
				console.error(`${COLORS.red}${error.stack}${COLORS.reset}`);
			} else {
				console.error(`${COLORS.red}${String(error)}${COLORS.reset}`);
			}
		}
	}

	public debug(message: string): void {
		console.log(this.format(message, COLORS.magenta));
	}
}

export const createLogger = (module: string) => new Logger(module);

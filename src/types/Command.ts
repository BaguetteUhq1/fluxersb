import type FluxerClient from "../FluxerClient";

export interface Command {
	name: string;
	description: string;
	usage: string;
	run: (
		client: FluxerClient,
		message: any,
		args: string[],
	) => Promise<void> | void;
}

import * as cliProgress from "cli-progress";
import * as colors from "ansi-colors";

function formatter(options: cliProgress.Options, params: cliProgress.Params, payload: any) {
	const bar =
		options.barCompleteString.substring(0, Math.round(params.progress * options.barsize)) +
		options.barIncompleteString.substring(Math.round(params.progress * options.barsize), options.barsize);

	var percentage = Math.round((params.value / params.total) * 100).toString();

	if (percentage == "NaN"){
		percentage = "100"
	}

	if (params.value >= params.total) {
		return `|${payload.colorFinish(bar)}| ${percentage}% || ${params.value}/${params.total} ${payload.type} || Speed: ${params.eta}/s`;
	} else {
		return `|${payload.colorProgress(bar)}| ${percentage}% || ${params.value}/${params.total} ${payload.type} || Speed: ${params.eta}/s`;
	}
}

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

export function createBar(max_count: number, name: string, type_name:string, color_progress = colors.yellow, color_finish = colors.green) {
	console.log(name + ":");
	const bar = new cliProgress.SingleBar({
		format: formatter,
		barCompleteChar: "\u2588",
		barIncompleteChar: "\u2591",
		hideCursor: true,
	});
	bar.start(max_count, 0, {
		type:type_name,
		colorProgress:color_progress,
		colorFinish:color_finish
	});

	return bar;
}

<script lang="ts">
	// import newUniqueId from 'locally-unique-id-generator';

	export let value = 0;
	export let min_value = 0;
	export let max_value: number;
	export let min_ok: number | undefined;
	export let max_ok: number | undefined;
	export let name: string;
	export let unit: string;
	export let color = 'blue';

	// const id = newUniqueId();

	const RANGE = max_value - min_value;
	let percent = 0;
	const min_ok_percent = min_ok != undefined ? computePercent(min_ok) : undefined;
	const max_ok_percent =
		max_ok != undefined ? Math.round(100 * (max_value - max_ok)) / RANGE : undefined;

	$: {
		percent = computePercent(value);
	}

	function computePercent(val: number) {
		val = Math.min(val, max_value);
		val = Math.max(val, min_value);
		return Math.round((100 * (val - min_value)) / RANGE);
	}
</script>

<div class="relative">
	<div class="flex">
		<div class="mb-1 text-base font-medium dark:text-white">{name}</div>
		<div class="mb-1 text-base text-gray-400 dark:text-gray-100 absolute right-0">
			{value}{unit}
		</div>
	</div>
	<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
		<div class="bg-{color}-600 h-2.5 rounded-full" style="width: {percent}%" />
		<div
			class="bg-gray-50 h-2.5 absolute top-0 z-10 rounded-l-full opacity-50"
			style="width: {min_ok_percent}%"
		/>
		<div
			class="bg-gray-50 h-2.5 absolute top-0 right-0 z-10 rounded-r-full opacity-50"
			style="width: {max_ok_percent}%"
		/>
	</div>
	<div class="flex relative text-sm">
		<div>{min_value}</div>
		<div class="absolute -translate-x-1/2" style="left: {min_ok_percent}%">{min_ok}</div>
		{#if max_ok_percent != undefined}
			<div class="absolute translate-x-1/2" style="right: {max_ok_percent}%">{max_ok}</div>
		{/if}
		<div class="absolute right-0">{max_value}</div>
	</div>
</div>

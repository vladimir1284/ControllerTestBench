<script lang="ts">
	import type { PageData } from './$houdini';

	import Antenna from '../components/antenna.svelte';

	import HorizontalBar from '../components/HorizontalBar.svelte';

	let value = 10.6;
	let unit = 'V';
	let name = 'Analog In';
	let max_value = 15;
	let min_value = 7.5;
	const min_ok = 10;
	const max_ok = 14;

	let width;

	export let data: PageData;

	$: ({ Version } = data);

	import { io } from 'socket.io-client';

	const socket = io();

	socket.on('eventFromServer', (message) => {
		console.log(message);
	});
</script>

<div>✅ #GraphQL is working 👌</div>

<div class="p-8 grid md:grid-cols-2 gap-8">
	<HorizontalBar color="red" {value} {unit} {name} {max_value} {min_ok} {max_ok} {min_value} />
	<div bind:clientWidth={width}>
		<Antenna {width} />
	</div>
</div>

<div>
	✅ Check your own 👉 <a
		href="/api/graphiql?query=%23+Welcome+to+KitQL%0A%0Aquery+Version+%7B%0A++version+%7B%0A++++releaseCreatedAtUtc%0A++%7D%0A%7D"
		target="_blank"
		rel="external">Graph<i>i</i>QL</a
	> <i>v2</i>!
</div>

<div>
	✅ Your first query 👇
	<pre>{$Version.data?.version.releaseCreatedAtUtc.toISOString()}</pre>
	<pre>{$Version.data?.version.releaseCreatedAtUtc.toLocaleDateString() +
			' ' +
			$Version.data?.version.releaseCreatedAtUtc.toLocaleTimeString()}</pre>
</div>

<br />

<style>
	div {
		font-size: medium;
		margin-left: 0.5rem;
		margin-top: 1rem;
	}
	pre {
		margin-left: 0.5rem;
		padding: 10px 10px 10px 10px;
		background-color: black;
	}
</style>

<script lang="ts">
	import type { SortDirection } from './projectSort';
	let { label, direction, onclick }: {
		label: string;
		direction: SortDirection | null;
		onclick: () => void;
	} = $props();
</script>

<button
	type="button"
	{onclick}
	aria-label={`${label} : trier par ordre ${direction === 'ascending' ? 'décroissant' : 'croissant'}`}
>
	{label}<span class:inactive={direction === null} aria-hidden="true">{direction === 'descending' ? '↓' : '↑'}</span>
</button>

<style>
	button {
		text-align: left;
		text-transform: inherit;
	}
	span {
		display: inline-block;
		margin-left: 0.25em;
		font-size: 0.8em;
	}
	.inactive {
		opacity: 0.4;
	}
</style>

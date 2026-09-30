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
	{label}<img
		class:inactive={direction === null}
		src={direction === 'descending' ? '/assets/sort-arrow-down.svg' : '/assets/sort-arrow-up.svg'}
		alt=""
		aria-hidden="true"
	/>
</button>

<style>
	button {
		text-align: left;
		text-transform: inherit;
	}
	img {
		display: inline-block;
		margin-left: 0.25em;
		vertical-align: baseline;
	}
	.inactive {
		opacity: 0.4;
	}
</style>

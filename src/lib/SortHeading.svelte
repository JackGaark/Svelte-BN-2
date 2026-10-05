<script lang="ts">
	import type { SortDirection } from './projectSort';
	let { label, direction, onclick, compact = false, tabletLandscape = false }: {
		label: string;
		compact?: boolean;
		tabletLandscape?: boolean;
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
		class:standard-arrow={tabletLandscape}
		class:inactive={direction === null}
		src={compact
			? (direction === 'descending' ? '/assets/index-sort-down.svg' : '/assets/index-sort-up.svg')
			: (direction === 'descending' ? '/assets/sort-arrow-down.svg' : '/assets/sort-arrow-up.svg')}
		alt=""
		aria-hidden="true"
	/>
	{#if tabletLandscape}
		<img
			class="landscape-arrow"
			class:inactive={direction === null}
			class:down-arrow={direction === 'descending' || (direction === null && label === 'Projet')}
			src={direction === 'ascending' ? '/assets/index-sort-up.svg'
				: direction === 'descending' ? '/assets/tablet-index-sort-down.svg'
				: label === 'Projet' ? '/assets/tablet-index-sort-down.svg'
				: label === 'Type' ? '/assets/tablet-index-type-up.svg' : '/assets/tablet-index-sort-up.svg'}
			alt=""
			aria-hidden="true"
		/>
	{/if}
</button>

<style>
	.landscape-arrow { display: none; }
	button {
		text-align: left;
		text-transform: inherit;
	}
	img {
		filter: brightness(0);
		display: inline-block;
		margin-left: 0.25em;
		vertical-align: baseline;
	}
	.inactive {
		opacity: 0.5;
	}
	@media (min-width: 600px) and (min-height: 600px) and (orientation: landscape) {
		.standard-arrow { display: none; }
		.landscape-arrow { display: inline-block; }
		.landscape-arrow.inactive { opacity: 1; filter: none; }
		.landscape-arrow.inactive.down-arrow { opacity: 0.5; }
	}
</style>

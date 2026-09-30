<script lang="ts">
	import Header from '$lib/Header.svelte';
	import OverviewFooter from '$lib/OverviewFooter.svelte';
	import tiles from '$lib/tiles.json';
	import { projects } from '$lib/data';
	let hoveredProject = $state<string | null>(null);
	let focusedProject = $state<string | null>(null);
	const activeProject = $derived(hoveredProject ?? focusedProject);
	const groupSize = 5;
	const overviewTiles = tiles.map((tile, index) => {
		const groupIndex = Math.floor(index / groupSize);
		return {
			...tile,
			project: projects[groupIndex],
			number: (index % groupSize) + 1,
			total: Math.min(groupSize, tiles.length - groupIndex * groupSize),
			projectNumber: String(groupIndex + 1).padStart(2, '0')
		};
	});
</script>

<svelte:head><title>Survol — Bureau Normal</title></svelte:head>
<Header />
<main
	id="main"
	class="overview design-grid"
	data-node-id="770:10208"
	aria-label="Survol des projets"
>
	{#each overviewTiles as tile, i}
		<a
			class="project-tile"
			class:project-highlighted={activeProject === tile.project.slug}
			style:--highlight-delay={`${(tile.number - 1) * 85}ms`}
			data-project={tile.project.slug}
			href={`/projet/${tile.project.slug}`}
			onpointerenter={() => (hoveredProject = tile.project.slug)}
			onpointerleave={() => (hoveredProject = null)}
			onfocus={() => {
				hoveredProject = null;
				focusedProject = tile.project.slug;
			}}
			onblur={() => (focusedProject = null)}
			onpointerdown={() => (hoveredProject = tile.project.slug)}
			onclick={() => (focusedProject = tile.project.slug)}
			aria-label={`Projet ${tile.projectNumber} — ${tile.project.title}, image ${tile.number} sur ${tile.total} — ouvrir la première diapositive`}
			data-node-id={tile.node}
		>
			<img
				class:flipped={tile.flip}
				class:crop-high={tile.asset === 'imgOverviewThumbnail2'}
				class:crop-mid={tile.asset === 'imgOverviewThumbnail6'}
				src={`/assets/2973-295-${tile.asset}.png`}
				alt=""
				loading={i < 16 ? 'eager' : 'lazy'}
			/>
			<span class="tile-project" aria-hidden="true">
				<span>{tile.project.title}</span>
				<span class="tile-number"
					>{String(tile.number).padStart(2, '0')}/{String(tile.total).padStart(2, '0')}</span
				>
			</span>
		</a>
	{/each}
</main>
<OverviewFooter />

<style>
	@media (min-width: 600px) {
		.overview {
			--columns: 8;
			--gutter: 8px;
			--margin: 20px;
		}
	}
	@media (min-width: 1024px) {
		.overview {
			min-height: calc(134.474826vw - 64px);
		}
	}
</style>

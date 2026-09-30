<script lang="ts">
	import Header from '$lib/Header.svelte';
	import OverviewFooter from '$lib/OverviewFooter.svelte';
	import tiles from '$lib/tiles.json';
	import { projects } from '$lib/data';
	let selectedProject = $state<string | null>(null);
	let hoveredProject = $state<string | null>(null);
	const activeProject = $derived(hoveredProject ?? selectedProject);
	function previewProject(event: PointerEvent, slug: string) {
		if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
			hoveredProject = slug;
		}
	}
	function revealProject(event: MouseEvent, slug: string) {
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		if (activeProject === slug) return;
		event.preventDefault();
		selectedProject = slug;
	}
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
<svelte:window onkeydown={(event) => {
	if (event.key === 'Escape') {
		selectedProject = null;
		hoveredProject = null;
	}
}} />
<Header />
<div class="overview-container">
	<main id="main" class="overview" data-node-id="770:10208" aria-label="Survol des projets">
		{#each overviewTiles as tile, i}
			<a
				class="project-tile"
				class:project-highlighted={activeProject === tile.project.slug}
				style:--highlight-delay={`${(tile.number - 1) * 85}ms`}
				data-project={tile.project.slug}
				href={`/projet/${tile.project.slug}`}
				onpointerenter={(event) => previewProject(event, tile.project.slug)}
				onpointerleave={() => (hoveredProject = null)}
				onclick={(event) => revealProject(event, tile.project.slug)}
				aria-label={`Projet ${tile.projectNumber} — ${tile.project.title}, image ${tile.number} sur ${tile.total} — ${activeProject === tile.project.slug ? 'ouvrir la première diapositive' : 'afficher le nom du projet'}`}
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
</div>
<OverviewFooter />

<style>
	.overview-container {
		container: project-grid / inline-size;
	}
	.overview {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 3px;
		margin-inline: var(--margin);
	}
	/* Both dimensions must clear the phone range, including rotated phones. */
	@media (min-width: 600px) and (min-height: 600px) {
		.overview {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
	}
	@media (min-width: 600px) and (min-height: 600px) and (orientation: landscape),
		(min-width: 1200px) {
		.overview {
			grid-template-columns: repeat(8, minmax(0, 1fr));
		}
	}
	@media (min-width: 1024px) {
		.overview {
			gap: 8px;
			min-height: calc(134.474826vw - 64px);
		}
	}
</style>

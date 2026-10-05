<script lang="ts">
	import Header from '$lib/Header.svelte';
	import OverviewFooter from '$lib/OverviewFooter.svelte';
	import TabletOverviewFooter from '$lib/TabletOverviewFooter.svelte';
	import { overviewTiles } from '$lib/projectGallery';
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
		if (window.matchMedia('(min-width: 1200px) and (hover: hover) and (pointer: fine)').matches) return;
		if (activeProject === slug) return;
		event.preventDefault();
		selectedProject = slug;
	}
</script>

<svelte:head><title>Survol — Bureau Normal</title></svelte:head>
<svelte:window onkeydown={(event) => {
	if (event.key === 'Escape') {
		selectedProject = null;
		hoveredProject = null;
	}
}} />
<div class="survol-shell">
<Header />
<div class="overview-container">
	<main id="main" class="overview" data-node-id="770:10208" aria-label="Survol des projets">
		{#each overviewTiles as tile, i}
			<a
				class="project-tile"
				class:project-highlighted={activeProject === tile.project.slug}
				style:--highlight-delay={`${(tile.number - 1) * 85}ms`}
				data-project={tile.project.slug}
				href={`/projet/${tile.project.slug}?slide=${tile.number}`}
				onpointerenter={(event) => previewProject(event, tile.project.slug)}
				onpointerleave={() => (hoveredProject = null)}
				onfocus={() => (hoveredProject = tile.project.slug)}
				onblur={() => (hoveredProject = null)}
				onclick={(event) => revealProject(event, tile.project.slug)}
				aria-label={`Projet ${tile.projectNumber} — ${tile.project.title}, ouvrir l’image ${tile.number} sur ${tile.total}`}
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
<div class="standard-footer"><OverviewFooter /></div>
<div class="tablet-footer"><TabletOverviewFooter /></div>
</div>

<style>
	.tablet-footer { display: none; }
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
	@media (min-width: 1200px) {
		.project-tile .tile-project {
			align-items: flex-start;
			justify-content: space-between;
			padding: 10px 8px 8px;
			color: #333;
			font-size: 14px;
			font-weight: 400;
			line-height: normal;
			text-align: left;
		}
		.tile-project > span {
			text-box-trim: trim-both;
			text-box-edge: cap alphabetic;
		}
	}
	@media (min-width: 600px) and (max-width: 1199px) and (min-height: 600px) {
		.standard-footer { display: none; }
		.tablet-footer { display: block; }
		.survol-shell { --margin: 20px; }
		.survol-shell :global(.site-header) { margin-inline: 20px; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 4px; }
		.survol-shell :global(.site-header .nav-link) { font-size: 14px; line-height: normal; margin-top: 16px; translate: none; color: #333; text-box-trim: trim-both; text-box-edge: cap alphabetic; }
		.survol-shell :global(.nav-0) { grid-column: 4; }
		.survol-shell :global(.nav-1) { grid-column: 5; }
		.survol-shell :global(.nav-2) { grid-column: 6; }
		.overview { gap: 6px; margin-inline: 20px; padding-top: 32px; padding-bottom: 0; min-height: calc(1067 / 768 * 100vw - 64px); align-content: start; }
		@media (orientation: landscape) {
			.survol-shell :global(.site-header) { grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 8px; }
			.survol-shell :global(.nav-0) { grid-column: 6; }
			.survol-shell :global(.nav-1) { grid-column: 7; }
			.survol-shell :global(.nav-2) { grid-column: 8; }
			.overview { min-height: calc(1138 / 1024 * 100vw - 64px); }
		}
	}
</style>

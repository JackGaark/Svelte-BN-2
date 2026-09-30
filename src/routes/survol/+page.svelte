<script lang="ts">
	import Header from '$lib/Header.svelte';
	import OverviewFooter from '$lib/OverviewFooter.svelte';
	import tiles from '$lib/tiles.json';
	import { projects, studioAddress } from '$lib/data';
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
<div class="overview-container">
	<main id="main" class="overview" data-node-id="770:10208" aria-label="Survol des projets">
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
				{#if i === 0}
					<span class="studio-address"
						><span>{studioAddress.street}<br />{studioAddress.city}</span></span
					>
				{:else}
					<span class="tile-project" aria-hidden="true">
						<span>{tile.project.title}</span>
						<span class="tile-number"
							>{String(tile.number).padStart(2, '0')}/{String(tile.total).padStart(2, '0')}</span
						>
					</span>
				{/if}
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
		margin-inline: 3px;
	}
	.studio-address {
		position: absolute;
		inset: 0;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 6px;
		text-align: center;
		font-size: clamp(10px, 1.1cqw, 17px);
		line-height: 1.15;
		color: var(--paper);
		text-shadow: 0 1px 3px #222;
		pointer-events: none;
	}
	@container project-grid (min-width: 1023px) {
		.overview {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
	}
	@container project-grid (min-width: 1200px) {
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

<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/Header.svelte';
	import OverviewFooter from '$lib/OverviewFooter.svelte';
	import { projects } from '$lib/data';
	const previewFormats = [
		{ width: 520, height: 370 },
		{ width: 368, height: 520 },
		{ width: 520, height: 520 }
	];
	let active = $state(0);
	let rail: HTMLDivElement;
	let list: HTMLDivElement;
	let preview: HTMLImageElement;
	let previewTop = $state(0);
	let previewHeight = $state(0);
	let previewWidth = $state(0);

	function positionPreview() {
		if (!rail || !list || !preview) return;
		const row = list.querySelectorAll<HTMLElement>('.list-row')[active];
		if (!row) return;
		const railRect = rail.getBoundingClientRect();
		const rowRect = row.getBoundingClientRect();
		const format = previewFormats[active % previewFormats.length];
		const scale = Math.min(
			rail.clientWidth / 520,
			window.matchMedia('(max-width: 599px)').matches ? 180 / 520 : Infinity
		);
		previewWidth = format.width * scale;
		previewHeight = format.height * scale;
		const lowerEdge = Math.min(list.getBoundingClientRect().bottom, window.innerHeight - 20);
		const below = rowRect.top + 3;
		const top = below + previewHeight <= lowerEdge ? below : rowRect.top + 20 - previewHeight;
		previewTop = Math.max(0, top - railRect.top);
	}
	function selectProject(index: number) {
		active = index;
		positionPreview();
	}
	onMount(() => {
		let frame = 0;
		const schedule = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(positionPreview);
		};
		const observer = new ResizeObserver(schedule);
		observer.observe(rail);
		observer.observe(list);
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		schedule();
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	});
</script>

<svelte:head><title>Index — Bureau Normal</title></svelte:head>
<Header />
<main id="main" class="index-page design-grid" data-node-id="2927:2132">
	<div class="index-preview-rail" bind:this={rail}>
		<div
			class="index-preview"
			style:--preview-top={`${previewTop}px`}
			style:--preview-height={`${previewHeight}px`}
			style:--preview-width={`${previewWidth}px`}
		>
			<img
				bind:this={preview}
				onload={positionPreview}
				src={projects[active].image}
				alt={projects[active].title}
			/>
		</div>
	</div>
	<div bind:this={list} class="project-list" role="table" aria-label="Index des projets">
		<div class="list-heading list-grid" role="row">
			<span role="columnheader">Projet</span><span role="columnheader">Type</span><span
				role="columnheader">Status</span
			><span role="columnheader">Dates</span>
		</div>
		{#each projects as project, i}
			<a
				class="list-row list-grid"
				class:selected={active === i}
				href={`/projet/${project.slug}`}
				onmouseenter={() => selectProject(i)}
				onfocus={() => selectProject(i)}
				role="row"
			>
				<span role="cell">{project.title}</span><span role="cell">{project.type}</span><span
					role="cell">{project.status}</span
				><span role="cell" class="dates">{project.start}<span>à</span>{project.end}</span>
			</a>
		{/each}
	</div>
</main>
<OverviewFooter />

<style>
	.index-preview-rail {
		grid-column: 1 / span 3;
		grid-row: 1;
		position: relative;
		min-width: 0;
	}
	.index-preview {
		position: absolute;
		top: 0;
		right: 0;
		margin: 0;
		width: var(--preview-width);
		height: var(--preview-height);
		transform: translateY(var(--preview-top));
		transition: transform 180ms ease-out;
		pointer-events: none;
	}
	.index-preview img {
		width: 100%;
		height: 100%;
		aspect-ratio: auto;
		object-fit: cover;
	}
	.list-row {
		position: relative;
	}
	.list-row.selected {
		border-bottom-color: transparent;
	}
	.list-row.selected::after {
		content: '';
		position: absolute;
		top: 20px;
		left: 0;
		right: 0;
		border-bottom: 1px solid #8e8c8a;
	}
	@media (max-width: 1023px) {
		.index-preview-rail {
			grid-column: 1 / span 2;
		}
	}
	@media (max-width: 599px) {
		.index-preview-rail {
			width: 100%;
			height: 180px;
			position: sticky;
			top: 0;
			z-index: 2;
			background: var(--paper);
		}
		.index-preview {
			position: static;
			transform: none;
		}
		.list-row.selected::after {
			top: auto;
			bottom: 0;
		}
	}
</style>

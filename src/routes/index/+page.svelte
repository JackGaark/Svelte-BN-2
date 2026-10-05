<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Header from '$lib/Header.svelte';
	import OverviewFooter from '$lib/OverviewFooter.svelte';
	import TabletOverviewFooter from '$lib/TabletOverviewFooter.svelte';
	import IndexAccordion from '$lib/IndexAccordion.svelte';
	import { projects, indexPreviewFormats } from '$lib/data';
	import SortHeading from '$lib/SortHeading.svelte';
	import { sortColumns, sortProjects, type SortKey, type SortDirection } from '$lib/projectSort';
	let sortKey = $state<SortKey | null>(null);
	let sortDirection = $state<SortDirection>('descending');
	let sortedProjects = $derived(sortProjects(projects, sortKey, sortDirection));
	async function changeSort(key: SortKey) {
		const selectedSlug = sortedProjects[active].slug;
		sortDirection = sortKey === key && sortDirection === 'ascending' ? 'descending' : 'ascending';
		sortKey = key;
		active = sortedProjects.findIndex((project) => project.slug === selectedSlug);
		await tick();
		positionPreview();
	}
	let active = $state(0);
	let rail: HTMLDivElement;
	let list: HTMLDivElement;
	let preview: HTMLImageElement;
	let previewTop = $state(0);
	let selectionTop = $state(0);
	let selectionLeft = $state(0);
	let selectionScale = $state(1);
	let previewHeight = $state(0);
	let previewWidth = $state(0);

	function positionPreview() {
		if (!rail || !list || !preview) return;
		const rows = list.querySelectorAll<HTMLElement>('.list-row');
		const row = rows[active];
		const firstRow = rows[0];
		if (!row || !firstRow) return;
		const railRect = rail.getBoundingClientRect();
		const rowRect = row.getBoundingClientRect();
		const format = indexPreviewFormats[sortedProjects[active].previewFormat];
		const scale = Math.min(
			rail.clientWidth / 520,
			window.matchMedia('(max-width: 599px)').matches ? 180 / 520 : Infinity
		);
		previewWidth = format.width * scale;
		previewHeight = format.height * scale;
		const lowerEdge = Math.min(list.getBoundingClientRect().bottom, window.innerHeight - 20);
		const firstProjectTop = firstRow.getBoundingClientRect().top + 2;
		const topAligned = rowRect.top + 2;
		const textBottom = Math.max(...Array.from(row.children, (cell) => cell.getBoundingClientRect().bottom));
		const bottomAligned = textBottom - 2 - previewHeight;
		// Keep the rule and image on the same edge of the selected listing.
		const alignBottom = topAligned + previewHeight > lowerEdge && bottomAligned >= firstProjectTop;
		previewTop = (alignBottom ? bottomAligned : topAligned) - railRect.top;
		selectionTop = (alignBottom ? textBottom + 3 : rowRect.top - 3) - railRect.top;
		selectionLeft = sortedProjects[active].previewFormat === 'portrait'
			? railRect.right - previewWidth - (rail.parentElement?.getBoundingClientRect().left ?? railRect.left)
			: 0;
		selectionScale = (rail.parentElement?.clientWidth ?? 1400) / 1400;
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
<div class="index-shell">
	<Header darkLogoSrc="/assets/index-logo-nav.svg" />
	<main id="main">
		<div class="index-page design-grid" data-node-id="3151:4714">
			<div class="selection-rule" aria-hidden="true" style:--selection-top={`${selectionTop}px`} style:--selection-left={`${selectionLeft}px`} style:--selection-scale={selectionScale}>
				<img src="/assets/index-selection-line.svg" alt="" />
			</div>
			<div class="index-preview-rail" bind:this={rail}>
				<div
					class="index-preview"
					data-format={sortedProjects[active].previewFormat}
					style:--preview-top={`${previewTop}px`}
					style:--preview-height={`${previewHeight}px`}
					style:--preview-width={`${previewWidth}px`}
				>
					<img
						bind:this={preview}
						onload={positionPreview}
						src={sortedProjects[active].image}
						alt={sortedProjects[active].title}
					/>
				</div>
			</div>
			<div bind:this={list} class="project-list" role="table" aria-label="Index des projets">
				<div class="list-heading list-grid" role="row">
					{#each sortColumns as column}
						<span role="columnheader" aria-sort={sortKey === column.key ? sortDirection : 'none'}>
							<SortHeading compact label={column.label} direction={sortKey === column.key ? sortDirection : null} onclick={() => changeSort(column.key)} />
						</span>
					{/each}
				</div>
				{#each sortedProjects as project, i (project.slug)}
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
		</div>
		<div class="tablet-view"><IndexAccordion projects={sortedProjects} {sortKey} {sortDirection} onchangeSort={changeSort} /></div>
	</main>
	<div class="standard-index-footer"><OverviewFooter contacts indexDesign /></div>
	<div class="landscape-index-footer"><TabletOverviewFooter indexDesign /></div>
</div>

<style>
	.landscape-index-footer { display: none; }
	.tablet-view {
		display: none;
	}
	@media (min-width: 600px) and (max-width: 1199px) and (min-height: 600px),
		(min-width: 1200px) and (max-width: 1366px) and (min-height: 600px) and (pointer: coarse) {
		.index-shell {
			background: var(--paper);
			color: var(--ink);
			min-height: 100svh;
		}
		.index-page {
			display: none;
		}
		.tablet-view {
			display: block;
		}
		.index-shell :global(.site-header) {
			margin-inline: var(--margin);
			grid-template-columns: repeat(6, minmax(0, 1fr));
			gap: 10px;
			padding-top: 9px;
		}
		.index-shell :global(.nav-link) {
			font-size: 22px;
			line-height: 27px;
			margin-top: 0;
		}
		.index-shell :global(.nav-0) {
			grid-column: 4;
		}
		.index-shell :global(.nav-1) {
			grid-column: 5;
		}
		.index-shell :global(.nav-2) {
			grid-column: 6;
		}
		@media (orientation: landscape) {
			.standard-index-footer { display: none; }
			.landscape-index-footer { display: block; }
			.index-shell :global(.site-header) {
				margin-inline: 20px;
				grid-template-columns: repeat(8, minmax(0, 1fr));
				gap: 8px;
				padding-top: 20px;
			}
			.index-shell :global(.nav-link) {
				font-size: 14px;
				line-height: normal;
				margin-top: 16px;
				translate: none;
				color: #333;
				text-box-trim: trim-both;
				text-box-edge: cap alphabetic;
			}
			.index-shell :global(.nav-link.active) { text-decoration: none; }
			.index-shell :global(.nav-0) {
				grid-column: 6;
			}
			.index-shell :global(.nav-1) {
				grid-column: 7;
			}
			.index-shell :global(.nav-2) {
				grid-column: 8;
			}
		}
	}
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
		pointer-events: none;
	}
	.index-preview img {
		width: 100%;
		height: 100%;
		aspect-ratio: auto;
		object-fit: cover;
	}
	.index-shell {
		--ink: #000;
		color: var(--ink);
	}
	.index-shell :global(.nav-link) { color: var(--ink); }
	.index-page {
		position: relative;
		padding-top: 34px;
		min-height: calc(1592 / 1440 * 100vw - 64px);
	}
	.project-list {
		font-size: 14px;
		color: var(--ink);
	}
	.list-heading {
		height: 44px;
		padding-top: 0;
		line-height: 15px;
		color: inherit;
	}
	.list-heading :global(button) {
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
	}
	.list-row {
		min-height: 27px;
		padding-bottom: 12px;
		border: 0;
		line-height: 15px;
	}
	.list-row.selected { color: inherit; }
	.dates {
		display: grid;
		grid-template-columns: 44px 24px 36px;
		gap: 0;
	}
	.dates > span { width: 12px; text-align: center; }
	.selection-rule {
		clip-path: inset(-1px 0 -1px var(--selection-left));
		position: absolute;
		inset: 34px 0 auto;
		transform: translateY(var(--selection-top));
		pointer-events: none;
		z-index: 1;
	}
	.selection-rule img {
		transform: scaleX(var(--selection-scale));
		transform-origin: left center;
	}
	@media (min-width: 1200px) and (pointer: fine), (min-width: 1367px) {
		.index-shell :global(.nav-link) {
			font-size: 14px;
			line-height: normal;
			margin-top: 16px;
			translate: none;
			text-box-trim: trim-both;
			text-box-edge: cap alphabetic;
		}
		.index-shell :global(.nav-link.active) {
			position: relative;
			text-decoration: none;
		}
		.index-shell :global(.nav-link.active)::after {
			content: '';
			position: absolute;
			left: 0;
			top: 12px;
			width: 29px;
			height: 1px;
			background: url('/assets/index-nav-underline.svg') no-repeat;
		}
	}
	@media (max-width: 1023px) {
		.index-preview-rail {
			grid-column: 1 / span 2;
		}
	}
	@media (max-width: 599px) {
		.index-shell {
			background: var(--paper);
			color: var(--ink);
			min-height: 100svh;
		}
		.index-page {
			display: none;
		}
		.tablet-view {
			display: block;
		}
		.index-shell :global(.site-header) {
			margin-inline: var(--margin);
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 10px;
			padding-top: 23px;
		}
		.index-shell :global(.nav-link) {
			margin-top: 0;
		}
		.index-shell :global(.nav-link.active) {
			text-underline-offset: 3px;
		}
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
	}
	@media (max-width: 1023px) and (max-height: 599px) and (orientation: landscape) {
		.index-shell {
			background: var(--paper);
			color: var(--ink);
			min-height: 100svh;
		}
		.index-page {
			display: none;
		}
		.tablet-view {
			display: block;
		}
		.index-shell :global(.site-header) {
			height: 47px;
			margin-inline: var(--margin);
			padding-top: 23px;
			grid-template-columns: minmax(0, 305fr) 45px 77px 60px minmax(0, 303fr);
			gap: 10px;
		}
		.index-shell :global(.nav-link) {
			margin-top: 0;
		}
		.index-shell :global(.nav-0) { grid-column: 2; }
		.index-shell :global(.nav-1) { grid-column: 3; }
		.index-shell :global(.nav-2) { grid-column: 4; }
		.index-shell :global(.nav-link.active) {
			text-underline-offset: 3px;
		}
	}
</style>

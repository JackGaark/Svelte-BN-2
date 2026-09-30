<script lang="ts">
	import type { projects as projectData } from './data';
	import SortHeading from './SortHeading.svelte';
	import { sortColumns, type SortKey, type SortDirection } from './projectSort';
	let { projects, sortKey, sortDirection, onchangeSort }: {
		projects: typeof projectData;
		sortKey: SortKey | null;
		sortDirection: SortDirection;
		onchangeSort: (key: SortKey) => void;
	} = $props();
	let expanded = $state<string[]>([]);
	const allExpanded = $derived(expanded.length === projects.length);
	function toggle(slug: string) {
		expanded = expanded.includes(slug)
			? expanded.filter((item) => item !== slug)
			: [...expanded, slug];
	}
</script>

<section
	class="tablet-index"
	class:first-expanded={expanded.includes(projects[0].slug)}
	aria-label="Index des projets"
>
	<button
		class="expand-all"
		aria-expanded={allExpanded}
		onclick={() => (expanded = allExpanded ? [] : projects.map((project) => project.slug))}
	>
		{allExpanded ? 'Collapse All' : 'Expand All'}<span aria-hidden="true"
			>{allExpanded ? '⌃' : '⌄'}</span
		>
	</button>
	<div class="columns headings">
		{#each sortColumns as column}
			<span class:project-status={column.key === 'status'}>
				<SortHeading label={column.label} direction={sortKey === column.key ? sortDirection : null} onclick={() => onchangeSort(column.key)} />
			</span>
		{/each}
	</div>
	{#each projects as project (project.slug)}
		{@const open = expanded.includes(project.slug)}
		<article class:expanded={open}>
			<div id={`preview-${project.slug}`} class="project-image" hidden={!open}>
				<a href={`/projet/${project.slug}`} aria-label={`Ouvrir ${project.title} — première image`}>
					<img src={project.image} alt={project.title} loading="lazy" />
				</a>
			</div>
			<button
				class="columns project-toggle"
				aria-expanded={open}
				aria-controls={`preview-${project.slug}`}
				onclick={() => toggle(project.slug)}
			>
				<span>{project.title}</span><span>{project.type}</span><span class="project-status"
					>{project.status}</span
				><span class="project-dates">{project.start} <span>à</span> {project.end}</span>
			</button>
			{#if open}
				<div class="mobile-divider" aria-hidden="true"></div>
			{/if}
		</article>
	{/each}
</section>

<style>
	.mobile-divider {
		display: none;
	}
	.project-status {
		display: none;
	}

	.tablet-index {
		font-family: Inter, Arial, sans-serif;
		font-stretch: normal;
		font-size: 18px;
		line-height: 22px;
		min-height: calc(100svh - 64px);
		padding: 12px 38px 200px;
	}
	.expand-all {
		display: flex;
		align-items: center;
		gap: 28px;
		min-height: 32px;
		margin-bottom: 21px;
		text-align: left;
	}
	.expand-all span {
		font-size: 24px;
	}
	.columns {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 10px;
		text-align: left;
		width: 100%;
	}
	.headings {
		font-weight: 700;
		margin-bottom: 12px;
	}
	.first-expanded .headings {
		margin-bottom: 27px;
	}
	.project-toggle {
		min-height: 28px;
		padding: 3px 0;
		align-items: start;
	}
	.project-toggle > span {
		min-width: 0;
		overflow-wrap: anywhere;
	}
	.project-dates {
		display: flex;
		gap: 12px;
	}
	.project-image[hidden] {
		display: none;
	}
	.project-image img {
		display: block;
		width: 100%;
		aspect-ratio: 758 / 492.221;
		object-fit: cover;
	}
	.expanded {
		margin-bottom: 10px;
		border-bottom: 2px solid currentColor;
	}
	.expanded .project-toggle {
		padding: 10px 0;
		min-height: 46px;
	}
	.project-toggle:focus-visible,
	.expand-all:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}
	@media (orientation: landscape) {
		.tablet-index {
			padding-inline: 43px;
		}
		.columns {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
		.project-status {
			display: block;
		}
		.first-expanded .headings {
			margin-bottom: 13px;
		}
		.project-image {
			width: 87.044675%;
		}
		.project-image img {
			aspect-ratio: 964.455 / 626.286;
		}
		.expanded {
			margin-bottom: 14px;
		}
		.expanded .project-toggle {
			min-height: 60px;
			padding-top: 16px;
		}
	}
	@media (max-width: 599px),
		(max-width: 1023px) and (max-height: 599px) and (orientation: landscape) {
		.tablet-index {
			font-size: 10px;
			line-height: 12px;
			padding: 10px 22px 40px;
		}
		.expand-all {
			min-height: 12px;
			gap: 10px;
			margin-bottom: 11px;
			text-transform: uppercase;
		}
		.expand-all span {
			font-size: 12px;
		}
		.columns {
			grid-template-columns: minmax(0, 170fr) minmax(0, 80fr) minmax(0, 79fr);
			gap: 10px;
		}
		.project-status {
			display: none;
		}
		.headings,
		.first-expanded .headings {
			margin-bottom: 4px;
		}
		.project-toggle {
			min-height: 19px;
			padding: 3px 0 4px;
		}
		.project-dates {
			gap: 3px;
			white-space: nowrap;
		}
		.project-image {
			width: 100%;
		}
		.project-image img {
			aspect-ratio: 349.509 / 226.959;
		}
		.expanded {
			margin-bottom: 13px;
			border-bottom: 0;
		}
		.expanded .project-toggle {
			min-height: 20px;
			padding: 4px 0;
		}
		.mobile-divider {
			display: block;
			height: 1px;
			background: var(--ink);
			mask: url('/assets/mobile-index-divider.svg') left center / 100% 1px no-repeat;
		}
	}
	@media (max-width: 1023px) and (max-height: 599px) and (orientation: landscape) {
		.tablet-index {
			width: calc((100% - 22px) * 515 / 830 + 22px);
			min-width: min(100%, 360px);
			min-height: calc(100svh - 47px);
			padding-inline: 11px;
		}
		.columns {
			grid-template-columns: minmax(0, 200fr) minmax(0, 200fr) minmax(0, 95fr);
		}
		.headings,
		.first-expanded .headings {
			margin-bottom: 6px;
		}
		.project-toggle {
			min-height: 14px;
			padding: 0 0 2px;
		}
		.project-dates {
			justify-content: space-between;
		}
		.project-image img {
			aspect-ratio: 515 / 334.424;
		}
		.expanded {
			margin-bottom: 10px;
		}
		.expanded .project-toggle {
			min-height: 25px;
			padding: 11px 0 2px;
		}
		.mobile-divider {
			mask-image: url('/assets/mobile-index-landscape-divider.svg');
		}
	}
</style>

<script lang="ts">
	import { projects } from './data';
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
	<div class="columns headings" aria-hidden="true">
		<span>Projet</span><span>Type</span><span class="project-status">Status</span><span>Dates</span>
	</div>
	{#each projects as project}
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
		</article>
	{/each}
</section>

<style>
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
</style>

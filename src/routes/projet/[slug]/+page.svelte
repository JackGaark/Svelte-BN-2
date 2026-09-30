<script lang="ts">
	import Header from '$lib/Header.svelte';
	let { data } = $props();
	let slide = $state(0);
	let touchStart = 0;
	function advance(direction: number) {
		slide = (slide + direction + 4) % 4;
	}
	function key(event: KeyboardEvent) {
		if (event.altKey || event.ctrlKey || event.metaKey) return;
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			advance(1);
		}
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			advance(-1);
		}
	}
	function touchEnd(event: TouchEvent) {
		const delta = event.changedTouches[0].clientX - touchStart;
		if (Math.abs(delta) > 50) {
			event.preventDefault();
			advance(delta < 0 ? 1 : -1);
		}
	}
	$effect(() => {
		data.project.slug;
		slide = 0;
	});
</script>

<svelte:head><title>{data.project.title} — Bureau Normal</title></svelte:head>
<svelte:window onkeydown={key} />
<div class="project-page" class:full-slide={slide === 3} class:vertical-slide={slide === 2}>
	<Header />
	<main id="main" class="project-view design-grid" aria-label={data.project.title}>
		<div
			class="slide-stage"
			class:text-slide={slide === 1}
			class:portrait-slide={slide === 2}
			class:full={slide === 3}
		>
			{#if slide === 1}<p>
					Project text. Lorem ipsum dolor sit amet, consectetur elit.<br />Ut orci ex, pulvinar sit
					amet rhoncus non, molestie in nulla. Phasellus iaculis quis quam molestie consectetur.
					Etiam nisi metus, vestibulum in placerat ut, condimentum non magna.
				</p>{:else}<div
					class="image-placeholder"
					role="img"
					aria-label={slide === 2
						? 'Image verticale du projet — emplacement prévu'
						: 'Image du projet — emplacement prévu'}
				></div>{/if}
		</div>
		<button
			class="slide-hit previous-hit"
			onclick={() => advance(-1)}
			ontouchstart={(e) => (touchStart = e.touches[0].clientX)}
			ontouchend={touchEnd}
			aria-label="Image précédente"
			><img
				class="slide-cursor previous-cursor"
				src="/assets/2973-503-imgPrevious.svg"
				alt=""
			/></button
		>
		<button
			class="slide-hit next-hit"
			onclick={() => advance(1)}
			ontouchstart={(e) => (touchStart = e.touches[0].clientX)}
			ontouchend={touchEnd}
			aria-label="Image suivante"
			><img class="slide-cursor next-cursor" src="/assets/2973-503-imgNext.svg" alt="" /></button
		>
		<div class="project-caption" aria-live="polite">
			<span>{String(slide + 1).padStart(2, '0')}/04</span><span>{data.project.title}</span><span
				>2021 à 2025</span
			>
		</div>
		<nav class="project-wayfinding" aria-label="Navigation entre projets">
			<a href={`/projet/${data.previous}`}>Projet précédent</a><a href={`/projet/${data.next}`}
				>Projet suivant</a
			>
		</nav>
	</main>
</div>

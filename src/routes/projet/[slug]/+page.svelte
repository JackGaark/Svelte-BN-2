<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { textSlideMarker } from '$lib/textSlideMarker';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import Header from '$lib/Header.svelte';
	let { data } = $props();
	let slide = $state(untrack(() => data.initialSlide));
	const current = $derived(data.slides[slide]);
	let textMarker = $state('TEXTE');
	onMount(() => { void textSlideMarker().then((marker) => { textMarker = marker; }); });
	let touchStart = 0;
	let pointer = $state<{ direction: number; x: number; y: number } | null>(null);
	function followPointer(event: PointerEvent, direction: number) {
		if (event.pointerType !== 'mouse') return;
		const bounds =
			event.currentTarget instanceof HTMLElement
				? event.currentTarget.getBoundingClientRect()
				: null;
		if (bounds)
			pointer = {
				direction,
				x: event.clientX - bounds.left - 10.5,
				y: Math.max(
					0,
					Math.min(bounds.height - 12, event.clientY - bounds.top - 6 + (direction === -1 ? 64 : -32))
				)
			};
	}
	function arrowPosition(direction: number) {
		return pointer?.direction === direction
			? `left: ${pointer.x}px; top: ${pointer.y}px; right: auto; visibility: visible;`
			: undefined;
	}
	function advance(direction: number) {
		showSlide((slide + direction + data.slides.length) % data.slides.length);
	}
	function showSlide(index: number) {
		slide = index;
		const url = new URL(page.url);
		url.searchParams.delete('image');
		url.searchParams.set('slide', String(slide + 1));
		replaceState(url, page.state);
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
		slide = data.initialSlide;
	});
</script>

<svelte:head><title>{data.project.title} — Bureau Normal</title></svelte:head>
<svelte:window onkeydown={key} />
<div class="project-page">
	{#if current.kind === 'image' && current.format !== 'inset'}
		<div class="page-placeholder" class:portrait={current.format === 'portrait'} aria-hidden="true"></div>
	{/if}
	<Header />
	<main id="main" class="project-view design-grid" aria-label={data.project.title}>
		<div class="slide-stage" class:text-slide={current.kind === 'text'}
			class:placeholder-portrait={current.kind === 'image' && current.format === 'portrait'}
			class:placeholder-full={current.kind === 'image' && current.format === 'full'}>
			{#if current.kind === 'text'}
				<div class="project-copy" data-node-id="3153:8030">
					<p>Project text. Lorem ipsum dolor sit amet, consectetur elit.</p>
					<p>Ut orci ex, pulvinar sit amet rhoncus non, molestie in nulla. Phasellus iaculis quis quam molestie consectetur. Etiam nisi metus, vestibulum in placerat ut, condimentum non magna.</p>
				</div>
			{:else}
				<div class="image-placeholder" role="img" aria-label={`${data.project.title} — emplacement image ${current.format}, diapositive ${slide + 1}`}></div>
			{/if}
		</div>
		<button
			class="slide-hit previous-hit"
			onclick={() => advance(-1)}
			onpointermove={(event) => followPointer(event, -1)}
			onpointerleave={() => (pointer = null)}
			ontouchstart={(e) => (touchStart = e.touches[0].clientX)}
			ontouchend={touchEnd}
			aria-label="Diapositive précédente"
			><img
				class="slide-cursor previous-cursor"
				style={arrowPosition(-1)}
				src="/assets/2973-503-imgPrevious.svg"
				alt=""
			/></button
		>
		<button
			class="slide-hit next-hit"
			onclick={() => advance(1)}
			onpointermove={(event) => followPointer(event, 1)}
			onpointerleave={() => (pointer = null)}
			ontouchstart={(e) => (touchStart = e.touches[0].clientX)}
			ontouchend={touchEnd}
			aria-label="Diapositive suivante"
			><img
				class="slide-cursor next-cursor"
				style={arrowPosition(1)}
				src="/assets/2973-503-imgNext.svg"
				alt=""
			/></button
		>
		<div class="project-caption" aria-live="polite">
			<span class="slide-counter" role={current.kind === 'text' ? 'img' : undefined} aria-label={current.kind === 'text' ? 'Texte' : undefined} lang="fr">{current.kind === 'text' ? textMarker : `${String(current.imageNumber).padStart(2, '0')}/${String(current.imageTotal).padStart(2, '0')}`}</span><span>{data.project.title}</span><span
				>{data.project.start} à {data.project.end}</span
			>
		</div>
		<nav class="project-wayfinding" aria-label="Navigation entre projets">
			<a href={`/projet/${data.previous}`}>Projet précédent</a>
			<div class="slide-progress" role="group" aria-label="Diapositives du projet" lang="fr">
				{#each data.slides as item, i}
					<button class:text-marker={item.kind === 'text'} class:current={slide === i} aria-current={slide === i ? 'step' : undefined} aria-label={`Diapositive ${i + 1} sur ${data.slides.length} — ${item.kind === 'text' ? 'Texte' : `Image ${item.imageNumber} sur ${item.imageTotal}`}`} onclick={() => showSlide(i)}><span aria-hidden="true"></span></button>
				{/each}
			</div>
			<a href={`/projet/${data.next}`}
				>Projet suivant</a
			>
		</nav>
	</main>
</div>

<style>
	.slide-counter { min-width: 5ch; font-variant-numeric: tabular-nums; }
	.project-wayfinding { align-items: center; flex-wrap: wrap; gap: 12px; }
	.slide-progress { display: flex; justify-content: center; flex-wrap: wrap; }
	.slide-progress button { display: grid; place-items: center; width: 18px; height: 24px; }
	.slide-progress button span { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.35; }
	.slide-progress .text-marker span { border-radius: 0; }
	.slide-progress .current span { opacity: 1; }
	@media (max-width: 599px) {
		.slide-progress { order: 1; flex-basis: 100%; }
	}
	.project-caption { grid-row: 2; }
	.project-wayfinding { grid-row: 3; }
	.image-placeholder { background: var(--placeholder); }
	.slide-stage.placeholder-portrait,
	.slide-stage.placeholder-full {
		visibility: hidden;
	}
	.page-placeholder { position: absolute; z-index: -1; inset: 0; background: var(--placeholder); }
	.page-placeholder.portrait { width: 50.555556%; height: auto; margin-inline: auto; }
	.project-copy { color: var(--ink); font-size: clamp(28px, 4.722222vw, 68px); line-height: 1.05882353; }
	@media (min-width: 600px) and (max-width: 1199px) and (min-height: 600px) {
		.project-page { min-height: 100svh; }
		.project-page :global(.site-header) {
			margin-inline: 20px;
			grid-template-columns: repeat(6, minmax(0, 1fr));
			gap: 4px;
			padding-top: 20px;
		}
		.project-page :global(.site-header .nav-link) {
			font-size: 14px;
			line-height: normal;
			margin-top: 16px;
			translate: none;
			color: #333;
			text-box-trim: trim-both;
			text-box-edge: cap alphabetic;
		}
		.project-page :global(.nav-0) { grid-column: 4; }
		.project-page :global(.nav-1) { grid-column: 5; }
		.project-page :global(.nav-2) { grid-column: 6; }
		.project-view {
			position: static;
			display: block;
			margin-inline: 20px;
			padding-top: 0;
			min-height: calc(100svh - 64px);
		}
		.slide-stage {
			position: absolute;
			left: 7.942708%;
			top: calc(50svh - 0.5px);
			transform: translateY(-50%);
			width: 84.114583%;
			height: auto;
			aspect-ratio: 646 / 459;
		}
		.slide-stage.text-slide {
			left: 20px;
			top: 110px;
			transform: none;
			width: calc(100% - 42px);
			height: calc(76.269531svh - 133px);
			aspect-ratio: auto;
			overflow: auto;
		}
		.project-copy { font-size: 48px; line-height: 1.15; text-box-trim: trim-both; text-box-edge: cap alphabetic; }
		.project-copy p { display: inline; font-size: inherit; line-height: inherit; }
		.page-placeholder.portrait {
			width: 62.760417%;
			height: 62.890625svh;
			top: 18.554688svh;
			bottom: auto;
		}
		.project-caption {
			position: absolute;
			left: 7.8125%;
			right: 7.8125%;
			top: 76.269531svh;
			grid-template-columns: repeat(6, minmax(0, 1fr));
			gap: 4.9424px;
			font-size: 14px;
			line-height: normal;
			color: #333;
		}
		.project-caption > span,
		.project-wayfinding a { text-box-trim: trim-both; text-box-edge: cap alphabetic; }
		.project-wayfinding {
			position: absolute;
			left: 20px;
			right: 20px;
			top: calc(100svh - 90px);
			padding: 0;
			font-size: 14px;
			line-height: normal;
			color: #333;
		}
	}
	@media (min-width: 600px) and (max-width: 1199px) and (min-height: 600px) and (orientation: landscape) {
		.project-page :global(.site-header) { grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 8px; }
		.project-page :global(.nav-0) { grid-column: 6; }
		.project-page :global(.nav-1) { grid-column: 7; }
		.project-page :global(.nav-2) { grid-column: 8; }
		.slide-stage { left: 14.160156%; width: 71.962891%; aspect-ratio: 1047 / 744; }
		.slide-stage.text-slide { width: calc(100% - 40px); height: calc(100svh - 230px); }
		.page-placeholder.portrait { width: 56.054688%; height: 100%; top: 0; }
		.project-caption { left: 14.160156%; right: 13.878906%; top: calc(100svh - 80px); gap: 0; }
		.project-wayfinding { top: calc(100svh - 40px); }
	}
	@media (min-width: 1200px) and (pointer: fine), (min-width: 1367px) {
		.project-view {
			padding-top: 36px;
			grid-template-rows: minmax(300px, calc(100svh - 228px)) auto auto;
			row-gap: 24px;
		}
		.slide-stage.text-slide { margin-top: -12px; overflow: auto; }
		.project-copy { font-size: 68px; line-height: 72px; font-weight: 400; }
		.project-caption { color: #333; line-height: normal; }
		.project-caption > span,
		.project-wayfinding a { text-box-trim: trim-both; text-box-edge: cap alphabetic; }
		.project-wayfinding { padding-top: 6px; padding-bottom: 47px; color: #333; font-size: 14px; }
	}
</style>

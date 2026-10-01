<script lang="ts">
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	let slide = $state(0);
	let track: HTMLDivElement;
	let gallery: HTMLElement;
	let menu = $state(false);
	let autoplayPaused = $state(false);
	let {
		embedded = false,
		active = true,
		onHome
	}: { embedded?: boolean; active?: boolean; onHome?: (event: MouseEvent) => void } = $props();
	const slides = [
		{
			src: '/assets/2888-486-img203GrandeAllee1.png',
			title: 'C&M',
			number: '03/12',
			light: true,
			inset: false
		},
		{
			src: '/assets/2888-291-imgFacadeAvantCopy1.png',
			title: 'Project Sainte-Chose',
			number: '07/10',
			light: true,
			inset: false
		},
		{
			src: '/assets/2888-347-img185GrandeAllee1.png',
			title: 'Résidence XYZ',
			number: '02/06',
			light: true,
			inset: false
		},
		{
			src: '/assets/2888-394-imgScreenshot20251203At85247Am1.png',
			title: 'Domaine Zzzz',
			number: '07/11',
			light: false,
			inset: true
		},
		{
			src: '/assets/2919-686-imgScreenshot20250710At0851201.png',
			title: 'Maison Casa Home',
			number: '11/14',
			light: true,
			inset: false
		},
		{
			src: '/assets/2888-441-brick.png',
			title: 'Project Sainte-Chose',
			number: '04/10',
			light: true,
			inset: false
		}
	];
	const current = $derived(slides[slide]);
	$effect(() => {
		if (!embedded || !active || autoplayPaused) return;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const timer = setInterval(() => {
			if (document.hidden || reducedMotion.matches || menu) return;
			showSlide((slide + 1) % slides.length);
		}, 2800);
		return () => clearInterval(timer);
	});
	onMount(() => {
		if (!embedded) return;
		let lastAdvance = 0;
		let amount = 0;
		let lastWheel = 0;
		const wheel = (event: WheelEvent) => {
			if (!active || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
			event.preventDefault();
			if (gallery.getBoundingClientRect().top > 2) return;
			const now = performance.now();
			if (now - lastWheel > 180) amount = 0;
			lastWheel = now;
			if (now - lastAdvance < 700) return;
			const delta =
				event.deltaY *
				(event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? gallery.clientHeight : 1);
			if (Math.sign(delta) !== Math.sign(amount)) amount = 0;
			amount += delta;
			if (Math.abs(amount) < 35) return;
			advance(amount > 0 ? 1 : -1);
			amount = 0;
			lastAdvance = now;
		};
		gallery.addEventListener('wheel', wheel, { passive: false });
		return () => gallery.removeEventListener('wheel', wheel);
	});
	function updateSlide() {
		if (!track.clientWidth) return;
		// Elastic scrolling can briefly report an offset outside the track.
		const next = Math.max(
			0,
			Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth))
		);
		if (next !== slide) autoplayPaused = true;
		slide = next;
	}
	function advance(n: number) {
		autoplayPaused = true;
		const next = embedded
			? Math.max(0, Math.min(slides.length - 1, slide + n))
			: (slide + n + slides.length) % slides.length;
		showSlide(next);
	}
	function showSlide(index: number) {
		if (!track) return;
		slide = index;
		track.scrollTo({
			left: index * track.clientWidth,
			behavior: 'instant'
		});
	}
	function key(e: KeyboardEvent) {
		if (!active || e.altKey || e.ctrlKey || e.metaKey) return;
		if (
			e.target instanceof HTMLElement &&
			e.target.closest('input, textarea, select, [contenteditable="true"]')
		)
			return;
		if (embedded && Math.abs(gallery.getBoundingClientRect().top) > 2) return;
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			advance(1);
		}
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			advance(-1);
		}
		if (e.key === 'Escape') menu = false;
	}
</script>

<svelte:window onkeydown={key} />
<svelte:head
	><link rel="preload" as="image" href={slides[(slide + 1) % slides.length].src} /></svelte:head
>
<div class="feature-sequence">
	<section
		bind:this={gallery}
		class="home-feature"
		class:dark-ink={!current.light}
		aria-label="Projets en vedette"
	>
		<div class="feature-track" bind:this={track} onscroll={updateSlide}>
			{#each slides as item, i}
				<div
					class="feature-panel"
					class:warm-background={i === 3}
					role="group"
					aria-hidden={i !== slide}
					aria-label={`${i + 1} / ${slides.length} — ${item.title}`}
				>
					<img
						class="feature-photo"
						class:inset-photo={item.inset}
						class:stair-photo={i === 0}
						class:facade-photo={i === 1}
						class:room-photo={i === 2 || i === 4}
						class:brick-photo={i === 5}
						src={item.src}
						alt={item.title}
						draggable="false"
					/>
				</div>
			{/each}
		</div>
		{#if embedded || menu}<Header light={current.light} lightLogoSrc={embedded ? '/assets/3153-7182-logo-nav.svg' : undefined} {onHome} />{:else}<a
				class="feature-logo"
				href="/"
				aria-label="Bureau Normal — Accueil"
				><img
					src={current.light
						? '/assets/2888-486-imgLogoNav.svg'
						: '/assets/2973-503-imgLogoNav.svg'}
					alt="Bureau Normal"
				/></a
			>{/if}
		{#if !embedded}<button
				class="feature-menu"
				onclick={() => (menu = !menu)}
				aria-label={menu ? 'Fermer la navigation' : 'Ouvrir la navigation'}
				aria-expanded={menu}
				><img
					src={current.light ? '/assets/2888-486-imgVector.svg' : '/assets/2888-394-imgVector.svg'}
					alt=""
				/></button
			>{/if}
		<button class="feature-prev" onclick={() => advance(-1)} aria-label="Image précédente"
		></button><button class="feature-next" onclick={() => advance(1)} aria-label="Image suivante"
		></button>
		<div class="feature-caption" aria-live="polite">
			<span>{current.number}</span><a href={`/projet/grande-allee-${slide + 1}`}>{current.title}</a>
		</div>
	</section>
</div>

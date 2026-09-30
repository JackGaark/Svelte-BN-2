<script lang="ts">
	import { onMount } from 'svelte';
	import Featured from '$lib/Featured.svelte';
	let landing: HTMLElement;
	let galleryOpen = $state(false);
	let galleryReady = $state(false);
	let galleryPanel: HTMLDivElement;
	let openingTimer: ReturnType<typeof setTimeout> | undefined;
	let suppressOpen = false;
	let previousOverflow = '';

	function openGallery(event?: MouseEvent) {
		event?.preventDefault();
		clearTimeout(openingTimer);
		openingTimer = undefined;
		if (galleryOpen) return;
		window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
		previousOverflow = document.documentElement.style.overflow;
		document.documentElement.style.overflow = 'hidden';
		galleryOpen = true;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			galleryReady = true;
			requestAnimationFrame(() => galleryPanel.focus({ preventScroll: true }));
		}
	}
	function finishReveal(event: TransitionEvent) {
		if (event.target !== landing || event.propertyName !== 'transform' || !galleryOpen) return;
		galleryReady = true;
		galleryPanel.focus({ preventScroll: true });
	}
	function closeGallery(event?: MouseEvent) {
		event?.preventDefault();
		clearTimeout(openingTimer);
		openingTimer = undefined;
		suppressOpen = true;
		galleryReady = false;
		galleryOpen = false;
		document.documentElement.style.overflow = previousOverflow;
		requestAnimationFrame(() => landing.querySelector('a')?.focus({ preventScroll: true }));
	}
	onMount(() => {
		const checkEnd = () => {
			const end = document.documentElement.scrollHeight - window.innerHeight;
			if (window.scrollY < end - 4) {
				clearTimeout(openingTimer);
				openingTimer = undefined;
				suppressOpen = false;
				return;
			}
			if (galleryOpen || suppressOpen || openingTimer !== undefined) return;
			// Hold the wordmark at the end of the scroll before lifting the intro.
			openingTimer = setTimeout(() => openGallery(), 900);
		};
		const wheelAtEnd = (event: WheelEvent) => {
			if (event.deltaY > 0) checkEnd();
		};
		const initialFrame = requestAnimationFrame(checkEnd);
		window.addEventListener('scroll', checkEnd, { passive: true });
		window.addEventListener('wheel', wheelAtEnd, { passive: true });
		return () => {
			clearTimeout(openingTimer);
			openingTimer = undefined;
			cancelAnimationFrame(initialFrame);
			window.removeEventListener('wheel', wheelAtEnd);
			window.removeEventListener('scroll', checkEnd);
			if (galleryOpen) document.documentElement.style.overflow = previousOverflow;
		};
	});
</script>

<svelte:head><title>Bureau Normal — Accueil</title></svelte:head>
<svelte:window
	onkeydown={(event) => {
		if (galleryOpen && event.key === 'Escape') closeGallery();
	}}
/>
<main id="main" class="landing-experience" class:gallery-open={galleryOpen}>
	<section
		bind:this={landing}
		inert={galleryOpen}
		class="landing"
		ontransitionend={finishReveal}
		aria-label="Nous sommes Bureau Normal"
		data-node-id="2802:307"
	>
		<h1>
			Nous sommes <strong>Bureau Normal</strong> the intro text appears on landing. Lorem ipsum
			dolor sit amet, consectetur adipiscing elit. Ut orci ex, pulvinar sit amet rhoncus non,
			molestie in nulla. <strong>Phasellus</strong> iaculis quis quam molestie consectetur. Etiam nisi
			metus, vestibulum in placerat ut, condimentum non magna.
		</h1>
		<a
			class="landing-mark"
			onclick={openGallery}
			href="#featured-gallery"
			aria-label="Entrer — découvrir les projets"
			><img src="/assets/landing.svg" alt="Bureau Normal" /></a
		>
	</section>
	<div
		bind:this={galleryPanel}
		id="featured-gallery"
		tabindex="-1"
		class="landing-gallery"
		class:is-open={galleryOpen}
		inert={!galleryReady}
		aria-hidden={!galleryReady}
	>
		<Featured embedded active={galleryReady} onHome={closeGallery} />
	</div>
</main>

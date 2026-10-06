<script lang="ts">
	import BlinkingEye from './BlinkingEye.svelte';
	let { indexDesign = false }: { indexDesign?: boolean } = $props();
	let width = $state(768);
</script>

<footer class="tablet-footer" class:index-design={indexDesign} bind:clientWidth={width}>
	<a class="art-link" href="/" aria-label="Bureau Normal — Retour à l’accueil">
		<span class="art portrait-art" style:transform={`scale(${width / 768})`} aria-hidden="true">
			<img class="symbol" src="/assets/tablet-portrait-symbol.svg" alt="" />
			<img class="wordmark" src="/assets/tablet-portrait-wordmark.svg" alt="" />
			<span class="bottom-eye"><BlinkingEye delay={0.15} /></span>
			<span class="top-eye"><BlinkingEye /></span>
		</span>
		<span class="art landscape-art" style:transform={`scale(${width / 1024})`} aria-hidden="true">
			<img class="symbol" src="/assets/tablet-landscape-symbol.svg" alt="" />
			<img class="wordmark" src="/assets/tablet-landscape-wordmark.svg" alt="" />
			<span class="bottom-eye"><BlinkingEye delay={0.15} /></span>
			<span class="top-eye"><BlinkingEye /></span>
		</span>
	</a>
	<div class="details">
		<a href="mailto:bureau@bureaunormal.com">bureau@bureaunormal.com</a>
		<a href="https://www.instagram.com/bureaunormal/">@bureaunormal</a>
		<span>© 2026</span>
	</div>
</footer>

<style>
	.tablet-footer { position: relative; overflow: clip; height: calc(333 / 768 * 100vw); }
	.art-link { display: block; height: 88.3276%; }
	.art { position: absolute; inset: 0 auto auto 0; transform-origin: top left; }
	.art img { position: absolute; }
	.bottom-eye,
	.top-eye { position: absolute; }
	.portrait-art .bottom-eye :global(svg),
	.portrait-art .top-eye :global(svg) { transform: translateY(-1.54px) scale(0.5194); transform-origin: top left; }
	.landscape-art .bottom-eye :global(svg),
	.landscape-art .top-eye :global(svg) { transform: translateY(-2.084px) scale(0.70458); transform-origin: top left; }
	.portrait-art .symbol { left: 20.894px; top: 14.52px; }
	.portrait-art .wordmark { left: 234.264px; top: 22.0145px; }
	.portrait-art .bottom-eye { left: 57.604px; top: 94.98px; }
	.portrait-art .top-eye { left: 57.604px; top: 74.76px; }
	.landscape-art { display: none; }
	.landscape-art .symbol { left: 20px; top: 19px; }
	.landscape-art .wordmark { left: 310.525px; top: 29.6425px; }
	.landscape-art .bottom-eye { left: 70.896px; top: 128.6185px; }
	.landscape-art .top-eye { left: 70.896px; top: 101.1885px; }
	.details { position: absolute; top: 93.3934%; left: 50.291667%; right: 20px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); font-size: 10px; letter-spacing: 0.2px; line-height: normal; }
	.details > * { text-box-trim: trim-both; text-box-edge: cap alphabetic; white-space: nowrap; }
	@media (orientation: portrait) {
		.index-design { height: calc(666 / 768 * 100vw); }
		.index-design .art-link { height: calc(607 / 666 * 100%); }
		.index-design .portrait-art { top: 50%; }
		.index-design .details { top: calc(644 / 666 * 100%); grid-template-columns: calc(116 / 768 * 100vw) calc(116 / 768 * 100vw) calc(68 / 768 * 100vw); column-gap: calc(6 / 768 * 100vw); }
	}
	@media (orientation: landscape) {
		.tablet-footer { height: calc(428 / 1024 * 100vw); }
		.portrait-art { display: none; }
		.landscape-art { display: block; }
		.details { top: 94.8598%; left: 62.5%; }
		.index-design { height: calc(856 / 1024 * 100vw); }
		.index-design .art-link { height: calc(800 / 856 * 100%); }
		.index-design .landscape-art { top: 50%; }
		.index-design .details { top: calc(834 / 856 * 100%); gap: 8px; }
	}
</style>

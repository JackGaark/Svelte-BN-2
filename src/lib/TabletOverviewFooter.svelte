<script lang="ts">
	let width = $state(768);
</script>

<footer class="tablet-footer" bind:clientWidth={width}>
	<a class="art-link" href="/" aria-label="Bureau Normal — Retour à l’accueil">
		<span class="art portrait-art" style:transform={`scale(${width / 768})`} aria-hidden="true">
			<img class="symbol" src="/assets/tablet-portrait-symbol.svg" alt="" />
			<img class="wordmark" src="/assets/tablet-portrait-wordmark.svg" alt="" />
			<img class="bottom-eye" src="/assets/tablet-portrait-eye-bottom.svg" alt="" />
			<img class="top-eye" src="/assets/tablet-portrait-eye-top.svg" alt="" />
		</span>
		<span class="art landscape-art" style:transform={`scale(${width / 1024})`} aria-hidden="true">
			<img class="symbol" src="/assets/tablet-landscape-symbol.svg" alt="" />
			<img class="wordmark" src="/assets/tablet-landscape-wordmark.svg" alt="" />
			<img class="bottom-eye" src="/assets/tablet-landscape-eye-bottom.svg" alt="" />
			<img class="top-eye" src="/assets/tablet-landscape-eye-top.svg" alt="" />
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
	@media (orientation: landscape) {
		.tablet-footer { height: calc(428 / 1024 * 100vw); }
		.portrait-art { display: none; }
		.landscape-art { display: block; }
		.details { top: 94.8598%; left: 62.5%; }
	}
</style>

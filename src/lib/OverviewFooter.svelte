<script lang="ts">
	import Footer from './Footer.svelte';
	import BlinkingEye from './BlinkingEye.svelte';
	let width = $state(1440);
</script>

<div class="overview-footer" data-node-id="2919:1045">
	<a
		class="overview-footer-logo"
		href="/"
		aria-label="Bureau Normal — Retour à l’accueil"
		bind:clientWidth={width}
	>
		<span class="overview-footer-art" style:transform={`scale(${width / 1440})`} aria-hidden="true">
			<img class="footer-safety" src="/assets/overview-footer-safety.svg" alt="" />
			<img
				class="footer-symbol"
				src="/assets/overview-footer-symbol.svg"
				alt=""
				data-node-id="2861:513"
			/>
			<img
				class="footer-wordmark"
				src="/assets/overview-footer-wordmark.svg"
				alt=""
				data-node-id="2861:500"
			/>
			<span class="footer-eye-bottom"><BlinkingEye delay={0.15} /></span>
			<span class="footer-eye-top"><BlinkingEye /></span>
		</span>
	</a>
	<Footer mark={false} />
</div>

<style>
	.overview-footer {
		overflow: clip;
	}
	.overview-footer-logo {
		display: block;
		position: relative;
		width: 100%;
		aspect-ratio: 1440 / 566.125;
	}
	.overview-footer-art {
		position: absolute;
		width: 1440px;
		height: 566.125px;
		transform-origin: top left;
		pointer-events: none;
	}
	.overview-footer-art img {
		position: absolute;
	}
	.footer-safety {
		left: -32.0605px;
		top: 0;
	}
	.footer-symbol {
		left: 21.0595px;
		top: 27.801px;
	}
	.footer-wordmark {
		left: 431.633px;
		top: 42.39px;
	}
	.footer-eye-bottom {
		position: absolute;
		left: 91.5455px;
		top: 179.93612px;
	}
	.footer-eye-top {
		position: absolute;
		left: 91.5455px;
		top: 140.99612px;
	}
	.overview-footer :global(.site-footer) {
		margin-top: clamp(16px, 2.2875vw, 32.94px);
		min-height: 0;
	}
</style>

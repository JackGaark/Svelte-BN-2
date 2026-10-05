<script lang="ts">
	import Footer from './Footer.svelte';
	import BlinkingEye from './BlinkingEye.svelte';
	let { contacts = false, indexDesign = false }: { contacts?: boolean; indexDesign?: boolean } = $props();
	let width = $state(1440);
</script>

<div class="overview-footer" class:index-design={indexDesign} data-node-id={indexDesign ? '3153:6235' : '2919:1045'}>
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
				src={indexDesign ? '/assets/index-footer-symbol.svg' : '/assets/overview-footer-symbol.svg'}
				alt=""
				data-node-id="2861:513"
			/>
			<img
				class="footer-wordmark"
				src={indexDesign ? '/assets/index-footer-wordmark.svg' : '/assets/overview-footer-wordmark.svg'}
				alt=""
				data-node-id="2861:500"
			/>
			<span class="footer-eye-bottom"><BlinkingEye delay={0.15} /></span>
			<span class="footer-eye-top"><BlinkingEye /></span>
		</span>
	</a>
	<Footer mark={false} {contacts} />
</div>

<style>
	.overview-footer {
		overflow: clip;
	}
	.overview-footer-logo {
		display: block;
		position: relative;
		width: calc(100% - 2 * var(--margin));
		margin-inline: var(--margin);
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
	/* The desktop index uses the updated 1440 × 641 footer composition. */
	@media (min-width: 1200px) and (pointer: fine), (min-width: 1367px) {
		.index-design { min-height: calc(641 / 1440 * 100vw + 1px); }
		.index-design .overview-footer-logo {
			width: 100%;
			margin-inline: 0;
			aspect-ratio: 1440 / 567;
		}
		.index-design .overview-footer-art { height: 567px; }
		.index-design .footer-safety { left: -32px; top: 0; }
		.index-design .footer-symbol { left: 21px; top: 28px; }
		.index-design .footer-wordmark { left: 432.3175px; top: 42.4455px; }
		.index-design .footer-eye-bottom { left: 91.7745px; top: 183.1015px; }
		.index-design .footer-eye-top { left: 91.7745px; top: 144.1115px; }
		.index-design :global(.site-footer) {
			margin-top: calc(33.5 / 1440 * 100vw);
			padding-bottom: calc(30.5 / 1440 * 100vw);
			font-size: 14px;
			line-height: 10px;
		}
		.index-design :global(.site-footer > *) {
			text-box-trim: trim-both;
			text-box-edge: cap alphabetic;
		}
	}
</style>

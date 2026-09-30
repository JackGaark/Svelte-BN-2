<script lang="ts">
	let { large = false, mark = true }: { large?: boolean; mark?: boolean } = $props();
</script>

<footer class="site-footer design-grid" class:large>
	{#if mark}<a class="footer-brand" href="/" aria-label="Retour à l’accueil"
			><img
				src={large ? '/assets/2973-566-imgGroup.svg' : '/assets/2927-2132-imgLayer1.svg'}
				alt="Bureau Normal"
			/></a
		>{/if}
	<a class="footer-email" href="mailto:bureau@bureaunormal.com">bureau@bureaunormal.com</a>
	<a
		class="footer-social"
		href="https://www.instagram.com/bureaunormal/"
		target="_blank"
		rel="noreferrer">@bureaunormal</a
	>
	<span class="footer-copyright">© 2026</span>
</footer>

<script lang="ts">
	let { large = false, mark = true, contacts = false }: { large?: boolean; mark?: boolean; contacts?: boolean } = $props();
</script>

<footer class="site-footer design-grid" class:large class:with-contacts={contacts}>
	{#if mark}<a class="footer-brand" href="/" aria-label="Retour à l’accueil"
			><img
				src={large ? '/assets/2973-566-imgGroup.svg' : '/assets/2927-2132-imgLayer1.svg'}
				alt="Bureau Normal"
			/></a
		>{/if}
	{#if contacts}
		<a class="footer-email" href="mailto:bureau@bureaunormal.com">bureau@bureaunormal.com</a>
		<a class="footer-social" href="https://www.instagram.com/bureaunormal/" target="_blank" rel="noreferrer">@bureaunormal</a>
	{/if}
	<span class="footer-copyright">© 2026</span>
</footer>

<style>
	@media (min-width: 600px) and (max-width: 1366px) {
		.with-contacts {
			grid-template-columns: minmax(0, 1fr) repeat(3, max-content);
			column-gap: clamp(20px, 3vw, 40px);
			align-items: baseline;
		}
		.with-contacts .footer-email { grid-column: 2; }
		.with-contacts .footer-social { grid-column: 3; }
		.with-contacts .footer-copyright { grid-column: 4; }
	}
</style>

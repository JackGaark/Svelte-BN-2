<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head
	><title>Bureau Normal</title><meta
		name="description"
		content="Bureau Normal — architecture, projets et espaces."
	/></svelte:head
>
<a class="skip-link" href="#main">Aller au contenu</a>
{@render children()}

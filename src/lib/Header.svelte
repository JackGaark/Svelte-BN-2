<script lang="ts">
	import { page } from '$app/state';
	let { light = false, onHome }: { light?: boolean; onHome?: (event: MouseEvent) => void } =
		$props();
</script>

<header class:light class="site-header design-grid">
	<a
		class="brand"
		href="/"
		onclick={onHome}
		aria-label={onHome ? 'Bureau Normal — Retour à l’introduction' : 'Bureau Normal — Accueil'}
		><img
			src={light ? '/assets/2888-486-imgLogoNav.svg' : '/assets/2973-503-imgLogoNav.svg'}
			alt="Bureau Normal"
		/></a
	>
	{#each [{ href: '/index', label: 'Index' }, { href: '/survol', label: 'Survol' }, { href: '/bureau', label: 'Bureau' }] as link, i}
		<a
			class="nav-link nav-{i}"
			class:active={page.url.pathname === link.href}
			aria-current={page.url.pathname === link.href ? 'page' : undefined}
			href={link.href}>{link.label}</a
		>
	{/each}
</header>

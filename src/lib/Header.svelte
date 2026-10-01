<script lang="ts">
	import { page } from '$app/state';
	let { light = false, mobileLight = false, lightLogoSrc = '/assets/2888-486-imgLogoNav.svg', darkLogoSrc = '/assets/2973-503-imgLogoNav.svg', onHome }: { light?: boolean; mobileLight?: boolean; lightLogoSrc?: string; darkLogoSrc?: string; onHome?: (event: MouseEvent) => void } =
		$props();
</script>

<header
	class:light
	class:page-navigation={['/index', '/survol', '/bureau'].includes(page.url.pathname)}
	class="site-header design-grid"
>
	<a
		class="brand"
		href="/"
		onclick={onHome}
		aria-label={onHome ? 'Bureau Normal — Retour à l’introduction' : 'Bureau Normal — Accueil'}
		><picture>
			{#if mobileLight}
				<source media="(max-width: 599px)" srcset="/assets/2888-486-imgLogoNav.svg" />
			{/if}
			<img
			src={light ? lightLogoSrc : darkLogoSrc}
			alt="Bureau Normal"
		/></picture></a
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

<style>
	@media (min-width: 1200px) and (pointer: fine), (min-width: 1367px) {
		.site-header .nav-link {
			font-size: 14px;
			font-weight: 400;
			line-height: normal;
			margin-top: 16px;
			translate: none;
			color: #333;
			text-box-trim: trim-both;
			text-box-edge: cap alphabetic;
		}
		.site-header.light .nav-link {
			color: #e6e6e6;
		}
	}
</style>

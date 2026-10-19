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
	@media (max-width: 1199px), (max-width: 1366px) and (pointer: coarse) {
		.site-header.design-grid.page-navigation {
			margin-inline: 20px;
			gap: 8px;
			padding-top: 20px;
			height: 64px;
			grid-template-rows: max-content;
			align-items: baseline;
		}
		.site-header.page-navigation .brand,
		.site-header.page-navigation .brand picture {
			display: flex;
			align-items: baseline;
		}
		.site-header.design-grid.page-navigation .nav-link {
			font-size: 14px;
			font-weight: 400;
			line-height: 1;
			margin-top: 0;
			translate: none;
			text-box-trim: none;
		}
	}

	@media (min-width: 600px) and (min-height: 600px) and (max-width: 1199px),
		(min-width: 1200px) and (max-width: 1366px) and (pointer: coarse) {
		.site-header.design-grid.page-navigation {
			grid-template-columns: repeat(6, minmax(0, 1fr));
			column-gap: 4px;
		}
		.site-header.page-navigation .nav-0 { grid-column: 4; }
		.site-header.page-navigation .nav-1 { grid-column: 5; }
		.site-header.page-navigation .nav-2 { grid-column: 6; }
		@media (orientation: landscape) {
			.site-header.design-grid.page-navigation {
				grid-template-columns: repeat(8, minmax(0, 1fr));
				column-gap: 8px;
			}
			.site-header.page-navigation .nav-0 { grid-column: 6; }
			.site-header.page-navigation .nav-1 { grid-column: 7; }
			.site-header.page-navigation .nav-2 { grid-column: 8; }
		}
	}
	@media (max-width: 599px), (max-width: 1023px) and (max-height: 599px) and (orientation: landscape) {
		.site-header.design-grid.page-navigation {
			grid-template-columns: repeat(4, minmax(0, 1fr));
			column-gap: 6px;
		}
		.site-header.page-navigation .nav-0 { grid-column: 2; }
		.site-header.page-navigation .nav-1 { grid-column: 3; }
		.site-header.page-navigation .nav-2 { grid-column: 4; }
	}
	.site-header .nav-link {
		text-underline-offset: 2px;
		text-decoration-thickness: 1px;
		text-decoration-skip-ink: none;
	}
	.site-header .nav-link.active {
		text-decoration-line: underline;
	}

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

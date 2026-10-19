<script lang="ts">
	import Header from '$lib/Header.svelte';
	import OverviewFooter from '$lib/OverviewFooter.svelte';
	import TabletOverviewFooter from '$lib/TabletOverviewFooter.svelte';
</script>

<svelte:head><title>Bureau — Bureau Normal</title></svelte:head>
<Header />
<main id="main" class="bureau-page design-grid" data-node-id="3153:8448">
	<h1>
		<span class="standard-intro">En quoi normal, bureau de quoi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id
		odio neque. In hac habitasse platea dictumst. Nunc auctor tortor finibus, facilisis nunc sed,
		mattis augue.</span>
		<span class="tablet-portrait-intro">Project text. Lorem ipsum dolor sit amet, consectetur elit. Ut orci ex, pulvinar sit amet rhoncus non, molestie in nulla. Phasellus iaculis quis quam molestie consectetur. Etiam nisi metus, vestibulum in placerat ut, condimentum non magna.</span>
	</h1>
	<div class="portrait">Photo de vous :)</div>
	<div class="bureau-copy">
		<p>
			Suite du texte sur vous et vos services. Lorem ipsum dolor sit amet, consectetur adipiscing
			elit. Cras id odio neque. In hac habitasse platea dictumst. Nunc auctor tortor finibus,
			facilisis nunc sed, mattis augue. Cras gravida pharetra nulla, vitae semper lectus vestibulum
			a. Sed est leo, blandit at dui et, rutrum tempus nisl. Mauris dolor mi, ullamcorper sit amet
			hendrerit a, ultricies ut ante. Sed cursus arcu eu finibus hendrerit. Sed eu tempus augue.
		</p>
		<p>
			Integer blandit lacus eget lacinia volutpat. Integer varius tincidunt neque, ac fringilla est.
			Fusce non pulvinar dui, et commodo arcu. Donec ac sodales odio. Sed luctus libero est, vel
			commodo massa ultrices non. Sed ac lacus sem. Aenean scelerisque viverra lacus et malesuada.
			Mauris sit amet massa ac magna faucibus gravida eget vitae neque. Etiam consequat mi quis
			pellentesque hendrerit. Nunc consectetur nibh in consectetur ornare. Donec massa magna,
			blandit in auctor ut, rutrum ac dolor. Nam dapibus nisi odio, a dignissim massa suscipit a.
			Aenean ornare commodo eleifend.
		</p>
	</div>
	<address class="contact">
		<span>1234 Rue de Machin<br />Montréal, Qc. H2H 2H2</span><a href="tel:+15141234567"
			>+1 514 123 4567</a
		><a href="mailto:bureau@bureaunormal.com">bureau@bureaunormal.com</a><a
			href="https://www.instagram.com/bureaunormal/">@bureaunormal</a
		>
	</address>
</main>
<div class="bureau-standard-footer"><OverviewFooter indexDesign /></div>
<div class="bureau-tablet-footer"><TabletOverviewFooter indexDesign contacts={false} /></div>

<style>
	.tablet-portrait-intro, .bureau-tablet-footer { display: none; }
	@media (min-width: 600px) and (max-width: 1199px) and (min-height: 600px) and (orientation: portrait),
		(min-width: 1200px) and (max-width: 1366px) and (pointer: coarse) and (orientation: portrait) {
		.bureau-page {
			padding-top: 44px;
			padding-bottom: 0;
			grid-template-columns: repeat(6, minmax(0, 1fr));
			grid-template-rows: minmax(336px, auto) 46px minmax(231px, auto) 71px auto;
			gap: 0 6px;
			min-height: 746px;
		}
		.bureau-page h1 {
			grid-column: 1 / -1;
			grid-row: 1;
			width: calc(100% * 482 / 728);
			margin-top: 2px;
			padding-left: 0;
			align-self: start;
		}
		.standard-intro { display: none; }
		.tablet-portrait-intro { display: inline; }
		.portrait {
			grid-column: 1 / -1;
			grid-row: 1;
			justify-self: end;
			margin-right: 2px;
			width: calc(100% * 238 / 728);
			height: auto;
			aspect-ratio: 238 / 336;
			align-self: start;
		}
		.bureau-copy {
			grid-column: 1 / -1;
			grid-row: 3;
			width: calc(100% * 360 / 728);
			font-size: 14px;
			line-height: 14px;
			color: #000;
		}
		.bureau-copy p + p { margin-top: 14px; }
		.contact {
			grid-column: 1 / -1;
			grid-row: 5;
			width: calc(100% * 482 / 728);
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 6px;
			margin-top: 0;
			font-size: 10px;
			letter-spacing: .2px;
			line-height: 11px;
			align-items: start;
			color: #000;
		}
		.contact > * { text-box-trim: trim-both; text-box-edge: cap alphabetic; }
		.bureau-standard-footer { display: none; }
		.bureau-tablet-footer { display: block; }
	}

	@media (min-width: 600px) and (max-width: 1199px) and (min-height: 600px),
		(min-width: 1200px) and (max-width: 1366px) and (min-height: 600px) and (pointer: coarse) {
		.bureau-page { margin-inline: 20px; }
		.bureau-page h1 {
			font-size: 28px;
			line-height: 1.15;
			text-box-trim: trim-both;
			text-box-edge: cap alphabetic;
		}
	}
	@media (min-width: 1200px) and (pointer: fine), (min-width: 1367px) {
		.bureau-page {
			color: #000;
			grid-template-rows: 486px 231px auto;
			min-height: calc(1538 / 1440 * 100vw - 64px);
		}
		.bureau-page h1 {
			font-size: 42px;
			line-height: 46px;
			padding-left: 2px;
		}
		.bureau-copy { font-size: 17px; line-height: normal; }
		.contact { margin-top: 56px; line-height: normal; align-items: start; }
		.contact > * { text-box-trim: trim-both; text-box-edge: cap alphabetic; }
	}
	.bureau-page { min-height: 0; padding-bottom: 0; }
</style>

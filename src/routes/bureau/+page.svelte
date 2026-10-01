<script lang="ts">
	import Header from '$lib/Header.svelte';
	import OverviewFooter from '$lib/OverviewFooter.svelte';
</script>

<svelte:head><title>Bureau — Bureau Normal</title></svelte:head>
<Header />
<main id="main" class="bureau-page design-grid" data-node-id="3153:8448">
	<h1>
		En quoi normal, bureau de quoi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id
		odio neque. In hac habitasse platea dictumst. Nunc auctor tortor finibus, facilisis nunc sed,
		mattis augue.
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
<OverviewFooter indexDesign />

<style>
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
</style>

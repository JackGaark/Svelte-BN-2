<script lang="ts">
	let { start, end }: { start: number; end: number } = $props();
</script>

<span class="date-range">
	<span class="year">{start}</span>
	<span class="separator">à</span>
	<span class="year">{end}</span>
</span>

<style>
	.date-range {
		display: grid;
		grid-template-columns: 4ch minmax(1ch, 1fr) 4ch;
		align-items: baseline;
		width: min(100%, 92px);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
	.year { text-align: center; }
	.separator { text-align: center; }
</style>

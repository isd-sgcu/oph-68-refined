<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		header = '{header}',
		level = 'h3',
		children
	}: {
		header?: string;
		level?: string;
		children?: Snippet;
	} = $props();
</script>

<section id={header.toLowerCase().replace(/\s/g, '-')}>
	<svelte:element this={level}>{header}</svelte:element>
	{@render children?.()}
</section>

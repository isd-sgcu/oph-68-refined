<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		header = '{header}',
		children
	}: {
		header?: string;
		children?: Snippet;
	} = $props();
</script>

<h2>{header}</h2>

{@render children?.()}

<script lang="ts">
	import type { CreateQueryResult } from '@tanstack/svelte-query';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	const {
		header = '{header}',
		level = 'h2',
		query,
		children
	}: {
		header?: string;
		level?: string;
		query?: CreateQueryResult;
		children?: Snippet;
	} = $props();
</script>

<section id={header.toLowerCase().replace(/\s/g, '-')}>
	<svelte:element this={level}
		>{header}
		{#if $query?.isFetching}
			<span class="loading loading-dots mx-2" transition:fade></span>
		{/if}</svelte:element
	>
	{@render children?.()}
</section>

<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	const {
		children,
		class: className
	}: {
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<div class={cn('prose dark:prose-invert prose-neutral', className)}>
	{@render children?.()}
</div>

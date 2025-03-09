<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	const {
		children,
		class: className
	}: {
		children: Snippet;
		class?: string;
	} = $props();
</script>

<div class={cn('bg-muted/50 border-muted rounded-md border p-4', className)}>
	{@render children?.()}
</div>

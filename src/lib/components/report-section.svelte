<script lang="ts">
	import type { CreateQueryResult } from '@tanstack/svelte-query';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import RotateCw from 'lucide-svelte/icons/rotate-cw';

	const {
		header = '{header}',
		level = 'h2',
		query,
		children,
		...props
	}: {
		header?: string;
		level?: string;
		query?: CreateQueryResult;
		children?: Snippet;
	} = $props();
</script>

<section
	id={header.toLowerCase().replace(/\s/g, '-')}
	style="--vis-xy-label-fill-color: transparent"
	{...props}
>
	<svelte:element this={level} class="flex flex-row"
		>{header}
		{#if $query?.isFetching}
			<span class="loading loading-dots loading-sm mx-2 leading-0" transition:fade></span>
		{/if}</svelte:element
	>
	{#if $query?.status === 'pending'}
		<div class="skeleton flex h-52 items-center justify-center">
			<span class="loading loading-dots"></span>
		</div>
	{:else if $query?.status === 'success'}
		{@render children?.()}
	{:else if $query?.status === 'error'}
		<div role="alert" class="alert alert-warning alert-vertical sm:alert-horizontal">
			<TriangleAlert class="size-6 shrink-0" />
			<span>
				ไม่สามารถโหลดข้อมูลได้: {$query.error.message}
			</span>
			<div>
				<button class="btn btn-sm btn-ghost" onclick={() => $query.refetch()}>
					<RotateCw class="size-4 shrink-0" />
					ลองใหม่
				</button>
			</div>
		</div>
	{/if}
</section>

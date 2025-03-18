<script lang="ts">
	import AppSidebarToggle from './app-sidebar-toggle.svelte';
	import { app } from '$lib/constants';
	import PanelLeftOpen from 'lucide-svelte/icons/panel-left-open';
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { getQueryClientContext } from '@tanstack/svelte-query';
	import RotateCw from 'lucide-svelte/icons/rotate-cw';

	const {
		children,
		breadcrumbs
	}: {
		children: Snippet;
		breadcrumbs?: Snippet;
	} = $props();
	const queryClient = getQueryClientContext();
</script>

<div class="navbar bg-base-100 min-h-14 justify-between shadow-sm">
	<!-- <div class="flex flex-1 items-center gap-2 px-1">
		<AppSidebarToggle />
		<div class="breadcrumbs text-neutral-content/60 text-sm">
			<ul>
				{#if breadcrumbs}
					{@render breadcrumbs()}
				{:else}
					<li>
						<a href="/" class="">Home</a>
					</li>
				{/if}
			</ul>
		</div>
	</div> -->
	<a href="https://www.cuopenhouse2025.com/" class="btn btn-ghost">
		{app.name}
	</a>
	<button onclick={() => queryClient.refetchQueries()} class="btn btn-ghost">
		<RotateCw class="size-4 shrink-0" />
		<span class="sr-only">โหลดข้อมูลใหม่</span>
	</button>
</div>
<main
	class="prose dark:prose-invert prose-neutral prose-p:max-w-prose m-2 mx-auto max-w-5xl rounded-2xl p-8"
>
	{@render children?.()}
</main>

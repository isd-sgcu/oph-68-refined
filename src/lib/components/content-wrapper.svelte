<script lang="ts">
	import AppSidebarToggle from './app-sidebar-toggle.svelte';

	import { app } from '$lib/constants';
	import PanelLeftOpen from 'lucide-svelte/icons/panel-left-open';
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	const {
		children,
		breadcrumbs
	}: {
		children: Snippet;
		breadcrumbs?: Snippet;
	} = $props();
</script>

<div class="navbar bg-base-100 min-h-14 shadow-sm">
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
</div>
<main
	class="prose dark:prose-invert prose-neutral container m-2 mx-auto max-w-full rounded-2xl p-8"
>
	{@render children?.()}
</main>

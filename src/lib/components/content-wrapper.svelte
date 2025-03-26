<script lang="ts">
	import { app } from '$lib/constants';
	import type { Snippet } from 'svelte';
	import AppSidebarToggle from './app-sidebar-toggle.svelte';
	import GithubIcon from 'lucide-svelte/icons/github';
	import Link from './link.svelte';

	const {
		children,
		breadcrumbs
	}: {
		children: Snippet;
		breadcrumbs?: Snippet;
	} = $props();
</script>

<div class="navbar bg-base-100 min-h-14 justify-between shadow-sm">
	<div class="flex flex-1 items-center gap-2 px-1">
		<AppSidebarToggle />
		<div class="breadcrumbs text-base-content text-sm">
			<ul>
				{#if breadcrumbs}
					{@render breadcrumbs()}
				{:else}
					<li>
						<Link href="/" class="">Home</Link>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</div>
<main
	class="unoviz-custom-style prose dark:prose-invert prose-neutral prose-p:max-w-prose m-2 mx-auto max-w-5xl rounded-2xl p-8"
>
	{@render children?.()}
</main>

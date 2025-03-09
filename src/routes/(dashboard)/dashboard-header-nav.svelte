<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { app } from '$lib/constants';

	interface BreadcrumbNav {
		href: string;
		text: string;
	}

	const {
		breadcrumbs = [
			{
				href: '/',
				text: app.name
			}
		],
		children
	}: {
		breadcrumbs?: BreadcrumbNav[];
		children?: Snippet;
	} = $props();
</script>

<div class="flex h-full flex-col">
	<div>
		<Breadcrumb.Root>
			<Breadcrumb.List>
				{#each breadcrumbs as { href, text }, i}
					<Breadcrumb.Item aria-current={i === breadcrumbs.length - 1 ? 'page' : undefined}>
						<Breadcrumb.Link {href}>
							{text}
						</Breadcrumb.Link>
					</Breadcrumb.Item>
				{/each}
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
	<div class="">
		{@render children?.()}
	</div>
</div>

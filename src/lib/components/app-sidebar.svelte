<script lang="ts" context="module">
	export interface SidebarChild {
		title: string;
		phref: string;
		links: { title: string; href: string }[];
	}

	export interface Sidebar {
		childs: SidebarChild[];
	}
</script>

<script lang="ts">
	import { app } from '$lib/constants';
	import { getContext } from 'svelte';
	import { page } from '$app/state';
	import { sidebar } from '$lib/sidebar';
	import Link from './link.svelte';

	const toggleId: string = getContext('sidebar-toggle-id') ?? 'sidebar-drawer';
</script>

<div class="drawer-side">
	<label for={toggleId} aria-label="ปิดเมนูด้านข้าง" class="drawer-overlay"></label>

	<div class="bg-base-200 flex min-h-full w-80 flex-col justify-between shadow-lg">
		<div>
			<div class="min-h-14 px-3 py-2">
				<Link href="/" class="btn btn-ghost">
					{app.name}
				</Link>
			</div>
			<ul class="menu text-base-content min-h-full w-80 p-4">
				{#each sidebar.childs as { title, links, phref }}
					<li>
						<Link href={phref} class={page.url.pathname === phref ? 'bg-base-300' : ''}>
							{title}
						</Link>
						<ul>
							{#each links as { title, href }}
								<li>
									<Link {href}>
										{title}
									</Link>
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

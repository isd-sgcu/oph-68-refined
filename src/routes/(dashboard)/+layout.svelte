<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import DashboardHeaderNav from './dashboard-header-nav.svelte';
	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="flex h-full w-full flex-col">
		<header class="flex flex-row items-center justify-start gap-2 bg-white px-4 py-2">
			<Sidebar.Trigger size="icon" class="p-5" />
			<DashboardHeaderNav />
		</header>
		<div class="mx-2 p-3">
			{@render children?.()}
		</div>
	</main>
</Sidebar.Provider>

<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { app } from '$lib/constants';
	import PanelLeftOpenIcon from 'lucide-svelte/icons/panel-left-open';
	import { setContext, type Snippet } from 'svelte';
	const {
		children,
	}: {
		children: Snippet;
	} = $props();

	// Set the sidebar toggle id to the drawer id
	setContext('sidebar-toggle-id', 'sidebar-drawer');
</script>

<div class="drawer lg:drawer-open">
	<input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />

	<div class="drawer-content">
		{@render children?.()}
	</div>

	<!-- <AppSidebar /> -->
</div>

<script>
	import PanelLeftOpen from 'lucide-svelte/icons/panel-left-open';
	import { getContext } from 'svelte';

	const sidebarToggleId = getContext('sidebar-toggle-id') || 'sidebar-drawer';
</script>

<label for={sidebarToggleId} class="drawer-button btn lg:hidden">
	<PanelLeftOpen class="size-5" />
</label>

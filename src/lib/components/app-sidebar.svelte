<script lang="ts">
	import { app } from '$lib/constants';
	import { getContext } from 'svelte';

	const toggleId: string = getContext('sidebar-toggle-id') ?? 'sidebar-drawer';
</script>

<div class="drawer-side">
	<label for={toggleId} aria-label="ปิดเมนูด้านข้าง" class="drawer-overlay"></label>

	<div class="bg-base-200 flex min-h-full w-80 flex-col shadow-lg">
		<div class="bg-base-100 min-h-14 px-3 py-2">
			<a href="/" class="btn btn-ghost text-lg">
				{app.name}
			</a>
		</div>
		<ul class="menu text-base-content min-h-full w-80 p-4">
			<li><a href="/">Sidebar Item 1</a></li>
			<li><a href="/">Sidebar asd Item 2</a></li>
		</ul>
	</div>
</div>

<script lang="ts">
	import { app } from '$lib/constants';

	let { children } = $props();
</script>

<div class="navbar bg-base-100 shadow-sm">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">
			{app.name}
		</a>
	</div>
</div>
<main class="mt-5 p-4">
	{@render children?.()}
</main>

<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { app } from '$lib/constants';
</script>

<Sidebar.Root>
	<Sidebar.Header>
		<a href="https://www.cuopenhouse2025.com/">
			<h1 class="my-3 text-xl font-bold">{app.name}</h1>
		</a>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group />
		<Sidebar.Group />
	</Sidebar.Content>
	<Sidebar.Footer />
</Sidebar.Root>

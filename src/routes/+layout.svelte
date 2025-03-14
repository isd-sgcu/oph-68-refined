<script lang="ts">
	import '@fontsource-variable/anuphan';
	import { app } from '$lib/constants';
	import '../app.css';
	import { QueryClientProvider } from '@tanstack/svelte-query';

	let { children, data } = $props();
</script>

<svelte:head>
	<title>
		{app.name}
	</title>
	<meta name="description" content={app.description} />
	<meta name="og:title" content={app.name} />
	<meta name="og:description" content={app.description} />
</svelte:head>

<QueryClientProvider client={data.queryClient}>
	{@render children()}
</QueryClientProvider>

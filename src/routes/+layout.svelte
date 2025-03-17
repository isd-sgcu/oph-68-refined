<script lang="ts">
	import '@fontsource-variable/anuphan';
	import { app, REFETCH_INTERVAL } from '$lib/constants';
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { browser } from '$app/environment';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				queryKeyHashFn: (queryKey) => JSON.stringify(queryKey),
				refetchInterval: REFETCH_INTERVAL
			}
		}
	});

	let { children } = $props();
</script>

<svelte:head>
	<title>
		{app.name}
	</title>
	<meta name="description" content={app.description} />
	<meta name="og:title" content={app.name} />
	<meta name="og:description" content={app.description} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>

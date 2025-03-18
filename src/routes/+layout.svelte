<script lang="ts">
	import '@fontsource-variable/anuphan';
	import { app, LOCALE, REFETCH_INTERVAL } from '$lib/constants';
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
	<link rel="canonical" href={app.url} />
	<meta name="description" content={app.description} />
	<meta name="og:title" content={app.name} />
	<meta name="og:description" content={app.description} />
	<meta name="og:image" content={app.image} />
	<meta name="og:url" content={app.url} />
	<meta name="og:type" content="website" />
	<meta name="og:site_name" content={app.name} />
	<meta name="og:locale" content={LOCALE} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={app.name} />
	<meta name="twitter:description" content={app.description} />
	<meta name="twitter:image" content={app.image} />
	<meta name="twitter:url" content={app.url} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>

<script lang="ts">
	import '@fontsource-variable/anuphan';
	import { app } from '$lib/constants';
	import '../app.css';
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

{@render children()}

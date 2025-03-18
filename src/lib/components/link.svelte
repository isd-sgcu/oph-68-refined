<script lang="ts">
	import { base } from '$app/paths';

	const { href, children, ...props } = $props();
</script>

<a href="{base}{href}" {...props}>
	{@render children?.()}
</a>

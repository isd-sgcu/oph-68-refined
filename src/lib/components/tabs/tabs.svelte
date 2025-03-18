<script lang="ts">
	import { setContext } from 'svelte';

	const { children, ...props } = $props();
	const uid = $props.id();

	setContext('tabs-group-name', uid);
</script>

<div
	class="tabs tabs-box my-5 w-full [&>.tab-content]:rounded-sm"
	style="--vis-xy-label-fill-color: transparent;"
	{...props}
>
	{@render children?.()}
</div>

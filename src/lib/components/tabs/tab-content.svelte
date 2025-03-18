<script lang="ts">
	import { getContext } from 'svelte';

	const {
		value,
		label,
		children,
		selected,
		...props
	}: {
		value?: string;
		label?: string;
		children?: any;
		selected?: boolean;
	} = $props();

	const tabUid = getContext('tabs-group-name');
</script>

<label class="tab">
	<input type="radio" {value} name={`tabs-${tabUid}`} checked={selected} />
	{label}
</label>
<div class="tab-content bg-base-100 mt-1 p-6">
	{@render children?.()}
</div>

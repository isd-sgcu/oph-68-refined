<script lang="ts">
	const { children, tip } = $props();
</script>

<abbr
	class="tooltip hover:bg-base-200 inline-block cursor-help underline decoration-dashed underline-offset-4"
	data-tip={tip}
>
	{@render children?.()}
</abbr>

<script lang="ts">
	export let title: string;
	export let description: string;
	export let value: string;
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
	<div>{title}</div>
	<div class="text-xl font-bold">{value}</div>
	<div class="text-foreground">{description}</div>
	<div class="text-foreground">
		<slot name="icon"></slot>
	</div>
</div>

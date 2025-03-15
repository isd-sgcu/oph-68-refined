<script lang="ts">
	let {
		options = [],
		value = $bindable('all')
	}: {
		options?: {
			label: string;
			value: string;
		}[];
		fromTime?: Date;
		toTime?: Date;
		value?: string;
	} = $props();
</script>

<label class="">
	<span class="text-sm font-semibold text-gray-700">ช่วงเวลา</span>
	<select class="select w-max" bind:value>
		<option value="all">ทั้งหมด</option>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</label>

<script lang="ts">
	const { value = $bindable(0) } = $props();

	const digits = $derived(value.toString().padStart(6, '0').split(''));
</script>

<div aria-live="polite" aria-label={String(value)} class="countdown">
	<span
		class="countdown-single {digits[0] === '0' ? 'opacity-10' : ''}"
		style="--value: {digits[0]}"
	></span>
	<span class="countdown-single" style="--value: {digits[1]}"></span>
	<span class="countdown-single" style="--value: {digits[2]}"></span>,
	<span class="countdown-single" style="--value: {digits[3]}"></span>
	<span class="countdown-single" style="--value: {digits[4]}"></span>
	<span class="countdown-single" style="--value: {digits[5]}"></span>
</div>

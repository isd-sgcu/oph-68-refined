<script lang="ts">
	const { value = $bindable(0) } = $props();

	const digits = $derived(value.toString().padStart(6, '0').split(''));
</script>

{#snippet countdownDigit(value: number, digits: string[], index: number)}
	{@const isGray = value < Math.pow(10, digits.length - index - 1)}
	<span class="countdown-single {isGray ? 'opacity-10' : ''}" style="--value: {digits[index]}"
		>{digits[index]}</span
	>
	{#if index === 2}
		<span class="countdown-comma {isGray ? 'opacity-10' : ''}">,</span>
	{/if}
{/snippet}

<div aria-live="polite" aria-label={String(value)} class="countdown">
	{#each digits as _, index}
		{@render countdownDigit(value, digits, index)}
	{/each}
</div>

<style>
	.countdown > .countdown-single::before {
		content: '0\a 1\a 2\a 3\a 4\a 5\a 6\a 7\a 8\a 9\a';
		white-space: pre;
		top: calc(var(--value) * -1em);
		text-align: center;
		/* transition: all 1s cubic-bezier(1, 0, 0, 1); */
		transition: all 2s
			linear(
				-0,
				0.0033 5.75%,
				0.0132 11.43%,
				0.0296 16.95%,
				0.0522 22.25%,
				0.0808 27.25%,
				0.1149 31.89%,
				0.1542 36.11%,
				0.1981 39.85%,
				0.2779 44.79%,
				0.3654 48.15%,
				0.4422 49.66%,
				0.5807 50.66%,
				0.6769 53.24%,
				0.7253 55.37%,
				0.7714 58.01%,
				0.8142 61.11%,
				0.8536 64.65%,
				0.9158 72.23%,
				0.9619 80.87%,
				0.9904 90.25%,
				1
			);
		position: relative;
	}

	.countdown > .countdown-comma::before {
		content: '';
	}
</style>

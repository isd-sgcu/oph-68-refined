<script lang="ts">
	import { app } from '$lib/constants';
	import { formatNumber } from '$lib/formatter';
	import type { Faculty } from '$lib/types';
	import DownloadIcon from 'lucide-svelte/icons/download';
	import PercentIcon from 'lucide-svelte/icons/percent';
	import FileDigitIcon from 'lucide-svelte/icons/file-digit';

	const sumInterests = (f: Faculty) => f.first_interest + f.second_interest + f.third_interest;

	const {
		sortedFacultiesBySum
	}: {
		sortedFacultiesBySum: Faculty[];
	} = $props();

	let showPercentage = $state(false);

	function exportToCsv() {
		const csv = [
			['faculty', 'first_interest', 'second_interest', 'third_interest', 'total'],
			...sortedFacultiesBySum.map((faculty) => [
				faculty.faculty,
				faculty.first_interest,
				faculty.second_interest,
				faculty.third_interest,
				sumInterests(faculty)
			])
		]
			.map((row) => row.join(','))
			.join('\n');

		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${app.slugName}-interest-faculty-${new Date().toISOString()}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	}

	function formatCellNumber(n: number, i) {
		return showPercentage
			? `${((n / sumInterests(sortedFacultiesBySum[i])) * 100).toFixed(2)}%`
			: formatNumber(n);
	}
</script>

<div class="join mb-4 flex justify-end gap-4">
	<label class="swap btn btn-sm join-item">
		<input type="checkbox" bind:checked={showPercentage} />
		<div class="swap-on">
			ร้อยละ
		</div>
		<div class="swap-off">
			ตัวเลข
		</div>
	</label>

	<button class="btn btn-sm" onclick={exportToCsv}>
		<DownloadIcon class="size-4" />
		ดาวน์โหลดเป็น CSV</button
	>
</div>

<div class="overflow-x-auto">
	<table class="no-prose mt-0 table w-full">
		<thead>
			<tr>
				<th>คณะ/เทียบเท่า</th>
				<th class="text-end">อันดับที่ 1</th>
				<th class="text-end">อันดับที่ 2</th>
				<th class="text-end">อันดับที่ 3</th>
				<th class="text-end">รวม</th>
			</tr>
		</thead>
		<tbody>
			{#each sortedFacultiesBySum as faculty, i}
				<tr>
					<td>{faculty.faculty}</td>
					<td class="text-end tabular-nums">{formatCellNumber(faculty.first_interest, i)}</td>
					<td class="text-end tabular-nums">{formatCellNumber(faculty.second_interest, i)}</td>
					<td class="text-end tabular-nums">{formatCellNumber(faculty.third_interest, i)}</td>
					<td class="text-end tabular-nums"
						>{showPercentage ? '100%' : formatNumber(sumInterests(faculty))}</td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

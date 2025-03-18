<script lang="ts">
	import { app } from '$lib/constants';
	import { formatNumber } from '$lib/formatter';
	import type { Faculty } from '$lib/types';
	import DownloadIcon from 'lucide-svelte/icons/download';

	const sumInterests = (f: Faculty) => f.first_interest + f.second_interest + f.third_interest;

	const {
		sortedFacultiesBySum
	}: {
		sortedFacultiesBySum: Faculty[];
	} = $props();

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
</script>

<div class="mb-4 flex justify-end">
	<button class="btn btn-sm" onclick={exportToCsv}>
		<DownloadIcon class="size-4" />
		ดาวน์โหลดเป็น CSV</button
	>
</div>

<div class="overflow-x-auto">
	<table class="mt-0 table w-full">
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
					<td class="text-end tabular-nums">{formatNumber(faculty.first_interest)}</td>
					<td class="text-end tabular-nums">{formatNumber(faculty.second_interest)}</td>
					<td class="text-end tabular-nums">{formatNumber(faculty.third_interest)}</td>
					<td class="text-end tabular-nums">{formatNumber(sumInterests(faculty))}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

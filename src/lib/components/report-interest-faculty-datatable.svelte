<script lang="ts">
	import { formatNumber } from '$lib/formatter';
	import type { Faculty } from '$lib/types';

	const sumInterests = (f: Faculty) => f.first_interest + f.second_interest + f.third_interest;

	const {
		sortedFacultiesBySum
	}: {
		sortedFacultiesBySum: Faculty[];
	} = $props();
</script>

<div class="overflow-x-auto">
	<table class="table-sm table w-full">
		<thead>
			<tr>
				<th>คณะ</th>
				<th>อันดับที่ 1</th>
				<th>อันดับที่ 2</th>
				<th>อันดับที่ 3</th>
				<th>รวม</th>
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

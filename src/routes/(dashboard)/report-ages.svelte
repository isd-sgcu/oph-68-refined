<script lang="ts">
	import { api } from '$lib/client/api';
	import ReportSection from '$lib/components/report-section.svelte';
	import TabContent from '$lib/components/tabs/tab-content.svelte';
	import Tabs from '$lib/components/tabs/tabs.svelte';
	import { app } from '$lib/constants';
	import { formatNumber, renamerFactory } from '$lib/formatter';
	import type { AgeGroup } from '$lib/types';
	import { createQuery } from '@tanstack/svelte-query';
	import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer, VisXYLabels } from '@unovis/svelte';
	import { Direction, FitMode, Orientation, StackedBar } from '@unovis/ts';
	import DownloadIcon from 'lucide-svelte/icons/download';

	const agesQuery = createQuery({
		queryKey: ['student-ages'],
		queryFn: async () => (await api.get<AgeGroup[]>('/dashboard/ages')).data
	});

	const data = $derived($agesQuery.data?.map((d, index) => ({ ...d, index })) || []);

	const x = $derived((d: AgeGroup, i: number) => i);
	const y = $derived([(d: AgeGroup) => d.count]);

	function exportToCsv() {
		const csv = [['age', 'count'], ...data.map(({ age, count }) => [age, count])]
			.map((row) => row.join(','))
			.join('\n');

		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${app.slugName}-paticipants-age-${new Date().toISOString()}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<ReportSection
	query={agesQuery}
	header="อายุผู้เข้าร่วมงาน"
	style="--vis-xy-label-fill-color: var(--vis-color0);"
>
	<Tabs>
		<TabContent label="กราฟ" selected>
			<VisXYContainer height={2000} {data} yDirection={Direction.South}>
				<VisStackedBar {data} {x} {y} orientation={Orientation.Horizontal} />
				<VisXYLabels
					{data}
					x={(d) => d.count / 2}
					y={(d) => d.index}
					label={(d) => formatNumber(d.count)}
				/>
				<VisTooltip
					triggers={{
						[StackedBar.selectors.bar]: (d) => {
							return `<span style="font-size: var(--text-xs);">อายุ ${d.age} ปี: ${formatNumber(d.count)} คน</span>`;
						}
					}}
				/>
				<VisAxis type="x" tickFormat={(d) => formatNumber(d)} label="จำนวน" />
				<VisAxis
					type="y"
					tickTextWidth={null}
					tickTextFitMode={FitMode.Trim}
					numTicks={data?.length}
					tickFormat={(d, i: number) => data[i].age}
				/>
			</VisXYContainer>
		</TabContent>
		<TabContent label="ตาราง">
			<div class="mb-4 flex justify-end">
				<button class="btn btn-sm" onclick={exportToCsv}>
					<DownloadIcon class="size-4" />
					ดาวน์โหลดเป็น CSV</button
				>
			</div>
			<div class="overflow-x-auto">
				<table class="table-compact table-striped table">
					<thead>
						<tr>
							<th>อายุ (ปี)</th>
							<th>จำนวน</th>
						</tr>
					</thead>
					<tbody>
						{#each data as { age, count }, index}
							<tr>
								<td>{age}</td>
								<td class="text-end">{formatNumber(count)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</TabContent>
	</Tabs>
</ReportSection>

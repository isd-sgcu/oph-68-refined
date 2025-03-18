<script lang="ts">
	import { api } from '$lib/client/api';
	import ReportSection from '$lib/components/report-section.svelte';
	import TabContent from '$lib/components/tabs/tab-content.svelte';
	import Tabs from '$lib/components/tabs/tabs.svelte';
	import { app } from '$lib/constants';
	import { formatNumber, renamerFactory } from '$lib/formatter';
	import type { StudentStatus } from '$lib/types';
	import { createQuery } from '@tanstack/svelte-query';
	import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer, VisXYLabels } from '@unovis/svelte';
	import { StackedBar } from '@unovis/ts';
	import DownloadIcon from 'lucide-svelte/icons/download';

	const studentStatusQuery = createQuery({
		queryKey: ['student-status'],
		queryFn: async () => (await api.get<StudentStatus[]>('/dashboard/status')).data
	});

	const data = $derived($studentStatusQuery.data?.map((d, index) => ({ ...d, index })) || []);

	const x = (d: StudentStatus & { index: number }) => d.index;
	const y = [(d: StudentStatus) => d.count];
	const renamer = renamerFactory({
		'ประกาศนียบัตรวิชาชีพ / ประกาศนียบัตรวิชาชีพชั้นสูง': 'ปวช./ปวส.',
		ปริญญาตรี: 'ป.ตรี',
		'ปริญญาโท / ปริญญาเอก': 'ป.โท/เอก',
		มัธยมศึกษาตอนต้น: 'ม.ต้น',
		มัธยมศึกษาตอนปลาย: 'ม.ปลาย'
	});

	function exportToCsv() {
		const csv = [['status', 'count'], ...data.map((d, i) => [d.status, d.count])]
			.map((row) => row.join(','))
			.join('\n');

		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${app.slugName}-student-status-${new Date().toISOString()}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<ReportSection
	query={studentStatusQuery}
	header="ระดับการศึกษา"
	style="--vis-xy-label-fill-color: var(--vis-color0)"
>
	<Tabs>
		<TabContent label="กราฟ" selected>
			<VisXYContainer {data}>
				<VisTooltip
					triggers={{
						[StackedBar.selectors.bar]: (d: StudentStatus) => {
							return `<span style="font-size: var(--text-xs);">${d.status}: ${formatNumber(d.count)} คน</span>`;
						}
					}}
				/>
				<VisStackedBar {x} {y} />
				<VisAxis
					type="x"
					numTicks={data.length}
					tickFormat={(d, i: number) => renamer(data[i].status)}
					label="สถานภาพ"
				/>
				<VisAxis type="y" tickFormat={(d: number) => formatNumber(d)} />
				<VisXYLabels
					x={(d) => d.index}
					y={(d) => d.count / 2}
					label={(d) => formatNumber(d.count)}
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
							<th>สถานภาพ</th>
							<th>จำนวน</th>
						</tr>
					</thead>
					<tbody>
						{#each data as { status, count }, index}
							<tr>
								<td>{renamer(status)}</td>
								<td>{formatNumber(count)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</TabContent>
	</Tabs>
</ReportSection>

<script lang="ts">
	import { api } from '$lib/client/api';
	import ReportSection from '$lib/components/report-section.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import type { KnownSource } from '$lib/types';
	import { formatNumber, textJoin } from '$lib/formatter';
	import {
		VisXYContainer,
		VisStackedBar,
		VisAxis,
		VisXYLabels,
		VisTooltip,
	} from '@unovis/svelte';
	import { StackedBar } from '@unovis/ts';
	import { app, SHOW_MOCK_DATA } from '$lib/constants';
	import { mediaSources } from '$lib/mock';
	import DownloadIcon from 'lucide-svelte/icons/download';
	import Tabs from '$lib/components/tabs/tabs.svelte';
	import TabContent from '$lib/components/tabs/tab-content.svelte';

	const sourcesQuery = createQuery({
		queryKey: ['media-sources'],
		queryFn: async () => {
			if (SHOW_MOCK_DATA) {
				return Promise.resolve(mediaSources);
			} else {
				const response = await api.get<KnownSource[]>('/dashboard/sources');
				return response.data;
			}
		}
	});

	const replaceSourceNameMap: Record<string, string> = {
		Other: 'อื่น ๆ'
	};

	function renameSource(source: string) {
		return source in replaceSourceNameMap ? replaceSourceNameMap[source] : source;
	}

	const top3sources = $derived(
		$sourcesQuery.data
			?.toSorted((a, b) => b.count - a.count)
			.map((v) => ({
				...v,
				source: renameSource(v.source)
			}))
			.slice(0, 3) || []
	);
	const data = $derived($sourcesQuery.data?.map((d, index) => ({ ...d, index })) || []);

	const x = (d: KnownSource & { index: number }) => d.index;
	const y = [(d: KnownSource) => d.count];

	function exportToCsv() {
		const csv = [['no', 'source', 'count'], ...data.map((d, i) => [i + 1, d.source, d.count])]
			.map((row) => row.join(','))
			.join('\n');

		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${app.slugName}-media-sources-${new Date().toISOString()}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<ReportSection header="แหล่งข่าวสารเกี่ยวกับงาน" level="h2" query={sourcesQuery}>
	{#if data && top3sources}
		<p>
			ผุ้ที่ลงทะเบียนได้รับข่าวสารมากที่สุดจาก {textJoin(
				top3sources.map((s) => `${s.source} (${formatNumber(s.count)} คน)`)
			)}
		</p>

		<Tabs>
			<TabContent label="กราฟ" selected>
				<VisXYContainer {data}>
					<VisTooltip
						triggers={{
							[StackedBar.selectors.bar]: (d) => {
								return `<span style="font-size: var(--text-xs);">จำนวน ${formatNumber(d.count)} คน</span>`;
							}
						}}
					/>
					<VisStackedBar {x} {y} />
					<VisAxis
						type="x"
						tickFormat={(d, i: number) => renameSource(data[i].source)}
						numTicks={data.length}
						label="แหล่งที่ทราบข่าวสาร"
					/>
					<VisAxis type="y" tickFormat={(d) => formatNumber(d)} />
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
				<table class="mt-0 table w-full">
					<thead>
						<tr>
							<th>ลำดับ</th>
							<th>แหล่งข่าวสาร</th>
							<th class="text-end">จำนวนคน</th>
						</tr>
					</thead>
					<tbody>
						{#each data as source, i}
							<tr>
								<td>{i + 1}</td>
								<td>{source.source}</td>
								<td class="text-end">{formatNumber(source.count)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</TabContent>
		</Tabs>
	{/if}
</ReportSection>

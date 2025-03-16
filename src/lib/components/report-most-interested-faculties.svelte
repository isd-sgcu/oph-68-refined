<script lang="ts">
	import { formatNumber, textJoin } from '$lib/formatter';
	import type { Faculty } from '$lib/types';
	import {
		VisXYContainer,
		VisStackedBar,
		VisAxis,
		VisBulletLegend,
		VisTooltip,
		VisXYLabels
	} from '@unovis/svelte';
	import { FitMode, Direction, Orientation, StackedBar } from '@unovis/ts';
	import ReportSection from './report-section.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { interestedFaculties } from '$lib/mock';
	import { SHOW_MOCK_DATA } from '$lib/constants';
	import { api } from '$lib/client/api';
	import Tooltip from './tooltip.svelte';

	const sumInterests = (f: Faculty) => f.first_interest + f.second_interest + f.third_interest;

	const interestedFacultiesQuery = createQuery({
		queryKey: ['interested-faculties'],
		queryFn: async () => {
			if (SHOW_MOCK_DATA) {
				return Promise.resolve(interestedFaculties);
			} else {
				const response = await api.get<Faculty[]>('/dashboard/faculties');
				return response.data;
			}
		},
		initialData: []
	});
	const data = $derived($interestedFacultiesQuery.data);
	const top3interestedFaculties = $derived(
		data?.sort((a, b) => sumInterests(b) - sumInterests(a)).slice(0, 3)
	);

	const mostFirstInterestedFaculty = $derived(
		data?.sort((a, b) => b.first_interest - a.first_interest).slice(0, 1)[0]
	);

	const sortedFacultiesBySum = $derived(
		data?.sort((a, b) => sumInterests(b) - sumInterests(a)) || []
	);

	const chartLabels = [
		{
			key: 'first_interest',
			legend: 'อันดับที่ 1',
			tooltip: (d: Faculty) =>
				`อันดับที่ 1: <span style="color: var(--vis-color0); font-weight: 800">${d.first_interest} คน</span>`
		},
		{
			key: 'second_interest',
			legend: 'อันดับที่ 2',
			tooltip: (d: Faculty) =>
				`อันดับที่ 2: <span style="color: var(--vis-color1); font-weight: 800">${d.second_interest} คน</span>`
		},
		{
			key: 'third_interest',
			legend: 'อันดับที่ 3',
			tooltip: (d: Faculty) =>
				`อันดับที่ 3: <span style="color: var(--vis-color2); font-weight: 800">${d.third_interest} คน</span>`
		}
	];

	const isSmallScreen = window?.innerWidth < 768;
	const x = (d: Faculty, i: number) => i;
	const y = chartLabels.map((i) => (d: Faculty) => d[i.key]);
	const tickFormat = (_, i: number) => data[i].faculty;

	function tooltipTemplate(d: Faculty): string {
		const title = `<div style="color: #666; text-align: center">${d.faculty}</div>`;
		const stats = chartLabels.map((l) => l.tooltip(d)).join(' | ');
		return `<div style="font-size: 12px">${title}${stats}</div>`;
	}
</script>

{#snippet interestRankingRow(rank: number, faculty: Faculty)}
	<li class="list-row">
		<div class="text-4xl tabular-nums opacity-50">
			{rank}
		</div>
		<div class="flex flex-col">
			<span class="text-lg font-semibold">
				{faculty.faculty}
			</span>
			<span class="tabular-nums">
				{formatNumber(sumInterests(faculty))} คน
			</span>
		</div>
	</li>
{/snippet}

<ReportSection header="คณะที่สนใจมากที่สุด" query={interestedFacultiesQuery}>
	{#if mostFirstInterestedFaculty && top3interestedFaculties}
		คณะที่
		<Tooltip tip="มีจำนวนคนที่เลือกให้อยู่ในอันดับ 1-3 มากที่สุด">
			ได้รับความสนใจอันดับที่ 1
		</Tooltip>
		คือ {top3interestedFaculties?.[0].faculty} ({formatNumber(
			sumInterests(top3interestedFaculties[0])
		)} คน) รองลงมาคือ {textJoin(top3interestedFaculties?.slice(1).map((f) => f.faculty))} ตามลำดับ โดยคณะที่มีอัตราส่วนคนเลือกอับดับที่
		1 เยอะที่สุดคือ{mostFirstInterestedFaculty?.faculty}
		({Math.round(
			(mostFirstInterestedFaculty?.first_interest * 100) / sumInterests(mostFirstInterestedFaculty)
		)}% ของผู้ที่เลือก{mostFirstInterestedFaculty?.faculty})
		<div class="my-4">
			<ul class="list list-col-wrap bg-base-200 rounded-box list-none shadow-md">
				<li class="p-4 pb-2 text-xs tracking-wide opacity-60">
					3 อันดับคณะที่ได้รับความสนใจมากที่สุด
				</li>

				{#each top3interestedFaculties as interestedFaculties, i}
					{@render interestRankingRow(i + 1, interestedFaculties)}
				{/each}
			</ul>
		</div>

		<VisBulletLegend items={chartLabels.map((d) => ({ name: d.legend }))} />
		<VisXYContainer height={isSmallScreen ? 600 : 800} yDirection={Direction.South}>
			<VisStackedBar {data} {x} {y} orientation={Orientation.Horizontal} />
			<VisTooltip triggers={{ [StackedBar.selectors.bar]: tooltipTemplate }} />
			<VisAxis type="x" label="จำนวนการลงทะเบียน" />
			<VisAxis
				type="y"
				tickTextWidth={isSmallScreen ? 75 : null}
				tickTextFitMode={FitMode.Trim}
				label={isSmallScreen ? null : 'คณะ'}
				numTicks={data?.length}
				{tickFormat}
			/>
		</VisXYContainer>
	{/if}
</ReportSection>

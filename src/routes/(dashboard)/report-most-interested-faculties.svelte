<script lang="ts">
	import ReportInterestFacultyDatatable from './report-most-interested-faculties-datatable.svelte';
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
	import ReportSection from '$lib/components/report-section.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { interestedFaculties } from '$lib/mock';
	import { SHOW_MOCK_DATA } from '$lib/constants';
	import { api } from '$lib/client/api';
	import Tooltip from '$lib/components/tooltip.svelte';
	import Tabs from '$lib/components/tabs/tabs.svelte';
	import TabContent from '$lib/components/tabs/tab-content.svelte';

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
		}
	});
	const data = $derived($interestedFacultiesQuery.data);
	const top3interestedFaculties = $derived(
		data?.sort((a, b) => sumInterests(b) - sumInterests(a)).slice(0, 3) || []
	);

	const mostFirstInterestedFaculty = $derived(
		data?.sort((a, b) => b.first_interest - a.first_interest).slice(0, 1)[0]
	);

	const sortedFacultiesBySum = $derived(
		data?.sort((a, b) => sumInterests(b) - sumInterests(a)).map((v, i) => ({ ...v, i })) || []
	);

	const labels = {
		first_interest: 'อันดับที่ 1',
		second_interest: 'อันดับที่ 2',
		third_interest: 'อันดับที่ 3'
	};

	const chartLabels = [
		{
			key: 'first_interest',
			legend: 'อันดับที่ 1',
			tooltip: (d: Faculty) =>
				`อันดับที่ 1: <span style="color: var(--vis-color0); font-weight: 800">${formatNumber(d.first_interest)} คน</span>`
		},
		{
			key: 'second_interest',
			legend: 'อันดับที่ 2',
			tooltip: (d: Faculty) =>
				`อันดับที่ 2: <span style="color: var(--vis-color1); font-weight: 800">${formatNumber(d.second_interest)} คน</span>`
		},
		{
			key: 'third_interest',
			legend: 'อันดับที่ 3',
			tooltip: (d: Faculty) =>
				`อันดับที่ 3: <span style="color: var(--vis-color2); font-weight: 800">${formatNumber(d.third_interest)} คน</span>`
		}
	];

	let clientWidth = $state(0);
	const isSmallScreen = $derived(clientWidth < 768);

	const x = (d: Faculty, i: number) => i;
	const y = chartLabels.map((i) => (d: Faculty) => d[i.key]);
	const tickFormat = (d, i: number) => sortedFacultiesBySum[i].faculty;

	function tooltipTemplate(d: Faculty): string {
		const title = `<div style="color: #666; font-weight: bold;">${d.faculty}</div>`;
		const total = `<div style="font-size: 12px; font-weight: bold;">รวม ${formatNumber(sumInterests(d))} คน</div>`;
		const stats = chartLabels.map((l) => l.tooltip(d)).join('<br/>');
		return `<div style="font-size: 12px">${title}${stats}${total}</div>`;
	}

	function tooltipIndividual(d: Faculty) {
		const title = `<div style="color: #666; font-weight: bold;">${d.faculty}</div>`;
		const stats = chartLabels
			.filter((l) => !isNaN(d[l.key]))
			.map((l) => l.tooltip(d))
			.join('<br/>');
		return `<div style="font-size: 12px">${title}${stats}</div>`;
	}

	function sortedByColumn(
		sortedFacultiesBySum: Faculty[],
		column: 'first_interest' | 'second_interest' | 'third_interest'
	) {
		return sortedFacultiesBySum
			.toSorted((a, b) => b[column] - a[column])
			.map((v, i) => ({
				faculty: v.faculty,
				[column]: v[column],
				i
			}));
	}
</script>

<svelte:window bind:innerWidth={clientWidth} />

{#snippet rankingGraph(
	sortedFacultiesBySum: Faculty[],
	column: 'first_interest' | 'second_interest' | 'third_interest'
)}
	{@const dataSortedByColumn = sortedByColumn(sortedFacultiesBySum, column)}
	<VisXYContainer height={1200} yDirection={Direction.South}>
		<VisStackedBar data={dataSortedByColumn} {x} {y} orientation={Orientation.Horizontal} />
		<VisXYLabels
			data={dataSortedByColumn}
			x={(d) => d[column] / 2}
			y={(d) => d.i}
			label={(d) => formatNumber(d[column])}
		/>
		<VisTooltip
			triggers={{
				[StackedBar.selectors.bar]: tooltipIndividual
			}}
		/>
		<VisAxis
			type="x"
			tickFormat={(d) => formatNumber(d)}
			label="จำนวนการลงทะเบียน{labels[column]}"
		/>
		<VisAxis
			type="y"
			tickTextWidth={null}
			tickTextFitMode={FitMode.Trim}
			label={isSmallScreen ? null : 'คณะ'}
			numTicks={dataSortedByColumn?.length}
			tickFormat={(d, i: number) => dataSortedByColumn[i].faculty}
		/>
	</VisXYContainer>
{/snippet}

<ReportSection header="คณะที่สนใจมากที่สุด" query={interestedFacultiesQuery}>
	{#if mostFirstInterestedFaculty && top3interestedFaculties}
		<p>
			คณะที่<Tooltip tip="มีจำนวนคนที่เลือกให้อยู่ในอันดับ 1-3 มากที่สุด">
				ได้รับความสนใจอันดับที่ 1
			</Tooltip> คือ {top3interestedFaculties?.[0].faculty} ({formatNumber(
				sumInterests(top3interestedFaculties[0])
			)} คน) รองลงมาคือ {textJoin(top3interestedFaculties?.slice(1).map((f) => f.faculty))} ตามลำดับ
			โดยคณะที่มีอัตราส่วนคนเลือกอับดับที่ 1 เยอะที่สุดคือ{mostFirstInterestedFaculty?.faculty}
			({Math.round(
				(mostFirstInterestedFaculty?.first_interest * 100) /
					sumInterests(mostFirstInterestedFaculty)
			)}% ของผู้ที่เลือก{mostFirstInterestedFaculty?.faculty})
		</p>
	{/if}

	<Tabs>
		<TabContent label="ภาพรวม" selected>
			<div class="flex flex-col items-end">
				<VisBulletLegend items={chartLabels.map((d) => ({ name: d.legend }))} />
			</div>
			<VisXYContainer height={1200} yDirection={Direction.South}>
				<VisStackedBar data={sortedFacultiesBySum} {x} {y} orientation={Orientation.Horizontal} />
				<VisXYLabels
					data={sortedFacultiesBySum}
					x={(d) => d.first_interest / 2}
					y={(d) => d.i}
					label={(d) => formatNumber(d.first_interest)}
				/>
				<VisXYLabels
					data={sortedFacultiesBySum}
					x={(d) => d.first_interest + d.second_interest / 2}
					y={(d) => d.i}
					label={(d) => formatNumber(d.second_interest)}
				/>
				<VisXYLabels
					data={sortedFacultiesBySum}
					x={(d) => d.first_interest + d.second_interest + d.third_interest / 2}
					y={(d) => d.i}
					label={(d) => formatNumber(d.third_interest)}
				/>
				<VisTooltip triggers={{ [StackedBar.selectors.bar]: tooltipTemplate }} />
				<VisAxis type="x" tickFormat={(d) => formatNumber(d)} label="จำนวนการลงทะเบียน" />
				<VisAxis
					type="y"
					tickTextWidth={null}
					tickTextFitMode={FitMode.Trim}
					label={isSmallScreen ? null : 'คณะ'}
					numTicks={sortedFacultiesBySum?.length}
					{tickFormat}
				/>
			</VisXYContainer>
		</TabContent>

		<TabContent label="อันดับ 1">
			{@render rankingGraph(sortedFacultiesBySum, 'first_interest')}
		</TabContent>

		<TabContent label="อันดับ 2">
			{@render rankingGraph(sortedFacultiesBySum, 'second_interest')}
		</TabContent>

		<TabContent label="อันดับ 3">
			{@render rankingGraph(sortedFacultiesBySum, 'third_interest')}
		</TabContent>

		<TabContent label="ตาราง">
			<ReportInterestFacultyDatatable {sortedFacultiesBySum} />
		</TabContent>
	</Tabs>
</ReportSection>

<script lang="ts">
	import { formatNumber, textJoin } from '$lib/formatter';
	import type { Faculty } from '$lib/types';
	import { BarChart } from 'layerchart';
	import ReportSection from './report-section.svelte';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		ArcElement,
		CategoryScale,
		LinearScale,
		BarController,
		BarElement
	} from 'chart.js';
	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		ArcElement,
		CategoryScale,
		LinearScale,
		BarController,
		BarElement
	);

	const {
		data = $bindable(),
		...props
	}: {
		data: Faculty[] | undefined;
	} = $props();

	const sumInterests = (f: Faculty) => f.first_interest + f.second_interest + f.third_interest;
	const top3interestedFaculties = $derived(
		data?.sort((a, b) => sumInterests(b) - sumInterests(a)).slice(0, 3)
	);

	const mostFirstInterestedFaculty = $derived(
		data?.sort((a, b) => b.first_interest - a.first_interest).slice(0, 1)[0]
	);

	const sortedFacultiesBySum = $derived(
		data?.sort((a, b) => sumInterests(b) - sumInterests(a)) || []
	);

	let stackedMostInterestedFacultyElement: HTMLCanvasElement;

	$effect(() => {
		const datasets = [
			{
				label: 'อันดับที่ 1',
				data: sortedFacultiesBySum.map((f) => f.first_interest),
				backgroundColor: '#FF6384'
			},
			{
				label: 'อันดับที่ 2',
				data: sortedFacultiesBySum.map((f) => f.second_interest),
				backgroundColor: '#36A2EB'
			},
			{
				label: 'อันดับที่ 3',
				data: sortedFacultiesBySum.map((f) => f.third_interest),
				backgroundColor: '#FFCE56'
			}
		];
		const stackedBar = new ChartJS(stackedMostInterestedFacultyElement, {
			type: 'bar',
			data: {
				labels: sortedFacultiesBySum.map((f) => f.faculty),
				datasets
			},
			options: {
				font: {
					family: "'Anuphan Variable', sans-serif"
				},
				plugins: {
					tooltip: {
						mode: 'index',
						intersect: false,
						axis: 'y',
						callbacks: {
							label: function (tooltipItems) {
								return `${tooltipItems.dataset.label}: ${formatNumber(tooltipItems.parsed.x)} คน`;
							},
							footer: function (tooltipItems) {
								return `รวม: ${formatNumber(tooltipItems.map((t) => t.parsed.x).reduce((p, c) => p + c, 0))} คน`;
							}
						}
					}
				},
				indexAxis: 'y',
				responsive: true,
				scales: {
					x: {
						stacked: true
					},
					y: {
						stacked: true
					}
				}
			}
		});
		return () => stackedBar.destroy();
	});
</script>

{#snippet interestRankingRow(rank: string, faculty: Faculty)}
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

<ReportSection header="คณะที่สนใจมากที่สุด" {...props}>
	{#if mostFirstInterestedFaculty}
		คณะที่ได้รับความสนใจอันดับที่ 1 คือ {top3interestedFaculties?.[0].faculty} รองลงมาคือ {textJoin(
			top3interestedFaculties?.slice(1).map((f) => f.faculty)
		)} ตามลำดับ โดยคณะที่มีอัตราส่วนคนเลือกอับดับที่ 1 เยอะที่สุดคือ{mostFirstInterestedFaculty?.faculty}
		({Math.round(
			(mostFirstInterestedFaculty?.first_interest * 100) / sumInterests(mostFirstInterestedFaculty)
		)}% ของผู้ที่เลือก{mostFirstInterestedFaculty?.faculty})
	{/if}
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

	<canvas bind:this={stackedMostInterestedFacultyElement}></canvas>
</ReportSection>

<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import ProseContent from '$lib/components/prose-content.svelte';
	import Stat from './stat.svelte';
	import TicketCheck from 'lucide-svelte/icons/ticket-check';
	import { scaleTime } from 'd3-scale';

	import {
		Chart,
		Svg,
		Axis,
		Bars,
		LinearGradient,
		Area,
		Canvas,
		Spline,
		LineChart,
		AreaChart,
		Rule,
		RectClipPath,
		Tooltip,
		Highlight
	} from 'layerchart';

	import { app } from '$lib/constants';
	import { users } from '$lib/mock';
	import { curveCatmullRom } from 'd3-shape';

	const dateSeriesData = [
		{ date: new Date('2022-01-01'), value: 10 },
		{ date: new Date('2022-01-02'), value: 20 },
		{ date: new Date('2022-01-03'), value: 30 },
		{ date: new Date('2022-01-04'), value: 40 },
		{ date: new Date('2022-01-05'), value: 50 },
		{ date: new Date('2022-01-06'), value: 60 },
		{ date: new Date('2022-01-07'), value: 70 },
		{ date: new Date('2022-01-08'), value: 80 },
		{ date: new Date('2022-01-09'), value: 90 },
		{ date: new Date('2022-01-10'), value: 100 }
	];
</script>

<svelte:head>
	<title>{app.titleTemplate('แดชบอร์ด')}</title>
</svelte:head>

{#snippet stat(title: string, description: string, value: string, icon: any)}
	<Card class="max-w-max">
		<div class="flex items-center gap-4">
			<div class="flex flex-col gap-2">
				<div class="text-sm">{title}</div>
				<div class="text-foreground text-2xl font-bold">{value}</div>
				<div class="text-sm">{description}</div>
			</div>
			<div class="flex flex-col items-center justify-center">
				<svelte:component this={icon} class="size-8 shrink-0" />
			</div>
		</div>
	</Card>
{/snippet}

<ProseContent>
	<h1>ภาพรวมโดยทั่วไป</h1>

	<!-- <div class="flex w-full flex-col sm:flex-row sm:justify-evenly">
		{@render stat('จำนวนผู้ใช้งาน', 'จำนวนผู้ใช้งานทั้งหมด', users.length.toString(), TicketCheck)}
		{@render stat('จำนวนผู้ใช้งาน', 'จำนวนผู้ใช้งานทั้งหมด', users.length.toString(), TicketCheck)}
		{@render stat('จำนวนผู้ใช้งาน', 'จำนวนผู้ใช้งานทั้งหมด', users.length.toString(), TicketCheck)}
	</div> -->

	<h2>จำนวนการลงทะเบียนรายวัน</h2>
</ProseContent>

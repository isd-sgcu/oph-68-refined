<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import ProseContent from '$lib/components/prose-content.svelte';
	import Stat from './stat.svelte';
	import TicketCheck from 'lucide-svelte/icons/ticket-check';
	import { Area, AreaChart, Chart, LinearGradient } from 'layerchart';

	import { app } from '$lib/constants';
	import { users } from '$lib/mock';
	import { type Component } from 'svelte';

	const dateSeriesData = [
		{
			date: new Date('2025-02-07T17:00:00.000Z'),
			value: 70
		},
		{
			date: new Date('2025-02-08T17:00:00.000Z'),
			value: 56
		},
		{
			date: new Date('2025-02-09T17:00:00.000Z'),
			value: 98
		},
		{
			date: new Date('2025-02-10T17:00:00.000Z'),
			value: 62
		},
		{
			date: new Date('2025-02-11T17:00:00.000Z'),
			value: 61
		},
		{
			date: new Date('2025-02-12T17:00:00.000Z'),
			value: 59
		},
		{
			date: new Date('2025-02-13T17:00:00.000Z'),
			value: 73
		},
		{
			date: new Date('2025-02-14T17:00:00.000Z'),
			value: 57
		},
		{
			date: new Date('2025-02-15T17:00:00.000Z'),
			value: 51
		},
		{
			date: new Date('2025-02-16T17:00:00.000Z'),
			value: 88
		},
		{
			date: new Date('2025-02-17T17:00:00.000Z'),
			value: 53
		},
		{
			date: new Date('2025-02-18T17:00:00.000Z'),
			value: 91
		},
		{
			date: new Date('2025-02-19T17:00:00.000Z'),
			value: 66
		},
		{
			date: new Date('2025-02-20T17:00:00.000Z'),
			value: 75
		},
		{
			date: new Date('2025-02-21T17:00:00.000Z'),
			value: 61
		},
		{
			date: new Date('2025-02-22T17:00:00.000Z'),
			value: 74
		},
		{
			date: new Date('2025-02-23T17:00:00.000Z'),
			value: 97
		},
		{
			date: new Date('2025-02-24T17:00:00.000Z'),
			value: 98
		},
		{
			date: new Date('2025-02-25T17:00:00.000Z'),
			value: 78
		},
		{
			date: new Date('2025-02-26T17:00:00.000Z'),
			value: 92
		},
		{
			date: new Date('2025-02-27T17:00:00.000Z'),
			value: 65
		},
		{
			date: new Date('2025-02-28T17:00:00.000Z'),
			value: 99
		},
		{
			date: new Date('2025-03-01T17:00:00.000Z'),
			value: 87
		},
		{
			date: new Date('2025-03-02T17:00:00.000Z'),
			value: 63
		},
		{
			date: new Date('2025-03-03T17:00:00.000Z'),
			value: 71
		},
		{
			date: new Date('2025-03-04T17:00:00.000Z'),
			value: 77
		},
		{
			date: new Date('2025-03-05T17:00:00.000Z'),
			value: 98
		},
		{
			date: new Date('2025-03-06T17:00:00.000Z'),
			value: 63
		},
		{
			date: new Date('2025-03-07T17:00:00.000Z'),
			value: 67
		},
		{
			date: new Date('2025-03-08T17:00:00.000Z'),
			value: 96
		}
	];
</script>

<svelte:head>
	<title>{app.titleTemplate('แดชบอร์ด')}</title>
</svelte:head>

{#snippet stat(title: string, description: string, value: string, icon: Component)}
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

	<div class="flex w-full flex-col sm:flex-row sm:justify-evenly">
		{@render stat('จำนวนผู้ใช้งาน', 'จำนวนผู้ใช้งานทั้งหมด', users.length.toString(), TicketCheck)}
		{@render stat('จำนวนผู้ใช้งาน', 'จำนวนผู้ใช้งานทั้งหมด', users.length.toString(), TicketCheck)}
		{@render stat('จำนวนผู้ใช้งาน', 'จำนวนผู้ใช้งานทั้งหมด', users.length.toString(), TicketCheck)}
	</div>

	<h2>จำนวนการลงทะเบียนรายวัน</h2>
	<div class="h-[300px] rounded p-4">
		<AreaChart data={dateSeriesData} x="date" y="value">
			<svelte:fragment slot="marks">
				<LinearGradient class="from-green-600/50 to-green-600/0" vertical let:gradient>
					<Area line={{ class: 'stroke-blue-600' }} fill={gradient} />
				</LinearGradient>
			</svelte:fragment>
		</AreaChart>
	</div>
	<!-- <Card class="w-full"></Card> -->
</ProseContent>

<script lang="ts">
	import Card from '$lib/components/card.svelte';
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
	import ReportSection from '$lib/components/report-section.svelte';
	import ReportDailyRegister from '$lib/components/report-daily-register.svelte';
	import StatCurrentSignupCount from './stat-signup-count.svelte';
	import DurationSelector from '$lib/components/duration-selector.svelte';
	import ContentWrapper from '$lib/components/content-wrapper.svelte';

	const filter = $state({
		value: 'all'
	});
</script>

<svelte:head>
	<title>{app.titleTemplate('แดชบอร์ด')}</title>
</svelte:head>

<ContentWrapper>
	{#snippet breadcrumbs()}
		<li>
			<a href="/">ภาพรวม</a>
		</li>
	{/snippet}

	<h1>ภาพรวมโดยทั่วไป</h1>

	<div class="stats flex-col shadow md:flex-row">
		<StatCurrentSignupCount />
		<StatCurrentSignupCount
			label="ลงทะเบียนวันนี้"
			fromTime={new Date(new Date().setHours(0, 0, 0, 0))}
			toTime={new Date()}
		/>
	</div>
	<pre>{JSON.stringify(filter)}</pre>

	<ReportDailyRegister />
</ContentWrapper>

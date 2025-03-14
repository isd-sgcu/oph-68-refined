<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import ProseContent from '$lib/components/prose-content.svelte';
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
	import StatCurrentSignupCount from './stat-current-signup-count.svelte';
</script>

<svelte:head>
	<title>{app.titleTemplate('แดชบอร์ด')}</title>
</svelte:head>

<ProseContent>
	<h1>ภาพรวมโดยทั่วไป</h1>

	<div class="stats flex-col shadow md:flex-row">
		<StatCurrentSignupCount />

		<!-- <div class="stat">
			<div class="stat-figure text-secondary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block h-8 w-8 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 10V3L4 14h7v7l9-11h-7z"
					></path>
				</svg>
			</div>
			<div class="stat-title">Page Views</div>
			<div class="stat-value text-secondary">2.6M</div>
			<div class="stat-desc">21% more than last month</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-secondary">
				<div class="avatar online">
					<div class="w-16 rounded-full">
						<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
					</div>
				</div>
			</div>
			<div class="stat-value">86%</div>
			<div class="stat-title">Tasks done</div>
			<div class="stat-desc text-secondary">31 tasks remaining</div>
		</div> -->
	</div>

	<ReportDailyRegister />
</ProseContent>

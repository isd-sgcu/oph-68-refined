<script lang="ts">
	import { LOCALE, SHOW_MOCK_DATA } from '$lib/constants';
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
	import ContentWrapper from '$lib/components/content-wrapper.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import axios from 'axios';
	import { interestedFaculties } from '$lib/mock';
	import type { Faculty } from '$lib/types';
	import ReportMostInterestedFaculties from '$lib/components/report-most-interested-faculties.svelte';
	import { formatMediumDateStyle, formatShortTimeStyle } from '$lib/formatter';
	import { api } from '$lib/client/api';

	const filter = $state({
		value: 'all'
	});

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
</script>

<svelte:head>
	<title>{app.titleTemplate('แดชบอร์ด')}</title>
</svelte:head>

<ContentWrapper>
	<h1>ภาพรวมโดยทั่วไป</h1>
	<p>
		รายงานอย่างไม่เป็นทางการ (ข้อมูล ณ {formatMediumDateStyle(
			$interestedFacultiesQuery.dataUpdatedAt
		)}
		{formatShortTimeStyle($interestedFacultiesQuery.dataUpdatedAt)} น.)
	</p>
	<h2>วิเคราะห์ข้อมูลละเอียด</h2>
	<ReportMostInterestedFaculties data={$interestedFacultiesQuery.data} />
</ContentWrapper>

<script lang="ts">
	import { LOCALE, SHOW_MOCK_DATA } from '$lib/constants';
	import Card from '$lib/components/card.svelte';
	import TicketCheck from 'lucide-svelte/icons/ticket-check';
	import { scaleTime } from 'd3-scale';

	import { app } from '$lib/constants';
	import ContentWrapper from '$lib/components/content-wrapper.svelte';
	import ReportMostInterestedFaculties from '$lib/components/report-most-interested-faculties.svelte';
	import ReportRegistrationCount from '$lib/components/report-registration-count.svelte';
	import { BarChart } from 'layerchart';
</script>

<svelte:head>
	<title>{app.titleTemplate('แดชบอร์ด')}</title>
</svelte:head>

<ContentWrapper>
	<h1>ภาพรวมโดยทั่วไป</h1>

	<ReportRegistrationCount />
	<ReportMostInterestedFaculties />
</ContentWrapper>

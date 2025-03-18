<script lang="ts">
	import { app } from '$lib/constants';

	import ContentWrapper from '$lib/components/content-wrapper.svelte';
	import ReportMostInterestedFaculties from './report-most-interested-faculties.svelte';
	import ReportRegistrationCount from './report-registration-count.svelte';
	import ReportReferralSource from './report-referral-source.svelte';
	import ReportStudentStatus from './report-student-status.svelte';
	import ReportAges from './report-ages.svelte';
</script>

<svelte:head>
	<title>{app.titleTemplate('แดชบอร์ด')}</title>
</svelte:head>

<ContentWrapper>
	{#snippet breadcrumbs()}
		<li>
			<a href="/" class="">ภาพรวม</a>
		</li>
	{/snippet}
	<h1>ภาพรวมโดยทั่วไป</h1>

	<ReportRegistrationCount />
	<ReportMostInterestedFaculties />
	<ReportReferralSource />
	<ReportStudentStatus />
	<ReportAges />
</ContentWrapper>

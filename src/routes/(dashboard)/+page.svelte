<script lang="ts">
	import { app } from '$lib/constants';

	import ContentWrapper from '$lib/components/content-wrapper.svelte';
	import ReportMostInterestedFaculties from './report-most-interested-faculties.svelte';
	import ReportRegistrationCount from './report-registration-count.svelte';
	import ReportAttendedUsers from './report-attended-users.svelte'; // Import the new component
	import ReportReferralSource from './report-referral-source.svelte';
	import ReportStudentStatus from './report-student-status.svelte';
	import ReportAges from './report-ages.svelte';
	import Link from '$lib/components/link.svelte';
</script>

<svelte:head>
	<title>{app.titleTemplate('แดชบอร์ด')}</title>
</svelte:head>

<ContentWrapper>
	{#snippet breadcrumbs()}
		<li>
			<Link href="/" class="">ภาพรวม</Link>
		</li>
	{/snippet}
	<h1>ภาพรวม</h1>

	<div class="stats stats-vertical lg:stats-horizontal bg-base-200 border-base-300 border shadow">
		<ReportRegistrationCount />
		<ReportAttendedUsers />
	</div>

	<ReportMostInterestedFaculties />
	<ReportReferralSource />
	<ReportStudentStatus />
	<ReportAges />
</ContentWrapper>

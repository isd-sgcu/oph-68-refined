<script lang="ts">
	import { app } from '$lib/constants';
	import ContentWrapper from '$lib/components/content-wrapper.svelte';
	import ReportMostInterestedFaculties from '$lib/components/report-most-interested-faculties.svelte';
	import ReportRegistrationCount from '$lib/components/report-registration-count.svelte';
</script>

<svelte:head>
	<title>{app.titleTemplate('แดชบอร์ด')}</title>
</svelte:head>

<ContentWrapper>
	<h1>ภาพรวมโดยทั่วไป</h1>

	<ReportRegistrationCount />
	<ReportMostInterestedFaculties />
</ContentWrapper>

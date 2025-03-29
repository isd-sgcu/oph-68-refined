<script lang="ts">
	import { api } from '$lib/client/api';
	import { SHOW_MOCK_DATA } from '$lib/constants';
	import { formatMediumDateStyle, formatNumber, formatShortTimeStyle } from '$lib/formatter';
	import { interestedFaculties } from '$lib/mock';
	import type { Faculty } from '$lib/types';
	import { createQuery, onlineManager } from '@tanstack/svelte-query';
	import AnimatedCounter from '$lib/components/animated-counter.svelte';
	import TicketCheck from 'lucide-svelte/icons/ticket-check';

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

	const currentRegistCount = $derived(
		$interestedFacultiesQuery.data
			?.map((faculty) => faculty.first_interest)
			.reduce((a, b) => a + b, 0)
	);
</script>

<div class="stat">
	<div class="stat-figure text-secondary">
		<TicketCheck class="size-8" />
	</div>
	<div class="stat-title">
		จำนวนการลงทะเบียนปัจจุบัน
		{#if $interestedFacultiesQuery.isFetching}
			<span class="loading loading-dots loading-sm mx-1"></span>
		{/if}
	</div>
	<div class="stat-value">
		<AnimatedCounter value={currentRegistCount} />
	</div>
	<div class="stat-desc">
		ข้อมูล ณ {formatMediumDateStyle($interestedFacultiesQuery.dataUpdatedAt)}
		{formatShortTimeStyle($interestedFacultiesQuery.dataUpdatedAt, {
			timeStyle: 'medium'
		})} น.
	</div>
</div>

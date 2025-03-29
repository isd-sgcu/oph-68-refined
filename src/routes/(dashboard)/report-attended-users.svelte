<script lang="ts">
	import { api } from '$lib/client/api';
	import { SHOW_MOCK_DATA } from '$lib/constants';
	import { formatMediumDateStyle, formatNumber, formatShortTimeStyle } from '$lib/formatter';
	import { createQuery } from '@tanstack/svelte-query';
	import AnimatedCounter from '$lib/components/animated-counter.svelte';
	import UsersRound from 'lucide-svelte/icons/users-round';

	// Interface for the API response
	interface AttendedCountResponse {
		count: number;
	}

	const attendedUsersQuery = createQuery({
		queryKey: ['attended-users'],
		queryFn: async () => {
			if (SHOW_MOCK_DATA) {
				// Mock data that matches the API response format
				return Promise.resolve([{ count: 7800 }]);
			} else {
				// Real API call that matches the expected response format: [{"count":1}]
				const response = await api.get<AttendedCountResponse[]>('/dashboard/attended');
				return response.data;
			}
		}
	});

	// Extract the count from the response
	const attendedCount = $derived(
		$attendedUsersQuery.data && $attendedUsersQuery.data.length > 0
			? $attendedUsersQuery.data[0].count
			: 0
	);
</script>

<div class="stats bg-base-200 border-base-300 border my-4">
	<div class="stat">
		<div class="stat-figure text-secondary">
			<UsersRound class="size-8" />
		</div>
		<div class="stat-title">
			ผู้ลงทะเบียนที่เข้างานแล้ว
			{#if $attendedUsersQuery.isFetching}
				<span class="loading loading-dots loading-sm mx-1"></span>
			{/if}
		</div>
		<div class="stat-value">
			<AnimatedCounter value={attendedCount} />
		</div>
		<div class="stat-desc">
			ข้อมูล ณ {formatMediumDateStyle($attendedUsersQuery.dataUpdatedAt)}
			{formatShortTimeStyle($attendedUsersQuery.dataUpdatedAt, {
				timeStyle: 'medium'
			})} น.
		</div>
	</div>
</div>
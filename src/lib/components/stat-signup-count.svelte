<script lang="ts">
	import { formatMediumDateStyle, formatNumber } from '$lib/formatter';
	import { users } from '$lib/mock';
	import { createQuery } from '@tanstack/svelte-query';
	import TicketCheck from 'lucide-svelte/icons/ticket-check';

	const {
		fromTime = $bindable(new Date('2025-03-14')),
		toTime = $bindable(new Date()),
		label = $bindable('จำนวนการลงทะเบียนทั้งหมด')
	}: {
		fromTime?: Date;
		toTime?: Date;
		label?: string;
	} = $props();

	const allRegisteredStudentCountQuery = createQuery({
		queryKey: ['users-student-count', { fromTime, toTime }],
		queryFn: async () => {
			return users.filter(
				(user) =>
					user.role === 'student' &&
					user.registeredAt &&
					new Date(user.registeredAt) >= fromTime &&
					new Date(user.registeredAt) <= toTime
			).length;
		}
	});
</script>

<div class="stat">
	<div class="stat-figure">
		<TicketCheck class="inline-block h-8 w-8 stroke-current" />
	</div>
	<div class="stat-title">{label}</div>
	<div class="stat-value">
		{$allRegisteredStudentCountQuery.data?.toLocaleString()}
	</div>
	<div class="stat-desc">
		{formatMediumDateStyle(fromTime)} &ndash; {formatMediumDateStyle(toTime)}
	</div>
</div>

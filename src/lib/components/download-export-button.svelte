<script lang="ts">
	import { app } from '$lib/constants';
	import { downloadAsCsv } from '$lib/exporter';
	import DownloadIcon from 'lucide-svelte/icons/download';

	const { data, name, headerMap } = $props();

	function exportToCsv() {
		downloadAsCsv(data, `${app.slugName}-${name}-${new Date().toISOString()}`, headerMap);
	}
</script>

<button class="btn btn-sm" onclick={exportToCsv}>
	<DownloadIcon class="size-4" />
	ดาวน์โหลดเป็น CSV</button
>

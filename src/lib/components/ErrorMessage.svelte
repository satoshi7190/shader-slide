<script lang="ts">
	import { isErrorMessage } from '$lib/store';
</script>

{#if $isErrorMessage}
	<div
		class="pointer-events-none absolute bottom-2 z-10 w-full rounded-lg bg-red-500/80 p-1 text-sm text-white shadow-lg"
	>
		{$isErrorMessage}
	</div>
{/if}

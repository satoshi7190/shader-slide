<script lang="ts">
	import Icon from '@iconify/svelte';
	import { nextPage } from '$lib/utils';
	import { isFullCanvas, isFullScreen } from '$lib/store';

	interface Props {
		show: boolean;
	}

	let { show }: Props = $props();
</script>

<div
	class="absolute bottom-0 z-10 flex w-full items-center justify-end bg-black/50 p-1 px-4 text-sm {show &&
	!$isFullScreen
		? ''
		: 'opacity-0 transition-opacity duration-300 hover:opacity-70'}"
>
	<div class="flex items-center gap-2">
		<button
			class="grid shrink-0 cursor-pointer place-items-center rounded-full bg-white/90 p-1"
			onclick={() => nextPage('prev')}
		>
			<Icon icon="iconamoon:arrow-left-2-duotone" class="h-6 w-6" />
		</button>
		<button
			class="grid shrink-0 cursor-pointer place-items-center rounded-full bg-white/90 p-1"
			onclick={() => nextPage('next')}
		>
			<Icon icon="iconamoon:arrow-right-2-duotone" class="h-6 w-6" />
		</button>
		<button
			class="grid shrink-0 cursor-pointer place-items-center rounded-full bg-white/90 p-1"
			onclick={() => ($isFullCanvas = !$isFullCanvas)}
		>
			<Icon
				icon={$isFullCanvas ? 'material-symbols:edit-off' : 'material-symbols:edit'}
				class="h-6 w-6"
			/>
		</button>
		<button
			class="grid shrink-0 cursor-pointer place-items-center rounded-full bg-white/90 p-1"
			onclick={() => ($isFullScreen = !$isFullScreen)}
		>
			<Icon
				icon={$isFullScreen ? 'majesticons:arrows-collapse-full' : 'majesticons:arrows-expand-full'}
				class="h-6 w-6"
			/>
		</button>
		<a
			class="shrink-0 cursor-pointer rounded-full bg-white/90 p-1 duration-150"
			href="https://github.com/satoshi7190/shader-slide"
			target="_blank"
			rel="noopener noreferrer"
			><Icon icon="mdi:github" class="h-6 w-6" />
		</a>
	</div>
</div>

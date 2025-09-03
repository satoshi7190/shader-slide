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
	class="absolute bottom-0 z-10 flex w-full justify-between bg-black/50 p-1 px-4 text-sm shadow-lg {show
		? ''
		: 'opacity-0 transition-opacity duration-300 hover:opacity-70'}"
>
	<div class="flex gap-2">
		<button
			class="grid aspect-square cursor-pointer place-items-center rounded-full bg-white/90"
			onclick={() => nextPage('prev')}
		>
			<Icon icon="iconamoon:arrow-left-2-duotone" class="h-7 w-7" />
		</button>
		<button
			class="grid aspect-square cursor-pointer place-items-center rounded-full bg-white/90"
			onclick={() => nextPage('next')}
		>
			<Icon icon="iconamoon:arrow-right-2-duotone" class="h-7 w-7" />
		</button>
		<button
			class="grid aspect-square cursor-pointer place-items-center rounded-full bg-white/90"
			onclick={() => ($isFullCanvas = !$isFullCanvas)}
		>
			<Icon
				icon={$isFullCanvas ? 'material-symbols:edit-off' : 'material-symbols:edit'}
				class="h-7 w-7"
			/>
		</button>
		<button
			class="grid aspect-square cursor-pointer place-items-center rounded-full bg-white/90"
			onclick={() => ($isFullScreen = !$isFullScreen)}
		>
			<Icon
				icon={$isFullScreen ? 'majesticons:arrows-collapse-full' : 'majesticons:arrows-expand-full'}
				class="h-7 w-7"
			/>
		</button>
	</div>
	<div class="flex gap-2">
		<a
			class="cursor-pointer rounded-full bg-white/90 p-1 duration-150"
			href="https://github.com/satoshi7190/shader-slide"
			target="_blank"
			rel="noopener noreferrer"
			><Icon icon="mdi:github" class="h-8 w-8" />
		</a>
	</div>
</div>

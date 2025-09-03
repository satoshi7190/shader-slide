<script lang="ts">
	import Icon from '@iconify/svelte';
	import { nextPage } from '$lib/utils';
	import { isFullCanvas, isFullScreen } from '$lib/store';
	import { onMount } from 'svelte';

	interface Props {
		show: boolean;
	}

	let { show }: Props = $props();
	let isHovered = $state(false);
	let controlsElement = $state<HTMLDivElement | null>(null);

	onMount(() => {
		let timeoutId: number;

		const handleMouseMove = () => {
			if ($isFullScreen && !show) {
				isHovered = true;
				clearTimeout(timeoutId);

				// 2秒後に自動的に非表示
				timeoutId = setTimeout(() => {
					isHovered = false;
				}, 2000);
			}
		};

		const handleMouseLeave = () => {
			if ($isFullScreen && !show) {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(() => {
					isHovered = false;
				}, 500);
			}
		};

		// フルスクリーン時のマウス移動監視
		document.addEventListener('mousemove', handleMouseMove);
		if (controlsElement) {
			controlsElement.addEventListener('mouseleave', handleMouseLeave);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			if (controlsElement) {
				controlsElement.removeEventListener('mouseleave', handleMouseLeave);
			}
			clearTimeout(timeoutId);
		};
	});

	// 表示状態の計算
	let shouldShow = $derived.by(() => {
		return show || ($isFullScreen ? isHovered : false);
	});
</script>

<div
	bind:this={controlsElement}
	class="absolute bottom-0 z-10 flex w-full justify-between bg-black/50 p-1 px-4 text-sm shadow-lg transition-opacity duration-300 {shouldShow
		? 'opacity-100'
		: 'opacity-0'}"
>
	<!-- 既存のボタン群 -->
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

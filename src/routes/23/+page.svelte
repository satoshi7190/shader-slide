<script lang="ts">
	import WebGLScreen from '$lib/components/WebGLScreen.svelte';
	import fragment from './fragment.glsl?raw';
	import { fs, isFullCanvas } from '$lib/store';
	import Overlay from '$lib/components/Overlay.svelte';
	import { highlightRange } from '$lib/utils';

	import { onMount } from 'svelte';

	onMount(() => {
		fs.set(fragment);
		isFullCanvas.set(true);
	});
	let videoElement: HTMLVideoElement;
</script>

<Overlay>
	<span class="title">⚔️ GLSLで戦う</span>
	<div class="absolute top-[20%] flex h-[80%] w-full flex-col px-[3%] text-[130%] text-white">
		<span class="text-[150%]">Shader Showdown</span>
		<div class="w-[35%] pt-[3%]">
			<span class="text-[100%]"
				>15分以内にGLSLをライブコーディングで書き、視覚的な作品を作って競う競技</span
			>
			<br />
			<br />
			<span class="text-[100%]">YouTubeでアーカイブチェックできます</span>
		</div>
		<br />

		<video
			bind:this={videoElement}
			src="./video1.mp4"
			class="absolute top-[9%] right-[1%] block w-[60%] rounded-lg"
			autoplay={true}
			muted={true}
			loop={true}
		>
			<track kind="captions" />
			動画がサポートされていません。
		</video>

		<span class="absolute right-[1%] bottom-[1%] text-[50%]"
			>出典:Revision 2025 - Event - Shader Showdown
			Final（https://www.youtube.com/watch?v=Rk9f4GUuXGk）</span
		>
	</div>
</Overlay>

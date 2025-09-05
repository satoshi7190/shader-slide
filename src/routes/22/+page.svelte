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
</script>

<Overlay>
	<span class="title">🎨 GLSLをシェアする</span>
	<div class="absolute top-[20%] flex h-[80%] w-full flex-col px-[3%] text-[130%] text-white">
		<span class="text-[150%]">ShaderToy</span>
		<div class="w-[50%] pt-[3%]">
			<span class="text-[100%]">世界最大のシェーダー共有サイト</span>
			<br />
			<br />
			<span class="text-[100%]">すぐに使えるブラウザエディター</span>
		</div>

		<img src="./image2.webp" alt="" class="absolute top-[0%] right-[1%] block w-[40%]" />
		<img src="./image4.webp" alt="" class="absolute top-[40%] right-[5%] block w-[40%]" />
		<span class="absolute right-[1%] bottom-[1%] text-[50%]"
			>出典:ShaderToy BETA（https://www.shadertoy.com/）</span
		>
	</div>
</Overlay>

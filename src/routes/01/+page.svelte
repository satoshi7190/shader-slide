<script lang="ts">
	import WebGLScreen from '$lib/components/WebGLScreen.svelte';
	import fragment from './fragment.glsl?raw';
	import { fs, isFullCanvas } from '$lib/store';

	import { onMount } from 'svelte';

	onMount(() => {
		fs.set(fragment);
		isFullCanvas.set(true);
	});
</script>

<div class="pointer-events-none absolute top-0 left-0 z-10 h-full w-full bg-black/50">
	<span class="title">自己紹介</span>
	<div class="block-left flex flex-col items-center justify-center pt-[5%]">
		<img class="aspect-square w-[60%] rounded-full c-no-drag-icon" src="./icon.png" />
	</div>
	<div class="block-right">
		<span>株式会社MIERUNE</span>
		<span>フロントエンドエンジニア</span>
		<span> </span>
		<span>中身のコードに興味はない。ビジュアルにこだわりたい。</span>
	</div>
</div>

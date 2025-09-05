<script lang="ts">
	import fragment from './fragment.glsl?raw';
	import { fs, isFullCanvas } from '$lib/store';
	import Overlay from '$lib/components/Overlay.svelte';

	import { onMount } from 'svelte';

	onMount(() => {
		fs.set(fragment);
		isFullCanvas.set(true);
	});
</script>

<Overlay>
	<span class="title">自己紹介</span>
	<div class="block-left flex flex-col items-center justify-center pt-[5%]">
		<img class="aspect-square w-[60%] rounded-full c-no-drag-icon" src="./icon.png" alt="Icon" />
	</div>
	<div class="block-right">
		<span>株式会社MIERUNE</span>
		<span>フロントエンドエンジニア</span>
		<span> </span>
	</div>
	<span class="absolute bottom-[10%] text-white"
		>中身のコードに興味はなく、ビジュアルにこだわりたい。</span
	>
</Overlay>

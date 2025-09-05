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
	<div
		class="absolute top-[15%] left-[3%] flex w-1/2 flex-col items-center justify-center pt-[5%] text-[100%]"
	>
		<img class="aspect-square w-[60%] rounded-full c-no-drag-icon" src="./icon.png" alt="Icon" />
	</div>
	<div class="absolute top-[15%] right-[8%] flex flex-col gap-4 text-[150%]">
		<span class="text-[160%]">Satoshi Komatsu</span>

		<span> </span>
		<span>株式会社MIERUNE</span>
		<span>フロントエンドエンジニア</span>
		<span> </span>
		<span> </span>

		<span>中身のコードに興味はない。</span>
		<span>ビジュアルにこだわりたい。</span>
	</div>
</Overlay>

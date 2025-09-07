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
	<span class="title">シェーダーとは</span>
	<div class="absolute top-[15%] flex flex-col px-[3%] text-[150%] text-white">
		<span class="mb-[10%]"
			>画面に表示する色やオブジェクトの質感を表現するプログラムでGPUで実行される</span
		>
		<span>主に2種類ある</span>
		<span>頂点シェーダー - 3Dオブジェクトの形や位置を決定</span>
		<span class="mb-[10%]">フラグメントシェーダー - 各ピクセルの色を計算して画面出力</span>
		<span>今日はフラグメントシェーダーの話</span>
	</div>
</Overlay>

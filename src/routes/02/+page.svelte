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
	<div class="absolute top-[15%] flex flex-col gap-2 px-[3%] text-[150%] text-white">
		<span>GPU上で実行される小さなプログラム</span>
		<br />
		<span>主に2種類ある</span>
		<span>頂点シェーダー - 3Dオブジェクトの形や位置を決定</span>
		<span>フラグメントシェーダー - 各ピクセルの色を計算</span>
		<br />
		<span
			>今日注目するのはフラグメントシェーダー。画面上の何百万ものピクセル一つ一つに対して、同時並列で「君は何色になるべきか」を計算します。</span
		>
	</div>
</Overlay>

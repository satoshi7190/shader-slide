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
	<span class="title">GLSL（OpenGL Shading Language）とは</span>
	<div class="absolute top-[15%] flex flex-col px-[3%] text-[100%] text-white">
		<span
			>GLSL（OpenGL Shading
			Language）とは、OpenGLで使用されるシェーディング言語です。主に3Dグラフィックスの描画において、頂点シェーダーやフラグメントシェーダーを記述するために使用されます。</span
		>
		<br />
		<span>・GPUで実行される専用言語 </span>
		<span>・頂点・フラグメント処理を記述 </span>
		<span>・リアルタイム3D描画に必須</span>
	</div>
</Overlay>

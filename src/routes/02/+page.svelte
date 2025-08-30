<script lang="ts">
	import WebGLScreen from '$lib/components/WebGLScreen.svelte';
	import fs from './fragment.glsl?raw';

	import { onMount } from 'svelte';

	onMount(() => {
		console.log('Component mounted');
	});
</script>

<WebGLScreen {fs} className="w-full" />
<div class="pointer-events-none absolute top-0 left-0 h-full w-full bg-black/50"></div>

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

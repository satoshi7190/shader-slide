<script lang="ts">
	import WebGLScreen from '$lib/components/WebGLScreen.svelte';
	import fs from './fragment.glsl?raw';
</script>

<WebGLScreen {fs} className="w-full" />

<div class="pointer-events-none absolute top-0 left-0 h-full w-full bg-black/50"></div>

<span class="c-text-shadow absolute top-[10%] left-1/2 -translate-x-1/2 text-[200%] text-white"
	>GLSL で解き放つ！</span
>
<div class="c-text-shadow absolute top-[20%] flex w-full justify-center text-[200%] text-white">
	<span>WebGL シェーダーが生み出す魔法体験</span>
</div>
<span class="absolute bottom-[16%] left-1/2 -translate-x-1/2 text-[100%] text-white"
	>株式会社MIERUNE
</span>
<span class="absolute bottom-[24%] left-1/2 -translate-x-1/2 text-[100%] text-white"
	>Satoshi Komatsu
</span>

<style>
	.c-text-shadow {
		text-shadow: rgb(0, 0, 0) 1px 0 10px;
	}
</style>

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

<span class="title">自己紹介</span>
<div class="block-left flex flex-col items-center justify-center pt-[5%]">
	<img class="aspect-square w-[60%] rounded-full" src="./84182110.png" />
</div>
<div class="block-right">
	<span>株式会社MIERUNE</span>
	<span>フロントエンドエンジニア</span>
	<span> </span>
	<span>中身のコードに興味はない。ビジュアルにこだわりたい。</span>
</div>

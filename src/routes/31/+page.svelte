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
	<div class="absolute top-[20%] flex flex-col px-[3%] text-[130%] text-white">
		<span>チュートリアルサイト </span>
		<br />
		<span>チュートリアル動画 </span>
		<br />
		<span>チュートリアル動画</span>
	</div>
</Overlay>

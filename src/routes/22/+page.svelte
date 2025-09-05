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
	<span class="title">📚 GLSLを学ぶ</span>
	<div class="absolute top-[20%] flex h-[80%] w-full flex-col px-[3%] text-[130%] text-white">
		<span class="text-[150%]">The Book of Shaders</span>
		<br />
		<img src="./image3.webp" alt="" class="absolute top-[9%] right-[1%] block w-[50%]" />
		<span class="absolute right-[1%] bottom-[1%] text-[50%]"
			>出典:The Book of Shaders（https://thebookofshaders.com/）</span
		>
	</div>
</Overlay>

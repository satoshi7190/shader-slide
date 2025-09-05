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
		<div class="w-[40%] pt-[3%]">
			<span class="text-[100%]">日本語版も完備された丁寧なチュートリアルサイト</span>
			<br />
			<br />
			<span class="text-[100%]">基礎数学から高度なテクニックまで段階的</span>
		</div>
		<img src="./image3.webp" alt="" class="absolute top-[0%] right-[5%] block w-[30%]" />
		<img src="./image5.webp" alt="" class="absolute top-[34%] right-[20%] block w-[27%]" />
		<span class="absolute right-[1%] bottom-[1%] text-[50%]"
			>出典:The Book of Shaders（https://thebookofshaders.com/）</span
		>
	</div>
</Overlay>

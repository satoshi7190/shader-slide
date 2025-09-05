<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import fragment from './fragment.glsl?raw';
	import { fs, isFullCanvas } from '$lib/store';
	import { onMount } from 'svelte';
	import { highlightRange } from '$lib/utils';

	onMount(() => {
		fs.set(fragment);
		isFullCanvas.set(false);
	});

	const highlightLines = $state(highlightRange(7, 7));
</script>

<Editor {highlightLines} title={'中心基準に正規化'} />

<!-- <div class="absolute bottom-0 left-0 z-10 h-full w-1/2 bg-black/50"></div> -->
<div class="absolute right-0 bottom-0 z-10 h-full w-1/2 text-[200%]">
	<span class="absolute top-0 bg-black/70 p-[1%]">-1,1</span>
	<span class="absolute bottom-0 bg-black/70 p-[1%]">-1,-1</span>
	<span class="absolute right-0 bottom-0 bg-black/70 p-[1%]">1,-1</span>
	<span class="absolute top-0 right-0 bg-black/70 p-[1%]">1,1</span>
	<span class="absolute top-[42%] right-[42%] bg-black/70 p-[1%]">0,0</span>

	<!-- X軸矢印（右向き） -->
	<div class="absolute bottom-[7%] left-[45%] flex items-center">
		<span class=" bg-black/70 px-1">X</span>
	</div>

	<!-- 横棒（右向き） -->
	<div class="absolute bottom-[5%] left-[18%] h-[1%] w-[60%] bg-white"></div>

	<!-- X軸の矢印頭（右向き三角形） -->
	<div
		class="absolute bottom-[3.5%] left-[77%] h-[4%] w-[4%] bg-white"
		style="clip-path: polygon(100% 50%, 0% 0%, 0% 100%);"
	></div>

	<!-- Y軸矢印（上向き） -->
	<div class="absolute bottom-[45%] left-[7%] flex flex-col items-center">
		<span class=" bg-black/70 px-1">Y</span>
	</div>

	<!-- 縦棒（上向き） -->
	<div class="absolute bottom-[18%] left-[5%] h-[60%] w-[1%] bg-white"></div>

	<!-- Y軸の矢印頭（上向き三角形） -->
	<div
		class="absolute bottom-[77%] left-[3.5%] h-[4%] w-[4%] bg-white"
		style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"
	></div>
</div>

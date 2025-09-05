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
	<span class="c-text-shadow absolute top-[16%] left-1/2 -translate-x-1/2 text-[200%] text-white"
		>GLSL で解き放つ！</span
	>
	<div class="c-text-shadow absolute top-[30%] flex w-full justify-center text-[200%] text-white">
		<span>WebGL シェーダーが生み出す魔法体験</span>
	</div>

	<span class="absolute bottom-[13%] left-1/2 -translate-x-1/2 text-[150%] text-white"
		>Satoshi Komatsu
	</span>
</Overlay>

<style>
	.c-text-shadow {
		text-shadow: rgb(0, 0, 0) 1px 0 10px;
	}
</style>

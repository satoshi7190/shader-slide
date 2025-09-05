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
	<div class="grid h-full w-full place-items-center">
		<span class="text-[200%]">実際に呪文（GLSL）を書いてみよう</span>
	</div>
</Overlay>

<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import Overlay from '$lib/components/Overlay.svelte';
	import fragment from './fragment.glsl?raw';
	import { fs, isFullCanvas } from '$lib/store';
	import { onMount } from 'svelte';
	import { highlightRange } from '$lib/utils';
	import { nextPage } from '$lib/utils';

	onMount(() => {
		fs.set(fragment);
		isFullCanvas.set(true);
	});
</script>

<Overlay>
	<div class="grid h-full w-full place-items-center">
		<span class="text-[200%]">🪄君もGLSLを書いて魔法使いになろう！</span>
	</div>
</Overlay>
<Editor />

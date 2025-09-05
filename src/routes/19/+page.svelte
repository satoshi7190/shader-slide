<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import Overlay from '$lib/components/Overlay.svelte';
	import fragment from './fragment.glsl?raw';
	import { fs, isFullCanvas, run } from '$lib/store';
	import { onMount } from 'svelte';
	import { highlightRange } from '$lib/utils';
	import { nextPage } from '$lib/utils';

	onMount(() => {
		fs.set(fragment);
		isFullCanvas.set(true);
		if (import.meta.env.PROD) run.set(++$run);
	});
</script>

<Overlay transparent={true}>
	<span></span>
</Overlay>
<Editor />

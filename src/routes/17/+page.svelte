<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import fragment from './fragment.glsl?raw';
	import { fs, isFullCanvas, run } from '$lib/store';
	import { onMount } from 'svelte';
	import { highlightRange } from '$lib/utils';

	onMount(() => {
		fs.set(fragment);
		isFullCanvas.set(false);
		if (import.meta.env.PROD) run.set(++$run);
	});

	const highlightLines = $state([...highlightRange(41, 55), ...highlightRange(67, 69)]);
</script>

<Editor title="有機的な動き" {highlightLines} />

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

	const highlightLines = $state([...highlightRange(10, 14), ...highlightRange(26, 27)]);
</script>

<Editor {highlightLines} title={'HSV色空間変換'} />

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

	const highlightLines = $state([...highlightRange(16, 18), ...highlightRange(27, 28)]);
</script>

<Editor {highlightLines} title={'グロー効果'} />

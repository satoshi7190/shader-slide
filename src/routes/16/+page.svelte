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

	const highlightLines = $state([
		{
			line: 37,
			message: '２次元回転関数'
		},
		...highlightRange(38, 39),
		...highlightRange(66, 74)
	]);
</script>

<Editor {highlightLines} title={'回転させる'} />

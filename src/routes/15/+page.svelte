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
			line: 25,
			message: '乱数関数'
		},
		...highlightRange(26, 27),
		{
			line: 29,
			message: 'ノイズ関数'
		},
		...highlightRange(30, 35),
		...highlightRange(61, 62)
	]);
</script>

<Editor {highlightLines} title={'パーティクルを描く'} />

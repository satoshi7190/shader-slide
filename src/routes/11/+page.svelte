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

	// HSV色空間変換

	const highlightLines = $state([
		{
			line: 2,
			message: '時間を使ってアニメーション'
		},
		{
			line: 10,
			message: 'HSV色空間変換関数'
		},
		...highlightRange(11, 14),
		...highlightRange(22, 24)
	]);
</script>

<Editor {highlightLines} title={'色を動的に変化させる'} />

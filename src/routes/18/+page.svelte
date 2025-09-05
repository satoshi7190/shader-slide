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
			line: 3,
			message: '音声データをテクスチャとして受け取る'
		},
		{
			line: 4,
			message: '音声解析の分解能（ビン数）を表す'
		},

		{
			line: 65,
			message: '低周波数帯域をサンプリング'
		},
		{
			line: 66,
			message: '低周波数帯域をサンプリング'
		},
		{
			line: 67,
			message: '中周波数帯域をサンプリング'
		},
		...highlightRange(82, 84)
	]);
</script>

<Editor title="音と連動させる" {highlightLines} />

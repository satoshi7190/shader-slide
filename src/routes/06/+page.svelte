<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import fragment from './fragment.glsl?raw';
	import { fs, isFullCanvas } from '$lib/store';
	import { onMount } from 'svelte';

	onMount(() => {
		fs.set(fragment);
		isFullCanvas.set(false);
	});

	// ハイライトしたい行を定義
	const highlightLines = $state([{ line: 5 }, { line: 6 }, { line: 7 }]);
</script>

<Editor {highlightLines} title={'距離関数　図形'} />

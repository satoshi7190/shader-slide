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
	// const highlightLines = $state([
	// 	{ line: 2, message: 'Syntax error here' },
	// 	{ line: 5, message: 'This might cause issues' },
	// 	{ line: 8 },
	// 	{ line: 12, className: 'ace-info-line', message: 'Important note' }
	// ]);
</script>

<Editor />

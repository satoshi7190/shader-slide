<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import Overlay from '$lib/components/Overlay.svelte';
	import fragment from './fragment.glsl?raw';
	import { fs, isFullCanvas } from '$lib/store';
	import { onMount } from 'svelte';
	import { highlightRange } from '$lib/utils';
	import { nextPage } from '$lib/utils';

	onMount(() => {
		fs.set(fragment);
		isFullCanvas.set(true);
	});
</script>

<Overlay transparent={true}>
	<span></span>
</Overlay>
<Editor />

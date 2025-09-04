<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import WebGLScreen from '$lib/components/WebGLScreen.svelte';
	import fragment from './fragment.glsl?raw';

	let fs = $derived(fragment);
</script>

<div class="absolute flex h-full w-full">
	<Editor bind:fs />
	<WebGLScreen {fs} />
</div>

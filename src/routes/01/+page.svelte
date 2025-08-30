<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import WebGLScreen from '$lib/components/WebGLScreen.svelte';
	import fs from './fragment.glsl?raw';

	import { onMount } from 'svelte';

	onMount(() => {
		console.log('Component mounted');
	});
</script>

<!-- <Editor /> -->
<WebGLScreen {fs} className="w-full" />

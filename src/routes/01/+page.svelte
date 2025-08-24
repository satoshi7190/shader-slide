<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import WebGLScreen from '$lib/components/WebGLScreen.svelte';

	import { onMount } from 'svelte';

	onMount(() => {
		console.log('Component mounted');
	});
</script>

<div class="relative">
	<Editor />
	<!-- <WebGLScreen /> -->
</div>

<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<div class="h-dvh w-screen">
	{@render children?.()}
</div>

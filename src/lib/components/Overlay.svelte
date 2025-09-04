<script lang="ts">
	import { nextPage } from '$lib/utils';
	import type { Snippet } from 'svelte';
	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<div
	class="absolute top-0 left-0 z-10 h-full w-full bg-black/50"
	onclick={() => nextPage('next')}
	role="button"
	tabindex="0"
	aria-label="次のページへ"
	onkeydown={(event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			nextPage('next');
		}
	}}
>
	{@render children()}
</div>

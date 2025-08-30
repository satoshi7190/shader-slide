<script lang="ts">
	import '../app.css';
	import { nextPage } from '$lib/utils';

	let { children } = $props();

	// ページのルートを定義

	// キーボードイベントハンドラー
	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			// 次のページへ
			nextPage('next');
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			// 前のページへ
			nextPage('prev');
		}
	};
</script>

<div class="grid h-dvh w-screen place-items-center bg-black">
	<div class="absolute aspect-video w-full bg-white text-[2vw]">
		{@render children?.()}
	</div>
</div>

<svelte:window on:keydown={handleKeydown} />

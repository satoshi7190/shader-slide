<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { children } = $props();

	// ページのルートを定義
	const routes = ['/', '/01', '/02'];

	// キーボードイベントハンドラー
	function handleKeydown(event: KeyboardEvent) {
		const currentPath = page.url.pathname;
		const currentIndex = routes.indexOf(currentPath);

		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			// 次のページへ
			if (currentIndex < routes.length - 1) {
				goto(routes[currentIndex + 1]);
			}
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			// 前のページへ
			if (currentIndex > 0) {
				goto(routes[currentIndex - 1]);
			}
		}
	}
</script>

<div class="grid h-dvh w-screen place-items-center bg-black">
	<div class="absolute aspect-video w-full bg-white text-[2vw]">
		{@render children?.()}
	</div>
</div>

<svelte:window on:keydown={handleKeydown} />

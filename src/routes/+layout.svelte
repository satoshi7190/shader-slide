<script lang="ts">
	import '../app.css';
	import { nextPage } from '$lib/utils';
	import { isFullScreen, run } from '$lib/store';
	import WebGLScreen from '$lib/components/WebGLScreen.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';

	import Control from '$lib/components/Control.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	// 画面サイズの状態
	let screenWidth = $state(0);
	let screenHeight = $state(0);

	onMount(() => {
		updateScreenSize(); // 初期サイズを設定
	});

	// 16:9以下かどうかを判定する変数
	let isNarrowerThan16by9 = $derived.by(() => {
		if (screenWidth === 0 || screenHeight === 0) return false;
		const currentAspectRatio = screenWidth / screenHeight;
		const sixteenByNineRatio = 16 / 9; // 約1.778
		return currentAspectRatio <= sixteenByNineRatio;
	});

	// 画面サイズを更新する関数
	const updateScreenSize = () => {
		screenWidth = window.innerWidth;
		screenHeight = window.innerHeight;
	};
	// ページのルートを定義

	// キーボードイベントハンドラー
	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			// 次のページへ
			nextPage('next');
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			// 前のページへ
			nextPage('prev');
		} else if (event.key === 'F1') {
			// フルスクリーンの切り替え
			$isFullScreen = !$isFullScreen;
		} else if (event.key === 'Enter') {
			// 再生/一時停止
			$run = ++$run;
		}
	};
</script>

<div class="grid h-dvh w-screen place-items-center bg-black">
	<div class="absolute aspect-video w-full text-[2vw] text-white">
		<div class="absolute flex h-full w-full">
			{@render children()}
			<WebGLScreen />
			<ErrorMessage />
		</div>
	</div>
</div>

<Control show={isNarrowerThan16by9} />

<!-- 5分タイマーを左下に表示 -->
{#if import.meta.env.DEV}
	<Timer duration={300} position="bottom-left" size="small" />
{/if}
<svelte:window onkeydown={handleKeydown} onresize={updateScreenSize} />

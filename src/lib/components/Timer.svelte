<script lang="ts">
	interface Props {
		duration?: number; // タイマーの時間（秒）
		autoStart?: boolean; // 自動開始
		position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'; // 表示位置
		size?: 'small' | 'medium' | 'large'; // サイズ
	}

	let {
		duration = 300, // デフォルト5分（300秒）
		autoStart = false,
		position = 'bottom-right',
		size = 'small'
	}: Props = $props();

	let timeLeft = $state(duration);
	let isRunning = $state(false);
	let isPaused = $state(false);
	let interval: number | null = null;

	// 時間を分:秒形式でフォーマット
	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	};

	// タイマー開始
	const startTimer = () => {
		if (timeLeft <= 0) {
			resetTimer();
		}
		isRunning = true;
		isPaused = false;

		interval = setInterval(() => {
			timeLeft--;

			if (timeLeft <= 0) {
				stopTimer();
				console.log('Timer finished!');
			}
		}, 1000);
	};

	// タイマー停止
	const stopTimer = () => {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
		isRunning = false;
		isPaused = false;
	};

	// タイマー一時停止
	const pauseTimer = () => {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
		isRunning = false;
		isPaused = true;
	};

	// タイマーリセット
	const resetTimer = () => {
		stopTimer();
		timeLeft = duration;
		isPaused = false;
	};

	// 自動開始
	if (autoStart) {
		startTimer();
	}

	// 位置のクラス
	const positionClass = {
		'bottom-left': 'bottom-0 left-0',
		'bottom-right': 'bottom-0 right-0',
		'top-left': 'top-0 left-0',
		'top-right': 'top-0 right-0'
	}[position];

	// サイズのクラス
	const sizeClass = {
		small: 'text-sm p-1',
		medium: 'text-base p-3',
		large: 'text-lg p-4'
	}[size];

	// 外部から制御するための関数をエクスポート
	export const start = startTimer;
	export const stop = stopTimer;
	export const pause = pauseTimer;
	export const reset = resetTimer;
	export const setTime = (seconds: number) => {
		timeLeft = seconds;
	};
</script>

<div
	class="absolute z-50 {positionClass} {sizeClass} flex gap-1 bg-black/80 font-mono text-white backdrop-blur-sm"
	role="timer"
	aria-label="残り時間 {formatTime(timeLeft)}"
>
	<!-- 時間表示 -->
	<div class="text-center font-bold">
		{formatTime(timeLeft)}
	</div>

	<!-- コントロールボタン -->
	<div class="flex justify-center gap-1">
		{#if !isRunning && !isPaused}
			<button
				onclick={startTimer}
				class="shrink-0 rounded-full bg-gray-200 p-1.5 text-xs text-white"
				aria-label="タイマー開始"
			>
			</button>
		{:else if isRunning}
			<button
				onclick={pauseTimer}
				class="shrink-0 rounded-full bg-gray-400 p-1.5 text-xs text-white"
				aria-label="タイマー一時停止"
			>
			</button>
		{:else if isPaused}
			<button
				onclick={startTimer}
				class="shrink-0 rounded-full bg-gray-200 p-1.5 text-xs text-white"
				aria-label="タイマー再開"
			>
			</button>
		{/if}

		<button
			onclick={resetTimer}
			class="shrink-0 rounded-full bg-gray-200 p-1.5 text-xs text-white"
			aria-label="タイマーリセット"
		>
		</button>
	</div>
</div>

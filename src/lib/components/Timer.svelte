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
		position = 'bottom-left',
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

	// 進捗率を計算（0-100%）
	const progress = $derived((duration - timeLeft) / duration * 100);

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
		'bottom-left': 'bottom-4 left-4',
		'bottom-right': 'bottom-4 right-4', 
		'top-left': 'top-4 left-4',
		'top-right': 'top-4 right-4'
	}[position];

	// サイズのクラス
	const sizeClass = {
		'small': 'text-sm p-2',
		'medium': 'text-base p-3',
		'large': 'text-lg p-4'
	}[size];

	// 時間に応じた色の変更
	const getTimerColor = () => {
		if (timeLeft <= 30) return 'text-red-400 border-red-400';
		if (timeLeft <= 60) return 'text-yellow-400 border-yellow-400';
		return 'text-green-400 border-green-400';
	};

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
	class="fixed z-50 {positionClass} {sizeClass} rounded-lg border-2 bg-black/80 backdrop-blur-sm {getTimerColor()} font-mono"
	role="timer"
	aria-label="残り時間 {formatTime(timeLeft)}"
>
	<!-- プログレスバー -->
	<div class="mb-2 h-1 w-full rounded-full bg-gray-600">
		<div 
			class="h-full rounded-full transition-all duration-1000 {timeLeft <= 30 ? 'bg-red-400' : timeLeft <= 60 ? 'bg-yellow-400' : 'bg-green-400'}"
			style="width: {progress}%"
		></div>
	</div>

	<!-- 時間表示 -->
	<div class="text-center font-bold">
		{formatTime(timeLeft)}
	</div>

	<!-- コントロールボタン -->
	<div class="mt-2 flex justify-center gap-1">
		{#if !isRunning && !isPaused}
			<button 
				onclick={startTimer}
				class="rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
				aria-label="タイマー開始"
			>
				▶️
			</button>
		{:else if isRunning}
			<button 
				onclick={pauseTimer}
				class="rounded bg-yellow-600 px-2 py-1 text-xs text-white hover:bg-yellow-700"
				aria-label="タイマー一時停止"
			>
				⏸️
			</button>
		{:else if isPaused}
			<button 
				onclick={startTimer}
				class="rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
				aria-label="タイマー再開"
			>
				▶️
			</button>
		{/if}
		
		<button 
			onclick={resetTimer}
			class="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
			aria-label="タイマーリセット"
		>
			🔄
		</button>
	</div>

	<!-- 時間切れの表示 -->
	{#if timeLeft <= 0}
		<div class="mt-2 animate-pulse text-center text-xs text-red-400">
			TIME UP!
		</div>
	{/if}
</div>

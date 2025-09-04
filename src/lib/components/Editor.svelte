<script lang="ts">
	import ace from 'ace-builds/src-noconflict/ace';
	import { isFullCanvas, fs, run } from '$lib/store';
	import { nextPage } from '$lib/utils';
	import { debounce } from 'es-toolkit';
	import { page } from '$app/state';

	// --- 必要なモジュールのインポート ---
	import 'ace-builds/src-noconflict/mode-glsl';
	import 'ace-builds/src-noconflict/theme-monokai';
	import 'ace-builds/src-noconflict/ext-language_tools';
	import { onMount } from 'svelte';

	// ハイライト設定の型定義
	interface HighlightLine {
		line: number; // 0ベースの行番号
		className?: string; // CSSクラス名
		type?: 'line' | 'fullLine' | 'text'; // ハイライトタイプ
		message?: string; // オプショナルなメッセージ
	}

	interface Props {
		title?: string;
		highlightLines?: HighlightLine[]; // ハイライトする行の配列
	}

	let { highlightLines = [], title }: Props = $props();
	let isRun = $state(false);

	const workerUrl = new URL('ace-builds/src-noconflict/worker-glsl.js', import.meta.url).href;
	ace.config.setModuleUrl('ace/mode/glsl_worker', workerUrl);

	let editElement = $state<HTMLElement | null>(null);
	let editor: any = null;
	let activeMarkers: number[] = []; // アクティブなマーカーのID管理

	$effect(() => {
		if (page) {
			isRun = false;
		}
	});

	// ハイライトを適用する関数
	const applyHighlights = (highlights: HighlightLine[]) => {
		if (!editor) return;

		// 既存のハイライトをクリア
		clearHighlights();

		highlights.forEach((highlight) => {
			const { line, className = 'ace-success-line', type = 'fullLine', message } = highlight;

			// 範囲を作成（0ベースの行番号を使用）
			const range = new ace.Range(line, 0, line, type === 'fullLine' ? 1 : Number.MAX_VALUE);

			// マーカーを追加
			const markerId = editor.session.addMarker(range, className, type);
			activeMarkers.push(markerId);

			// メッセージがあればアノテーションを追加
			if (message) {
				const existingAnnotations = editor.session.getAnnotations() || [];
				const newAnnotation = {
					row: line,
					column: 0,
					text: message,
					type: className.includes('error')
						? 'error'
						: className.includes('warning')
							? 'warning'
							: 'info'
				};
				editor.session.setAnnotations([...existingAnnotations, newAnnotation]);
			}
		});

		// 最初のハイライト行にスクロール（複数ある場合）
		if (highlights.length > 0) {
			const firstLine = Math.min(...highlights.map((h) => h.line));
			editor.scrollToLine(firstLine, true, false, () => {});
		}
	};

	// ハイライトをクリアする関数
	const clearHighlights = () => {
		activeMarkers.forEach((markerId) => {
			editor.session.removeMarker(markerId);
		});
		activeMarkers = [];
		editor.session.clearAnnotations();
	};

	// highlightLinesが変更された時の処理
	$effect(() => {
		if (editor && highlightLines.length > 0) {
			applyHighlights(highlightLines);
		} else if (editor) {
			clearHighlights();
		}
	});

	onMount(() => {
		editor = ace.edit(editElement);
		isRun = false;

		// エディタのオプション
		editor.setOptions({
			theme: 'ace/theme/monokai',
			mode: 'ace/mode/glsl',
			fontSize: '60%',
			tabSize: 4,
			useSoftTabs: true,
			showPrintMargin: false,
			showInvisibles: false,
			highlightSelectedWord: true,
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true,
			enableSnippets: true,
			readOnly: true
		});

		editor.session.setUseWrapMode(true);
		editor.setValue($fs, -1);

		// 初期ハイライトを適用
		if (highlightLines.length > 0) {
			applyHighlights(highlightLines);
		}

		const updateCode = debounce((_code) => {
			if (!isRun) return;
			console.log('updateCode called');

			fs.set(_code);
			run.set(++$run);
		}, 300);

		// エディタの内容が変更されたときの処理
		editor.session.on('change', () => {
			const code = editor.getValue();
			updateCode(code);
		});

		// エディッタの表示・非表示を切り替える関数
		const toggleEditorVisibility = (value: boolean) => {
			const editorElement = editor.container;
			if (value) {
				editorElement.style.display = 'none';
			} else {
				editorElement.style.display = 'block';
				editor.resize();
			}
		};

		isFullCanvas.subscribe((value) => {
			toggleEditorVisibility(value);
		});

		fs.subscribe((value) => {
			if (isRun) return;
			if (editor && value !== editor.getValue()) {
				const cursorPosition = editor.getCursorPosition();
				editor.setValue(value, -1);
				editor.moveCursorToPosition(cursorPosition);

				// fsが更新された後、ハイライトを再適用
				if (highlightLines.length > 0) {
					setTimeout(() => applyHighlights(highlightLines), 100);
				}
			}
		});

		run.subscribe((value) => {
			clearHighlights();
			editor.setReadOnly(false);
		});

		// クリーンアップ
		return () => {
			clearHighlights();
		};
	});
</script>

<div class="flex h-full flex-col {$isFullCanvas ? 'w-0' : 'w-1/2'}">
	<div class="flex w-full flex-1 justify-between bg-[#272822] px-2">
		<div class="text-[200%] text-white">{title}</div>

		{#if !isRun}
			<button
				class="grid cursor-pointer place-items-center rounded p-1 {isRun
					? 'bg-gray-300'
					: 'bg-[aquamarine]'}"
				onclick={() => {
					// Run the shader code
					run.set(++$run);
					isRun = true;
				}}><span>run</span></button
			>
		{:else}
			<button
				class="grid cursor-pointer place-items-center rounded p-1 {isRun
					? 'bg-gray-300'
					: 'bg-[aquamarine]'}"
				onclick={() => {
					// Stop the shader code
					nextPage('next');
				}}><span>next→</span></button
			>
		{/if}
	</div>
	<div class="h-full w-full" bind:this={editElement}></div>
</div>

<style>
	/* デフォルトハイライトスタイル */
	:global(.ace-highlight-line) {
		background-color: rgba(255, 255, 0, 0.3) !important;
		position: absolute;
		z-index: 20;
	}

	/* エラー行ハイライト */
	:global(.ace-error-line) {
		background-color: rgba(255, 0, 0, 0.3) !important;
		position: absolute;
		z-index: 20;
	}

	/* 警告行ハイライト */
	:global(.ace-warning-line) {
		background-color: rgba(255, 165, 0, 0.3) !important;
		position: absolute;
		z-index: 20;
	}

	/* 成功行ハイライト */
	:global(.ace-success-line) {
		background-color: rgba(0, 255, 0, 0.3) !important;
		position: absolute;
		z-index: 20;
	}

	/* 情報行ハイライト */
	:global(.ace-info-line) {
		background-color: rgba(0, 150, 255, 0.3) !important;
		position: absolute;
		z-index: 20;
	}

	/* アニメーション付きハイライト */
	:global(.ace-animated-highlight) {
		background-color: rgba(255, 193, 7, 0.4) !important;
		position: absolute;
		z-index: 20;
		animation: highlight-pulse 2s ease-in-out infinite;
	}

	/* 点滅ハイライト */
	:global(.ace-blink-highlight) {
		background-color: rgba(255, 0, 255, 0.4) !important;
		position: absolute;
		z-index: 20;
		animation: blink-highlight 1s ease-in-out infinite;
	}

	@keyframes highlight-pulse {
		0% {
			background-color: rgba(255, 193, 7, 0.6) !important;
		}
		50% {
			background-color: rgba(255, 193, 7, 0.2) !important;
		}
		100% {
			background-color: rgba(255, 193, 7, 0.6) !important;
		}
	}

	@keyframes blink-highlight {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
		100% {
			opacity: 1;
		}
	}

	/* エディタのスタイル */
	:global(.ace_scrollbar) {
		overflow-x: hidden !important;
		-webkit-overflow-scrolling: touch !important;
		scrollbar-gutter: stable !important;
		scroll-behavior: smooth;

		&::-webkit-scrollbar {
			width: 5px !important;
			height: 5px !important;
		}
		&::-webkit-scrollbar-track {
			background: transparent !important;
		}
		&::-webkit-scrollbar-thumb {
			background-color: aquamarine !important;
			border-radius: 9999px !important;
		}
	}
</style>

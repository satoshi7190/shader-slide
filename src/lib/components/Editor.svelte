<script lang="ts">
	import ace from 'ace-builds/src-noconflict/ace';
	import { debounce } from 'es-toolkit';
	import { isFullCanvas, fs, run } from '$lib/store';

	// --- 必要なモジュールのインポート ---
	// 1. GLSL用の言語モードをインポート
	import 'ace-builds/src-noconflict/mode-glsl';

	// 2. エディタのテーマをインポート (例: monokai)
	import 'ace-builds/src-noconflict/theme-monokai';

	// 3. 入力補完やスニペットなどの拡張機能をインポート
	import 'ace-builds/src-noconflict/ext-language_tools';
	import { onMount } from 'svelte';

	// GLSL用の構文チェックを行うWorkerのパスを設定します。
	const workerUrl = new URL('ace-builds/src-noconflict/worker-glsl.js', import.meta.url).href;
	ace.config.setModuleUrl('ace/mode/glsl_worker', workerUrl);

	// --- エディタの初期化と設定 ---
	// 'editor'というIDを持つDOM要素をエディタとして初期化

	let editElement = $state<HTMLElement | null>(null);

	onMount(() => {
		const editor = ace.edit(editElement);

		// エディタのオプション
		editor.setOptions({
			theme: 'ace/theme/monokai', // テーマ
			mode: 'ace/mode/glsl', // 言語モード
			fontSize: '60%', // フォントサイズ
			tabSize: 4, // タブサイズ
			useSoftTabs: true, // ソフトタブ（スペース）を使用
			showPrintMargin: false, // 印刷範囲の線を表示しない
			showInvisibles: false, // 不可視文字を表示しない
			highlightSelectedWord: true, // 選択した単語をハイライト
			enableBasicAutocompletion: true, // 基本的な自動補完
			enableLiveAutocompletion: true, // ライブ補完
			enableSnippets: true // スニペットを有効化
		});

		// テキストの折り返し設定
		editor.session.setUseWrapMode(true);

		// --- 初期コードの設定 ---
		// GLSLのサンプルコードをエディタに設定
		editor.setValue($fs, -1); // -1はカーソル位置を変更しない

		// --- イベントリスナー ---

		// エディタの内容が変更されたときにコンソールに出力
		editor.session.on('change', () => {
			// 現在のコードを取得
			const shaderCode = editor.getValue();
			// $fs = shaderCode;
		});

		// エディッタの表示・非表示を切り替える関数
		const toggleEditorVisibility = (value: boolean) => {
			const editorElement = editor.container;
			if (value) {
				editorElement.style.display = 'none';
			} else {
				editorElement.style.display = 'block';
				editor.resize(); // エディタを再描画
			}
		};

		isFullCanvas.subscribe((value) => {
			toggleEditorVisibility(value);
		});

		fs.subscribe((value) => {
			if (editor) {
				editor.setValue(value);
			}
		});
	});
</script>

<div class="flex h-full flex-col {$isFullCanvas ? 'w-0' : 'w-1/2'}">
	<div class="flex w-full flex-1 justify-end bg-[#272822] px-2">
		<button
			class="grid cursor-pointer place-items-center rounded bg-gray-300 p-1"
			onclick={() => {
				// Run the shader code
				run.set(++$run);
			}}><span>run</span></button
		>
	</div>
	<div class="h-full w-full" bind:this={editElement}></div>
</div>

<style>
	/* エディタのスタイル */
	:global(.ace_scrollbar) {
		overflow-x: hidden !important;
		-webkit-overflow-scrolling: touch !important;
		scrollbar-gutter: stable !important;

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

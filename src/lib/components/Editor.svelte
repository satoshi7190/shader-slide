<script lang="ts">
	import ace from 'ace-builds/src-noconflict/ace';
	import { debounce } from 'es-toolkit';

	interface Props {
		fs: string;
	}

	let { fs = $bindable() }: Props = $props();

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

	const updateFragmentShader = (code: string) => {
		fs = code;
	};

	onMount(() => {
		const editor = ace.edit(editElement);

		// エディタのオプション
		editor.setOptions({
			theme: 'ace/theme/monokai', // テーマ
			mode: 'ace/mode/glsl', // 言語モード
			fontSize: '80%', // フォントサイズ
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
		editor.setValue(fs, -1); // -1はカーソル位置を変更しない

		// --- イベントリスナー ---

		const debounceShaderUpdate = debounce(() => {
			// エディタの内容を取得
			const shaderCode = editor.getValue();
			// コンソールに出力
			// シェーダーコードを更新
			updateFragmentShader(shaderCode);
		}, 500); // 500ミリ秒のデバウンス時間

		// エディタの内容が変更されたときにコンソールに出力
		editor.session.on('change', () => {
			// 現在のコードを取得
			debounceShaderUpdate();
		});
	});
</script>

<div id="editor" class="h-full w-1/2" bind:this={editElement}></div>

<script lang="ts">
	import fragment from './fragment.glsl?raw';
	import { fs, isFullCanvas } from '$lib/store';
	import Overlay from '$lib/components/Overlay.svelte';

	import { onMount } from 'svelte';

	onMount(() => {
		fs.set(fragment);
		isFullCanvas.set(true);
	});
</script>

<Overlay>
	<span class="title">GLSLとは</span>
	<div class="absolute top-[15%] flex flex-col px-[3%] text-[150%] text-white">
		<span>Graphics Library Shader Languageの略</span>
		<br />
		<span>シェーダーを記述するための専用プログラミング言語</span>
		<br />
		<span>C言語をベースとした文法</span>
		<br />
		<span
			>数学的思考が必要不可欠で、並列処理特有の制約があるため、人間には理解が困難。わたしはこれと「呪文」と呼んでいる</span
		>
	</div>
</Overlay>

<script lang="ts">
	import { onMount } from 'svelte';
	import vertexShaderSource from './shaders/vertex.glsl?raw';
	import { twMerge } from 'tailwind-merge';
	import { nextPage } from '$lib/utils';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import { isErrorMessage, isFullCanvas, fs, run } from '$lib/store';
	import { debounce } from 'es-toolkit';

	interface Props {
		className?: string;
	}

	let { className = $isFullCanvas ? 'w-full' : 'w-1/2' }: Props = $props();

	let canvas: HTMLCanvasElement | null = null;
	let gl: WebGLRenderingContext | null = null;
	let program: WebGLProgram | null = null;
	let time: WebGLUniformLocation | null = null;
	let mouse: WebGLUniformLocation | null = null;
	let texture: WebGLTexture | null = null;
	let resolution: WebGLUniformLocation | null = null;

	// Microphone → audio texture
	let audioCtx: (AudioContext & { resume?: () => Promise<void> }) | null = null;
	let analyser: AnalyserNode | null = null;
	let audioTexture: WebGLTexture | null = null;
	let audioTexUniform: WebGLUniformLocation | null = null;
	let audioBinsUniform: WebGLUniformLocation | null = null;
	let freqData: Uint8Array | null = null;
	const audioTexUnit = 1; // use texture unit 1 for audio
	let audioBins = 0; // analyser.frequencyBinCount

	// Mouse state (in pixels, y flipped to match gl_FragCoord)
	let mouseX = 0;
	let mouseY = 0;

	const createShader = (gl: WebGLRenderingContext, type: GLenum, source: string) => {
		const shader = gl.createShader(type);
		if (!shader) {
			console.error('Failed to create shader');
			return null;
		}

		let finalSource = source;

		// フラグメントシェーダーの場合、precision文を自動追加
		if (type === gl.FRAGMENT_SHADER) {
			const precisionDirective = `#version 300 es
                    #ifdef GL_FRAGMENT_PRECISION_HIGH
                    precision highp float;
                    #else
                    precision mediump float;
                    #endif

                    `;

			// すでにprecision文が含まれている場合は追加しない
			if (!source.includes('precision')) {
				// #version ディレクティブがある場合はその後に追加
				if (source.includes('#version')) {
					const versionMatch = source.match(/#version\s+\d+.*?\n/);
					if (versionMatch) {
						const versionLine = versionMatch[0];
						finalSource = source.replace(versionLine, versionLine + precisionDirective);
					}
				} else {
					// #version がない場合は先頭に追加
					finalSource = precisionDirective + source;
				}
			}
		}

		gl.shaderSource(shader, finalSource);
		gl.compileShader(shader);
		const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (!success) {
			isErrorMessage.set(gl.getShaderInfoLog(shader));
			console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
			// console.error('Source code:', finalSource); // デバッグ用に最終ソースも出力
			gl.deleteShader(shader);
			return null;
		}
		isErrorMessage.set(null);
		return shader;
	};

	const createProgram = (
		gl: WebGLRenderingContext,
		vertexShader: WebGLShader,
		fragmentShader: WebGLShader
	) => {
		const program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		// Ensure a stable attribute location for a_position across relinks
		gl.bindAttribLocation(program, 0, 'a_position');
		gl.linkProgram(program);
		const success = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (!success) {
			console.error('Program linking error:', gl.getProgramInfoLog(program));
			gl.deleteProgram(program);
			return null;
		}
		return program;
	};

	onMount(() => {
		if (!canvas) {
			console.error('Canvas element not found');
			return;
		}

		// アニメーション状態を取得する関数（デバッグ用）

		gl = (canvas.getContext('webgl2') || canvas.getContext('webgl')) as WebGLRenderingContext;
		const width = window.innerWidth;
		const height = window.innerHeight;

		if (!gl) {
			console.error('WebGL context not available');
			return;
		}

		if (!$fs) {
			isErrorMessage.set('Fragment shader code is empty.');
			return;
		}

		const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, $fs);

		if (!vertexShader || !fragmentShader) {
			console.error('Failed to create shaders');
			return;
		}

		program = createProgram(gl, vertexShader, fragmentShader);

		if (!program) {
			console.error('Failed to create shader program');
			return;
		}

		gl.useProgram(program);

		const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
		time = gl.getUniformLocation(program, 'time');
		resolution = gl.getUniformLocation(program, 'resolution');
		mouse = gl.getUniformLocation(program, 'mouse');
		audioTexUniform = gl.getUniformLocation(program, 'u_audioTex');
		audioBinsUniform = gl.getUniformLocation(program, 'u_audioBins');

		const positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

		texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

		// Prepare audio texture (created once stream/analyser is ready below)
		audioTexture = gl.createTexture();
		gl.activeTexture(gl.TEXTURE0 + audioTexUnit);
		gl.bindTexture(gl.TEXTURE_2D, audioTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

		gl.canvas.width = width;
		gl.canvas.height = height;
		gl.viewport(0, 0, width, height);
		gl.useProgram(program);

		// Microphone init (async)
		(async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
				// @ts-ignore
				audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
				const src = audioCtx.createMediaStreamSource(stream);
				analyser = audioCtx.createAnalyser();
				analyser.fftSize = 1024; // 512 bins
				audioBins = analyser.frequencyBinCount;
				freqData = new Uint8Array(audioBins);
				src.connect(analyser);

				// Allocate 1xN texture storage depending on WebGL version
				const isWebGL2 =
					typeof WebGL2RenderingContext !== 'undefined' &&
					(gl as any) instanceof WebGL2RenderingContext;
				gl.activeTexture(gl.TEXTURE0 + audioTexUnit);
				gl.bindTexture(gl.TEXTURE_2D, audioTexture);
				if (isWebGL2) {
					const gl2 = gl as unknown as WebGL2RenderingContext;
					gl2.texImage2D(
						gl2.TEXTURE_2D,
						0,
						gl2.R8,
						audioBins,
						1,
						0,
						gl2.RED,
						gl2.UNSIGNED_BYTE,
						freqData
					);
				} else {
					gl.texImage2D(
						gl.TEXTURE_2D,
						0,
						gl.LUMINANCE,
						audioBins,
						1,
						0,
						gl.LUMINANCE,
						gl.UNSIGNED_BYTE,
						freqData
					);
				}
			} catch (e) {
				console.error('Microphone init failed', e);
			}
		})();

		// アニメーションを開始する関数
		const startTime = performance.now();

		const draw = () => {
			const now = performance.now();
			// 現在のトランジション開始時点からの経過時間
			const elapsedSec = (now - startTime) / 1000;

			if (!gl) {
				console.error('WebGL context not available or animation stopped');
				return;
			}

			gl.clearColor(0, 0, 0, 1);
			gl.clear(gl.COLOR_BUFFER_BIT);

			gl.useProgram(program);
			if (time) gl.uniform1f(time, elapsedSec);
			if (resolution) gl.uniform2f(resolution, gl.drawingBufferWidth, gl.drawingBufferHeight);
			if (mouse) gl.uniform2f(mouse, mouseX, mouseY);

			// Update audio texture + uniforms
			if (analyser && freqData && audioTexture) {
				analyser.getByteFrequencyData(freqData);
				const isWebGL2 =
					typeof WebGL2RenderingContext !== 'undefined' &&
					(gl as any) instanceof WebGL2RenderingContext;
				gl.activeTexture(gl.TEXTURE0 + audioTexUnit);
				gl.bindTexture(gl.TEXTURE_2D, audioTexture);
				if (isWebGL2) {
					const gl2 = gl as unknown as WebGL2RenderingContext;
					gl2.texSubImage2D(
						gl2.TEXTURE_2D,
						0,
						0,
						0,
						audioBins,
						1,
						gl2.RED,
						gl2.UNSIGNED_BYTE,
						freqData
					);
				} else {
					gl.texSubImage2D(
						gl.TEXTURE_2D,
						0,
						0,
						0,
						audioBins,
						1,
						gl.LUMINANCE,
						gl.UNSIGNED_BYTE,
						freqData
					);
				}
				if (audioTexUniform) gl.uniform1i(audioTexUniform, audioTexUnit);
				if (audioBinsUniform) gl.uniform1f(audioBinsUniform, audioBins);
			}

			gl.drawArrays(gl.TRIANGLES, 0, 6);

			requestAnimationFrame(draw);
		};

		draw();

		fitCanvas(gl, canvas);
	});

	run.subscribe((value) => {
		if (!gl || !$fs) return;
		// Recompile and relink program with updated fragment shader
		const newVertex = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const newFragment = createShader(gl, gl.FRAGMENT_SHADER, $fs);
		if (!newVertex || !newFragment) {
			console.error('Failed to compile shaders on update');
			return;
		}
		const newProgram = createProgram(gl, newVertex, newFragment);
		if (!newProgram) {
			console.error('Failed to link program on update');
			return;
		}

		// Swap program
		if (program) {
			gl.deleteProgram(program);
		}
		program = newProgram;
		gl.useProgram(program);

		// Re-fetch uniforms for the new program
		time = gl.getUniformLocation(program, 'time');
		resolution = gl.getUniformLocation(program, 'resolution');
		mouse = gl.getUniformLocation(program, 'mouse');
		audioTexUniform = gl.getUniformLocation(program, 'u_audioTex');
		audioBinsUniform = gl.getUniformLocation(program, 'u_audioBins');
		if (audioTexUniform) gl.uniform1i(audioTexUniform, audioTexUnit);
		if (audioBinsUniform) gl.uniform1f(audioBinsUniform, audioBins);

		const loc = gl.getAttribLocation(program, 'a_position');
		if (loc !== -1) {
			gl.enableVertexAttribArray(loc);
			gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
		}
	});

	const fitCanvas = (gl: WebGLRenderingContext, canvas: HTMLCanvasElement) => {
		const dpr = Math.max(1, window.devicePixelRatio || 1);
		const displayWidth = Math.floor(canvas.clientWidth * dpr);
		const displayHeight = Math.floor(canvas.clientHeight * dpr);

		if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
			canvas.width = displayWidth;
			canvas.height = displayHeight;
			gl.viewport(0, 0, displayWidth, displayHeight);
		}
	};

	const handleClick = (event: MouseEvent) => {
		if (!canvas) return;
		nextPage('next');
	};

	// isFullCanvasの変更を監視して適切にリサイズ
	let previousFullCanvas = $isFullCanvas;
	$effect(() => {
		if (previousFullCanvas !== $isFullCanvas) {
			// 状態が変更されたときに少し遅延を入れて確実にリサイズ
			setTimeout(() => {
				if (gl && canvas) {
					fitCanvas(gl, canvas);
				}
			}, 50); // CSS transitionなどが完了するまで少し待機

			// さらに確実にするため、少し長めの遅延でもう一度実行
			setTimeout(() => {
				if (gl && canvas) {
					fitCanvas(gl, canvas);
				}
			}, 200);

			previousFullCanvas = $isFullCanvas;
		}
	});

	// isFullCanvas.subscribe((value) => {
	// 	if (value) {
	// 		if (gl && canvas) fitCanvas(gl, canvas);
	// 	} else {
	// 		if (gl && canvas) fitCanvas(gl, canvas);
	// 	}
	// });
</script>

<canvas
	bind:this={canvas}
	onmousemove={(e) => {
		if (!gl || !canvas) return;
		const rect = canvas.getBoundingClientRect();

		// CSS座標 → デバイスピクセルへ
		const xPx = (e.clientX - rect.left) * (gl.drawingBufferWidth / rect.width);
		const yPx = (e.clientY - rect.top) * (gl.drawingBufferHeight / rect.height);

		// gl_FragCoord は下原点なので y を反転
		const yPxBottom = gl.drawingBufferHeight - yPx;

		// アスペクト補正済みの -1..1 へ
		const minSide = Math.min(gl.drawingBufferWidth, gl.drawingBufferHeight);
		mouseX = (xPx * 2.0 - gl.drawingBufferWidth) / minSide;
		mouseY = (yPxBottom * 2.0 - gl.drawingBufferHeight) / minSide;
	}}
	ontouchmove={(e) => {
		if (!gl || !canvas) return;
		if (!gl || !canvas) return;
		const rect = canvas.getBoundingClientRect();

		// CSS座標 → デバイスピクセルへ
		const xPx = (e.clientX - rect.left) * (gl.drawingBufferWidth / rect.width);
		const yPx = (e.clientY - rect.top) * (gl.drawingBufferHeight / rect.height);

		// gl_FragCoord は下原点なので y を反転
		const yPxBottom = gl.drawingBufferHeight - yPx;

		// アスペクト補正済みの -1..1 へ
		const minSide = Math.min(gl.drawingBufferWidth, gl.drawingBufferHeight);
		mouseX = (xPx * 2.0 - gl.drawingBufferWidth) / minSide;
		mouseY = (yPxBottom * 2.0 - gl.drawingBufferHeight) / minSide;
	}}
	onclick={handleClick}
	class="z-0 h-full {$isFullCanvas ? 'w-full' : 'w-1/2'}"
>
</canvas>
<ErrorMessage />
<svelte:window
	on:resize={() => {
		if (gl && canvas) {
			if (gl && canvas) fitCanvas(gl, canvas);
		}
	}}
/>

<style>
</style>

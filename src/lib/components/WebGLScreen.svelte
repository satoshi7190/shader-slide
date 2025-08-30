<script lang="ts">
	import { onMount } from 'svelte';
	import vertexShaderSource from './shaders/vertex.glsl?raw';
	import { twMerge } from 'tailwind-merge';
	import { nextPage } from '$lib/utils';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import { isErrorMessage } from '$lib/store';
	interface Props {
		fs: string;
		className?: string;
	}

	let { fs, className = 'w-1/2' }: Props = $props();

	let canvas: HTMLCanvasElement | null = null;
	let gl: WebGLRenderingContext | null = null;
	let program: WebGLProgram | null = null;
	let time: WebGLUniformLocation | null = null;
	let texture: WebGLTexture | null = null;
	let resolution: WebGLUniformLocation | null = null;

	const createShader = (gl: WebGLRenderingContext, type: GLenum, source: string) => {
		const shader = gl.createShader(type);
		if (!shader) {
			console.error('Failed to create shader');
			return null;
		}

		let finalSource = source;

		// フラグメントシェーダーの場合、precision文を自動追加
		if (type === gl.FRAGMENT_SHADER) {
			const precisionDirective = `#ifdef GL_FRAGMENT_PRECISION_HIGH
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
			console.error('Source code:', finalSource); // デバッグ用に最終ソースも出力
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

		gl = canvas.getContext('webgl');
		const width = window.innerWidth;
		const height = window.innerHeight;

		if (!gl) {
			console.error('WebGL context not available');
			return;
		}

		const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fs);

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

		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

		gl.canvas.width = width;
		gl.canvas.height = height;
		gl.viewport(0, 0, width, height);

		gl.canvas.width = width;
		gl.canvas.height = height;
		gl.viewport(0, 0, width, height);
		gl.useProgram(program);

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
			gl.uniform1f(time, elapsedSec);
			gl.uniform2f(resolution, gl.drawingBufferWidth, gl.drawingBufferHeight);

			gl.drawArrays(gl.TRIANGLES, 0, 6);

			requestAnimationFrame(draw);
		};

		draw();
	});

	$effect(() => {
		if (!gl || !fs) return;
		// Recompile and relink program with updated fragment shader
		const newVertex = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const newFragment = createShader(gl, gl.FRAGMENT_SHADER, fs);
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

		// Attribute location is forced to 0 via bindAttribLocation; ensure it is enabled
		const loc = gl.getAttribLocation(program, 'a_position');
		if (loc !== -1) {
			gl.enableVertexAttribArray(loc);
			// Re-point attribute to current bound buffer
			gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
		}
	});

	const handleClick = (event: MouseEvent) => {
		if (!canvas) return;
		nextPage('next');
	};
</script>

<canvas bind:this={canvas} onclick={handleClick} class={twMerge('z-0 h-full', className)}> </canvas>
<ErrorMessage />
<svelte:window
	on:resize={() => {
		if (gl && canvas) {
			const width = window.innerWidth;
			const height = window.innerHeight;
			canvas.width = width;
			canvas.height = height;
			gl.viewport(0, 0, width, height);
		}
	}}
/>

<style>
</style>

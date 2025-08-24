<script lang="ts">
	import { onMount } from 'svelte';
	import fragmentShaderSource from './shaders/fragment.glsl?raw';
	import vertexShaderSource from './shaders/vertex.glsl?raw';

	let canvas: HTMLCanvasElement | null = null;
	let gl: WebGLRenderingContext | null = null;
	let program: WebGLProgram | null = null;
	let time: WebGLUniformLocation | null = null;
	let texture: WebGLTexture | null = null;
	let resolution: WebGLUniformLocation | null = null;

	onMount(() => {
		if (!canvas) {
			console.error('Canvas element not found');
			return;
		}

		const createShader = (gl: WebGLRenderingContext, type: GLenum, source: string) => {
			const shader = gl.createShader(type);
			if (!shader) {
				console.error('Failed to create shader');
				return null;
			}
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
			if (!success) {
				console.error(gl.getShaderInfoLog(shader));
				gl.deleteShader(shader);
				return null;
			}
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
			gl.linkProgram(program);
			const success = gl.getProgramParameter(program, gl.LINK_STATUS);
			if (!success) {
				console.error(gl.getProgramInfoLog(program));
				gl.deleteProgram(program);
				return null;
			}
			return program;
		};

		// アニメーション状態を取得する関数（デバッグ用）

		gl = canvas.getContext('webgl');
		const width = window.innerWidth;
		const height = window.innerHeight;

		if (!gl) {
			console.error('WebGL context not available');
			return;
		}

		const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

		if (!vertexShader || !fragmentShader) {
			console.error('Failed to create shaders');
			return;
		}

		program = createProgram(gl, vertexShader, fragmentShader);

		if (!program) {
			console.error('Failed to create shader program');
			return;
		}

		// まずプログラムを使用状態にする
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

		// delay用のヘルパー関数

		// アニメーションを開始する関数

		const draw = () => {
			const now = performance.now();
			// 現在のトランジション開始時点からの経過時間

			if (!gl) {
				console.error('WebGL context not available or animation stopped');
				return;
			}

			gl.clearColor(0, 0, 0, 1);
			gl.clear(gl.COLOR_BUFFER_BIT);

			gl.useProgram(program);
			gl.uniform1f(time, elapsed);
			gl.uniform2f(resolution, gl.drawingBufferWidth, gl.drawingBufferHeight);

			gl.drawArrays(gl.TRIANGLES, 0, 6);

			requestAnimationFrame(draw);
		};

		draw();
	});
</script>

<canvas bind:this={canvas} class="h-full w-full"></canvas>

<style>
</style>

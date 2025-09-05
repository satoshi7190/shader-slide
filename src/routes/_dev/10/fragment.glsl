uniform vec2 resolution;
uniform float time;
uniform sampler2D audioTex; // 1xN audio spectrum texture
uniform float audioBins;    // number of bins (width)

out vec4 fragColor;

void main() {
    // normalized device coords with aspect fix (center = 0)
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);

    // 0..1 screen coords
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;

    // sample audio: map x to [0..1] across bins
    float x = clamp(gl_FragCoord.x / resolution.x, 0.0, 1.0);
    // center of the target bin
    float bin = floor(x * max(audioBins - 1.0, 1.0));
    float u = (bin + 0.5) / max(audioBins, 1.0);
    float amp = texture(audioTex, vec2(u, 0.5)).r; // 0..1

    // simple visual: bars + glow by amplitude
    float bars = smoothstep(0.02, 0.0, abs(uv.y) - amp * 0.8);
    vec3 base = vec3(0.1, 0.2, 0.6) + vec3(0.9, 0.5, 0.2) * amp;
    vec3 color = base * bars;

    // slight hue shift over time
    color = color * (0.8 + 0.2 * sin(time + x * 6.2831853));

    fragColor = vec4(color, 1.0);
}


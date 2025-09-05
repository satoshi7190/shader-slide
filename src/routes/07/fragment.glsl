uniform vec2 resolution;

out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    uv.x *= resolution.x / resolution.y;

    vec3 color = vec3(uv, 1.0);

    fragColor = vec4(color, 1.0);
}
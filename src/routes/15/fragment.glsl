uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy);
    uv.x *= resolution.x / resolution.y;

    vec3 color = vec3(uv.x,uv.y,abs(sin(time)));

    fragColor = vec4(color, 1.0);
}
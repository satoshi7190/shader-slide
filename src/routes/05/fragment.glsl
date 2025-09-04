uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

void main() {
    vec2 st = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    st.x *= resolution.x / resolution.y;

    vec3 color = vec3(st, 1.0);

    fragColor = vec4(color, 1.0);
}
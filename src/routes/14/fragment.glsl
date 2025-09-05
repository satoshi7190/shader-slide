uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

void main() {
    vec2 st = (gl_FragCoord.xy / resolution.xy);
    st.x *= resolution.x / resolution.y;

    vec3 color = vec3(st.x,st.y,abs(sin(time)));

    fragColor = vec4(color, 1.0);
}
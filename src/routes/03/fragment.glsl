uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

void main(void) {

    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);

    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;

    vec3 color = vec3(0.);
    color = vec3(st.x,st.y,abs(sin(time)));

    gl_FragColor = vec4(color,1.0);
}


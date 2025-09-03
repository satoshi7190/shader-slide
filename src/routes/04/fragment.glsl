uniform vec2 resolution;
uniform float time;

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

out vec4 fragColor;

void main() {
    vec2 st = (gl_FragCoord.xy / resolution - 0.5) * 2.0;
    st.x *= resolution.x / resolution.y;
    st = rotate2d(time * 0.5) * st;

    float circle = sdCircle(st, 0.3);
    vec3 color = vec3(smoothstep(0.0, 0.02, -circle));

    fragColor = vec4(color, 1.0);
}



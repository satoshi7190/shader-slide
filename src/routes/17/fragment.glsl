uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}
                    
void main() {
    vec2 st = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    st.x *= resolution.x / resolution.y;

    float circle = sdCircle(st, 0.3);

    vec3 color = vec3(step(0.0, circle));
    
    fragColor = vec4(color, 1.0);
}


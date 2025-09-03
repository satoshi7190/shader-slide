uniform vec2 resolution;
uniform float time;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

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

    float angle = atan(st.y, st.x) + time;
    vec3 rainbowColor = hsv2rgb(vec3(angle / (2.0 * 3.14159), 1.0, 1.0));
    
    float circle = sdCircle(st, 0.3);
    vec3 color = rainbowColor * smoothstep(0.0, 0.02, -circle);
                        

    fragColor = vec4(color * vec3(0.5, 0.8, 1.0), 1.0);
}



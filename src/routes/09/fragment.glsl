uniform vec2 resolution;
uniform float time;
out vec4 fragColor;

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec2 st = (gl_FragCoord.xy / resolution.xy - 0.5);
    st.x *= resolution.x / resolution.y;
    
    vec3 color = vec3(0.0);
    
    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float radius = 0.1 + fi * 0.1;
        float circle = sdCircle(st, radius);
        
        float hue = fi * 0.3 + time * 0.1;
        vec3 ringColor = hsv2rgb(vec3(hue, 0.8, 1.0));
        
        float d = abs(circle);
        float intensity = 1.0 - smoothstep(0.0, 0.05, d);
        color += ringColor * intensity;
    }
    
    fragColor = vec4(color, 1.0);
}
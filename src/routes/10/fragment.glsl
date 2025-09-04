uniform vec2 resolution;
uniform float time;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float glow(float d, float strength, float falloff) {
    return strength / (1.0 + d * d * falloff);
}

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}                 

float ripple(vec2 center, vec2 uv, float time, float freq, float amp) {
    float dist = distance(uv, center);
    return sin(dist * freq - time) * amp * (1.0 / (1.0 + dist * 2.0));
}



out vec4 fragColor;

void main() {
    vec2 st = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    st.x *= resolution.x / resolution.y;
    
    vec3 color = vec3(0.0);
    
    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float radius = 0.2 + fi * 0.15;
        float circle = sdCircle(st, radius);
        
        float hue = fi * 0.3 + time * 0.1;
        vec3 ringColor = hsv2rgb(vec3(hue, 0.8, 1.0));
        
        float d = abs(circle);
        color += glow(d, 0.5, 30.0) * ringColor * 0.7;
    }
    
    fragColor = vec4(color, 1.0);
}





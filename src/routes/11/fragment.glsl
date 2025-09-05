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
    vec2 uv = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    uv.x *= resolution.x / resolution.y;
    
    float circle = sdCircle(uv, 0.3);
    float d = abs(circle);

    float intensity = 1.0 - smoothstep(0.0, 0.1, d);
    
    vec3 color = hsv2rgb(vec3(time * 0.1, 0.8, 1.0)) * intensity;
    
    fragColor = vec4(color, 1.0);
}

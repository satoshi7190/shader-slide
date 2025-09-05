uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    uv.x *= resolution.x / resolution.y;
    
    float circle = sdCircle(uv, 0.3);
    
    // リング状に可視化
    float d = abs(circle);
    float intensity = 1.0 - smoothstep(0.0, 0.1, d);
    vec3 color = vec3(1.0) * intensity;
    
    fragColor = vec4(color, 1.0);
}


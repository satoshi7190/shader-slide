uniform vec2 resolution;
uniform float time;
uniform sampler2D u_audioTex;
uniform float u_audioBins;

out vec4 fragColor;

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float glow(float d, float strength, float falloff) {
    return strength / (1.0 + d * d * falloff);
}          

float ripple(vec2 center, vec2 uv, float time, float freq, float amp) {
    float dist = distance(uv, center);
    return sin(dist * freq - time) * amp * (1.0 / (1.0 + dist * 2.0));
}

float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}
                    
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
                mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0)), u.x), u.y);
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main() {
    vec2 st = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    st.x *= resolution.x / resolution.y;
    
    vec3 color = vec3(0.0);

    float u_intensity = 0.1;
    
    // 音声データ取得
    float bass = texture(u_audioTex, vec2(0.1, 0.5)).r;
    float treble = texture(u_audioTex, vec2(0.9, 0.5)).r;
    float mid = texture(u_audioTex, vec2(0.5, 0.5)).r;

  
    for (int i = 0; i < 3; i++) {
        float fi = float(i) ;
        vec2 rotSt = rotate2d(time * (0.5 + fi * 0.2)) * st;
        float radius = 0.2 + fi * 0.15;
        float circle = sdCircle(rotSt, radius);
        
        float hue = fi * 0.3 + time * 0.1;
        vec3 ringColor = hsv2rgb(vec3(hue, 0.8, 1.0));
        
        float d = abs(circle);

        color += glow(d - bass, 0.8, 100.0) * ringColor * 0.4;
        color += glow(d - mid, 0.4, 20.0) * ringColor * 0.6;
        color += glow(d - treble, 0.2, 5.0) * ringColor * 0.8;
    }

    float waves = ripple(vec2(0.0), st, time * 3.0, 20.0, 0.3);
    color += abs(waves) * hsv2rgb(vec3(time * 0.1, 0.7, 0.6));
    
    vec2 rotatedSt1 = rotate2d(time * 0.3) * st;
    float particles1 = noise(rotatedSt1 * 8.0 + time * 0.5) * 0.5 + 0.5;
    particles1 += noise(rotatedSt1 * 16.0 - time * 0.3) * 0.3;
    
    vec2 rotatedSt2 = rotate2d(time * -0.5) * st;
    float particles2 = noise(rotatedSt2 * 6.0 + time * 0.4) * 0.4;
    
    vec2 rotatedSt3 = rotate2d(time * 0.8) * st;
    float particles3 = noise(rotatedSt3 * 12.0 - time * 0.6) * 0.3;
    
    color += particles1 * hsv2rgb(vec3(time * 0.1, 0.6, 1.0)) * 0.3; // 青系
    color += particles2 * hsv2rgb(vec3(time * 0.15 + 0.3, 0.7, 0.8)) * 0.2; // 緑系
    color += particles3 * hsv2rgb(vec3(time * 0.2 + 0.6, 0.8, 0.9)) * 0.2; // 赤系

    fragColor = vec4(color, 1.0);
}
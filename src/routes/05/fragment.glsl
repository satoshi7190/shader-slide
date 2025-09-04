uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float glow(float d, float strength, float falloff) {
    return strength / (1.0 + d * d * falloff);
}

void main() {
    vec2 st = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    st.x *= resolution.x / resolution.y;
    
    float centerDist = length(st);
    vec3 color = hsv2rgb(vec3(time * 0.1, 0.7, 1.0));
    color *= glow(centerDist, 0.5, 5.0);
    
    fragColor = vec4(color, 1.0);
}


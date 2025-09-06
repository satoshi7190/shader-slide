import"../chunks/DsnmJJEf.js";import{p as s,q as l,x as c,b as v}from"../chunks/Ce8YuaDY.js";import{s as f,u as m,a as u}from"../chunks/BA8C_d9j.js";import{E as d}from"../chunks/jP35rHgP.js";import{f as g,i as p,r as n}from"../chunks/BX_KVGA7.js";import{h as x}from"../chunks/BToj0et0.js";const h=`uniform vec2 resolution;
uniform float time;
uniform sampler2D audioTex;
uniform float audioBins;

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

float random(vec2 uv) {
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453123);
}
                    
float noise(vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
                mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0)), u.x), u.y);
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

float distortedCircle(vec2 p, float r, float time, float intensity) {
    float angle = atan(p.y, p.x);
    float radius = length(p);
    
    float distortion = 0.0;
    
    distortion += sin(angle * 3.0 + time * 0.5) * 0.03;
    distortion += sin(angle * 8.0 + time * 1.2) * 0.02;
    distortion += sin(angle * 15.0 + time * 2.0) * 0.01;
    
    vec2 noisePos = vec2(cos(angle), sin(angle)) * 3.0;
    distortion += (noise(noisePos + time * 0.3) - 0.5) * 0.04;
    
    return radius - (r + distortion * intensity);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    uv.x *= resolution.x / resolution.y;
    
    vec3 color = vec3(0.0);
    
    float bass = texture(audioTex, vec2(0.1, 0.5)).r;
    float treble = texture(audioTex, vec2(0.9, 0.5)).r;
    float mid = texture(audioTex, vec2(0.5, 0.5)).r;

    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        vec2 rotSt = rotate2d(time * (0.5 + fi * 0.2)) * uv;
        float radius = 0.2 + fi * 0.15;
        
        float intensity = 1.0 + fi * 0.5;
        float circle = distortedCircle(rotSt, radius, time + fi * 2.0, intensity);
        
        float hue = fi * 0.3 + time * 0.1;
        vec3 ringColor = hsv2rgb(vec3(hue, 0.8, 1.0));
        
        float d = abs(circle);

        color += glow(d - bass, 0.8, 100.0) * ringColor * 0.4;
        color += glow(d - mid, 0.4, 20.0) * ringColor * 0.6;
        color += glow(d - treble, 0.2, 5.0) * ringColor * 0.8;
    }

    float distortedWaves = ripple(vec2(0.0), uv, time * 3.0, 20.0, 0.3);
    vec2 waveDistortUv = uv + vec2(noise(uv * 5.0 + time) - 0.5, noise(uv * 5.0 + time + 100.0) - 0.5) * 0.1;
    distortedWaves += ripple(vec2(0.0), waveDistortUv, time * 2.0, 15.0, 0.2);
    
    color += abs(distortedWaves) * hsv2rgb(vec3(time * 0.1, 0.7, 0.6));
    
    vec2 rotatedUv1 = rotate2d(time * 0.3) * uv;
    float particles1 = noise(rotatedUv1 * 8.0 + time * 0.5) * 0.5 + 0.5;
    particles1 += noise(rotatedUv1 * 16.0 - time * 0.3) * 0.3;

    vec2 rotatedUv2 = rotate2d(time * -0.5) * uv;
    float particles2 = noise(rotatedUv2 * 6.0 + time * 0.4) * 0.4;

    vec2 rotatedUv3 = rotate2d(time * 0.8) * uv;
    float particles3 = noise(rotatedUv3 * 12.0 - time * 0.6) * 0.3;
    
    color += particles1 * hsv2rgb(vec3(time * 0.1, 0.6, 1.0)) * 0.3;
    color += particles2 * hsv2rgb(vec3(time * 0.15 + 0.3, 0.7, 0.8)) * 0.2;
    color += particles3 * hsv2rgb(vec3(time * 0.2 + 0.6, 0.8, 0.9)) * 0.2;

    fragColor = vec4(color, 1.0);
}`;function $(e,t){s(t,!0);const[o,i]=f(),r=()=>u(n,"$run",o);l(()=>{g.set(h),p.set(!1),n.set(m(n,r()))});const a=c([{line:3,message:"音声データをテクスチャとして受け取る"},{line:4,message:"音声解析の分解能（ビン数）を表す"},{line:65,message:"低周波数帯域をサンプリング"},{line:66,message:"低周波数帯域をサンプリング"},{line:67,message:"中周波数帯域をサンプリング"},...x(82,84)]);d(e,{title:"音と連動させる",get highlightLines(){return a}}),v(),i()}export{$ as component};

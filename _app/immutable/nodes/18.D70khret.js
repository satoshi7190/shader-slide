import"../chunks/DsnmJJEf.js";import{p as s,q as c,x as v,b as f}from"../chunks/Ce8YuaDY.js";import{s as u,u as m,a as g}from"../chunks/BA8C_d9j.js";import{E as d}from"../chunks/CG5DVFvA.js";import{f as p,i as x,r as n}from"../chunks/BX_KVGA7.js";import{h as t}from"../chunks/Dh-uhbDC.js";const h=`uniform vec2 resolution;
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

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    uv.x *= resolution.x / resolution.y;
    
    vec3 color = vec3(0.0);

    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        vec2 rotSt = rotate2d(time * (0.5 + fi * 0.2)) * uv;
        float radius = 0.2 + fi * 0.15;
        float circle = sdCircle(rotSt, radius);
        
        float hue = fi * 0.3 + time * 0.1;
        vec3 ringColor = hsv2rgb(vec3(hue, 0.8, 1.0));
        
        float d = abs(circle);
       
        color += glow(d, 0.8, 100.0) * ringColor * 0.4;
        color += glow(d, 0.4, 20.0) * ringColor * 0.6;
        color += glow(d, 0.2, 5.0) * ringColor * 0.8;
    }

    float waves = ripple(vec2(0.0), uv, time * 3.0, 20.0, 0.3);
    color += abs(waves) * hsv2rgb(vec3(time * 0.1, 0.7, 0.6));

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
}`;function $(e,o){s(o,!0);const[r,a]=u(),i=()=>g(n,"$run",r);c(()=>{p.set(h),x.set(!1),n.set(m(n,i()))});const l=v([{line:37,message:"２次元回転関数"},...t(38,39),...t(66,74)]);d(e,{get highlightLines(){return l},title:"回転させる"}),f(),a()}export{$ as component};

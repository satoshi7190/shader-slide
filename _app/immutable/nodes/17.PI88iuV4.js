import"../chunks/DsnmJJEf.js";import{p as s,q as c,x as f,b as u}from"../chunks/Ce8YuaDY.js";import{s as v,u as m,a as p}from"../chunks/BA8C_d9j.js";import{E as g}from"../chunks/CH84pHrK.js";import{f as d,i as x,r as n}from"../chunks/BX_KVGA7.js";import{h as o}from"../chunks/Cwcfe3ui.js";const h=`uniform vec2 resolution;
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

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    uv.x *= resolution.x / resolution.y;
    
    vec3 color = vec3(0.0);
    
    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float radius = 0.2 + fi * 0.15;
        float circle = sdCircle(uv, radius);
        
        float hue = fi * 0.3 + time * 0.1;
        vec3 ringColor = hsv2rgb(vec3(hue, 0.8, 1.0));
        
        float d = abs(circle);
        color += glow(d, 0.8, 100.0) * ringColor * 0.4;
        color += glow(d, 0.4, 20.0) * ringColor * 0.6;
        color += glow(d, 0.2, 5.0) * ringColor * 0.8;
    }
    
    float waves = ripple(vec2(0.0), uv, time * 3.0, 20.0, 0.3);
    color += abs(waves) * hsv2rgb(vec3(time * 0.1, 0.7, 0.6));
    float particles = noise(uv * 8.0 + time * 0.5) * 0.5 + 0.5;

    particles += noise(uv * 16.0 - time * 0.3) * 0.3;
    color += particles  * 0.2;

    fragColor = vec4(color, 1.0);
}


`;function K(e,r){s(r,!0);const[t,i]=v(),a=()=>p(n,"$run",t);c(()=>{d.set(h),x.set(!1),n.set(m(n,a()))});const l=f([{line:25,message:"乱数関数"},...o(26,27),{line:29,message:"ノイズ関数"},...o(30,35),...o(61,62)]);g(e,{get highlightLines(){return l},title:"パーティクルを描く"}),u(),i()}export{K as component};

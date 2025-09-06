import"../chunks/DsnmJJEf.js";import{p as s,q as c,x as f,b as u}from"../chunks/Ce8YuaDY.js";import{s as v,u as g,a as p}from"../chunks/BA8C_d9j.js";import{E as m}from"../chunks/CG5DVFvA.js";import{f as d,i as h,r as n}from"../chunks/BX_KVGA7.js";import{h as o}from"../chunks/Dh-uhbDC.js";const x=`uniform vec2 resolution;
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

    fragColor = vec4(color, 1.0);
}


`;function K(r,t){s(t,!0);const[e,l]=v(),a=()=>p(n,"$run",e);c(()=>{d.set(x),h.set(!1),n.set(g(n,a()))});const i=f([{line:20,message:"波紋効果関数"},...o(21,22),...o(45,46)]);m(r,{get highlightLines(){return i},title:"波紋を描く"}),u(),l()}export{K as component};

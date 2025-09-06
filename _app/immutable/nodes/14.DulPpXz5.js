import"../chunks/DsnmJJEf.js";import{p as a,q as c,x as l,b as f}from"../chunks/Ce8YuaDY.js";import{s as u,u as p,a as m}from"../chunks/BA8C_d9j.js";import{E as v}from"../chunks/E_7G8KzO.js";import{f as g,i as x,r as n}from"../chunks/BX_KVGA7.js";import{h}from"../chunks/DJVOntDl.js";const d=`uniform vec2 resolution;
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
    
    vec3 color = vec3(0.0);
    
    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float radius = 0.2 + fi * 0.15;
        float circle = sdCircle(uv, radius);
        
        float hue = fi * 0.3 + time * 0.1;
        vec3 ringColor = hsv2rgb(vec3(hue, 0.8, 1.0));
        
        float d = abs(circle);
        float intensity = 1.0 - smoothstep(0.0, 0.05, d);
        color += ringColor * intensity;
    }
    
    fragColor = vec4(color, 1.0);
}`;function w(o,r){a(r,!0);const[t,e]=u(),s=()=>m(n,"$run",t);c(()=>{g.set(d),x.set(!1),n.set(p(n,s()))});const i=l([...h(21,32)]);v(o,{get highlightLines(){return i},title:"ループ処理による複製"}),f(),e()}export{w as component};

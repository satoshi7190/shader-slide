import"../chunks/DsnmJJEf.js";import{p as a,q as c,x as f,b as u}from"../chunks/Ce8YuaDY.js";import{s as g,u as p,a as m}from"../chunks/BA8C_d9j.js";import{E as v}from"../chunks/jP35rHgP.js";import{f as h,i as x,r as o}from"../chunks/BX_KVGA7.js";import{h as n}from"../chunks/BToj0et0.js";const d=`uniform vec2 resolution;
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

    fragColor = vec4(color, 1.0);
}


`;function K(r,t){a(t,!0);const[e,l]=g(),s=()=>m(o,"$run",e);c(()=>{h.set(d),x.set(!1),o.set(p(o,s()))});const i=f([{line:16,message:"グロー効果関数"},...n(17,18),...n(35,37)]);v(r,{get highlightLines(){return i},title:"光らせる"}),u(),l()}export{K as component};

import"../chunks/DsnmJJEf.js";import{p as c,q as l,x as u,b as p}from"../chunks/Ce8YuaDY.js";import{s as m,u as f,a as g}from"../chunks/BA8C_d9j.js";import{E as v}from"../chunks/5sYIBeOE.js";import{f as x,i as h,r as n}from"../chunks/BX_KVGA7.js";import{h as e}from"../chunks/UUy2dj5A.js";const d=`uniform vec2 resolution;
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
`;function w(o,t){c(t,!0);const[r,s]=m(),i=()=>g(n,"$run",r);l(()=>{x.set(d),h.set(!1),n.set(f(n,i()))});const a=u([{line:2,message:"時間を使ってアニメーション"},{line:10,message:"HSV色空間変換関数"},...e(11,14),...e(22,24)]);v(o,{get highlightLines(){return a},title:"色を動的に変化させる"}),p(),s()}export{w as component};

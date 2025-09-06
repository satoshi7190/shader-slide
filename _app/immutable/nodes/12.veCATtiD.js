import"../chunks/DsnmJJEf.js";import{p as a,q as l,x as u,b as c}from"../chunks/Ce8YuaDY.js";import{s as p,u as f,a as g}from"../chunks/BA8C_d9j.js";import{E as m}from"../chunks/jP35rHgP.js";import{f as h,i as v,r as o}from"../chunks/BX_KVGA7.js";import{h as d}from"../chunks/BToj0et0.js";const x=`uniform vec2 resolution;

out vec4 fragColor;

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    uv.x *= resolution.x / resolution.y;
    
    float circle = sdCircle(uv, 0.3);
    
    float d = abs(circle);
    float intensity = 1.0 - smoothstep(0.0, 0.1, d);
    vec3 color = vec3(1.0) * intensity;
    
    fragColor = vec4(color, 1.0);
}

`;function F(n,t){a(t,!0);const[r,s]=p(),e=()=>g(o,"$run",r);l(()=>{h.set(x),v.set(!1),o.set(f(o,e()))});const i=u(d(15,17));m(n,{get highlightLines(){return i},title:"リングを描く"}),c(),s()}export{F as component};

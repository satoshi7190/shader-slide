import"../chunks/DsnmJJEf.js";import{p as i,q as u,x as p,b as l}from"../chunks/Ce8YuaDY.js";import{s as c,u as g,a as m}from"../chunks/BA8C_d9j.js";import{E as f}from"../chunks/B9yLLkQc.js";import{f as h,i as v,r as o}from"../chunks/BX_KVGA7.js";import{h as x}from"../chunks/B6VtnY8K.js";const _=`uniform vec2 resolution;

out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    uv.x *= resolution.x / resolution.y;

    vec3 color = vec3(uv, 1.0);

    fragColor = vec4(color, 1.0);
}`;function L(r,s){i(s,!0);const[t,n]=c(),e=()=>m(o,"$run",t);u(()=>{h.set(_),v.set(!1),o.set(g(o,e()))});const a=p(x(6,6));f(r,{get highlightLines(){return a},title:"中心基準に正規化"}),l(),n()}export{L as component};

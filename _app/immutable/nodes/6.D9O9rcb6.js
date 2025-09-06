import"../chunks/DsnmJJEf.js";import"../chunks/DTIIxCa-.js";import{p as t,q as a,b as e,f as i,a as l}from"../chunks/Ce8YuaDY.js";import{i as m}from"../chunks/B7tt9OXp.js";import{f as u,i as f}from"../chunks/BX_KVGA7.js";import{O as p}from"../chunks/BNRPoit3.js";const v=`uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

void main() {
   vec2 uv = (gl_FragCoord.xy / resolution.xy);
    uv.x *= resolution.x / resolution.y;

    vec3 color = vec3(uv.x,uv.y,abs(sin(time)));

    fragColor = vec4(color, 1.0);
}`;var c=i('<div class="grid h-full w-full place-items-center"><span class="text-[200%]">実際に呪文（GLSL）を書いてみよう</span></div>');function $(o,r){t(r,!1),a(()=>{u.set(v),f.set(!0)}),m(),p(o,{children:(n,d)=>{var s=c();l(n,s)},$$slots:{default:!0}}),e()}export{$ as component};

import"../chunks/DsnmJJEf.js";import"../chunks/DTIIxCa-.js";import{p as e,q as n,b as r,f as l,v as i,a as p}from"../chunks/Ce8YuaDY.js";import{i as m}from"../chunks/B7tt9OXp.js";import{f as u,i as f}from"../chunks/BX_KVGA7.js";import{O as c}from"../chunks/keEqv1EZ.js";const v=`uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

void main() {
   vec2 uv = (gl_FragCoord.xy / resolution.xy);
    uv.x *= resolution.x / resolution.y;

    vec3 color = vec3(uv.x,uv.y,abs(sin(time)));

    fragColor = vec4(color, 1.0);
}`;var x=l('<span class="c-text-shadow absolute top-[16%] left-1/2 -translate-x-1/2 text-[200%] text-white svelte-1s1mygc"><span class="text-[150%]">GLSL</span> で解き放つ！</span> <div class="c-text-shadow absolute top-[40%] flex w-full justify-center text-[200%] text-white svelte-1s1mygc"><span>WebGL シェーダーが生み出す<span class="text-[150%]">魔法</span>体験</span></div> <span class="absolute bottom-[13%] left-1/2 -translate-x-1/2 text-[150%] text-white">Satoshi Komatsu</span>',1);function C(t,s){e(s,!1),n(()=>{u.set(v),f.set(!0)}),m(),c(t,{children:(o,d)=>{var a=x();i(4),p(o,a)},$$slots:{default:!0}}),r()}export{C as component};

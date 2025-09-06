import"../chunks/DsnmJJEf.js";import"../chunks/DTIIxCa-.js";import{p as t,q as e,b as r,f as p,a as l,v as i}from"../chunks/Ce8YuaDY.js";import{i as c}from"../chunks/B7tt9OXp.js";import{f,i as u}from"../chunks/BX_KVGA7.js";import{O as m}from"../chunks/BpWUWech.js";const v=`uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

void main() {
   vec2 uv = (gl_FragCoord.xy / resolution.xy);
    uv.x *= resolution.x / resolution.y;

    vec3 color = vec3(uv.x,uv.y,abs(sin(time)));

    fragColor = vec4(color, 1.0);
}`;var x=p('<span class="title">自己紹介</span> <div class="absolute top-[15%] left-[3%] flex w-1/2 flex-col items-center justify-center pt-[5%] text-[100%]"><img class="aspect-square w-[60%] rounded-full c-no-drag-icon" src="./icon.png" alt="Icon"/></div> <div class="absolute top-[15%] right-[8%] flex flex-col gap-4 text-[150%]"><span class="text-[160%]">Satoshi Komatsu</span> <span></span> <span>株式会社MIERUNE</span> <span>フロントエンドエンジニア</span> <span></span> <span></span> <span>中身のコードに興味はない。</span> <span>ビジュアルにこだわりたい。</span></div>',1);function $(s,a){t(a,!1),e(()=>{f.set(v),u.set(!0)}),c(),m(s,{children:(n,d)=>{var o=x();i(4),l(n,o)},$$slots:{default:!0}}),r()}export{$ as component};

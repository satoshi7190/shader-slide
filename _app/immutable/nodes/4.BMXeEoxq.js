import"../chunks/DsnmJJEf.js";import"../chunks/DTIIxCa-.js";import{p as t,q as r,b as e,f as p,a as i,v as l}from"../chunks/Ce8YuaDY.js";import{i as m}from"../chunks/B7tt9OXp.js";import{f,i as u}from"../chunks/BX_KVGA7.js";import{O as v}from"../chunks/CsL7OJde.js";const c=`uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

void main() {
   vec2 uv = (gl_FragCoord.xy / resolution.xy);
    uv.x *= resolution.x / resolution.y;

    vec3 color = vec3(uv.x,uv.y,abs(sin(time)));

    fragColor = vec4(color, 1.0);
}`;var x=p('<span class="title">シェーダーとは</span> <div class="absolute top-[15%] flex flex-col px-[3%] text-[150%] text-white"><span class="mb-[10%]">画面に表示する色やオブジェクトの質感を表現するプログラムでGPUで実行される</span> <span>主に2種類ある</span> <span>頂点シェーダー - 3Dオブジェクトの形や位置を決定</span> <span class="mb-[10%]">フラグメントシェーダー - 各ピクセルの色を計算して画面出力</span> <span>今日はフラグメントシェーダーの話</span></div>',1);function $(o,s){t(s,!1),r(()=>{f.set(c),u.set(!0)}),m(),v(o,{children:(a,d)=>{var n=x();l(2),i(a,n)},$$slots:{default:!0}}),e()}export{$ as component};

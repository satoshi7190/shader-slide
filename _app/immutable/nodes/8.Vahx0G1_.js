import"../chunks/DsnmJJEf.js";import"../chunks/DTIIxCa-.js";import{p,q as r,f as c,w as b,a as u,b as m,v}from"../chunks/Ce8YuaDY.js";import{i as f}from"../chunks/B7tt9OXp.js";import{s as g,u as d,a as h}from"../chunks/BA8C_d9j.js";import{E as x}from"../chunks/CnhhIgOv.js";import{f as w,i as _,r as t}from"../chunks/BX_KVGA7.js";import"../chunks/DhUtvRI6.js";import"../chunks/NcRJzugc.js";const k=`uniform vec2 resolution;

out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy);
    uv.x *= resolution.x / resolution.y;

    vec3 color = vec3(uv, 1.0);

    fragColor = vec4(color, 1.0);
}`;var y=c('<!> <div class="pointer-events-none absolute right-0 bottom-0 z-10 h-full w-1/2 text-[200%]"><span class="absolute top-0 bg-black/70 p-[1%]">0,1</span> <span class="absolute bottom-0 bg-black/70 p-[1%]">0,0</span> <span class="absolute right-0 bottom-0 bg-black/70 p-[1%]">1,0</span> <span class="absolute top-0 right-0 bg-black/70 p-[1%]">1,1</span> <span class="absolute top-[32%] right-[6%] w-[80%] bg-black/70 p-[1%] text-[70%]">画面上の位置を表す2次元座標</span> <div class="absolute bottom-[7%] left-[45%] flex items-center"><span class=" bg-black/70 px-1">X</span></div> <div class="absolute bottom-[5%] left-[18%] h-[1%] w-[60%] bg-white"></div> <div class="absolute bottom-[3.5%] left-[77%] h-[4%] w-[4%] bg-white" style="clip-path: polygon(100% 50%, 0% 0%, 0% 100%);"></div> <div class="absolute bottom-[45%] left-[7%] flex flex-col items-center"><span class=" bg-black/70 px-1">Y</span></div> <div class="absolute bottom-[18%] left-[5%] h-[60%] w-[1%] bg-white"></div> <div class="absolute bottom-[77%] left-[3.5%] h-[4%] w-[4%] bg-white" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div></div>',1);function X(o,a){p(a,!1);const[e,l]=g(),n=()=>h(t,"$run",e);r(()=>{w.set(k),_.set(!1),t.set(d(t,n()))}),f();var s=y(),i=b(s);x(i,{title:"UV座標の可視化"}),v(2),u(o,s),m(),l()}export{X as component};

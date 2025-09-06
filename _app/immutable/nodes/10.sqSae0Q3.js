import"../chunks/DsnmJJEf.js";import{p,q as c,x as b,f as u,w as g,a as v,b as m,v as h}from"../chunks/Ce8YuaDY.js";import{s as f,u as d,a as x}from"../chunks/BA8C_d9j.js";import{E as w}from"../chunks/CSL4HT48.js";import{f as _,i as y,r as s}from"../chunks/BX_KVGA7.js";import{h as k}from"../chunks/gf28JVaL.js";const $=`uniform vec2 resolution;

out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    uv.x *= resolution.x / resolution.y;

    vec3 color = vec3(uv, 1.0);

    fragColor = vec4(color, 1.0);
}`;var C=u('<!> <div class="pointer-events-none absolute right-0 bottom-0 z-10 h-full w-1/2 text-[200%]"><span class="absolute top-0 bg-black/70 p-[1%]">-1,1</span> <span class="absolute bottom-0 bg-black/70 p-[1%]">-1,-1</span> <span class="absolute right-0 bottom-0 bg-black/70 p-[1%]">1,-1</span> <span class="absolute top-0 right-0 bg-black/70 p-[1%]">1,1</span> <span class="absolute top-[42%] right-[42%] bg-black/70 p-[1%]">0,0</span> <div class="absolute bottom-[7%] left-[45%] flex items-center"><span class=" bg-black/70 px-1">X</span></div> <div class="absolute bottom-[5%] left-[18%] h-[1%] w-[60%] bg-white"></div> <div class="absolute bottom-[3.5%] left-[77%] h-[4%] w-[4%] bg-white" style="clip-path: polygon(100% 50%, 0% 0%, 0% 100%);"></div> <div class="absolute bottom-[45%] left-[7%] flex flex-col items-center"><span class=" bg-black/70 px-1">Y</span></div> <div class="absolute bottom-[18%] left-[5%] h-[60%] w-[1%] bg-white"></div> <div class="absolute bottom-[77%] left-[3.5%] h-[4%] w-[4%] bg-white" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div></div>',1);function R(o,a){p(a,!0);const[e,l]=f(),n=()=>x(s,"$run",e);c(()=>{_.set($),y.set(!1),s.set(d(s,n()))});const i=b(k(7,7));var t=C(),r=g(t);w(r,{get highlightLines(){return i},title:"中心基準に正規化"}),h(2),v(o,t),m(),l()}export{R as component};

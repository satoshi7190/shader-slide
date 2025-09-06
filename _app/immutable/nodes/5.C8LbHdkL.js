import"../chunks/DsnmJJEf.js";import"../chunks/DTIIxCa-.js";import{p as r,q as t,b as e,f as i,a as p,v as l}from"../chunks/Ce8YuaDY.js";import{i as f}from"../chunks/B7tt9OXp.js";import{f as m,i as u}from"../chunks/BX_KVGA7.js";import{O as v}from"../chunks/VQeARtog.js";const c=`uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

void main() {
   vec2 uv = (gl_FragCoord.xy / resolution.xy);
    uv.x *= resolution.x / resolution.y;

    vec3 color = vec3(uv.x,uv.y,abs(sin(time)));

    fragColor = vec4(color, 1.0);
}`;var x=i('<span class="title">GLSLとは</span> <div class="absolute top-[15%] flex flex-col px-[3%] text-[150%] text-white"><span>Graphics Library Shader Languageの略</span> <br/> <span>シェーダーを記述するための専用プログラミング言語</span> <br/> <span>C言語をベースとした文法</span> <br/> <span>数学的思考が必要不可欠で、並列処理特有の制約があるため、人間には理解が困難。わたしはこれと「呪文」と呼んでいる</span></div>',1);function L(o,a){r(a,!1),t(()=>{m.set(c),u.set(!0)}),f(),v(o,{children:(n,g)=>{var s=x();l(2),p(n,s)},$$slots:{default:!0}}),e()}export{L as component};

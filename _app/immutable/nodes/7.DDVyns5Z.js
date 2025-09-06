import"../chunks/DsnmJJEf.js";import"../chunks/DTIIxCa-.js";import{p as a,q as i,b as u}from"../chunks/Ce8YuaDY.js";import{i as p}from"../chunks/B7tt9OXp.js";import{s as m,u as c,a as f}from"../chunks/BA8C_d9j.js";import{E as l}from"../chunks/jP35rHgP.js";import{f as v,i as g,r as o}from"../chunks/BX_KVGA7.js";const _=`uniform vec2 resolution;

out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy);
    uv.x *= resolution.x / resolution.y;

    vec3 color = vec3(uv, 1.0);

    fragColor = vec4(color, 1.0);
}`;function b(r,s){a(s,!1);const[n,t]=m(),e=()=>f(o,"$run",n);i(()=>{v.set(_),g.set(!1),o.set(c(o,e()))}),p(),l(r,{}),u(),t()}export{b as component};

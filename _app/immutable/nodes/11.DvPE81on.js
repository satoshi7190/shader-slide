import"../chunks/DsnmJJEf.js";import{p as l,q as u,x as c,b as p}from"../chunks/Ce8YuaDY.js";import{s as f,u as g,a as m}from"../chunks/BA8C_d9j.js";import{E as h}from"../chunks/jP35rHgP.js";import{f as v,i as x,r as o}from"../chunks/BX_KVGA7.js";import{h as r}from"../chunks/BToj0et0.js";const d=`uniform vec2 resolution;

out vec4 fragColor;

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}
                    
void main() {
    vec2 uv = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    uv.x *= resolution.x / resolution.y;

    float circle = sdCircle(uv, 0.3);

    vec3 color = vec3(step(0.0, circle));
    
    fragColor = vec4(color, 1.0);
}

`;function L(n,t){l(t,!0);const[e,s]=f(),i=()=>m(o,"$run",e);u(()=>{v.set(d),x.set(!1),o.set(g(o,i()))});const a=c([...r(5,7),...r(13,15)]);h(n,{get highlightLines(){return a},title:"円を描く"}),p(),s()}export{L as component};

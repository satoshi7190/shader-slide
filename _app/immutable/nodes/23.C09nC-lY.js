import"../chunks/DsnmJJEf.js";import{f as i,a as f,z as m,l as n,c as l,y as v,A as c,r as p}from"../chunks/Ce8YuaDY.js";import{E as u}from"../chunks/fWCsTXdI.js";import{W as d}from"../chunks/CD4aJVN9.js";const g=`uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

out vec4 fragColor;

void main(){
    vec2 r=resolution;
    vec2 p=(gl_FragCoord.xy*2.-r) / min(r.x,r.y) - mouse;
    for(int i=0;i<8;++i)
        {
            p.xy=abs(p)/dot(p,p) - vec2(.9+cos(time*.2) *.4);
        }
        fragColor=vec4(p.xxy,1);
}
`;var x=i('<div class="absolute flex h-full w-full"><!> <!></div>');function C(s){let r=c(()=>g);var o=x(),e=l(o);u(e,{get fs(){return n(r)},set fs(a){m(r,a)}});var t=v(e,2);d(t,{get fs(){return n(r)}}),p(o),f(s,o)}export{C as component};

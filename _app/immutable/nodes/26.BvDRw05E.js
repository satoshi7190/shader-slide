import"../chunks/DsnmJJEf.js";import{f as i,a as v,z as f,l as e,c as l,y as u,A as m,r as c}from"../chunks/Ce8YuaDY.js";import{E as d}from"../chunks/fWCsTXdI.js";import{W as g}from"../chunks/CD4aJVN9.js";const p=`// https://www.shadertoy.com/view/mtyGWy

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

out vec4 fragColor;

void main() {
    vec2 R = resolution.xy;
    vec2 uv = (gl_FragCoord.xy*2.-R)/R.y;

    fragColor.rgb *= 0.;
    fragColor.a = 1.;

    uv *= 10.;
    vec2 id = floor(uv);
    uv = fract(uv);


    float d = sqrt(10. * uv.x*uv.y*(1.-uv.x)*(1.-uv.y));
    vec3 col = 1. + sin(vec3(3,2,1)+dot(id,id)*2.+time*4.);
    fragColor.rgb += col*d;

}


`;var y=i('<div class="absolute flex h-full w-full"><!> <!></div>');function C(t){let o=m(()=>p);var n=y(),r=l(n);d(r,{get fs(){return e(o)},set fs(s){f(o,s)}});var a=u(r,2);g(a,{get fs(){return e(o)}}),c(n),v(t,n)}export{C as component};

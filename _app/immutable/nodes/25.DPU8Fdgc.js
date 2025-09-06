import"../chunks/DsnmJJEf.js";import{f as l,a as i,z as s,l as t,c,y as f,A as u,r as d}from"../chunks/Ce8YuaDY.js";import{E as m}from"../chunks/E_7G8KzO.js";import{W as p}from"../chunks/mFDfyv_A.js";const g=`// https://www.shadertoy.com/view/mtyGWy

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

out vec4 fragColor;

vec3 palette( float t ) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263,0.416,0.557);

    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    
    for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette(length(uv0) + i*.4 + time*.4);

        d = sin(d*8. + time)/8.;
        d = abs(d);

        d = pow(0.01 / d, 1.2);

        finalColor += col * d;
    }

    fragColor = vec4(finalColor, 1.0);
}


`;var h=l('<div class="absolute flex h-full w-full"><!> <!></div>');function x(r){let n=u(()=>g);var e=h(),o=c(e);m(o,{get fs(){return t(n)},set fs(v){s(n,v)}});var a=f(o,2);p(a,{get fs(){return t(n)}}),d(e),i(r,e)}export{x as component};

import"../chunks/DsnmJJEf.js";import{f as a,a as l,z as f,l as e,c as m,y as v,A as u,r as c}from"../chunks/Ce8YuaDY.js";import{E as p}from"../chunks/fWCsTXdI.js";import{W as d}from"../chunks/CD4aJVN9.js";const g=`// https://www.shadertoy.com/view/XsXXDn

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

out vec4 fragColor;

void main(){ 
  	vec3 c;
	float l,z=time;
	for(int i=0;i<3;i++) {
		vec2 uv;
        vec2 p = gl_FragCoord.xy/resolution;
		uv = p;
		p -= .5;
		p.x *= resolution.x / resolution.y;
		z += 0.07;
		l = length(p);
		uv += p / l * (sin(z) + 1.) * abs(sin(l * 9. - z - z));
		c[i] = 0.01 / length(mod(uv, 1.) - .5);
	}
	fragColor = vec4(c / l, time);
}

`;var h=a('<div class="absolute flex h-full w-full"><!> <!></div>');function b(r){let t=u(()=>g);var n=h(),o=m(n);p(o,{get fs(){return e(t)},set fs(i){f(t,i)}});var s=v(o,2);d(s,{get fs(){return e(t)}}),c(n),l(r,n)}export{b as component};

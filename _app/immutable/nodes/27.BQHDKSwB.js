import"../chunks/DsnmJJEf.js";import{f as a,a as v,z as c,l as e,c as l,y as f,A as m,r as p}from"../chunks/Ce8YuaDY.js";import{E as u}from"../chunks/E_7G8KzO.js";import{W as d}from"../chunks/mFDfyv_A.js";const g=`// https://www.shadertoy.com/view/4tjSDt

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

out vec4 fragColor;

void main() {
  	float s = 0.0, v = 0.0;
	vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.;
    float time = (time-2.0)*58.0;
	vec3 col = vec3(0);
    vec3 init = vec3(sin(time * .0032)*.3, .35 - cos(time * .005)*.3, time * 0.002);
	for (int r = 0; r < 100; r++) 
	{
		vec3 p = init + s * vec3(uv, 0.05);
		p.z = fract(p.z);
        // Thanks to Kali's little chaotic loop...
		for (int i=0; i < 10; i++)	p = abs(p * 2.04) / dot(p, p) - .9;
		v += pow(dot(p, p), .7) * .06;
		col +=  vec3(v * 0.2+.4, 12.-s*2., .1 + v * 1.) * v * 0.00003;
		s += .025;
	}
	fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;var h=a('<div class="absolute flex h-full w-full"><!> <!></div>');function y(r){let t=m(()=>g);var o=h(),n=l(o);u(n,{get fs(){return e(t)},set fs(s){c(t,s)}});var i=f(n,2);d(i,{get fs(){return e(t)}}),p(o),v(r,o)}export{y as component};

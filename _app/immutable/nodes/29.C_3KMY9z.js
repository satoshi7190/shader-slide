import"../chunks/DsnmJJEf.js";import{f as i,a as l,z as u,l as r,c as m,y as f,A as c,r as d}from"../chunks/Ce8YuaDY.js";import{E as v}from"../chunks/B9Q15tE_.js";import{W as x}from"../chunks/D5W7Mljg.js";const p=`uniform vec2 resolution;
uniform float time;
uniform sampler2D audioTex; // 1xN audio spectrum texture
uniform float audioBins;    // number of bins (width)

out vec4 fragColor;

void main() {
    // normalized device coords with aspect fix (center = 0)
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);

    // 0..1 screen coords
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x *= resolution.x / resolution.y;

    // sample audio: map x to [0..1] across bins
    float x = clamp(gl_FragCoord.x / resolution.x, 0.0, 1.0);
    // center of the target bin
    float bin = floor(x * max(audioBins - 1.0, 1.0));
    float u = (bin + 0.5) / max(audioBins, 1.0);
    float amp = texture(audioTex, vec2(u, 0.5)).r; // 0..1

    // simple visual: bars + glow by amplitude
    float bars = smoothstep(0.02, 0.0, abs(uv.y) - amp * 0.8);
    vec3 base = vec3(0.1, 0.2, 0.6) + vec3(0.9, 0.5, 0.2) * amp;
    vec3 color = base * bars;

    // slight hue shift over time
    color = color * (0.8 + 0.2 * sin(time + x * 6.2831853));

    fragColor = vec4(color, 1.0);
}

`;var g=i('<div class="absolute flex h-full w-full"><!> <!></div>');function C(a){let o=c(()=>p);var e=g(),n=m(e);v(n,{get fs(){return r(o)},set fs(s){u(o,s)}});var t=f(n,2);x(t,{get fs(){return r(o)}}),d(e),l(a,e)}export{C as component};

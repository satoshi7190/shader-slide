// https://www.shadertoy.com/view/mtyGWy

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



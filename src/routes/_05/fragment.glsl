// https://www.shadertoy.com/view/XsXXDn

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


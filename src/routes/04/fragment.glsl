uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

void main(){
    vec2 r=resolution;
    vec2 p=(gl_FragCoord.xy*2.-r) / min(r.x,r.y) - mouse;
    for(int i=0;i<8;++i)
        {
            p.xy=abs(p)/dot(p,p) - vec2(.9+cos(time*.2) *.4);
        }
        gl_FragColor=vec4(p.xxy,1);
}

import"../chunks/DsnmJJEf.js";import{f as i,a as f,z as l,l as t,c as u,y as d,A as m,r as c}from"../chunks/Ce8YuaDY.js";import{E as p}from"../chunks/fWCsTXdI.js";import{W as g}from"../chunks/CD4aJVN9.js";const v=`uniform vec2 resolution;
uniform float time;
uniform sampler2D audioTex; // 1xN audio spectrum texture
uniform float audioBins;    // number of bins (width)

out vec4 fragColor;

void main() {
    // fragCoordの代替として、gl_FragCoordを使用
    vec2 u = gl_FragCoord.xy;
    
    float i = 0.0; // 初期化が必要
    float d = 0.0; // 初期化が必要
    float s, n, t = time;
    vec3 p = vec3(resolution, 1.0); // resolutionはvec2なので、vec3にするためz成分を追加
    
    // 座標正規化
    u = (u - resolution.xy/2.0) / resolution.y;
    
    // fragColorの初期化
    fragColor = vec4(0.0);
    
    // 元のアルゴリズムを忠実に再現
    for(; i < 160.0; i++, d += s) {
        s = 0.002 + abs(s) * 0.6;
        
        // 3D空間の位置計算
        p = vec3(u * d, d + t + t);
        
        // 回転行列の適用（元のコードを正しく解釈）
        float c = cos(p.z * 0.23);
        float s_rot = sin(p.z * 0.23);
        mat2 rot = mat2(c, -s_rot, s_rot, c);
        p.xy *= rot;
        
        // フラクタル距離場の計算
        s = 1.0 + sin(p.y - p.x);
        
        for (n = 8.0; n < 32.0; n *= 2.0) {
            s -= abs(dot(cos(p * s * n), sin(p * 2.0))) / n;
        }
        
        // 色の蓄積（元のロジックに近づける）
        fragColor += vec4(16.0, 2.0, s, 0.0) / max(abs(s), 0.001) / max(d, 0.001);
    }
    
    // 最終的な色処理
    float dist = length(u);
    fragColor = tanh(mix(fragColor, fragColor.yzxw, dist) / 20000.0 / max(dist, 0.001));
}`;var x=i('<div class="absolute flex h-full w-full"><!> <!></div>');function h(s){let n=m(()=>v);var o=x(),r=u(o);p(r,{get fs(){return t(n)},set fs(e){l(n,e)}});var a=d(r,2);g(a,{get fs(){return t(n)}}),c(o),f(s,o)}export{h as component};

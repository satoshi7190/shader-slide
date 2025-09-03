// https://www.shadertoy.com/view/4tjSDt

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

out vec4 fragColor;


// フラクタルシェーダー v2.0 - 可読性向上版
// === トンネル・捩れ表現の核心部分 ===


// === より簡単なトンネル捩れサンプル ===
void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy/2.0) / resolution.y;
    
    // 極座標変換でトンネル基本形
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // 深度を時間で前進
    float depth = time + 1.0/radius; // 1/radiusで遠近感
    
    // 捩れ効果：深度に応じて角度を回転
    float twist = depth * 0.5; // 捩れの強さ
    angle += twist;
    
    // 新しい座標
    vec2 twistedUV = vec2(cos(angle), sin(angle)) * radius;
    
    // パターン生成
    float pattern = sin(twistedUV.x * 3.0) * sin(twistedUV.y * 10.0);
    pattern *= sin(depth * 5.0); // 奥行きのリング模様
    
    // 色付け
    vec3 color = vec3(0.2 + 0.5 * pattern);
    color *= 1.0 / (radius + 0.1); // 中心ほど明るく
    
    fragColor = vec4(color, 1.0);
}
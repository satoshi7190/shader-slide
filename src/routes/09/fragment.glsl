// https://www.shadertoy.com/view/4tjSDt

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

// tanh関数の近似実装
vec4 tanh(vec4 x) {
    vec4 x2 = x * x;
    vec4 x3 = x2 * x;
    vec4 x5 = x3 * x2;
    return x - x3/3.0 + 2.0*x5/15.0;
}

// フラクタルシェーダー v2.0 - 可読性向上版
// === トンネル・捩れ表現の核心部分 ===

void main() {
    vec2 uv = (gl_FragCoord.xy - resolution.xy/2.0) / resolution.y;
    float currentTime = time;
    
    gl_FragColor = vec4(0.0);
    
    // === 1. レイマーチング（トンネル効果の基礎）===
    for(float i = 0.0; i < 160.0; i++) {
        float distance = i * 0.01; // 奥行き方向への進行距離
        
        // === 2. 3D座標の構築（トンネルの軸）===
        vec3 pos = vec3(
            uv * distance,               // X,Y: UV座標を距離でスケール（遠近感）
            distance + currentTime * 2.0 // Z: 奥行き + 時間による前進
        );
        
        // === 3. 捩れ変換（トンネルを捩る魔法）===
        // pos.z（奥行き）に比例した回転角度
        float twistAngle = pos.z * 0.23; // 0.23が捩れの強さ
        
        // 2D回転行列を適用
        mat2 twistMatrix = mat2(
            cos(twistAngle), -sin(twistAngle),
            sin(twistAngle),  cos(twistAngle)
        );
        pos.xy = twistMatrix * pos.xy; // 明示的な行列乗算
        
        // === 4. フラクタルパターン（トンネル壁面の模様）===
        float surface = 1.0 + sin(pos.y - pos.x);
        
        // マルチスケールディテール
        for(float scale = 8.0; scale < 32.0; scale = scale * 2.0) {
            vec3 p = pos * surface * scale;
            surface = surface - abs(dot(cos(p), sin(p*2.0))) / scale;
        }
        
        // === 5. 色の蓄積（距離フォグ + 発光効果）===
        float stepSize = 0.002 + abs(surface) * 0.6;
        vec4 color = vec4(16.0, 2.0, surface, 0.0) / stepSize / distance;
        gl_FragColor = gl_FragColor + color;
    }
    
    // 最終調整
    float centerDist = length(uv);
    gl_FragColor = tanh(mix(gl_FragColor, gl_FragColor.yzxw, centerDist) / 2e4 / centerDist);
}

// === より簡単なトンネル捩れサンプル ===
// void main() {
//     vec2 uv = (gl_FragCoord.xy - resolution.xy/2.0) / resolution.y;
    
//     // 極座標変換でトンネル基本形
//     float radius = length(uv);
//     float angle = atan(uv.y, uv.x);
    
//     // 深度を時間で前進
//     float depth = time + 1.0/radius; // 1/radiusで遠近感
    
//     // 捩れ効果：深度に応じて角度を回転
//     float twist = depth * 0.5; // 捩れの強さ
//     angle += twist;
    
//     // 新しい座標
//     vec2 twistedUV = vec2(cos(angle), sin(angle)) * radius;
    
//     // パターン生成
//     float pattern = sin(twistedUV.x * 10.0) * sin(twistedUV.y * 10.0);
//     pattern *= sin(depth * 5.0); // 奥行きのリング模様
    
//     // 色付け
//     vec3 color = vec3(0.5 + 0.5 * pattern);
//     color *= 1.0 / (radius + 0.1); // 中心ほど明るく
    
//     gl_FragColor = vec4(color, 1.0);
// }
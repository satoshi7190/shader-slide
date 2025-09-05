uniform vec2 resolution;
uniform float time;
uniform sampler2D audioTex;
uniform float audioBins;



// 色彩変換関数
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


// 光彩エフェクト関数
float glow(float d, float strength, float falloff) {
    return strength / (1.0 + d * d * falloff);
}

// 図形描画関数
float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

// ノイズ系関数 乱数
float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}

// ノイズ系関数 スムーズノイズ
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
                mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0)), u.x), u.y);
}

// 変形関数 回転
mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

// 波紋エフェクト関数
float ripple(vec2 center, vec2 uv, float time, float freq, float amp) {
    float dist = distance(uv, center);
    return sin(dist * freq - time) * amp * (1.0 / (1.0 + dist * 2.0));
}

// より滑らかな補間
float smootherstep(float edge0, float edge1, float x) {
    x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

out vec4 fragColor;

void main() {
// UV座標の計算
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 st = (uv - 0.5) * 2.0;
    st.x *= resolution.x / resolution.y;

    vec3 color = vec3(0.0);

    float u_intensity = 0.1; // 強度調整用の変数

     // 方法1: 直接的なアクセス
        // 低音域だけでビジュアル作成（ドラムキックに反応）
    float bass = texture(audioTex, vec2(0.1, 0.5)).r;
    
    // 高音域だけでビジュアル作成（シンバルやハイハットに反応）
    float treble = texture(audioTex, vec2(0.9, 0.5)).r;

// Magic circle rings
for (int i = 0; i < 5; i++) {
    // float fi = float(i);
    float fi = float(i) * bass * 5.0; // 低音域に基づいて回転速度を調整
    vec2 rotSt = rotate2d(time * (0.3 + fi * 0.1) * u_intensity) * st;
    float radius = 0.1 + fi * 0.15;
    float ring = sdCircle(rotSt, radius);
    
    float hue = (fi * 0.2 + time * 0.3) + atan(rotSt.y, rotSt.x) / (2.0 * 3.14159);
    vec3 ringColor = hsv2rgb(vec3(hue, 0.8, 1.0));
    float d = abs(ring) - 0.005;
    color += glow(d, 1.0, 150.0) * ringColor * 0.3;
    color += glow(d, 0.5, 30.0) * ringColor * 0.5;
    color += glow(d, 0.2, 8.0) * ringColor * 0.7;
}

 fragColor = vec4(color, 1.0);
//  return;


// 波紋効果
float waves = 0.0;
waves += ripple(vec2(0.0), st, time * 4.0 * u_intensity, 25.0, 0.4);
waves += ripple(vec2(0.4, 0.4), st, time * 3.0 * u_intensity, 18.0, 0.3);
waves += ripple(vec2(-0.3, 0.2), st, time * 2.5 * u_intensity, 22.0, 0.2);


// パーティクル効果
vec2 particleCoord = st * 12.0;           // 12x12のグリッドに分割
vec2 particleId = floor(particleCoord);    // セルのID
vec2 particlePos = fract(particleCoord);   // セル内の位置

float sparkle = 0.0;

// 9近傍セルをチェック（3x3）
for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = vec2(0.5) + neighbor;
        float randomOffset = random(particleId + neighbor);

        // 各セルに動くパーティクルを配置
        point += 0.3 * sin(time * 3.0 * u_intensity + randomOffset * 6.28) * vec2(1.0);
        float dist = length(point - particlePos);

        // 点滅効果
        sparkle += smootherstep(0.08, 0.0, dist) * // サイズ拡大
          (0.8 + 0.2 * sin(time * 6.0 * u_intensity + randomOffset * 10.0)); 
    }
}


float centerDist = length(st);
vec3 centerGlow = hsv2rgb(vec3(time * 0.05, 0.9, 1.0));

// 中央からの放射光
color += glow(centerDist, 0.8, 2.0) * centerGlow * 0.3;

// 各エフェクトを合成
// color += abs(waves) * hsv2rgb(vec3(time * 0.1 + 0.3, 0.7, 0.6));
color += sparkle * hsv2rgb(vec3(time * 0.15 + 0.6, 0.9, 1.0)) * 0.8;

// ビネット効果（周辺減光）
// float vignette = 1.0 - smoothstep(0.5, 1.2, centerDist);
// color *= vignette;
// color *= u_intensity;

    fragColor = vec4(color, 1.0);
}



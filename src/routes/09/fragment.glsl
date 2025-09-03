uniform vec2 resolution;
uniform float time;
uniform vec2 mouse; // 正規化されたマウス座標 (-1.0 to 1.0)

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float glow(float d, float strength, float falloff) {
    return strength / (1.0 + d * d * falloff);
}

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}
                    
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
                mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0)), u.x), u.y);
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

float ripple(vec2 center, vec2 uv, float time, float freq, float amp) {
    float dist = distance(uv, center);
    return sin(dist * freq - time) * amp * (1.0 / (1.0 + dist * 2.0));
}

// 3D変換用の関数
vec2 apply3DTilt(vec2 uv, vec2 mousePos) {
    // マウス位置から傾き角度を計算
    float tiltX = mousePos.x * 0.3; // X軸周りの回転（上下の傾き）
    float tiltY = mousePos.y * 0.3; // Y軸周りの回転（左右の傾き）
    
    // 3D座標として扱う（Z=0の平面）
    vec3 pos3d = vec3(uv, 0.0);
    
    // X軸周りの回転
    float cosX = cos(tiltX);
    float sinX = sin(tiltX);
    pos3d.yz = mat2(cosX, -sinX, sinX, cosX) * pos3d.yz;
    
    // Y軸周りの回転
    float cosY = cos(tiltY);
    float sinY = sin(tiltY);
    pos3d.xz = mat2(cosY, sinY, -sinY, cosY) * pos3d.xz;
    
    // パースペクティブ投影（奥行き効果）
    float perspective = 1.0 + pos3d.z * 0.5;
    
    return pos3d.xy / perspective;
}

// より自然な3D変換（推奨）
vec2 apply3DTiltSmooth(vec2 uv, vec2 mousePos) {
    // マウス位置を滑らかに変換
    vec2 tilt = mousePos * 0.4;
    
    // 遠近感のある変形
    float centerDist = length(uv);
    float distortionAmount = 0.2 * centerDist;
    
    // マウス方向への傾斜
    vec2 tiltedUV = uv;
    tiltedUV.x += tilt.x * (1.0 - centerDist * 0.3);
    tiltedUV.y += tilt.y * (1.0 - centerDist * 0.3);
    
    // 奥行きによるスケール調整
    float depthScale = 1.0 + dot(tilt, normalize(uv)) * distortionAmount;
    tiltedUV *= depthScale;
    
    return tiltedUV;
}

// パララックス効果版
vec2 applyParallax(vec2 uv, vec2 mousePos, float layer) {
    // レイヤーごとに異なる深度での視差効果
    float depth = layer * 0.1;
    vec2 offset = mousePos * depth;
    return uv + offset;
}

out vec4 fragColor;

void main() {
    vec2 st = (gl_FragCoord.xy / resolution.xy - 0.5) * 2.0;
    st.x *= resolution.x / resolution.y;
    
    // マウス連動3D変換を適用
    st = apply3DTiltSmooth(st, mouse);
    
    vec3 color = vec3(0.0);
    
    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        
        // 各リングに異なるパララックス効果を適用
        vec2 layeredSt = applyParallax(st, mouse, fi);
        vec2 rotSt = rotate2d(time * (0.5 + fi * 0.2)) * layeredSt;
        
        float radius = 0.2 + fi * 0.15;
        float circle = sdCircle(rotSt, radius);
        
        // 色相にマウス位置を反映
        float hue = fi * 0.3 + time * 0.1 + length(mouse) * 0.2;
        vec3 ringColor = hsv2rgb(vec3(hue, 0.8, 1.0));
        
        float d = abs(circle);
        color += glow(d, 0.8, 100.0) * ringColor * 0.4;
        color += glow(d, 0.4, 20.0) * ringColor * 0.6;
        color += glow(d, 0.2, 5.0) * ringColor * 0.8;
    }
    
    // 波紋もマウス位置に影響を受ける
    vec2 waveCenter = mouse * 0.3; // マウス位置付近を中心に
    float waves = ripple(waveCenter, st, time * 3.0, 20.0, 0.3);
    color += abs(waves) * hsv2rgb(vec3(time * 0.1 + length(mouse) * 0.1, 0.7, 0.6));
    
    float centerDist = length(st);
    float vignette = 1.0 - smoothstep(0.5, 1.2, centerDist);
    color *= vignette;
    
    fragColor = vec4(color, 1.0);
}
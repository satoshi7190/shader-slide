#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 v_uv;
uniform vec2 resolution;


void main(void) {
    // 正規化された画面座標 (-1 to 1)
    vec2 screenUV = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);
    
    // 六角グリッド用の座標
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
    
    gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
}
// A local Mandelbrot shader. Geometry stays anchored; only the contour light drifts.
// Compatible with Paper's ShaderMount vertex shader and resolution uniforms.
export const fractalPresets = [
  ['fractal', 'Fractal coastlines', 0],
  ['julia-lace', 'Julia lace', 1],
  ['julia-islands', 'Julia islands', 2],
  ['julia-vines', 'Julia vines', 3],
  ['julia-snow', 'Julia snow', 4],
  ['burning-ship', 'Burning ship', 5],
  ['tricorn', 'Tricorn deltas', 6],
  ['cubic', 'Cubic estuary', 7],
  ['seahorse', 'Seahorse valley', 8],
];
export const fractalField = `#version 300 es
precision highp float;
uniform mediump vec2 u_resolution;
uniform mediump float u_pixelRatio;
uniform float u_time;
uniform float u_cellSize;
uniform float u_variant;
uniform vec4 u_ink;
uniform vec4 u_ground;
out vec4 fragColor;
void main() {
  vec2 css = u_resolution / u_pixelRatio;
  vec2 p = (floor(gl_FragCoord.xy / (u_cellSize * u_pixelRatio)) + .5) * u_cellSize;
  vec2 uv = p / css;
  // Two facing coastlines emerge from the margins. Normalized coordinates
  // adapt the field to narrow screens without chasing the reader's scroll.
  vec2 c = vec2(-.78 + abs(uv.x - .5) * 2.7, (uv.y - .5) * 2.25);
  vec2 z = vec2(0.);
  if (u_variant >= 1. && u_variant <= 4.) {
    z = vec2((abs(uv.x-.5)*2.-.5)*1.8, (uv.y-.5)*2.7);
    if (u_variant < 1.5) c = vec2(-.745,.186);
    else if (u_variant < 2.5) c = vec2(-.12,.74);
    else if (u_variant < 3.5) c = vec2(-.8,.156);
    else c = vec2(.285,.01);
  }
  if (u_variant == 5.) c = vec2(-1.8 + abs(uv.x-.5)*1.4, -.08 + (uv.y-.5)*.32);
  if (u_variant == 6.) c = vec2(-1.5 + abs(uv.x-.5)*3., (uv.y-.5)*2.4);
  if (u_variant == 7.) c = vec2(-.9 + abs(uv.x-.5)*2.8, (uv.y-.5)*2.2);
  if (u_variant == 8.) c = vec2(-.78 + (abs(uv.x-.5)*2.-.5)*.07, .186 + (uv.y-.5)*.08);
  float escape = 0.;
  bool outside = false;
  for (int i=0; i<96; i++) {
    if (u_variant == 5.) z = abs(z);
    if (u_variant == 6.) z.y = -z.y;
    if (u_variant == 7.) z = vec2(z.x*(z.x*z.x-3.*z.y*z.y),z.y*(3.*z.x*z.x-z.y*z.y)) + c;
    else z = vec2(z.x*z.x-z.y*z.y, 2.*z.x*z.y) + c;
    if (dot(z,z)>256.) {
      escape = float(i) + 1. - log2(log2(dot(z,z))) * .5;
      outside = true;
      break;
    }
  }
  float contours = .5 + .5*cos(escape * 1.55 - u_time * .5);
  float terraces = floor(contours*5.)/4.;
  float detail = smoothstep(1., 22., escape);
  float light = outside ? (.12 + .55*terraces) * (.35+.65*detail) : .035;
  vec3 color = mix(u_ground.rgb, u_ink.rgb, light);
  fragColor = vec4(color, .82);
}`;

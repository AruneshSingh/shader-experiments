uniform float u_time;
uniform vec3 u_bg;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec2 u_mouse;

varying vec2 vUv;


#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)



void main() {
  vec3 color = u_bg;

  float noise1 = snoise2(vUv + u_time * (sin(u_mouse.x * 0.001) + 0.2));
  float noise2 = snoise2(vUv + u_time * (sin(u_mouse.y * 0.001) + 0.2));

  color = mix(color, u_colorA, noise1);
  color = mix(color, u_colorB, noise2);
  
  gl_FragColor = vec4(color ,1.0);
}

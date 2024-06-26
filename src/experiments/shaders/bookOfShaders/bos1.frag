uniform float u_time;
uniform vec3 u_bg;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

varying vec2 vUv;

#define PI 3.14159265359

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)



float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

float doubleCubicSeat (float x, float a, float b){
  
  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  a = min(max_param_a, max(min_param_a, a));  
  b = min(max_param_b, max(min_param_b, b)); 
  
  float y = 0.0;
  if (x <= a){
    y = b - b*pow(1.0-x/a, 3.0);
  } else {
    y = b + (1.0-b)*pow((x-a)/(1.0-a), 3.0);
  }
  return y;
}

void main() {
  vec2 st = vUv;

  // Using u_time to animate the 'a' parameter
  float a = sin(u_time) * 0.5 + 0.5;


  //Trying out various functions for y

  float y = doubleCubicSeat(st.x,a,0.2);
  // float y = step(0.5,st.x);
  // float y = smoothstep(0.1,0.9,st.x);
  // float y = pow(st.x,a);
  // float y = abs(sin(u_time * st.x));


  //Mix the two colours according the function defined for y
  vec3 color = mix(u_colorA, u_colorB, y);

  // Plot the line for the function above
  float pct = plot(st, y);

  //Merge the color and line plot
  color = mix(color, vec3(0.0, 1.0, 0.0), pct);

	gl_FragColor = vec4(color, 1.0);
}
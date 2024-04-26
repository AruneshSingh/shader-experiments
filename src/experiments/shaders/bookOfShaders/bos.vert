//Varying variable to be sent to the fragment shader
varying vec2 vUv;

void main() {
  //uv and position are attributes provided by threejs/R3F to us. Check out 'About Attributes' section in https://blog.maximeheckel.com/posts/the-study-of-shaders-with-react-three-fiber/
  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
